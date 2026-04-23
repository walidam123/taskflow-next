# Réponses TP1 Next.js : Du CSR au SSR

## Partie 1 : Structure et Initialisation

**Q1 : Comparez la structure de votre projet React (Vite) avec Next.js. Quelles différences ?**
* **Dossier source :** React utilise généralement `src/` alors que Next.js utilise le dossier `app/` pour son App Router[cite: 19].
* **Fichiers de base :** Next.js remplace `main.tsx` et `App.tsx` par `layout.tsx` (structure globale) et `page.tsx` (contenu de la route)[cite: 19].
* **Routing :** En React (Vite), le routing est défini explicitement dans le code via `react-router-dom`. En Next.js, c'est la **structure des dossiers** qui définit automatiquement les routes[cite: 20].

---

## Partie 2 : Routing par dossiers

**Q2 : Combien de fichiers avez-vous créé pour cette route (/login) ? Comparez avec React Router.**
* **Next.js :** Un seul fichier est nécessaire : `app/login/page.tsx`.
* **React Router :** Il fallait créer le composant, l'importer dans `App.tsx`, et ajouter une balise `<Route>` avec le path correspondant.

**Q3 : En React, on utilisait useParams() pour récupérer l'id. En Next.js, comment est-il récupéré ? Quelle différence fondamentale ?**
* **Récupération :** L'identifiant est récupéré via l'objet `params` passé directement en **prop** au composant de la page.
* **Différence :** `useParams()` est un hook côté **client** (CSR), alors qu'en Next.js, `params` est fourni par le **serveur** au composant avant même l'affichage.

---

## Partie 4 : Server Components & Fetch

**Q5 : En React SPA, combien de lignes fallait-il pour charger les projets ? Combien ici ?**
* **React SPA :** Nécessitait de nombreuses étapes : `useState` (données + loading), `useEffect`, l'appel `fetch`, la gestion des promesses `.then()` et la mise à jour du state.
* **Next.js :** Le composant est une simple fonction `async`, permettant d'utiliser `await fetch()` directement dans le corps de la fonction, sans hooks complexes.

**Q6 : Ouvrez F12 > Network. Voyez-vous la requête GET /projects ? Pourquoi ?**
* **Observation :** Non, la requête n'apparaît pas dans l'onglet Network du navigateur.
* **Raison :** La requête est effectuée par le **serveur Next.js** en interne. Le client reçoit directement le code HTML déjà rempli avec les données des projets.

---

## Partie 5 : Client vs Server Components

**Q7 : Pourquoi faut-il 'use client' ici (Login) et pas dans la page Dashboard ?**
* **Dashboard :** Il s'agit d'un Server Component car il ne fait que de l'affichage de données (lecture seule).
* **Login :** L'interactivité (gestion d'état avec `useState`, événements `onChange` et `onSubmit`) nécessite une exécution côté navigateur, d'où l'obligation du `use client`.

**Q8 : En React, on utilisait useNavigate() de react-router-dom. En Next.js, quel est l'équivalent ?**
* L'équivalent est le hook **`useRouter()`** importé depuis `next/navigation`.

---

## Partie 6 : Preuve du SSR

**Q9 & Q10 : Que voyez-vous dans le code source HTML (Ctrl+U) ?**
* **React SPA :** On ne voit qu'une balise vide `<div id="root"></div>` et un script. Le contenu est absent du code source initial.
* **Next.js :** Tout le contenu HTML, y compris les noms des projets récupérés sur l'API, est présent directement dans le code source envoyé par le serveur.

---

## Partie 7 : Réflexion

**Q11 : En React Router, comment faisait-on pour obtenir un Header persistant ?**
* On plaçait généralement le composant `<Header />` à l'extérieur du composant `<Routes>` ou à l'intérieur d'un composant de layout parent servant de wrapper.

**Q12 : Si je veux un layout spécifique au Dashboard (avec Sidebar), où créer le fichier ?**
* Il faut créer un fichier `layout.tsx` directement dans le dossier `app/dashboard/`.

**Q13 : Le Dashboard est un Server Component. Peut-il utiliser onClick ? Pourquoi ?**
* **Non.** Un Server Component ne peut pas gérer d'événements JavaScript interactifs comme `onClick` car il est rendu sur le serveur et ne possède pas de logique d'hydratation côté client.

**Q14 : Pour un bouton "+ Nouveau projet", dois-je transformer TOUTE la page en Client Component ?**
* **Non.** La bonne pratique est d'isoler uniquement le bouton (ou le formulaire) dans un petit composant séparé avec `'use client'`, puis de l'importer dans la page Dashboard qui reste un Server Component.

**Q15 : Quel avantage de sécurité apporte le fetch depuis le serveur ?**
* L'URL de l'API interne (`:4000`) et les éventuelles clés secrètes restent masquées pour l'utilisateur final. Le navigateur communique uniquement avec le serveur Next.js, ce qui empêche l'exposition de l'infrastructure backend au public.