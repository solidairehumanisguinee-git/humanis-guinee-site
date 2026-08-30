import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const title = "Humanis Guinée Solidarité | La Solidarité ici et là-bas";
const description =
  "La solidarité n'a pas de frontières. Parce que l'entraide commence ici à Bordeaux, et agit aussi là-bas en Guinée.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.humanisguinee.fr"),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-slate-50 text-slate-800 antialiased">
        <Header />
        <main className="pt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
