import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_SESSION, jetonValide } from "@/lib/session";

// À appeler en tête de chaque page et action de la console : proxy.ts ne fait qu'une
// vérification rapide, c'est ici que l'accès est réellement contrôlé.
export async function exigerAdmin() {
  const jeton = (await cookies()).get(COOKIE_SESSION)?.value;
  if (!(await jetonValide(jeton))) {
    redirect("/admin/connexion");
  }
}
