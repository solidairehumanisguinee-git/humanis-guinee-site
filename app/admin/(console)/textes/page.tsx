import { enregistrerSection } from "@/app/admin/actions";
import { ErreurChargement } from "@/app/admin/_components/Message";
import FormulaireSection from "@/app/admin/_components/FormulaireSection";
import { exigerAdmin } from "@/lib/admin";
import { getContenuAdmin, SECTIONS, type ValeurAdmin } from "@/lib/contenu";

export default async function Textes() {
  await exigerAdmin();

  let valeurs: Record<string, ValeurAdmin>;
  try {
    valeurs = await getContenuAdmin();
  } catch (error) {
    return <ErreurChargement quoi="les textes du site (table « Contenu »)" detail={String(error)} />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-humanis-blue mb-2">Textes & photos</h1>
      <p className="text-gray-600 mb-8">
        Modifiez un champ puis cliquez sur « Enregistrer » en bas de la section. Si vous videz un champ, le texte
        d&apos;origine revient. Les photos sont envoyées dès que vous les choisissez.
      </p>
      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <FormulaireSection
            key={section.id}
            section={section}
            valeurs={valeurs}
            enregistrer={enregistrerSection.bind(null, section.id)}
          />
        ))}
      </div>
    </>
  );
}
