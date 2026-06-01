import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="nl">
      <body>
        <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '4rem 1rem', textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
            <p style={{ marginBottom: '2rem' }}>Deze pagina bestaat niet meer.</p>
            <Link href="/" style={{ textDecoration: 'underline' }}>Terug naar home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
