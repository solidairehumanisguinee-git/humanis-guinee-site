// Limite d'envoi par fichier : Vercel refuse les requêtes de plus de 4,5 Mo.
export const TAILLE_MAX = 4 * 1024 * 1024;

export const MESSAGE_TROP_LOURD =
  "Fichier trop lourd (4 Mo maximum). Pour une vidéo plus longue, ajoutez-la directement dans Airtable.";

// Réduit une photo (1920 px maximum, JPEG) dans le navigateur avant l'envoi :
// une photo de téléphone passe ainsi de 5-10 Mo à quelques centaines de Ko.
// Les formats que le navigateur ne sait pas lire (HEIC sur certains navigateurs) sont envoyés tels quels.
export async function compresserImage(fichier: File, tailleMax = 1920, qualite = 0.85): Promise<File> {
  if (!fichier.type.startsWith("image/") || fichier.type === "image/gif" || fichier.type === "image/svg+xml") {
    return fichier;
  }

  let image: ImageBitmap;
  try {
    image = await createImageBitmap(fichier);
  } catch {
    return fichier;
  }

  const ratio = Math.min(1, tailleMax / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * ratio);
  canvas.height = Math.round(image.height * ratio);
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", qualite));
  if (!blob || blob.size >= fichier.size) {
    return fichier;
  }
  return new File([blob], fichier.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}
