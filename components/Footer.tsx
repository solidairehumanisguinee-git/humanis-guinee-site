import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="bg-humanis-blue text-white text-center py-10">
      <span className="relative w-20 h-20 rounded-full overflow-hidden inline-block mb-4">
        <Image src={logo} alt="Humanis Guinée Solidarité" fill className="object-cover" />
      </span>
      <p className="mb-2">
        <a href="mailto:solidairehumanisguinee@gmail.com" className="hover:underline">
          solidairehumanisguinee@gmail.com
        </a>
      </p>
      <p className="text-humanis-yellow font-bold text-lg">
        Humanis – &quot;La Solidarité ici et là-bas&quot;
      </p>
      <p className="text-gray-300 text-sm mt-4">
        © {new Date().getFullYear()} Association Humanis Guinée Solidarité.
      </p>
      <p className="text-gray-400 text-xs mt-3 space-x-3">
        <Link href="/mentions-legales" className="hover:underline hover:text-white">
          Mentions légales
        </Link>
        <span>·</span>
        <Link href="/politique-de-confidentialite" className="hover:underline hover:text-white">
          Politique de confidentialité
        </Link>
      </p>
    </footer>
  );
}
