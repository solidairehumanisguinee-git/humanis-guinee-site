import Link from "next/link";
import { notFound } from "next/navigation";
import FormulaireActualite from "@/app/admin/_components/FormulaireActualite";
import { exigerAdmin } from "@/lib/admin";
import { getActualiteAdmin } from "@/lib/airtable";

export default async function ModifierActualite({ params }: PageProps<"/admin/actualites/[id]">) {
  await exigerAdmin();
  const { id } = await params;
  const actualite = await getActualiteAdmin(id);
  if (!actualite) {
    notFound();
  }

  return (
    <>
      <Link href="/admin/actualites" className="text-humanis-blue font-bold text-sm hover:underline">
        ← Toutes les actualités
      </Link>
      <h1 className="text-3xl font-bold text-humanis-blue mt-4 mb-8">Modifier l&apos;actualité</h1>
      <FormulaireActualite key={actualite.id} actualite={actualite} />
    </>
  );
}
