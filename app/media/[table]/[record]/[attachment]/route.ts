import { airtable, TABLE_ACTUALITES, type AirtableAttachment, type AirtableRecord } from "@/lib/airtable";
import { TABLE_CONTENU } from "@/lib/contenu";

// Les URL de fichiers Airtable expirent au bout de 2 h. Le site affiche donc des adresses
// stables (/media/...) et cette route redirige vers une URL Airtable fraîche.
// La redirection est mise en cache 1 h par Vercel, bien avant l'expiration de l'URL.

type Fields = { Photo?: AirtableAttachment[]; Image?: AirtableAttachment[]; Publié?: boolean };

// Seules ces tables sont exposées (jamais la table Bénévoles).
const TABLES = {
  actualites: { nom: TABLE_ACTUALITES, champ: "Photo" },
  contenu: { nom: TABLE_CONTENU, champ: "Image" },
} as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ table: string; record: string; attachment: string }> }
) {
  const { table, record, attachment } = await params;
  const config = TABLES[table as keyof typeof TABLES];
  if (!config || !/^rec\w+$/.test(record)) {
    return new Response("Introuvable", { status: 404 });
  }

  let fields: Fields;
  try {
    ({ fields } = await airtable<AirtableRecord<Fields>>(
      `${encodeURIComponent(config.nom)}/${record}`,
      { cache: "no-store" }
    ));
  } catch {
    return new Response("Introuvable", { status: 404 });
  }

  // Les photos d'actualités non publiées restent privées.
  if (table === "actualites" && !fields.Publié) {
    return new Response("Introuvable", { status: 404 });
  }

  const fichier = fields[config.champ]?.find((f) => f.id === attachment);
  if (!fichier) {
    return new Response("Introuvable", { status: 404 });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: fichier.url,
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
