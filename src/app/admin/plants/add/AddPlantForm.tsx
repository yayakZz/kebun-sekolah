'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPlantForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/plants', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        alert('Gagal menambahkan tanaman.')
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1">
      <div className="form-group">
        <label>Nama Tanaman</label>
        <input type="text" name="name" required placeholder="Contoh: Mawar Merah" />
      </div>
      <div className="form-group">
        <label>Nama Latin</label>
        <input type="text" name="latinName" required placeholder="Contoh: Rosa" />
      </div>
      <div className="form-group">
        <label>Kategori</label>
        <select name="category" required>
          <option value="">-- Pilih Kategori --</option>
          <option value="Tanaman Hias">Tanaman Hias</option>
          <option value="Tanaman Pelindung">Tanaman Pelindung</option>
          <option value="Tanaman Obat">Tanaman Obat</option>
          <option value="Tanaman Sayur">Tanaman Sayur</option>
          <option value="Tanaman Buah">Tanaman Buah</option>
        </select>
      </div>
      <div className="form-group">
        <label>Jumlah</label>
        <input type="number" name="quantity" required min="1" defaultValue="1" />
      </div>
      <div className="form-group">
        <label>Keterangan / Jenis</label>
        <textarea name="description" required rows={4} placeholder="Jelaskan detail tentang tanaman ini..."></textarea>
      </div>
      <div className="form-group">
        <label>Foto Tanaman</label>
        <input type="file" name="photo" accept="image/*" required />
      </div>

      <div className="flex gap-1 mt-2">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Tanaman'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => router.back()} disabled={loading}>
          Batal
        </button>
      </div>
    </form>
  )
}
