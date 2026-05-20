import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // On insère l'utilisateur admin
  await prisma.user.create({
    data: { 
      email: 'admin@taskflow.com', 
      password: 'password123', 
      name: 'Admin' 
    }
  });

  // On insère les projets initiaux
  await prisma.project.createMany({
    data: [
      { name: 'App Mobile', color: '#3498db' },
      { name: 'API Back', color: '#2ecc71' }
    ]
  });

  console.log('Seed done!');
}

main();