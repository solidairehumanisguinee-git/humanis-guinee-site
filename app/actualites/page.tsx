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
              {actu.photoUrls.length > 0 && (
                <div className="relative">
                  <img
                    src={actu.photoUrls[0]}
                    alt={actu.titre}
                    className="w-full h-48 object-cover"
                  />
                  {actu.photoUrls.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
                      +{actu.photoUrls.length - 1} photo{actu.photoUrls.length > 2 ? "s" : ""}
                    </span>
                  )}
                </div>
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
