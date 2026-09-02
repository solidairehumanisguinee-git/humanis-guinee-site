# Humanis Guinée Solidarité — site web

Site de l'association [Humanis Guinée Solidarité](https://www.humanisguinee.fr), construit avec
[Next.js](https://nextjs.org/docs) et [Tailwind CSS](https://tailwindcss.com/docs), hébergé sur
[Vercel](https://vercel.com/dashboard).

> Ce document explique comment reprendre la maintenance technique du site : installer les
> outils, récupérer le code, publier une modification, et savoir où se trouve chaque service
> utilisé. Une version illustrée existe aussi dans
> [`documentation/passation-humanis-guinee.html`](documentation/passation-humanis-guinee.html).

## Sommaire

1. [Aperçu du projet](#1-aperçu-du-projet)
2. [Comptes & accès](#2-comptes--accès)
3. [Installer son poste](#3-installer-son-poste)
4. [Connecter Git à GitHub](#4-connecter-git-à-github)
5. [Lancer le site en local](#5-lancer-le-site-en-local)
6. [Publier une modification](#6-publier-une-modification)
7. [Où changer quoi](#7-où-changer-quoi)
8. [Glossaire & documentation officielle](#8-glossaire--documentation-officielle)

## 1. Aperçu du projet

Le site est écrit avec **Next.js**, un framework construit sur React qui gère à la fois
l'affichage des pages et leur mise en ligne — un standard très répandu, bien documenté sur
[nextjs.org](https://nextjs.org/docs). La mise en forme visuelle utilise **Tailwind CSS**, une
bibliothèque de styles prêts à l'emploi ([tailwindcss.com](https://tailwindcss.com/docs)).

Le code est stocké sur **GitHub** et hébergé/publié par **Vercel**, qui reconstruit et remet en
ligne le site automatiquement à chaque envoi (« push ») de code — aucune manipulation manuelle de
mise en ligne n'est nécessaire.

Le nom de domaine `humanisguinee.fr` est réservé chez **OVH**, qui route aussi la messagerie
(redirections d'emails). Le formulaire de bénévolat est géré via **Airtable**, et les dons via
**HelloAsso** (lien à finaliser — voir la carte en fin de document).

> **À retenir** — vous n'avez presque jamais besoin de toucher à Vercel, OVH ou Airtable pour une
> simple modification de texte ou de design : tout ça se fait en modifiant le code et en le
> publiant sur GitHub (section 6). Les autres services ne sont à ouvrir que pour des changements
> qui les concernent directement (domaine, formulaire, dons...).

## 2. Comptes & accès

Chaque service a son propre identifiant. **Les mots de passe ne figurent pas dans ce document** —
demandez-les à l'association par un canal sécurisé (pas par email en clair).

| Service | Rôle | Compte utilisé | Lien |
|---|---|---|---|
| GitHub | Code source du site | Dépôt sous `solidairehumanisguinee-git`, avec un compte collaborateur ayant les droits d'écriture | [github.com](https://github.com/solidairehumanisguinee-git/humanis-guinee-site) |
| Vercel | Hébergement & mise en ligne automatique | Compte relié au dépôt GitHub ci-dessus | [vercel.com](https://vercel.com/dashboard) |
| OVH | Nom de domaine, zone DNS, redirections email | Compte de l'association | [manager.ovh.com](https://manager.ovh.com) |
| Airtable | Formulaire « Devenir bénévole » | Compte de l'association | [airtable.com](https://airtable.com) |
| HelloAsso | Collecte de dons *(à finaliser)* | Compte de l'association | [helloasso.com](https://www.helloasso.com) |
| Google Search Console | Suivi de l'indexation Google | Compte Google de l'association | [search.google.com](https://search.google.com/search-console) |
| Google Business Profile | Fiche établissement (résultats de recherche) | Compte Google de l'association | [business.google.com](https://business.google.com) |

## 3. Installer son poste

Trois outils à installer une seule fois, dans cet ordre. Comptez 15 à 20 minutes.

1. **Installer Node.js** — nécessaire pour exécuter le site en local. Téléchargez la version
   « LTS » (recommandée) sur [nodejs.org](https://nodejs.org) et lancez l'installeur avec les
   options par défaut.
2. **Installer Git** — l'outil qui suit l'historique des modifications du code. Téléchargez-le
   sur [git-scm.com](https://git-scm.com/download/win) — options par défaut suffisent.
3. **Installer un éditeur de code (IDE)** — recommandé : **Visual Studio Code**, gratuit,
   standard du marché. Téléchargez-le sur [code.visualstudio.com](https://code.visualstudio.com).

## 4. Connecter Git à GitHub

À faire une fois, depuis VS Code — pas besoin de ligne de commande pour cette partie.

1. **Créer un compte GitHub** si vous n'en avez pas déjà un : [github.com/signup](https://github.com/signup).
2. **Demander l'accès au dépôt** — un administrateur actuel du compte
   `solidairehumanisguinee-git` doit vous ajouter comme collaborateur
   (*Settings → Collaborators* sur la page du dépôt GitHub). Sans ça, vous pouvez lire le code
   mais pas publier de modification.
3. **Se connecter à GitHub depuis VS Code** — ouvrez VS Code → cliquez sur l'icône de compte en
   bas à gauche → *« Sign in with GitHub »* → autorisez dans le navigateur qui s'ouvre.
4. **Récupérer le code (« cloner » le dépôt)** — `Ctrl+Shift+P` → tapez `Git: Clone` → collez
   l'adresse ci-dessous → choisissez un dossier sur votre PC.
   ```
   https://github.com/solidairehumanisguinee-git/humanis-guinee-site.git
   ```

> **Alternative plus simple** — pour quelqu'un peu à l'aise avec Git, **GitHub Desktop**
> ([desktop.github.com](https://desktop.github.com)) offre une interface graphique qui remplace
> les commandes des sections 4 et 6 par des boutons.

## 5. Lancer le site en local

Pour voir et tester une modification avant de la publier. Ouvrez le terminal intégré de VS Code
(*Terminal → New Terminal*) dans le dossier du projet.

1. **Installer les dépendances** — une seule fois après avoir cloné le projet (et à refaire si le
   fichier `package.json` change) :
   ```bash
   npm install
   ```
2. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```
   Ouvrez ensuite [localhost:3000](http://localhost:3000) dans un navigateur — le site se
   recharge automatiquement à chaque modification enregistrée.
3. **Vérifier avant de publier** (recommandé) :
   ```bash
   npm run build
   ```
   Construit une version de production et signale toute erreur — à lancer avant de pousser un
   changement important.

## 6. Publier une modification

Le site se met à jour automatiquement — il n'y a rien à faire côté Vercel.

1. **Modifier le code puis enregistrer** — dans VS Code, les fichiers modifiés apparaissent dans
   l'onglet *Source Control* (icône à gauche).
2. **Envoyer les changements sur GitHub** :
   ```bash
   git add -A
   git commit -m "description du changement"
   git push
   ```
   Ou, dans l'onglet *Source Control* de VS Code : cochez les fichiers, écrivez un message,
   cliquez *Commit* puis *Sync Changes*.
3. **Vérifier le déploiement** — sur [vercel.com/dashboard](https://vercel.com/dashboard), onglet
   *Deployments* : le nouveau déploiement apparaît et passe à `Ready` en général en 1 à 2 minutes.
   Le site en ligne est alors mis à jour, sans aucune autre action.

> **Point de vigilance** — si vous avez déjà travaillé sur ce projet avec un assistant IA type
> Claude Code, vous avez peut-être remarqué que des commits se créent parfois tout seuls pendant
> la séance. Ce n'est pas automatique dans un usage classique de VS Code : sans cet outil, il
> faut committer et pousser vous-même en suivant les étapes ci-dessus.

## 7. Où changer quoi

| Besoin | Où aller |
|---|---|
| Changer le texte, les couleurs, une page | Code du site (dossier `app/`) → GitHub → Vercel republie seul |
| Répondre aux candidatures bénévoles | [Base Airtable](https://airtable.com) |
| Suivre / activer les dons | [Espace HelloAsso](https://www.helloasso.com) |
| Modifier le domaine ou les emails | [Manager OVH](https://manager.ovh.com) → Zone DNS / Emails |
| Voir qui visite le site, forcer une réindexation | [Google Search Console](https://search.google.com/search-console) |
| Mettre à jour la fiche Google (horaires, photos) | [Google Business Profile](https://business.google.com) |

## 8. Glossaire & documentation officielle

Pour approfondir un point sans dépendre de ce document, qui restera volontairement bref.

- **Dépôt (repo)** — l'espace GitHub qui contient tout le code du site et son historique. [docs.github.com](https://docs.github.com/get-started)
- **Commit / Push** — « commit » enregistre un instantané du code ; « push » l'envoie sur GitHub. [git-scm.com/doc](https://git-scm.com/doc)
- **Déploiement** — la mise en ligne d'une nouvelle version du site par Vercel. [vercel.com/docs](https://vercel.com/docs/deployments)
- **Zone DNS** — le réglage qui relie le nom de domaine (`humanisguinee.fr`) au serveur qui héberge le site. [docs.ovh.com](https://docs.ovh.com/fr/domains/)
- **Next.js** — le framework utilisé pour construire le site. [nextjs.org/docs](https://nextjs.org/docs)

---

Document de passation — à mettre à jour à chaque changement d'outil ou de compte.
Contact association : [contact@humanisguinee.fr](mailto:contact@humanisguinee.fr)
