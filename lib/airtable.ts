export type Media = { id: string; url: string; isVideo: boolean };

export type Actualite = {
  id: string;
  titre: string;
  date: string | null;
  resume: string;
  contenu: string;
  medias: Media[];
  publie: boolean;
};

export type AirtableAttachment = { id: string; url: string; filename?: string; type?: string };

export type AirtableRecord<F> = {
  id: string;
  createdTime: string;
  fields: F;
};

type ActualiteFields = {
  Titre?: string;
  Date?: string;
  Résumé?: string;
  Contenu?: string;
  Photo?: AirtableAttachment[];
  Publié?: boolean;
};

export const BASE_ID = "appnyC5r7ZozZv90q";
export const TABLE_ACTUALITES = "Actualités";
export const TAG_ACTUALITES = "actualites";

export class AirtableError extends Error {}

// Appel générique à l'API Airtable. `path` est relatif à la base (ex. "Actualités?pageSize=10").
export async function airtable<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    throw new AirtableError("AIRTABLE_API_KEY n'est pas définie.");
  }

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!res.ok) {
    throw new AirtableError(`Airtable ${res.status} : ${await res.text()}`);
  }
  return res.json();
}

// Liste tous les enregistrements d'une table (Airtable pagine par 100).
export async function listRecords<F>(
  table: string,
  params: Record<string, string> = {},
  init: RequestInit = {}
): Promise<AirtableRecord<F>[]> {
  const records: AirtableRecord<F>[] = [];
  let offset: string | undefined;
  do {
    const query = new URLSearchParams(params);
    if (offset) query.set("offset", offset);
    const page = await airtable<{ records: AirtableRecord<F>[]; offset?: string }>(
      `${encodeURIComponent(table)}?${query}`,
      init
    );
    records.push(...page.records);
    offset = page.offset;
  } while (offset);
  return records;
}

// Ajoute un fichier à un champ pièce jointe (5 Mo max côté Airtable).
export async function uploadAttachment(recordId: string, field: string, file: File) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    throw new AirtableError("AIRTABLE_API_KEY n'est pas définie.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const res = await fetch(
    `https://content.airtable.com/v0/${BASE_ID}/${recordId}/${encodeURIComponent(field)}/uploadAttachment`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        contentType: file.type || "application/octet-stream",
        file: bytes.toString("base64"),
        filename: file.name,
      }),
    }
  );

  if (!res.ok) {
    throw new AirtableError(`Envoi du fichier refusé (${res.status}) : ${await res.text()}`);
  }
}

// Les URL de pièces jointes Airtable expirent au bout de 2 h : le site public passe
// par /media/..., qui redirige à chaque fois vers une URL fraîche.
export function mediaUrl(table: "actualites" | "contenu", recordId: string, attachmentId: string) {
  return `/media/${table}/${recordId}/${attachmentId}`;
}

function recordToActualite(record: AirtableRecord<ActualiteFields>, directUrls = false): Actualite {
  return {
    id: record.id,
    titre: record.fields.Titre ?? "Sans titre",
    date: record.fields.Date ?? null,
    resume: record.fields.Résumé ?? "",
    contenu: record.fields.Contenu ?? "",
    medias:
      record.fields.Photo?.map((p) => ({
        id: p.id,
        url: directUrls ? p.url : mediaUrl("actualites", record.id, p.id),
        isVideo: p.type?.startsWith("video/") ?? false,
      })) ?? [],
    publie: record.fields.Publié ?? false,
  };
}

const cachePublic: RequestInit = { next: { revalidate: 3600, tags: [TAG_ACTUALITES] } };

export async function getActualites(): Promise<Actualite[]> {
  if (!process.env.AIRTABLE_API_KEY) {
    return [];
  }
  try {
    const records = await listRecords<ActualiteFields>(
      TABLE_ACTUALITES,
      {
        filterByFormula: "{Publié}=1",
        "sort[0][field]": "Date",
        "sort[0][direction]": "desc",
      },
      cachePublic
    );
    return records.map((r) => recordToActualite(r));
  } catch (error) {
    console.error("Airtable fetch failed:", error);
    return [];
  }
}

export async function getActualite(id: string): Promise<Actualite | null> {
  try {
    const record = await airtable<AirtableRecord<ActualiteFields>>(
      `${encodeURIComponent(TABLE_ACTUALITES)}/${id}`,
      cachePublic
    );
    return record.fields.Publié ? recordToActualite(record) : null;
  } catch {
    return null;
  }
}

// --- Console d'administration (jamais mis en cache, URL directes pour les aperçus) ---

export async function getToutesActualites(): Promise<Actualite[]> {
  const records = await listRecords<ActualiteFields>(
    TABLE_ACTUALITES,
    { "sort[0][field]": "Date", "sort[0][direction]": "desc" },
    { cache: "no-store" }
  );
  return records.map((r) => recordToActualite(r, true));
}

export async function getActualiteAdmin(id: string): Promise<Actualite | null> {
  try {
    const record = await airtable<AirtableRecord<ActualiteFields>>(
      `${encodeURIComponent(TABLE_ACTUALITES)}/${id}`,
      { cache: "no-store" }
    );
    return recordToActualite(record, true);
  } catch {
    return null;
  }
}
