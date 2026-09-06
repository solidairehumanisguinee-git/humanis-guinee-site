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

      {actu.photoUrls.length === 1 && (
        <img
          src={actu.photoUrls[0]}
          alt={actu.titre}
          className="w-full rounded-2xl shadow-sm mb-10 max-h-[420px] object-cover"
        />
      )}

      {actu.photoUrls.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {actu.photoUrls.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={url}
                alt={`${actu.titre} — photo ${i + 1}`}
                className="w-full aspect-square object-cover hover:scale-105 transition"
              />
            </a>
          ))}
        </div>
      )}

      <div className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
        {actu.contenu}
      </div>
    </article>
  );
}
