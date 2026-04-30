#  TP - Séance 2

**Q1 : En React SPA, que fallait-il faire après un POST pour voir le nouveau projet ? Ici ?**
En SPA, on devait mettre à jour manuellement l'état avec `setProjects([...projects, newProject])`[cite: 1]. Avec Next.js, on utilise juste `revalidatePath('/dashboard')` pour forcer le serveur à recharger les données fraîches[cite: 1].

**Q3 : Pourquoi pas un onClick pour le bouton supprimer ?**
Le Dashboard est un Server Component, donc le JavaScript ne s'exécute pas côté client[cite: 1]. Le `<form>` est le seul moyen natif d'envoyer une action au serveur sans utiliser de code client[cite: 1].

**Q4 : Testez http://localhost:3000/api/projects. Que voyez-vous ?**
On voit le contenu du fichier `db.json` affiché directement en format JSON dans le navigateur[cite: 1].

**Q5 : Quelle est la différence entre une API Route et une Server Action ?**
Une API Route est un endpoint public accessible par n'importe quel client (ex: mobile)[cite: 1]. Une Server Action est une fonction serveur directement liée à un formulaire dans l'interface de l'app[cite: 1].

**Q6 : Comparez ce Login avec celui de React SPA. Combien de useState en moins ?**
On a pratiquement tous les `useState` en moins (email, password, loading, error)[cite: 1]. C'est `useActionState` qui gère tout l'état du formulaire de façon centralisée[cite: 1].

**Q7 : Voyez-vous le cookie 'session' ? Pouvez-vous le lire avec document.cookie ?**
Le cookie est visible dans l'onglet Application de la console[cite: 1]. Mais on ne peut pas le lire avec `document.cookie` parce qu'il est en `httpOnly`, ce qui est plus sécurisé[cite: 1].

**Q8 : En React SPA, ProtectedRoute affichait brièvement le Dashboard. Ici ?**
Ici, il n'y a aucun flash de contenu[cite: 1]. Le middleware intercepte la requête avant même que la page ne commence à se charger côté serveur[cite: 1].

**Q9 : Le middleware.ts est à la racine, pas dans app/. Pourquoi ?**
C'est pour qu'il puisse filtrer toutes les requêtes de l'application, peu importe la route, et pas seulement celles à l'intérieur du dossier app[cite: 1].

**Q10 : Comment faisait-on en SPA pour l'auth (vs cookies()) ?**
En SPA, on utilisait souvent un `AuthContext`, un hook `useAuth()` et le `localStorage`[cite: 1]. Ici, on lit directement le cookie sur le serveur avec `cookies()` avant le rendu de la page[cite: 1].

**Q11 : Server Actions vs API Routes - lequel utiliser pour un formulaire ? Pour une app mobile ?**
Pour un formulaire interne à l'app, les Server Actions sont plus simples[cite: 1]. Pour une application mobile externe, il faut obligatoirement passer par des API Routes[cite: 1].

**Q12 : Quel avantage de sécurité avec cookies + middleware ?**
Le cookie `HttpOnly` empêche le vol de session par XSS[cite: 1]. Le middleware garantit que les données privées ne sont même pas envoyées au navigateur si l'utilisateur n'est pas connecté[cite: 1].

**Q13 : Si vous arrêtez json-server, les API Routes fonctionnent-elles toujours ?**
Oui, car les API Routes lisent et écrivent directement dans `db.json` en utilisant le système de fichiers (fs) de Node.js[cite: 1].

**Q14 : Le cookie est HttpOnly. Un script XSS injecté peut-il le voler ?**
Non, le navigateur bloque tout accès au cookie par JavaScript, donc même un script injecté ne pourra pas le lire[cite: 1].