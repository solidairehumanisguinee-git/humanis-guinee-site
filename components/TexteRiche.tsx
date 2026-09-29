import { Fragment } from "react";

// Affiche un texte saisi dans la console : les passages entre **deux étoiles** en gras.
export default function TexteRiche({ texte, grasClassName }: { texte: string; grasClassName?: string }) {
  return texte.split(/\*\*(.+?)\*\*/g).map((morceau, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={grasClassName}>
        {morceau}
      </strong>
    ) : (
      <Fragment key={i}>{morceau}</Fragment>
    )
  );
}

export function lignes(texte: string): string[] {
  return texte
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
