import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On tente de récupérer le cookie de session
  const session = request.cookies.get('session');

  // Si l'utilisateur n'a pas de session et essaie d'accéder à une page protégée
  if (!session) {
    // On le redirige vers la page de login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Sinon, on le laisse passer
  return NextResponse.next();
}

// Configuration des routes à protéger
export const config = {
  // On protège le dashboard et toutes les pages projets
  matcher: ['/dashboard/:path*', '/projects/:path*'],
};