import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActualite } from "@/lib/airtable";

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const actu = await getActualite(id);
  if (!actu) return { title: "Actualités | Humanis Guinée Solidarité" };
  return {
    title: `${actu.titre} | Humanis Guinée Solidarité`,
    description: actu.resume,
  };
}

export default async function ActualitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actu = await getActualite(id);

  if (!actu) {
    notFound();
  }

  return (
    <article className="py-24 max-w-3xl mx-auto px-4">
      <Link href="/actualites" className="text-humanis-blue font-bold text-sm hover:underline">
        ← Toutes les actualités
      </Link>

      <p className="text-sm text-humanis-yellow font-bold mt-8 mb-2">{formatDate(actu.date)}</p>
      <h1 className="text-4xl font-bold text-humanis-blue mb-8">{actu.titre}</h1>

      {actu.photoUrl && (
        <img
          src={actu.photoUrl}
          alt={actu.titre}
          className="w-full rounded-2xl shadow-sm mb-10 max-h-[420px] object-cover"
        />
      )}

      <div className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
        {actu.contenu}
      </div>
    </article>
  );
}
