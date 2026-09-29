import Link from "next/link";
import { deconnexion } from "@/app/admin/actions";
import { exigerAdmin } from "@/lib/admin";

const LIENS = [
  { href: "/admin/textes", label: "Textes & photos" },
  { href: "/admin/actualites", label: "Actualités" },
  { href: "/admin/benevoles", label: "Bénévoles" },
];

export default async function ConsoleLayout({ children }: LayoutProps<"/admin">) {
  await exigerAdmin();

  return (
    <>
      <header className="bg-humanis-blue text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/admin" className="font-poppins font-bold text-lg">
            Administration
          </Link>
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
            {LIENS.map((lien) => (
              <Link key={lien.href} href={lien.href} className="hover:text-humanis-yellow">
                {lien.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-humanis-yellow">
              Voir le site ↗
            </a>
            <form action={deconnexion}>
              <button type="submit" className="hover:text-humanis-yellow">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </>
  );
}
