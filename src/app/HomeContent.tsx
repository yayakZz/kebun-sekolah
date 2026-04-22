import Link from 'next/link'

export default function HomeContent() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Selamat Datang di Kebun Sekolah</h1>
      <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>SMP Muhammadiyah 2 Kediri</h2>
      
      <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--text-muted)' }}>
        Eksplorasi berbagai jenis tanaman yang ada di kebun sekolah kami. 
        Mulai dari tanaman hias, tanaman pelindung, hingga tanaman obat dan buah-buahan.
        Pindai QR Code pada tanaman untuk melihat detail lengkapnya!
      </p>

      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h3>Admin Area</h3>
        <p className="text-muted mb-2">Masuk untuk mengelola inventaris tanaman.</p>
        <Link href="/admin" className="btn">Masuk Admin</Link>
      </div>
    </div>
  )
}
