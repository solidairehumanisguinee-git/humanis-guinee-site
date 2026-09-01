import Image from "next/image";
import logo from "@/public/logo.png";

const NAV_LINKS = [
  { href: "/#a-propos", label: "À Propos" },
  { href: "/#actions", label: "Nos Actions" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed w-full z-50 bg-white shadow-sm h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        <a href="/#accueil" className="flex items-center gap-3">
          <span className="relative h-12 w-20 shrink-0">
            <Image src={logo} alt="Humanis Guinée Solidarité" fill className="object-contain" />
          </span>
          <span className="font-poppins font-bold text-humanis-blue text-xl">
            HUMANIS GUINÉE
          </span>
        </a>
        <nav className="hidden md:flex space-x-6 font-medium text-humanis-blue">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-humanis-yellow transition">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="/#dons"
          className="bg-humanis-red text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition"
        >
          Soutenir
        </a>
      </div>
    </header>
  );
}
