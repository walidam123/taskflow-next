import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET : Récupérer un projet unique par son ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const project = await prisma.project.findUnique({
    where: { id: Number(id) }
  });

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT : Modifier un projet (nom et couleur)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, color } = await request.json();

  const updatedProject = await prisma.project.update({
    where: { id: Number(id) },
    data: { name, color }
  });

  return NextResponse.json(updatedProject);
}

// DELETE : Supprimer un projet
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await prisma.project.delete({
    where: { id: Number(id) }
  });

  return NextResponse.json({ message: 'Projet supprime avec succes' });
}