import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormulaireConnexion from "@/app/admin/_components/FormulaireConnexion";
import { COOKIE_SESSION, jetonValide } from "@/lib/session";
import logo from "@/public/logo.png";

export default async function Connexion() {
  if (await jetonValide((await cookies()).get(COOKIE_SESSION)?.value)) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <span className="relative block h-20 w-32 mx-auto mb-6">
          <Image src={logo} alt="Humanis Guinée Solidarité" fill className="object-contain" priority />
        </span>
        <h1 className="text-2xl font-bold text-humanis-blue text-center mb-6">Administration du site</h1>
        <FormulaireConnexion />
      </div>
    </div>
  );
}
