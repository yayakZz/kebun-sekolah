import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminPlantDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = await prisma.plant.findUnique({
    where: { id }
  })

  if (!plant) {
    notFound()
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="flex justify-between items-center mb-2">
        <h2>Detail Tanaman & QR Code</h2>
        <Link href="/admin" className="btn btn-secondary">Kembali ke Dashboard</Link>
      </div>

      <div className="card flex gap-1" style={{ flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3>{plant.name}</h3>
          <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{plant.latinName}</p>
          
          <table style={{ marginTop: 0 }}>
            <tbody>
              <tr>
                <th style={{ width: '120px' }}>Kategori</th>
                <td><span className="badge">{plant.category}</span></td>
              </tr>
              <tr>
                <th>Jumlah</th>
                <td>{plant.quantity}</td>
              </tr>
              <tr>
                <th>Keterangan</th>
                <td>{plant.description}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-2">
            <h4>Foto Tanaman:</h4>
            <div style={{ marginTop: '0.5rem' }}>
              <img src={plant.photoPath} alt={plant.name} className="plant-image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px', textAlign: 'center', padding: '2rem', background: 'var(--bg-color)', borderRadius: '8px' }}>
          <h3>QR Code Tanaman</h3>
          <p className="text-muted mb-2">Cetak QR Code ini dan tempelkan di dekat tanaman.</p>
          
          {plant.qrCodeUrl ? (
            <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img src={plant.qrCodeUrl} alt="QR Code" style={{ width: '250px', height: '250px' }} />
            </div>
          ) : (
            <p>QR Code belum tersedia.</p>
          )}

          <div className="mt-2">
            <a href={plant.qrCodeUrl || '#'} download={`QR-${plant.name.replace(/\s+/g, '-')}.png`} className="btn">
              Download QR Code
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
