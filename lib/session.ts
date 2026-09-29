// Session de la console d'administration : un cookie signé (HMAC-SHA256) contenant sa date
// d'expiration. Utilise uniquement Web Crypto, pour fonctionner aussi dans proxy.ts.
// La clé de signature dépend du mot de passe : le changer déconnecte tout le monde.

export const COOKIE_SESSION = "admin_session";
export const DUREE_SESSION = 60 * 60 * 24 * 7; // 7 jours, en secondes

function cleDeSignature(): string | null {
  const secret = process.env.ADMIN_SECRET;
  const motDePasse = process.env.ADMIN_PASSWORD;
  if (!secret || !motDePasse) return null;
  return `${secret}:${motDePasse}`;
}

async function signer(cle: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(cle),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Buffer.from(signature).toString("base64url");
}

// Comparaison en temps constant, pour ne pas laisser deviner une signature caractère par caractère.
function egal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function consoleConfiguree(): boolean {
  return cleDeSignature() !== null;
}

export async function motDePasseCorrect(saisie: string): Promise<boolean> {
  const cle = cleDeSignature();
  const attendu = process.env.ADMIN_PASSWORD;
  if (!cle || !attendu) return false;
  // On compare des empreintes de même longueur plutôt que les mots de passe eux-mêmes.
  return egal(await signer(cle, `mdp:${saisie}`), await signer(cle, `mdp:${attendu}`));
}

export async function creerJeton(): Promise<string> {
  const cle = cleDeSignature();
  if (!cle) throw new Error("ADMIN_PASSWORD et ADMIN_SECRET doivent être définis.");
  const expiration = String(Date.now() + DUREE_SESSION * 1000);
  return `${expiration}.${await signer(cle, `session:${expiration}`)}`;
}

export async function jetonValide(jeton: string | undefined): Promise<boolean> {
  const cle = cleDeSignature();
  if (!cle || !jeton) return false;
  const [expiration, signature] = jeton.split(".");
  if (!expiration || !signature || Number(expiration) < Date.now()) return false;
  return egal(signature, await signer(cle, `session:${expiration}`));
}
