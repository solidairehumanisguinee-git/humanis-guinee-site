"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { enregistrerActualite, envoyerMediaActualite, supprimerActualite } from "@/app/admin/actions";
import Message from "@/app/admin/_components/Message";
import type { Actualite } from "@/lib/airtable";
import { compresserImage, MESSAGE_TROP_LOURD, TAILLE_MAX } from "@/lib/fichiers";

const CLASSE_CHAMP =
  "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-humanis-blue";

type NouveauFichier = { fichier: File; apercu: string };

export default function FormulaireActualite({ actualite }: { actualite: Actualite | null }) {
  const router = useRouter();
  const [enCours, startTransition] = useTransition();
  const [etape, setEtape] = useState("");
  const [erreur, setErreur] = useState("");
  const [retires, setRetires] = useState<string[]>([]);
  const [nouveaux, setNouveaux] = useState<NouveauFichier[]>([]);

  // Libère les aperçus locaux en quittant la page.
  const apercus = useRef<string[]>([]);
  useEffect(() => () => apercus.current.forEach((url) => URL.revokeObjectURL(url)), []);

  function ajouterFichiers(event: ChangeEvent<HTMLInputElement>) {
    const fichiers = Array.from(event.target.files ?? []);
    event.target.value = "";
    const ajouts = fichiers.map((fichier) => ({ fichier, apercu: URL.createObjectURL(fichier) }));
    apercus.current.push(...ajouts.map((a) => a.apercu));
    setNouveaux((liste) => [...liste, ...ajouts]);
  }

  function soumettre(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setErreur("");

    startTransition(async () => {
      setEtape("Enregistrement du texte…");
      const resultat = await enregistrerActualite(actualite?.id ?? null, formData);
      if (resultat.erreur || !resultat.id) {
        setErreur(resultat.erreur ?? "Enregistrement impossible.");
        setEtape("");
        return;
      }

      const echecs: string[] = [];
      for (const [i, { fichier }] of nouveaux.entries()) {
        setEtape(`Envoi des fichiers (${i + 1}/${nouveaux.length})…`);
        const compresse = await compresserImage(fichier);
        if (compresse.size > TAILLE_MAX) {
          echecs.push(`${fichier.name} : ${MESSAGE_TROP_LOURD}`);
          continue;
        }
        const donnees = new FormData();
        donnees.append("fichier", compresse);
        const envoi = await envoyerMediaActualite(resultat.id, donnees);
        if (envoi.erreur) echecs.push(`${fichier.name} : ${envoi.erreur}`);
      }

      setEtape("");
      if (echecs.length > 0) {
        // Le texte est enregistré : on reste sur la fiche pour pouvoir réessayer les fichiers.
        setNouveaux([]);
        setErreur(`L'actualité est enregistrée, mais certains fichiers n'ont pas pu être envoyés :\n${echecs.join("\n")}`);
        router.replace(`/admin/actualites/${resultat.id}`);
        router.refresh();
        return;
      }
      router.push("/admin/actualites");
      router.refresh();
    });
  }

  function supprimer() {
    if (!actualite || !confirm(`Supprimer définitivement « ${actualite.titre} » ?`)) return;
    startTransition(async () => {
      const resultat = await supprimerActualite(actualite.id);
      if (resultat?.erreur) setErreur(resultat.erreur);
    });
  }

  const existants = actualite?.medias ?? [];

  return (
    <form onSubmit={soumettre} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <label className="block">
        <span className="block text-sm font-bold text-gray-700 mb-1">Titre *</span>
        <input name="titre" required defaultValue={actualite?.titre ?? ""} className={CLASSE_CHAMP} />
      </label>

      <label className="block">
        <span className="block text-sm font-bold text-gray-700 mb-1">Date</span>
        <input
          name="date"
          type="date"
          defaultValue={actualite?.date ?? new Date().toISOString().slice(0, 10)}
          className={CLASSE_CHAMP}
        />
      </label>

      <label className="block">
        <span className="block text-sm font-bold text-gray-700 mb-1">Résumé</span>
        <textarea name="resume" rows={2} defaultValue={actualite?.resume ?? ""} className={CLASSE_CHAMP} />
        <span className="block text-xs text-gray-500 mt-1">Une ou deux phrases, affichées dans la liste des actualités.</span>
      </label>

      <label className="block">
        <span className="block text-sm font-bold text-gray-700 mb-1">Contenu</span>
        <textarea name="contenu" rows={8} defaultValue={actualite?.contenu ?? ""} className={CLASSE_CHAMP} />
      </label>

      <fieldset>
        <legend className="block text-sm font-bold text-gray-700 mb-2">Photos et vidéos</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {existants.map((media) => {
            const retire = retires.includes(media.id);
            return (
              <div key={media.id} className="relative">
                {!retire && <input type="hidden" name="garder" value={media.id} />}
                {media.isVideo ? (
                  <video src={media.url} muted preload="metadata" className={`w-full aspect-square object-cover rounded-lg ${retire ? "opacity-30" : ""}`} />
                ) : (
                  <img src={media.url} alt="" className={`w-full aspect-square object-cover rounded-lg ${retire ? "opacity-30" : ""}`} />
                )}
                <button
                  type="button"
                  onClick={() =>
                    setRetires((liste) => (retire ? liste.filter((id) => id !== media.id) : [...liste, media.id]))
                  }
                  className="absolute top-1 right-1 bg-white/90 text-xs font-bold px-2 py-1 rounded-full shadow"
                >
                  {retire ? "Annuler" : "Retirer"}
                </button>
              </div>
            );
          })}
          {nouveaux.map((n, i) => (
            <div key={n.apercu} className="relative">
              {n.fichier.type.startsWith("video/") ? (
                <video src={n.apercu} muted className="w-full aspect-square object-cover rounded-lg ring-2 ring-humanis-yellow" />
              ) : (
                <img src={n.apercu} alt="" className="w-full aspect-square object-cover rounded-lg ring-2 ring-humanis-yellow" />
              )}
              <button
                type="button"
                onClick={() => setNouveaux((liste) => liste.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-white/90 text-xs font-bold px-2 py-1 rounded-full shadow"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
        <label className="inline-block cursor-pointer bg-humanis-yellow text-humanis-blue font-bold text-sm py-2 px-4 rounded-full hover:opacity-90">
          + Ajouter des photos ou vidéos
          <input type="file" accept="image/*,video/*" multiple onChange={ajouterFichiers} className="sr-only" />
        </label>
        <span className="block text-xs text-gray-500 mt-2">
          Les photos sont automatiquement réduites. Vidéos : 4 Mo maximum. Les nouveaux fichiers (encadrés en jaune)
          sont envoyés à l&apos;enregistrement.
        </span>
      </fieldset>

      <label className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
        <input type="checkbox" name="publie" defaultChecked={actualite?.publie ?? false} className="w-5 h-5" />
        <span>
          <span className="font-bold text-gray-700">Publier sur le site</span>
          <span className="block text-xs text-gray-500">Décoché, l&apos;actualité reste un brouillon invisible des visiteurs.</span>
        </span>
      </label>

      {erreur && <div className="whitespace-pre-line"><Message erreur={erreur} /></div>}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={enCours}
          className="bg-humanis-blue text-white font-bold py-2 px-6 rounded-full hover:opacity-90 disabled:opacity-60"
        >
          {enCours ? etape || "Patientez…" : "Enregistrer"}
        </button>
        {actualite && (
          <button
            type="button"
            onClick={supprimer}
            disabled={enCours}
            className="ml-auto text-sm text-humanis-red hover:underline disabled:opacity-60"
          >
            Supprimer l&apos;actualité
          </button>
        )}
      </div>
    </form>
  );
}
