import { ErreurChargement } from "@/app/admin/_components/Message";
import { exigerAdmin } from "@/lib/admin";
import { getCandidatures, type Candidature } from "@/lib/benevoles";

export default async function Benevoles() {
  await exigerAdmin();

  let candidatures: Candidature[];
  try {
    candidatures = await getCandidatures();
  } catch (error) {
    return <ErreurChargement quoi="les candidatures (table « Bénévoles »)" detail={String(error)} />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-humanis-blue mb-2">Bénévoles</h1>
      <p className="text-gray-600 mb-8">
        {candidatures.length} candidature{candidatures.length > 1 ? "s" : ""} reçue
        {candidatures.length > 1 ? "s" : ""}, de la plus récente à la plus ancienne.
      </p>

      <div className="space-y-4">
        {candidatures.map((candidature) => (
          <article key={candidature.id} className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-xs font-bold text-humanis-yellow mb-3">
              Reçue le{" "}
              {new Date(candidature.recue).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <dl className="grid sm:grid-cols-[12rem_1fr] gap-x-4 gap-y-2 text-sm">
              {candidature.champs.map(([nom, valeur]) => (
                <div key={nom} className="contents">
                  <dt className="font-bold text-gray-700">{nom}</dt>
                  <dd className="text-gray-800 whitespace-pre-line break-words mb-2 sm:mb-0">
                    {typeof valeur === "string"
                      ? valeur
                      : valeur.map((fichier) => (
                          <a
                            key={fichier.url}
                            href={fichier.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-humanis-blue underline"
                          >
                            {fichier.nom}
                          </a>
                        ))}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
