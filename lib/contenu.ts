import {
  airtable,
  listRecords,
  mediaUrl,
  type AirtableAttachment,
  type AirtableRecord,
} from "@/lib/airtable";

// Textes et images de la page d'accueil, modifiables depuis /admin/textes.
// Chaque champ est une ligne de la table Airtable « Contenu » (colonnes Clé, Valeur, Image).
// Tant qu'une valeur est vide ou absente d'Airtable, le site affiche la valeur par défaut.

export type TypeChamp = "texte" | "paragraphe" | "liste" | "lien" | "email" | "image";

export type Champ = {
  cle: string;
  label: string;
  type: TypeChamp;
  defaut: string;
  aide?: string;
};

export type Section = { id: string; titre: string; champs: readonly Champ[] };

const AIDE_GRAS = "Entourez un mot de **deux étoiles** pour l'écrire en gras.";
const AIDE_LISTE = "Un élément par ligne.";

export const SECTIONS = [
  {
    id: "accueil",
    titre: "Accueil (bandeau du haut)",
    champs: [
      { cle: "accueil.surtitre", label: "Petit titre (en jaune)", type: "texte", defaut: "Deux pays — Un seul engagement" },
      { cle: "accueil.titre", label: "Grand titre", type: "texte", defaut: "La solidarité n'a pas de frontières." },
      {
        cle: "accueil.texte",
        label: "Texte d'introduction",
        type: "paragraphe",
        defaut: "Parce que l'entraide commence ici à Bordeaux, et agit aussi là-bas en Guinée.",
      },
      {
        cle: "accueil.image",
        label: "Photo de fond",
        type: "image",
        defaut: "",
        aide: "Optionnelle. Sans photo, le fond reste bleu. Une photo en largeur (paysage) rend mieux.",
      },
    ],
  },
  {
    id: "actions",
    titre: "Nos actions",
    champs: [
      { cle: "actions.titre", label: "Titre de la section", type: "texte", defaut: "Nos Actions Sur Le Terrain" },
      { cle: "bordeaux.titre", label: "Bordeaux — titre", type: "texte", defaut: "À Bordeaux" },
      {
        cle: "bordeaux.texte",
        label: "Bordeaux — description",
        type: "paragraphe",
        defaut:
          "Nous agissons localement par l'entraide citoyenne. Nous accompagnons les nouveaux arrivants dans leur intégration et proposons une assistance sociale.",
      },
      {
        cle: "bordeaux.points",
        label: "Bordeaux — liste des actions",
        type: "liste",
        defaut: "Bénévolat citoyen actif\nAide aux démarches administratives\nAccompagnement social",
        aide: AIDE_LISTE,
      },
      { cle: "bordeaux.image", label: "Bordeaux — photo", type: "image", defaut: "", aide: "Optionnelle." },
      { cle: "guinee.titre", label: "Guinée — titre", type: "texte", defaut: "En Guinée" },
      {
        cle: "guinee.texte",
        label: "Guinée — description",
        type: "paragraphe",
        defaut:
          "Nous apportons une aide vitale. Nous finançons l'accès à l'eau potable dans les villages isolés et soutenons activement les orphelinats et la scolarisation.",
      },
      {
        cle: "guinee.points",
        label: "Guinée — liste des actions",
        type: "liste",
        defaut: "Construction de forages (Eau)\nSoutien matériel aux orphelinats\nAide à la scolarisation",
        aide: AIDE_LISTE,
      },
      { cle: "guinee.image", label: "Guinée — photo", type: "image", defaut: "", aide: "Optionnelle." },
    ],
  },
  {
    id: "dons",
    titre: "Dons",
    champs: [
      { cle: "dons.titre", label: "Titre de la section", type: "texte", defaut: "Faites vivre la solidarité" },
      {
        cle: "dons.texte",
        label: "Texte d'introduction",
        type: "paragraphe",
        defaut: "Votre don finance directement nos actions. Choisissez votre impact :",
      },
      { cle: "dons.montant1", label: "Carte 1 — montant", type: "texte", defaut: "30 €" },
      {
        cle: "dons.texte1",
        label: "Carte 1 — ce que ça finance",
        type: "paragraphe",
        defaut: "Finance du matériel éducatif et des repas pour un orphelinat en Guinée.",
      },
      { cle: "dons.montant2", label: "Carte 2 — montant", type: "texte", defaut: "50 €" },
      {
        cle: "dons.texte2",
        label: "Carte 2 — ce que ça finance",
        type: "paragraphe",
        defaut: "Soutient nos actions locales d'assistance et d'intégration à Bordeaux.",
      },
      { cle: "dons.montant3", label: "Carte 3 — montant", type: "texte", defaut: "100 €" },
      {
        cle: "dons.texte3",
        label: "Carte 3 — ce que ça finance",
        type: "paragraphe",
        defaut: "Participe activement à la construction d'un forage pour un village.",
      },
      { cle: "dons.bouton", label: "Texte du bouton", type: "texte", defaut: "Faire un don sécurisé (HelloAsso)" },
      {
        cle: "dons.lien",
        label: "Lien du formulaire HelloAsso",
        type: "lien",
        defaut: "https://www.helloasso.com/associations/humanis-guinee-solidarite/formulaires/1",
      },
    ],
  },
  {
    id: "histoire",
    titre: "Notre histoire",
    champs: [
      { cle: "histoire.titre", label: "Titre de la section", type: "texte", defaut: "Notre Histoire" },
      {
        cle: "histoire.texte",
        label: "Texte",
        type: "paragraphe",
        defaut:
          "Fondée le **13 décembre 2025** à Cadaujac (Bordeaux), **Humanis Guinée Solidarité** est née d'une conviction profonde : la solidarité ne doit connaître aucune frontière.",
        aide: AIDE_GRAS,
      },
      {
        cle: "histoire.valeurs",
        label: "Nos valeurs",
        type: "liste",
        defaut:
          "**✦ La Transparence :** Chaque action, chaque don est tracé.\n**✦ L'Inclusion :** Aider les nouveaux arrivants en France.\n**✦ L'Humanité :** Apporter l'eau et l'éducation aux orphelins en Guinée.",
        aide: `${AIDE_LISTE} ${AIDE_GRAS}`,
      },
      { cle: "histoire.image", label: "Photo", type: "image", defaut: "", aide: "Optionnelle — affichée au-dessus du texte." },
    ],
  },
  {
    id: "contact",
    titre: "Contact & bénévolat",
    champs: [
      { cle: "contact.titre", label: "Titre de la section", type: "texte", defaut: "Rejoignez le mouvement" },
      { cle: "contact.email", label: "Email de contact", type: "email", defaut: "contact@humanisguinee.fr" },
      { cle: "contact.siege", label: "Siège", type: "texte", defaut: "Cadaujac, Bordeaux (France)" },
      {
        cle: "contact.facebook",
        label: "Lien Facebook",
        type: "lien",
        defaut: "https://www.facebook.com/profile.php?id=61593583510607",
      },
      { cle: "contact.tiktok", label: "Lien TikTok", type: "lien", defaut: "https://www.tiktok.com/@asso.humanis.guin" },
      {
        cle: "contact.instagram",
        label: "Lien Instagram",
        type: "lien",
        defaut: "https://www.instagram.com/humanisguineesolidarite",
      },
      {
        cle: "benevole.texte",
        label: "Bénévolat — texte",
        type: "paragraphe",
        defaut: "Vous avez du temps à partager à Bordeaux ou ailleurs ? Rejoignez l'équipe.",
      },
      {
        cle: "benevole.lien",
        label: "Bénévolat — lien du formulaire",
        type: "lien",
        defaut: "https://airtable.com/appnyC5r7ZozZv90q/shrfMxVfQpVkC9zJI",
      },
    ],
  },
] as const satisfies readonly Section[];

