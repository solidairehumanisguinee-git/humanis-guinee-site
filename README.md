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
7. [Console d'administration](#7-console-dadministration)
8. [Où changer quoi](#8-où-changer-quoi)
9. [Glossaire & documentation officielle](#9-glossaire--documentation-officielle)

## 1. Aperçu du projet

Le site est écrit avec **Next.js**, un framework construit sur React qui gère à la fois
l'affichage des pages et leur mise en ligne — un standard très répandu, bien documenté sur
[nextjs.org](https://nextjs.org/docs). La mise en forme visuelle utilise **Tailwind CSS**, une
bibliothèque de styles prêts à l'emploi ([tailwindcss.com](https://tailwindcss.com/docs)).

Le code est stocké sur **GitHub** et hébergé/publié par **Vercel**, qui reconstruit et remet en
ligne le site automatiquement à chaque envoi (« push ») de code — aucune manipulation manuelle de
mise en ligne n'est nécessaire.

Le nom de domaine `humanisguinee.fr` est réservé chez **OVH**, qui route aussi la messagerie
(redirections d'emails). Les textes et photos de la page d'accueil, la section **Actualités** et
les candidatures bénévoles sont stockés dans **Airtable**, et se gèrent sans toucher au code depuis
la **console d'administration** du site ([`/admin`](https://www.humanisguinee.fr/admin), voir
[§7](#7-console-dadministration)) : les modifications sont en ligne immédiatement. Les dons
passent par **HelloAsso** ([formulaire de don](https://www.helloasso.com/associations/humanis-guinee-solidarite/formulaires/1)).

> **À retenir** — une modification de texte, de lien ou de photo de la page d'accueil se fait
> depuis la console `/admin`, sans code. Le design et les nouvelles pages, eux, se font en modifiant
> le code et en le publiant sur GitHub (section 6). Les autres services ne sont à ouvrir que pour des changements
> qui les concernent directement (domaine, formulaire, dons...).

## 2. Comptes & accès

Chaque service a son propre identifiant. **Les mots de passe ne figurent pas dans ce document** —
demandez-les à l'association par un canal sécurisé (pas par email en clair).

| Service | Rôle | Compte utilisé | Lien |
|---|---|---|---|
| GitHub | Code source du site | Dépôt sous `solidairehumanisguinee-git`, avec un compte collaborateur ayant les droits d'écriture | [github.com](https://github.com/solidairehumanisguinee-git/humanis-guinee-site) |
| Vercel | Hébergement & mise en ligne automatique | Compte relié au dépôt GitHub ci-dessus | [vercel.com](https://vercel.com/dashboard) |
| OVH | Nom de domaine, zone DNS, redirections email | Compte de l'association | [manager.ovh.com](https://manager.ovh.com) |
| Airtable | Formulaire « Devenir bénévole » + section Actualités | Compte de l'association — le site utilise un jeton d'accès (voir [§5](#5-lancer-le-site-en-local)) | [airtable.com](https://airtable.com) |
| HelloAsso | Collecte de dons ([formulaire](https://www.helloasso.com/associations/humanis-guinee-solidarite/formulaires/1)) | Compte de l'association | [helloasso.com](https://www.helloasso.com) |
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
2. **Configurer la clé Airtable** (une seule fois, nécessaire pour que la page Actualités
   affiche du contenu) — copiez `.env.local.example` en `.env.local`, puis renseignez :
   ```
   AIRTABLE_API_KEY=votre_token
   ```
   Ce jeton se crée sur [airtable.com/create/tokens](https://airtable.com/create/tokens) (scopes
   `data.records:read` **et** `data.records:write`, accès donné à la base du projet — l'écriture
   sert à la console d'administration). Pour tester la console en local, ajoutez aussi
   `ADMIN_PASSWORD` et `ADMIN_SECRET` (voir [§7](#7-console-dadministration)). `.env.local` n'est jamais envoyé sur
   GitHub (voir `.gitignore`) — la même variable doit aussi être définie sur **Vercel**
   (*Settings → Environment Variables*) pour que le site en ligne fonctionne. Sans cette clé,
   le site tourne normalement mais la page Actualités reste vide.
3. **Démarrer le serveur de développement** :
   ```bash
   npm run dev
   ```
   Ouvrez ensuite [localhost:3000](http://localhost:3000) dans un navigateur — le site se
   recharge automatiquement à chaque modification enregistrée.
4. **Vérifier avant de publier** (recommandé) :
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

## 7. Console d'administration

La console [`humanisguinee.fr/admin`](https://www.humanisguinee.fr/admin) permet aux membres de
l'association de gérer le site sans coder. On y accède aussi par le lien **« Administration »**
en bas de chaque page du site. Elle est protégée par **un mot de passe partagé** ; la connexion
reste active 7 jours sur l'appareil.

| Onglet | Ce qu'on peut faire |
|---|---|
| Textes & photos | Modifier les textes, liens (HelloAsso, réseaux sociaux, formulaire bénévole) et photos de la page d'accueil. Vider un champ rétablit le texte d'origine. |
| Actualités | Créer, modifier, publier/dépublier et supprimer une actualité, avec photos et vidéos (photos réduites automatiquement, vidéos 4 Mo max). |
| Bénévoles | Lire les candidatures reçues via le formulaire (lecture seule). |

**Mise en place (une seule fois)**

1. **Airtable — table « Contenu »** : dans la base du projet, créez une table nommée exactement
   `Contenu` avec trois colonnes :
   - `Clé` — texte sur une ligne (colonne principale) ;
   - `Valeur` — texte long ;
   - `Image` — pièce jointe.

   Laissez-la vide : la console crée les lignes toute seule à la première modification. Tant
   qu'une ligne n'existe pas, le site affiche le texte d'origine (défini dans `lib/contenu.ts`).
2. **Airtable — jeton** : le jeton `AIRTABLE_API_KEY` doit avoir les scopes `data.records:read`
   et `data.records:write` (voir [§5](#5-lancer-le-site-en-local)).
3. **Vercel — variables d'environnement** (*Settings → Environment Variables*) :
   - `ADMIN_PASSWORD` — le mot de passe de la console, à transmettre aux membres par un canal sûr ;
   - `ADMIN_SECRET` — une longue chaîne aléatoire, jamais communiquée (sert à signer les
     connexions). Par exemple, générée avec `node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"`.

   Puis redéployez (*Deployments → ⋯ → Redeploy*) pour qu'elles soient prises en compte.

> **Changer le mot de passe** — modifiez `ADMIN_PASSWORD` sur Vercel puis redéployez : tous les
> appareils connectés sont déconnectés.

> **Vidéos de plus de 4 Mo** — la console ne peut pas les envoyer (limite de Vercel). Ajoutez-les
> directement dans la colonne `Photo` de la table Actualités sur Airtable : elles s'affichent sur
> le site comme les autres.

> **Onglet Bénévoles** — il lit la table qui reçoit les réponses du formulaire, désignée par son
> identifiant Airtable `tblv7azUquHJO2vLP` (dans `lib/benevoles.ts`) plutôt que par son nom : la
> table peut donc être renommée sans rien casser. Si le formulaire est un jour recréé dans une
> autre table, remplacez cet identifiant (visible dans l'adresse de la table : `…/tblXXXX/…`).

> **Photos et URL `/media/...`** — Airtable fournit des liens de fichiers qui expirent au bout de
> 2 heures. Le site affiche donc des adresses stables `/media/...` qui redirigent vers un lien
> Airtable frais (`app/media/`). Seules les tables Actualités (actualités publiées) et Contenu
> sont exposées ainsi, jamais les candidatures.

> **Côté code** — les champs modifiables et leurs textes d'origine sont listés dans
> `lib/contenu.ts` ; la console est dans `app/admin/`. Pour rendre un nouveau texte modifiable,
> ajoutez un champ dans `lib/contenu.ts` et affichez-le dans `app/(site)/page.tsx`.

> **Si `/admin` renvoie une erreur 404 sur le site en ligne** alors que le déploiement Vercel est
> réussi : le domaine est resté bloqué sur une ancienne version (souvent après un *Instant
> Rollback*). Sur Vercel, onglet *Deployments* → dernier déploiement → *⋯* → *Promote to
> Production*, puis vérifiez que les déploiements de production automatiques sont réactivés.

## 8. Où changer quoi

| Besoin | Où aller |
|---|---|
| Changer un texte, un lien ou une photo de la page d'accueil | [Console `/admin`](https://www.humanisguinee.fr/admin) → Textes & photos |
| Publier une actualité (texte, photo, vidéo) | [Console `/admin`](https://www.humanisguinee.fr/admin) → Actualités — cocher « Publier sur le site » |
| Lire les candidatures bénévoles | [Console `/admin`](https://www.humanisguinee.fr/admin) → Bénévoles (ou la table Bénévoles dans [Airtable](https://airtable.com)) |
| Changer le design, les couleurs, ajouter une page | Code du site (dossier `app/`) → GitHub → Vercel republie seul |
| Suivre / activer les dons | [Espace HelloAsso](https://www.helloasso.com) |
| Modifier le domaine ou les emails | [Manager OVH](https://manager.ovh.com) → Zone DNS / Emails |
| Voir qui visite le site, forcer une réindexation | [Google Search Console](https://search.google.com/search-console) |
| Mettre à jour la fiche Google (horaires, photos) | [Google Business Profile](https://business.google.com) |

## 9. Glossaire & documentation officielle

Pour approfondir un point sans dépendre de ce document, qui restera volontairement bref.

- **Dépôt (repo)** — l'espace GitHub qui contient tout le code du site et son historique. [docs.github.com](https://docs.github.com/get-started)
- **Commit / Push** — « commit » enregistre un instantané du code ; « push » l'envoie sur GitHub. [git-scm.com/doc](https://git-scm.com/doc)
- **Déploiement** — la mise en ligne d'une nouvelle version du site par Vercel. [vercel.com/docs](https://vercel.com/docs/deployments)
- **Zone DNS** — le réglage qui relie le nom de domaine (`humanisguinee.fr`) au serveur qui héberge le site. [docs.ovh.com](https://docs.ovh.com/fr/domains/)
- **Variable d'environnement** — une valeur secrète (comme la clé Airtable) gardée hors du code, définie localement dans `.env.local` et sur Vercel. [vercel.com/docs](https://vercel.com/docs/environment-variables)
- **Next.js** — le framework utilisé pour construire le site. [nextjs.org/docs](https://nextjs.org/docs)

---

Document de passation — à mettre à jour à chaque changement d'outil ou de compte.
Contact association : [contact@humanisguinee.fr](mailto:contact@humanisguinee.fr)
