"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { exigerAdmin } from "@/lib/admin";
import {
  airtable,
  AirtableError,
  TABLE_ACTUALITES,
  TAG_ACTUALITES,
  uploadAttachment,
} from "@/lib/airtable";
import { enregistrerLignes, getChamp, SECTIONS, TAG_CONTENU } from "@/lib/contenu";
import { TAILLE_MAX, MESSAGE_TROP_LOURD } from "@/lib/fichiers";
import {
  consoleConfiguree,
  COOKIE_SESSION,
  creerJeton,
  DUREE_SESSION,
  motDePasseCorrect,
} from "@/lib/session";

export type Resultat = { erreur?: string; succes?: string };

function messageErreur(error: unknown): string {
  console.error(error);
  if (error instanceof AirtableError) {
    return "Airtable a refusé l'opération. Vérifiez que le jeton Airtable a bien le droit d'écriture et que la table existe. Détail : " + error.message;
  }
  return "Une erreur inattendue est survenue. Réessayez dans un instant.";
}

function lireFichier(formData: FormData, types: string[]): File | string {
  const fichier = formData.get("fichier");
  if (!(fichier instanceof File) || fichier.size === 0) return "Aucun fichier reçu.";
  if (!types.some((t) => fichier.type.startsWith(t))) return "Ce type de fichier n'est pas accepté.";
  if (fichier.size > TAILLE_MAX) return MESSAGE_TROP_LOURD;
  return fichier;
}

const ID_AIRTABLE = /^rec\w+$/;

// --- Connexion ---

export async function connexion(_etat: Resultat | undefined, formData: FormData): Promise<Resultat> {
  if (!consoleConfiguree()) {
    return { erreur: "La console n'est pas encore configurée (ADMIN_PASSWORD et ADMIN_SECRET manquants sur Vercel)." };
  }
  if (!(await motDePasseCorrect(String(formData.get("motDePasse") ?? "")))) {
    // Ralentit les tentatives en série.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { erreur: "Mot de passe incorrect." };
  }

  (await cookies()).set(COOKIE_SESSION, await creerJeton(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DUREE_SESSION,
  });
  redirect("/admin");
}

export async function deconnexion() {
  (await cookies()).delete(COOKIE_SESSION);
  redirect("/admin/connexion");
}

// --- Textes du site ---

export async function enregistrerSection(sectionId: string, formData: FormData): Promise<Resultat> {
  await exigerAdmin();
  const section = SECTIONS.find((s) => s.id === sectionId);
  if (!section) return { erreur: "Section inconnue." };

  const lignes = [];
  for (const champ of section.champs) {
    if (champ.type === "image") continue;
    const valeur = String(formData.get(champ.cle) ?? "").trim();
    if (valeur && champ.type === "lien" && !/^https?:\/\//.test(valeur)) {
      return { erreur: `« ${champ.label} » doit être un lien complet commençant par https://` };
    }
    if (valeur && champ.type === "email" && !/^\S+@\S+\.\S+$/.test(valeur)) {
      return { erreur: `« ${champ.label} » n'est pas une adresse email valide.` };
    }
    // Une valeur identique au texte d'origine n'est pas stockée : le site garde la valeur par défaut.
    lignes.push({ cle: champ.cle, champs: { Valeur: valeur === champ.defaut ? "" : valeur } });
  }

  try {
    await enregistrerLignes(lignes);
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
  updateTag(TAG_CONTENU);
  return { succes: "Enregistré — les modifications sont en ligne." };
}

export async function envoyerImageContenu(cle: string, formData: FormData): Promise<Resultat> {
  await exigerAdmin();
  if (getChamp(cle)?.type !== "image") return { erreur: "Champ inconnu." };
  const fichier = lireFichier(formData, ["image/"]);
  if (typeof fichier === "string") return { erreur: fichier };

  try {
    // Vide d'abord l'ancienne photo (et crée la ligne si besoin), puis envoie la nouvelle.
    const ids = await enregistrerLignes([{ cle, champs: { Image: [] } }]);
    await uploadAttachment(ids[cle], "Image", fichier);
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
  updateTag(TAG_CONTENU);
  return { succes: "Photo en ligne." };
}

export async function supprimerImageContenu(cle: string): Promise<Resultat> {
  await exigerAdmin();
  if (getChamp(cle)?.type !== "image") return { erreur: "Champ inconnu." };
  try {
    await enregistrerLignes([{ cle, champs: { Image: [] } }]);
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
  updateTag(TAG_CONTENU);
  return { succes: "Photo retirée." };
}

// --- Actualités ---

export async function enregistrerActualite(
  id: string | null,
  formData: FormData
): Promise<Resultat & { id?: string }> {
  await exigerAdmin();
  if (id && !ID_AIRTABLE.test(id)) return { erreur: "Actualité inconnue." };

  const titre = String(formData.get("titre") ?? "").trim();
  if (!titre) return { erreur: "Le titre est obligatoire." };

  const fields: Record<string, unknown> = {
    Titre: titre,
    Date: String(formData.get("date") ?? "") || null,
    Résumé: String(formData.get("resume") ?? "").trim(),
    Contenu: String(formData.get("contenu") ?? "").trim(),
    Publié: formData.get("publie") === "on",
  };
  if (id) {
    // Les médias que l'utilisateur n'a pas retirés.
    fields.Photo = formData.getAll("garder").map((attachmentId) => ({ id: String(attachmentId) }));
  }

  try {
    const table = encodeURIComponent(TABLE_ACTUALITES);
    const record = await airtable<{ id: string }>(id ? `${table}/${id}` : table, {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify({ fields }),
    });
    updateTag(TAG_ACTUALITES);
    return { id: record.id, succes: "Actualité enregistrée." };
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
}

export async function envoyerMediaActualite(id: string, formData: FormData): Promise<Resultat> {
  await exigerAdmin();
  if (!ID_AIRTABLE.test(id)) return { erreur: "Actualité inconnue." };
  const fichier = lireFichier(formData, ["image/", "video/"]);
  if (typeof fichier === "string") return { erreur: fichier };

  try {
    await uploadAttachment(id, "Photo", fichier);
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
  updateTag(TAG_ACTUALITES);
  return { succes: "Fichier envoyé." };
}

export async function supprimerActualite(id: string): Promise<Resultat> {
  await exigerAdmin();
  if (!ID_AIRTABLE.test(id)) return { erreur: "Actualité inconnue." };
  try {
    await airtable(`${encodeURIComponent(TABLE_ACTUALITES)}/${id}`, { method: "DELETE" });
  } catch (error) {
    return { erreur: messageErreur(error) };
  }
  updateTag(TAG_ACTUALITES);
  redirect("/admin/actualites");
}
