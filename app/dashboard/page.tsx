import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects'; // Import de l'action

export default async function DashboardPage() {
  const res = await fetch('http://localhost:3000/projects', { cache: 'no-store' });
  const projects = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((p: any) => (
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