"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ChangeEvent } from "react";
import { envoyerImageContenu, supprimerImageContenu, type Resultat } from "@/app/admin/actions";
import Message from "@/app/admin/_components/Message";
import { compresserImage, MESSAGE_TROP_LOURD, TAILLE_MAX } from "@/lib/fichiers";

// Photo de la page d'accueil : envoyée dès qu'elle est choisie, indépendamment du bouton
// « Enregistrer » de la section.
export default function ChampImage({
  cle,
  label,
  aide,
  image,
}: {
  cle: string;
  label: string;
  aide?: string;
  image: { url: string; nom: string } | null;
}) {
  const router = useRouter();
  const [resultat, setResultat] = useState<Resultat>({});
  const [enCours, startTransition] = useTransition();

  function choisir(event: ChangeEvent<HTMLInputElement>) {
    const fichier = event.target.files?.[0];
    event.target.value = "";
    if (!fichier) return;

    startTransition(async () => {
      const compresse = await compresserImage(fichier);
      if (compresse.size > TAILLE_MAX) {
        setResultat({ erreur: MESSAGE_TROP_LOURD });
        return;
      }
      const formData = new FormData();
      formData.append("fichier", compresse);
      setResultat(await envoyerImageContenu(cle, formData));
      router.refresh();
    });
  }

  function retirer() {
    if (!confirm("Retirer cette photo du site ?")) return;
    startTransition(async () => {
      setResultat(await supprimerImageContenu(cle));
      router.refresh();
    });
  }

  return (
    <div>
      <span className="block text-sm font-bold text-gray-700 mb-1">{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        {image ? (
          <img src={image.url} alt={label} className="h-24 w-36 object-cover rounded-lg border border-gray-200" />
        ) : (
          <span className="h-24 w-36 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
            Aucune photo
          </span>
        )}
        <div className="flex flex-col gap-2 items-start">
          <label
            className={`cursor-pointer bg-humanis-yellow text-humanis-blue font-bold text-sm py-2 px-4 rounded-full hover:opacity-90 ${enCours ? "pointer-events-none opacity-60" : ""}`}
          >
            {enCours ? "Envoi…" : image ? "Changer la photo" : "Ajouter une photo"}
            <input type="file" accept="image/*" onChange={choisir} className="sr-only" disabled={enCours} />
          </label>
          {image && (
            <button
              type="button"
              onClick={retirer}
              disabled={enCours}
              className="text-sm text-humanis-red hover:underline disabled:opacity-60"
            >
              Retirer la photo
            </button>
          )}
        </div>
      </div>
      {aide && <span className="block text-xs text-gray-500 mt-1">{aide}</span>}
      <div className="mt-2">
        <Message {...resultat} />
      </div>
    </div>
  );
}
