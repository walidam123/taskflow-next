import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// 5.1 Fonction generateStaticParams pour le SSG
export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  
  // On retourne un tableau d'objets contenant l'ID converti en string
  return projects.map((p) => ({
    id: String(p.id),
  }));
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Récupération directe du projet avec Prisma
  const project = await prisma.project.findUnique({
    where: { id: Number(id) }
  });

  // Si le projet n'existe pas en BDD, on renvoie vers la page 404
  if (!project) {
    notFound();
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ 
          width: 16, 
          height: 16, 
          borderRadius: '50%', 
          background: project.color, 
          display: 'inline-block' 
        }} />
        <h1>{project.name}</h1>
      </div>
      <p style={{ color: '#666' }}>ID du projet : {project.id}</p>
      <p style={{ color: '#888' }}>Créé le : {new Date(project.createdAt).toLocaleDateString()}</p>
      
      <a href="/dashboard" style={{ color: '#1B8C3E', textDecoration: 'none' }}>
        ← Retour au Dashboard
      </a>
    </div>
  );
}