import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

// Helper pour lire le fichier JSON
function readDB() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  return data;
}

// Helper pour écrire dans le fichier JSON
function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDB();
  
  const newProject = {
    id: String(Date.now()),
    name: body.name,
    color: body.color,
  };

  db.projects.push(newProject);
  writeDB(db);

  return NextResponse.json(newProject, { status: 201 });
}