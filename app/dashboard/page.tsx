import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects';

export default async function DashboardPage() {
  // Lecture DIRECTE depuis la base de données SQLite via Prisma
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>{projects.length} projets</p>
      <AddProjectForm />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p) => (
          <li key={p.id} style={{ 
            display: 'flex', 
            gap: 12, 
            alignItems: 'center', 
            marginBottom: 8,
            padding: 8,
            borderBottom: '1px solid #eee'
          }}>
            {/* Pastille de couleur */}
            <span style={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              background: p.color, 
              display: 'inline-block' 
            }} />
            
            {/* Lien vers le projet */}
            <a href={`/projects/${p.id}`} style={{ flex: 1, textDecoration: 'none', color: '#333' }}>
              {p.name}
            </a>

            {/* Formulaire de suppression */}
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit" style={{ 
                background: '#ff4d4f', 
                color: 'white', 
                border: 'none', 
                padding: '4px 8px', 
                borderRadius: 4, 
                cursor: 'pointer' 
              }}>
                Supprimer
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}