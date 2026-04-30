import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET : Récupérer un projet spécifique
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const db = readDB();
  const project = db.projects.find((p: any) => p.id === params.id);
  
  if (!project) return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  return NextResponse.json(project);
}

// PUT : Modifier un projet
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p: any) => p.id === params.id);

  if (index === -1) return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });

  db.projects[index] = { ...db.projects[index], ...body };
  writeDB(db);

  return NextResponse.json(db.projects[index]);
}

// DELETE : Supprimer un projet
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const db = readDB();
  const filteredProjects = db.projects.filter((p: any) => p.id !== params.id);

  if (db.projects.length === filteredProjects.length) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
  }

  db.projects = filteredProjects;
  writeDB(db);

  return NextResponse.json({ message: 'Projet supprimé' });
}