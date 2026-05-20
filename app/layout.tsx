import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import LogoutButton from './components/LogoutButton';

// Configuration de la police Google Font chargée localement
const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const user = session ? JSON.parse(session.value) : null;

  return (
    <html lang="fr">
      {/* On applique la classe inter.className ici */}
      <body className={inter.className} style={{ margin: 0 }}>
        <header style={{ 
          background: '#1B8C3E', 
          color: 'white', 
          padding: '1rem 2rem',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>TaskFlow</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user && <span>{user.name}</span>}
            {user && <LogoutButton />}
            {!user && <a href="/login" style={{ color: 'white' }}>Login</a>}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}