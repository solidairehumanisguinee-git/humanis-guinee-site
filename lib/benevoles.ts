import { listRecords } from "@/lib/airtable";

export const TABLE_BENEVOLES = "Bénévoles";

export type Valeur = string | { url: string; nom: string }[];

export type Candidature = {
  id: string;
  recue: string;
  champs: [string, Valeur][];
};

// Les colonnes du formulaire peuvent évoluer dans Airtable : on affiche tous les champs
// remplis, quels qu'ils soient.
function formater(valeur: unknown): Valeur {
  if (Array.isArray(valeur)) {
    if (valeur.every((v) => v && typeof v === "object" && "url" in v)) {
      return valeur.map((v) => ({ url: v.url, nom: v.filename ?? "fichier" }));
    }
    return valeur.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v))).join(", ");
  }
  if (typeof valeur === "boolean") return valeur ? "Oui" : "Non";
  if (valeur && typeof valeur === "object") {
    const objet = valeur as { name?: string; email?: string };
    return objet.name ?? objet.email ?? JSON.stringify(valeur);
  }
  return String(valeur);
}

export async function getCandidatures(): Promise<Candidature[]> {
  const records = await listRecords<Record<string, unknown>>(TABLE_BENEVOLES, {}, { cache: "no-store" });
  return records
    .sort((a, b) => b.createdTime.localeCompare(a.createdTime))
    .map((r) => ({
      id: r.id,
      recue: r.createdTime,
      champs: Object.entries(r.fields).map(([nom, valeur]) => [nom, formater(valeur)]),
    }));
}
