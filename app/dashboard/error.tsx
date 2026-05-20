'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ color: '#e74c3c' }}>Une erreur est survenue !</h2>
      <p style={{ color: '#555', margin: '10px 0 20px 0' }}>{error.message}</p>
      <button onClick={() => reset()} style={{
        background: '#1B8C3E',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 4,
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Réessayer le chargement
      </button>
    </div>
  );
}