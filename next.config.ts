import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Envoi de photos et vidéos depuis la console (4 Mo max par fichier, voir lib/fichiers.ts).
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
