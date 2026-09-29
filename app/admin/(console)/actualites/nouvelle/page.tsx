import Link from "next/link";
import FormulaireActualite from "@/app/admin/_components/FormulaireActualite";

export default function NouvelleActualite() {
  return (
    <>
      <Link href="/admin/actualites" className="text-humanis-blue font-bold text-sm hover:underline">
        ← Toutes les actualités
      </Link>
      <h1 className="text-3xl font-bold text-humanis-blue mt-4 mb-8">Nouvelle actualité</h1>
      <FormulaireActualite actualite={null} />
    </>
  );
}
