import Link from "next/link";
import { ErreurChargement } from "@/app/admin/_components/Message";
import { exigerAdmin } from "@/lib/admin";
import { getToutesActualites, type Actualite } from "@/lib/airtable";

function formatDate(date: string | null) {
  if (!date) return "Sans date";
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function Actualites() {
  await exigerAdmin();

  let actualites: Actualite[];
  try {
    actualites = await getToutesActualites();
  } catch (error) {
    return <ErreurChargement quoi="les actualités" detail={String(error)} />;
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-humanis-blue">Actualités</h1>
        <Link
          href="/admin/actualites/nouvelle"
          className="bg-humanis-red text-white font-bold py-2 px-6 rounded-full hover:opacity-90"
        >
          + Nouvelle actualité
        </Link>
      </div>

      {actualites.length === 0 ? (
        <p className="text-gray-600">Aucune actualité pour le moment.</p>
      ) : (
        <ul className="space-y-3">
          {actualites.map((actu) => {
            const vignette = actu.medias.find((m) => !m.isVideo);
            return (
              <li key={actu.id}>
                <Link
                  href={`/admin/actualites/${actu.id}`}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition"
                >
                  {vignette ? (
                    <img src={vignette.url} alt="" className="h-16 w-20 object-cover rounded-lg shrink-0" />
                  ) : (
                    <span className="h-16 w-20 rounded-lg bg-slate-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-humanis-blue truncate">{actu.titre}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(actu.date)} · {actu.medias.length} média{actu.medias.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${actu.publie ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"}`}
                  >
                    {actu.publie ? "Publiée" : "Brouillon"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
