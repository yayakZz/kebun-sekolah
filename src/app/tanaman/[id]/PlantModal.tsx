'use client'

import { useRouter } from 'next/navigation'

export default function PlantModal({ plant }: { plant: any }) {
  const router = useRouter()

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }} onClick={() => router.push('/')}>
      <div 
        className="card" 
        style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', padding: 0, position: 'relative', margin: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={() => router.push('/')}
          style={{ 
            position: 'absolute', top: '10px', right: '10px', 
            background: 'white', border: 'none', borderRadius: '50%', 
            width: '32px', height: '32px', cursor: 'pointer', 
            fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333'
          }}
        >✕</button>
        <img src={plant.photoPath} alt={plant.name} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
        
        <div style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center mb-1">
            <h2 style={{ margin: 0, color: 'var(--primary-dark)', fontSize: '1.5rem' }}>{plant.name}</h2>
            <span className="badge" style={{ backgroundColor: 'var(--primary)' }}>{plant.category}</span>
          </div>
          
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
            {plant.latinName}
          </p>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-dark)' }}>Informasi</h4>
            <div className="flex justify-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="text-muted">Jumlah di Kebun:</span>
              <strong>{plant.quantity} Tanaman</strong>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Keterangan / Jenis</h4>
            <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
              {plant.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
