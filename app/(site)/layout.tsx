import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Filet de sécurité : les pages se régénèrent au moins toutes les heures, même si Airtable
// était indisponible au moment de la publication. La console, elle, met à jour immédiatement.
export const revalidate = 3600;

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
