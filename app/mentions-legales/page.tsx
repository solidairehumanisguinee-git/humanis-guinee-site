import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Humanis Guinée Solidarité",
};

export default function MentionsLegales() {
  return (
    <section className="py-24 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-humanis-blue mb-10 text-center">
        Mentions légales
      </h1>
      <div className="bg-white p-10 rounded-2xl shadow-sm text-gray-700 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Éditeur du site</h2>
          <p>
            Ce site est édité par l&apos;association <strong>Humanis Guinée Solidarité</strong>,
            association loi 1901, immatriculée sous le numéro RNA{" "}
            <strong>W332037673</strong>, dont le siège social est situé au 3 rue Rosa Bonheur,
            33140 Cadaujac (France).
          </p>
          <p className="mt-2">
            Contact :{" "}
            <a href="mailto:solidairehumanisguinee@gmail.com" className="text-humanis-blue hover:underline">
              solidairehumanisguinee@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Directeur de la publication</h2>
          <p>Mohamed Bah, Président de l&apos;association.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis —{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-humanis-blue hover:underline"
            >
              vercel.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Nom de domaine</h2>
          <p>
            Le nom de domaine humanisguinee.fr est déposé auprès de OVH SAS, société au capital
            de 50 000 000 €, RCS Lille Métropole 424 761 419 00045, dont le siège social est
            situé 2 rue Kellermann, 59100 Roubaix, France —{" "}
            <a
              href="https://www.ovhcloud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-humanis-blue hover:underline"
            >
              ovhcloud.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, logo, images, mise en
            page) est la propriété de l&apos;association Humanis Guinée Solidarité, sauf mention
            contraire, et ne peut être reproduit sans autorisation préalable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Liens externes</h2>
          <p>
            Ce site propose des liens vers des services tiers indépendants : formulaire de
            candidature bénévole (Airtable Inc.) et plateforme de don (HelloAsso). Ces services
            disposent de leurs propres conditions d&apos;utilisation et politiques de
            confidentialité, sur lesquelles l&apos;association n&apos;a pas de contrôle.
          </p>
        </div>
      </div>
    </section>
  );
}
