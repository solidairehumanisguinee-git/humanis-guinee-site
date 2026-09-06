import type { Metadata } from "next";
import Link from "next/link";
import { getActualites } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Actualités | Humanis Guinée Solidarité",
};

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Actualites() {
  const actualites = await getActualites();

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-humanis-blue mb-4 text-center">Actualités</h1>
      <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
        Suivez les actions de l&apos;association, à Bordeaux comme en Guinée.
      </p>

      {actualites.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune actualité publiée pour le moment — revenez bientôt.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {actualites.map((actu) => (
            <Link
              key={actu.id}
              href={`/actualites/${actu.id}`}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              {actu.photoUrl && (
                <img
                  src={actu.photoUrl}
                  alt={actu.titre}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-humanis-yellow font-bold mb-2">
                  {formatDate(actu.date)}
                </p>
                <h2 className="text-xl font-bold text-humanis-blue mb-3">{actu.titre}</h2>
                <p className="text-gray-600 flex-1">{actu.resume}</p>
                <span className="mt-4 text-humanis-blue font-bold text-sm">Lire la suite →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
