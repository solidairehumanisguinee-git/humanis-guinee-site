import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Humanis Guinée Solidarité",
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="py-24 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-humanis-blue mb-10 text-center">
        Politique de confidentialité
      </h1>
      <div className="bg-white p-10 rounded-2xl shadow-sm text-gray-700 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Qui sommes-nous</h2>
          <p>
            Ce site est édité par l&apos;association Humanis Guinée Solidarité (association loi
            1901, RNA W332037673), 3 rue Rosa Bonheur, 33140 Cadaujac. Pour toute question
            relative à vos données personnelles, contactez-nous à{" "}
            <a href="mailto:contact@humanisguinee.fr" className="text-humanis-blue hover:underline">
              contact@humanisguinee.fr
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Données collectées</h2>
          <p>
            Ce site n&apos;utilise pas de compte utilisateur, de newsletter ni de cookie de
            suivi, et ne collecte donc aucune donnée personnelle directement.
          </p>
          <p className="mt-2">
            Si vous remplissez le formulaire <strong>« Devenir Bénévole »</strong>, vous êtes
            redirigé(e) vers un formulaire hébergé par Airtable, où nous collectons : nom
            complet, email, téléphone, zone d&apos;action souhaitée, disponibilités et message de
            motivation.
          </p>
          <p className="mt-2">
            Si vous faites un don via le bouton <strong>« Faire un don »</strong>, vous êtes
            redirigé(e) vers la plateforme HelloAsso, qui collecte les informations nécessaires
            au paiement. L&apos;association n&apos;a jamais accès à vos données bancaires,
            gérées exclusivement par HelloAsso.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Finalité du traitement</h2>
          <p>
            Les données du formulaire bénévole sont utilisées uniquement pour évaluer et
            organiser les candidatures de bénévolat, et pour vous recontacter à ce sujet.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Base légale</h2>
          <p>Le traitement repose sur votre consentement, donné librement en soumettant le formulaire.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Durée de conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre candidature,
            et au maximum 24 mois après votre dernier contact avec l&apos;association, sauf
            demande de suppression anticipée de votre part.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Destinataires des données</h2>
          <p>
            Seuls les membres habilités de l&apos;association ont accès aux données collectées.
            Elles ne sont ni vendues ni transmises à des tiers à des fins commerciales.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">
            Sous-traitants et transferts hors UE
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Airtable Inc. (hébergement du formulaire bénévole) — société américaine.</li>
            <li>HelloAsso (plateforme de don) — société française.</li>
            <li>Vercel Inc. (hébergement du site) — société américaine.</li>
            <li>
              OVH SAS (réservation du nom de domaine humanisguinee.fr) — société française ; OVH
              n&apos;a accès à aucune donnée des visiteurs du site, son rôle se limite à la
              gestion technique du nom de domaine.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, de limitation et d&apos;opposition concernant vos données. Pour
            exercer ces droits, contactez-nous à{" "}
            <a href="mailto:contact@humanisguinee.fr" className="text-humanis-blue hover:underline">
              contact@humanisguinee.fr
            </a>
            . Vous pouvez également introduire une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-humanis-blue hover:underline"
            >
              CNIL
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-humanis-blue mb-2">Cookies</h2>
          <p>
            Ce site n&apos;utilise actuellement aucun cookie de suivi ou de mesure
            d&apos;audience. Cette politique sera mise à jour si cela évolue.
          </p>
        </div>
      </div>
    </section>
  );
}
