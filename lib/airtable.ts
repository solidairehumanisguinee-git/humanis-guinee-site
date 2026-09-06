export type Actualite = {
  id: string;
  titre: string;
  date: string | null;
  resume: string;
  contenu: string;
  photoUrls: string[];
};

type AirtableAttachment = { url: string };

type AirtableRecord = {
  id: string;
  fields: {
    Titre?: string;
    Date?: string;
    Résumé?: string;
    Contenu?: string;
    Photo?: AirtableAttachment[];
    Publié?: boolean;
  };
};

type AirtableResponse = {
  records: AirtableRecord[];
};

const BASE_ID = "appnyC5r7ZozZv90q";
const TABLE_NAME = "Actualités";

function recordToActualite(record: AirtableRecord): Actualite {
  return {
    id: record.id,
    titre: record.fields.Titre ?? "Sans titre",
    date: record.fields.Date ?? null,
    resume: record.fields.Résumé ?? "",
    contenu: record.fields.Contenu ?? "",
    photoUrls: record.fields.Photo?.map((p) => p.url) ?? [],
  };
}

export async function getActualites(): Promise<Actualite[]> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return [];
  }

  const params = new URLSearchParams({
    "filterByFormula": "{Publié}=1",
    "sort[0][field]": "Date",
    "sort[0][direction]": "desc",
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?${params}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    console.error("Airtable fetch failed:", res.status, await res.text());
    return [];
  }

  const data: AirtableResponse = await res.json();
  return data.records.map(recordToActualite);
}

export async function getActualite(id: string): Promise<Actualite | null> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) {
    return null;
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${id}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return null;
  }

  const record: AirtableRecord = await res.json();
  if (!record.fields.Publié) {
    return null;
  }
  return recordToActualite(record);
}
