import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inventaris Tanaman | Kebun Sekolah SMP Muhammadiyah 2 Kediri",
  description: "Website inventaris tanaman untuk Kebun Sekolah SMP Muhammadiyah 2 Kediri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem 0', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="container" style={{ padding: '0.5rem 1rem' }}>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Kebun Sekolah</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>SMP Muhammadiyah 2 Kediri</p>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} SMP Muhammadiyah 2 Kediri.
        </footer>
      </body>
    </html>
  );
}
