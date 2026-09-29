import Link from "next/link";

const CARTES = [
  {
    href: "/admin/textes",
    titre: "Textes & photos",
    texte: "Modifier les textes, les liens et les photos de la page d'accueil.",
  },
  {
    href: "/admin/actualites",
    titre: "Actualités",
    texte: "Publier, modifier ou supprimer une actualité, avec photos et vidéos.",
  },
  {
    href: "/admin/benevoles",
    titre: "Bénévoles",
    texte: "Consulter les candidatures reçues via le formulaire « Devenir bénévole ».",
  },
];

export default function Accueil() {
  return (
    <>
      <h1 className="text-3xl font-bold text-humanis-blue mb-2">Bienvenue</h1>
      <p className="text-gray-600 mb-8">Que voulez-vous faire ?</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {CARTES.map((carte) => (
          <Link
            key={carte.href}
            href={carte.href}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border-t-4 border-humanis-yellow"
          >
            <h2 className="text-xl font-bold text-humanis-blue mb-2">{carte.titre}</h2>
            <p className="text-gray-600 text-sm">{carte.texte}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
