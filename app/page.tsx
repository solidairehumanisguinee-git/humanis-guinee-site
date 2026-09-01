import Image from "next/image";
import { FlagFR, FlagGN } from "@/components/FlagIcon";
import { FacebookIcon, TikTokIcon } from "@/components/SocialIcons";
import logo from "@/public/logo.png";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        id="accueil"
        className="scroll-mt-20 min-h-[80vh] flex items-center justify-center bg-humanis-blue text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <span className="relative w-52 h-32 rounded-2xl bg-white p-3 inline-block mb-6 shadow-lg">
            <Image
              src={logo}
              alt="Humanis Guinée Solidarité"
              fill
              className="object-contain p-1"
              priority
            />
          </span>
          <h2 className="text-humanis-yellow font-bold uppercase tracking-widest mb-4">
            Deux pays — Un seul engagement
          </h2>
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-8">
            La solidarité n&apos;a pas de frontières.
          </h1>
          <p className="text-xl text-gray-200 mb-10">
            Parce que l&apos;entraide commence ici à Bordeaux, et agit aussi là-bas en Guinée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#dons"
              className="bg-humanis-red text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition transform"
            >
              Faire un don
            </a>
            <a
              href="#actions"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-humanis-blue transition"
            >
              Découvrir nos projets
            </a>
          </div>
        </div>
      </section>

      {/* NOS ACTIONS */}
      <section id="actions" className="scroll-mt-20 py-24 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-humanis-blue mb-12">Nos Actions Sur Le Terrain</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-2xl shadow-lg border-t-8 border-humanis-blue flex flex-col items-center">
            <h3 className="text-3xl font-bold text-humanis-blue mb-6 flex items-center justify-center gap-3">
              <FlagFR className="w-8 h-6 rounded-sm shadow-sm" />
              À Bordeaux
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Nous agissons localement par l&apos;entraide citoyenne. Nous accompagnons les
              nouveaux arrivants dans leur intégration et proposons une assistance sociale.
            </p>
            <ul className="text-left space-y-3 w-full text-gray-700 font-medium">
              <li>✓ Bénévolat citoyen actif</li>
              <li>✓ Aide aux démarches administratives</li>
              <li>✓ Accompagnement social</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-2xl shadow-lg border-t-8 border-humanis-red flex flex-col items-center">
            <h3 className="text-3xl font-bold text-humanis-red mb-6 flex items-center justify-center gap-3">
              <FlagGN className="w-8 h-6 rounded-sm shadow-sm" />
              En Guinée
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Nous apportons une aide vitale. Nous finançons l&apos;accès à l&apos;eau potable
              dans les villages isolés et soutenons activement les orphelinats et la
              scolarisation.
            </p>
            <ul className="text-left space-y-3 w-full text-gray-700 font-medium">
              <li>✓ Construction de forages (Eau)</li>
              <li>✓ Soutien matériel aux orphelinats</li>
              <li>✓ Aide à la scolarisation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DONS */}
      <section id="dons" className="scroll-mt-20 py-24 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-humanis-blue mb-6">Faites vivre la solidarité</h2>
          <p className="text-xl text-gray-600 mb-12">
            Votre don finance directement nos actions. Choisissez votre impact :
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-yellow">
              <h4 className="text-4xl font-bold text-humanis-yellow mb-4">30 €</h4>
              <p className="text-gray-700 font-medium">
                Finance du matériel éducatif et des repas pour un orphelinat en Guinée.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-blue">
              <h4 className="text-4xl font-bold text-humanis-blue mb-4">50 €</h4>
              <p className="text-gray-700 font-medium">
                Soutient nos actions locales d&apos;assistance et d&apos;intégration à Bordeaux.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-red">
              <h4 className="text-4xl font-bold text-humanis-red mb-4">100 €</h4>
              <p className="text-gray-700 font-medium">
                Participe activement à la construction d&apos;un forage pour un village.
              </p>
            </div>
          </div>
          {/* TODO: remplacer par votre lien de collecte HelloAsso */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-humanis-red text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-transform hover:scale-105 inline-block"
          >
            Faire un don sécurisé (HelloAsso)
          </a>
        </div>
      </section>

      {/* A PROPOS */}
      <section id="a-propos" className="scroll-mt-20 py-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-humanis-blue mb-10">Notre Histoire</h2>
        <div className="bg-white p-10 rounded-2xl shadow-sm text-lg text-gray-700 text-left space-y-6">
          <p>
            Fondée le <strong className="text-humanis-blue">13 décembre 2025</strong> à Cadaujac
            (Bordeaux), <em>Humanis Guinée Solidarité</em> est née d&apos;une conviction
            profonde&nbsp;: la solidarité ne doit connaître aucune frontière.
          </p>
          <ul className="space-y-4 mt-8">
            <li>
              <strong>✦ La Transparence :</strong> Chaque action, chaque don est tracé.
            </li>
            <li>
              <strong>✦ L&apos;Inclusion :</strong> Aider les nouveaux arrivants en France.
            </li>
            <li>
              <strong>✦ L&apos;Humanité :</strong> Apporter l&apos;eau et l&apos;éducation aux
              orphelins en Guinée.
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 py-24 bg-humanis-blue text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-12">Rejoignez le mouvement</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-10 rounded-2xl text-left backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-humanis-yellow">Nous contacter</h3>
            <p className="mb-2">
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@humanisguinee.fr" className="hover:underline">
                contact@humanisguinee.fr
              </a>
            </p>
            <p className="mb-8">
              <strong>Siège :</strong> Cadaujac, Bordeaux (France)
            </p>
            <p className="text-gray-300 text-sm mb-4">Suivez-nous :</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61593583510607"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-humanis-yellow hover:text-humanis-blue transition"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@asso.humanis.guin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-humanis-yellow hover:text-humanis-blue transition"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="bg-white/10 p-10 rounded-2xl flex flex-col justify-center items-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-humanis-yellow">Devenir Bénévole</h3>
            <p className="mb-8 text-center text-gray-200">
              Vous avez du temps à partager à Bordeaux ou ailleurs ? Rejoignez l&apos;équipe.
            </p>
            <a
              href="https://airtable.com/appnyC5r7ZozZv90q/shrfMxVfQpVkC9zJI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-humanis-yellow text-humanis-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition"
            >
              Remplir le formulaire
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
