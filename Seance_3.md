**Q1 : Run npx prisma studio. Voyez-vous les données dans les tables Project et User ?**
Oui, en ouvrant l'interface web de Prisma Studio (qui se lance sur http://localhost:5555), on voit bien la ligne de l'utilisateur Admin dans la table User et les deux projets ('App Mobile' et 'API Back') dans la table Project.

**Q2 : Comparez ce code avec l'ancien (fs.readFileSync + JSON.parse + push + writeFileSync). Combien de lignes en moins ?**
Le code est beaucoup plus court et propre. On passe d'une quinzaine de lignes de manipulation de fichiers complexes et risquées à seulement 3 lignes de code grâce aux fonctions natives de Prisma (`create`, `update`, `delete`).

**Q3 : Supprimez db.json. L'app fonctionne-t-elle toujours ? Pourquoi ?**
Oui, l'application fonctionne toujours parfaitement même si on supprime `db.json`. C'est parce que toutes nos données sont maintenant enregistrées et lues directement dans le fichier de base de données SQLite (`dev.db`) via Prisma.

**Q4 : Pourquoi le Server Component peut appeler prisma.project.findMany() directement mais un Client Component ('use client') ne peut PAS ?**
Le Server Component s'exécute uniquement sur le serveur Node.js, là où se trouve la base de données et les variables d'environnement. Un Client Component s'exécute dans le navigateur de l'utilisateur, qui n'a pas d'accès direct à la base de données et ne possède pas les identifiants requis (sécurité et architecture).

**Q5 : Ouvrez F12 > Network > Font. Combien de requêtes externes voyez-vous pour la police ?**
On voit 0 requête externe vers les serveurs de Google. Next.js télécharge automatiquement les fichiers de la police lors du build et les sert directement depuis notre propre domaine local, ce qui améliore la vitesse de chargement et respecte la vie privée.

**Q6 : Lancez npm run build. Dans le résumé, quel symbole (λ ou ○) voyez-vous pour /projects/[id] ? Qu'est-ce que cela signifie ?**
On voit le symbole d'un rond rempli (● ou ○ selon les versions) qui indique "SSG" ou "Static". Cela signifie que Next.js a pré-rendu la page sous forme de fichier HTML et JSON statique au moment du build pour chaque projet trouvé dans la base de données, au lieu de la générer dynamiquement à chaque requête.