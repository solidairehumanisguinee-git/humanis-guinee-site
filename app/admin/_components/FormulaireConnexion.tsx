"use client";

import { useActionState } from "react";
import { connexion } from "@/app/admin/actions";

export default function FormulaireConnexion() {
  const [etat, action, enCours] = useActionState(connexion, undefined);

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="block text-sm font-bold text-gray-700 mb-1">Mot de passe</span>
        <input
          type="password"
          name="motDePasse"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-humanis-blue"
        />
      </label>
      {etat?.erreur && <p className="text-sm text-humanis-red">{etat.erreur}</p>}
      <button
        type="submit"
        disabled={enCours}
        className="w-full bg-humanis-blue text-white font-bold py-3 rounded-full hover:opacity-90 disabled:opacity-60"
      >
        {enCours ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
