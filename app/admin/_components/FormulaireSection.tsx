"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import type { Resultat } from "@/app/admin/actions";
import ChampImage from "@/app/admin/_components/ChampImage";
import Message from "@/app/admin/_components/Message";
import type { Section, ValeurAdmin } from "@/lib/contenu";

const CLASSE_CHAMP =
  "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-humanis-blue";

export default function FormulaireSection({
  section,
  valeurs,
  enregistrer,
}: {
  section: Section;
  valeurs: Record<string, ValeurAdmin>;
  enregistrer: (formData: FormData) => Promise<Resultat>;
}) {
  const router = useRouter();
  const [resultat, setResultat] = useState<Resultat>({});
  const [enCours, startTransition] = useTransition();

  function soumettre(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      setResultat(await enregistrer(formData));
      router.refresh();
    });
  }

  return (
    <form onSubmit={soumettre} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
      <h2 className="text-xl font-bold text-humanis-blue">{section.titre}</h2>

      {section.champs.map((champ) => {
        if (champ.type === "image") {
          return (
            <ChampImage
              key={champ.cle}
              cle={champ.cle}
              label={champ.label}
              aide={champ.aide}
              image={valeurs[champ.cle]?.image ?? null}
            />
          );
        }

        const valeur = valeurs[champ.cle]?.valeur || champ.defaut;
        return (
          <label key={champ.cle} className="block">
            <span className="block text-sm font-bold text-gray-700 mb-1">{champ.label}</span>
            {champ.type === "paragraphe" || champ.type === "liste" ? (
              <textarea
                name={champ.cle}
                defaultValue={valeur}
                rows={champ.type === "liste" ? 4 : 3}
                className={CLASSE_CHAMP}
              />
            ) : (
              <input
                name={champ.cle}
                type={champ.type === "lien" ? "url" : champ.type === "email" ? "email" : "text"}
                defaultValue={valeur}
                className={CLASSE_CHAMP}
              />
            )}
            {champ.aide && <span className="block text-xs text-gray-500 mt-1">{champ.aide}</span>}
          </label>
        );
      })}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={enCours}
          className="bg-humanis-blue text-white font-bold py-2 px-6 rounded-full hover:opacity-90 disabled:opacity-60"
        >
          {enCours ? "Enregistrement…" : "Enregistrer"}
        </button>
        <Message {...resultat} />
      </div>
    </form>
  );
}