export type Cle = (typeof SECTIONS)[number]["champs"][number]["cle"];
export type Contenu = Record<Cle, string>;

export const TABLE_CONTENU = "Contenu";
export const TAG_CONTENU = "contenu";

type ContenuFields = { Clé?: string; Valeur?: string; Image?: AirtableAttachment[] };

export const TOUS_LES_CHAMPS: readonly Champ[] = SECTIONS.flatMap((s): readonly Champ[] => s.champs);

export function getChamp(cle: string): Champ | undefined {
  return TOUS_LES_CHAMPS.find((c) => c.cle === cle);
}

// Contenu affiché sur le site public : valeurs Airtable, sinon valeurs par défaut.
// Pour les images, la valeur est une URL (/media/...) ou "" s'il n'y en a pas.
export async function getContenu(): Promise<Contenu> {
  const contenu = Object.fromEntries(TOUS_LES_CHAMPS.map((c) => [c.cle, c.defaut])) as Contenu;
  if (!process.env.AIRTABLE_API_KEY) {
    return contenu;
  }

  try {
    const records = await listRecords<ContenuFields>(TABLE_CONTENU, {}, {
      next: { revalidate: 3600, tags: [TAG_CONTENU] },
    });
    for (const record of records) {
      const champ = getChamp(record.fields.Clé ?? "");
      if (!champ) continue;
      const cle = champ.cle as Cle;
      if (champ.type === "image") {
        const image = record.fields.Image?.[0];
        if (image) contenu[cle] = mediaUrl("contenu", record.id, image.id);
      } else if (record.fields.Valeur?.trim()) {
        contenu[cle] = record.fields.Valeur;
      }
    }
  } catch (error) {
    // Table absente ou Airtable indisponible : le site reste affiché avec les textes par défaut.
    console.error("Lecture du contenu Airtable impossible :", error);
  }

  return contenu;
}

export type ValeurAdmin = { recordId: string; valeur: string; image: { url: string; nom: string } | null };

// Valeurs brutes pour la console (sans valeurs par défaut, URL directes pour les aperçus).
export async function getContenuAdmin(): Promise<Record<string, ValeurAdmin>> {
  const records = await listRecords<ContenuFields>(TABLE_CONTENU, {}, { cache: "no-store" });
  const valeurs: Record<string, ValeurAdmin> = {};
  for (const record of records) {
    if (!record.fields.Clé) continue;
    const image = record.fields.Image?.[0];
    valeurs[record.fields.Clé] = {
      recordId: record.id,
      valeur: record.fields.Valeur ?? "",
      image: image ? { url: image.url, nom: image.filename ?? "photo" } : null,
    };
  }
  return valeurs;
}

// Crée ou met à jour des lignes de la table Contenu (par paquets de 10, limite Airtable).
// Retourne l'id Airtable de chaque clé.
export async function enregistrerLignes(
  lignes: { cle: string; champs: Omit<ContenuFields, "Clé"> }[]
): Promise<Record<string, string>> {
  const ids: Record<string, string> = {};
  for (let i = 0; i < lignes.length; i += 10) {
    const paquet = lignes.slice(i, i + 10);
    const res = await airtable<{ records: AirtableRecord<ContenuFields>[] }>(encodeURIComponent(TABLE_CONTENU), {
      method: "PATCH",
      body: JSON.stringify({
        performUpsert: { fieldsToMergeOn: ["Clé"] },
        typecast: true,
        records: paquet.map((l) => ({ fields: { Clé: l.cle, ...l.champs } })),
      }),
    });
    for (const record of res.records) {
      if (record.fields.Clé) ids[record.fields.Clé] = record.id;
    }
  }
  return ids;
}
