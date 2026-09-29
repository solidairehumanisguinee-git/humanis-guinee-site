export default function Message({ erreur, succes }: { erreur?: string; succes?: string }) {
  if (erreur) {
    return (
      <p role="alert" className="text-sm bg-red-50 text-humanis-red border border-red-200 rounded-lg px-3 py-2">
        {erreur}
      </p>
    );
  }
  if (succes) {
    return (
      <p role="status" className="text-sm bg-green-50 text-green-800 border border-green-200 rounded-lg px-3 py-2">
        {succes}
      </p>
    );
  }
  return null;
}

// Affiché quand Airtable ne répond pas ou que la configuration est incomplète.
export function ErreurChargement({ quoi, detail }: { quoi: string; detail: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-humanis-red">
      <h2 className="font-bold text-humanis-red mb-2">Impossible de charger {quoi}</h2>
      <p className="text-gray-700 text-sm mb-2">
        Vérifiez que la clé <code>AIRTABLE_API_KEY</code> est définie sur Vercel, qu&apos;elle a les droits de
        lecture et d&apos;écriture sur la base, et que la table existe bien dans Airtable (voir le README, section
        « Console d&apos;administration »).
      </p>
      <p className="text-gray-500 text-xs break-all">Détail : {detail}</p>
    </div>
  );
}
