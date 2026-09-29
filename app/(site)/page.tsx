import Image from "next/image";
import { FlagFR, FlagGN } from "@/components/FlagIcon";
import { FacebookIcon, TikTokIcon, InstagramIcon } from "@/components/SocialIcons";
import TexteRiche, { lignes } from "@/components/TexteRiche";
import { getContenu } from "@/lib/contenu";
import logo from "@/public/logo.png";

export default async function Home() {
  const c = await getContenu();

  return (
    <>
      {/* HERO */}
      <section
        id="accueil"
        className="relative scroll-mt-20 min-h-[80vh] flex items-center justify-center bg-humanis-blue text-center px-4"
      >
        {c["accueil.image"] && (
          <>
            <img
              src={c["accueil.image"]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-humanis-blue/75" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto">
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
            {c["accueil.surtitre"]}
          </h2>
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-8">
            {c["accueil.titre"]}
          </h1>
          <p className="text-xl text-gray-200 mb-10 whitespace-pre-line">{c["accueil.texte"]}</p>
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
        <h2 className="text-4xl font-bold text-humanis-blue mb-12">{c["actions.titre"]}</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-humanis-blue flex flex-col items-center overflow-hidden">
            {c["bordeaux.image"] && (
              <img src={c["bordeaux.image"]} alt={c["bordeaux.titre"]} className="w-full h-56 object-cover" />
            )}
            <div className="p-10 flex flex-col items-center w-full">
              <h3 className="text-3xl font-bold text-humanis-blue mb-6 flex items-center justify-center gap-3">
                <FlagFR className="w-8 h-6 rounded-sm shadow-sm" />
                {c["bordeaux.titre"]}
              </h3>
              <p className="text-gray-600 mb-6 text-lg whitespace-pre-line">{c["bordeaux.texte"]}</p>
              <ul className="text-left space-y-3 w-full text-gray-700 font-medium">
                {lignes(c["bordeaux.points"]).map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-humanis-red flex flex-col items-center overflow-hidden">
            {c["guinee.image"] && (
              <img src={c["guinee.image"]} alt={c["guinee.titre"]} className="w-full h-56 object-cover" />
            )}
            <div className="p-10 flex flex-col items-center w-full">
              <h3 className="text-3xl font-bold text-humanis-red mb-6 flex items-center justify-center gap-3">
                <FlagGN className="w-8 h-6 rounded-sm shadow-sm" />
                {c["guinee.titre"]}
              </h3>
              <p className="text-gray-600 mb-6 text-lg whitespace-pre-line">{c["guinee.texte"]}</p>
              <ul className="text-left space-y-3 w-full text-gray-700 font-medium">
                {lignes(c["guinee.points"]).map((point) => (
                  <li key={point}>✓ {point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DONS */}
      <section id="dons" className="scroll-mt-20 py-24 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-humanis-blue mb-6">{c["dons.titre"]}</h2>
          <p className="text-xl text-gray-600 mb-12">{c["dons.texte"]}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-yellow">
              <h4 className="text-4xl font-bold text-humanis-yellow mb-4">{c["dons.montant1"]}</h4>
              <p className="text-gray-700 font-medium">{c["dons.texte1"]}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-blue">
              <h4 className="text-4xl font-bold text-humanis-blue mb-4">{c["dons.montant2"]}</h4>
              <p className="text-gray-700 font-medium">{c["dons.texte2"]}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-humanis-red">
              <h4 className="text-4xl font-bold text-humanis-red mb-4">{c["dons.montant3"]}</h4>
              <p className="text-gray-700 font-medium">{c["dons.texte3"]}</p>
            </div>
          </div>
          <a
            href={c["dons.lien"]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-humanis-red text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-transform hover:scale-105 inline-block"
          >
            {c["dons.bouton"]}
          </a>
        </div>
      </section>

      {/* A PROPOS */}
      <section id="a-propos" className="scroll-mt-20 py-24 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-humanis-blue mb-10">{c["histoire.titre"]}</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {c["histoire.image"] && (
            <img src={c["histoire.image"]} alt="" className="w-full h-64 object-cover" />
          )}
          <div className="p-10 text-lg text-gray-700 text-left space-y-6">
            <p className="whitespace-pre-line">
              <TexteRiche texte={c["histoire.texte"]} grasClassName="text-humanis-blue" />
            </p>
            <ul className="space-y-4 mt-8">
              {lignes(c["histoire.valeurs"]).map((valeur) => (
                <li key={valeur}>
                  <TexteRiche texte={valeur} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 py-24 bg-humanis-blue text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-12">{c["contact.titre"]}</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-10 rounded-2xl text-left backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-humanis-yellow">Nous contacter</h3>
            <p className="mb-2">
              <strong>Email :</strong>{" "}
              <a href={`mailto:${c["contact.email"]}`} className="hover:underline">
                {c["contact.email"]}
              </a>
            </p>
            <p className="mb-8">
              <strong>Siège :</strong> {c["contact.siege"]}
            </p>
            <p className="text-gray-300 text-sm mb-4">Suivez-nous :</p>
            <div className="flex gap-4">
              <a
                href={c["contact.facebook"]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-humanis-yellow hover:text-humanis-blue transition"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={c["contact.tiktok"]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-humanis-yellow hover:text-humanis-blue transition"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href={c["contact.instagram"]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-humanis-yellow hover:text-humanis-blue transition"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="bg-white/10 p-10 rounded-2xl flex flex-col justify-center items-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-humanis-yellow">Devenir Bénévole</h3>
            <p className="mb-8 text-center text-gray-200">{c["benevole.texte"]}</p>
            <a
              href={c["benevole.lien"]}
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
