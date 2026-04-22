import Link from 'next/link'
import { logout } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import DeleteButton from './DeleteButton'

export default async function AdminDashboard() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function handleLogout() {
    'use server'
    await logout()
    redirect('/admin/login')
  }

  async function handleDelete(id: string) {
    'use server'
    await prisma.plant.delete({ where: { id } })
    revalidatePath('/admin')
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="flex justify-between items-center mb-2">
        <h2>Dashboard Admin</h2>
        <form action={handleLogout}>
          <button type="submit" className="btn btn-secondary">Logout</button>
        </form>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-1">
          <h3>Daftar Tanaman</h3>
          <Link href="/admin/plants/add" className="btn">+ Tambah Tanaman</Link>
        </div>

        {plants.length === 0 ? (
          <p className="text-muted text-center mt-2">Belum ada data tanaman. Silakan tambah tanaman baru.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant.id}>
                    <td>
                      <strong>{plant.name}</strong>
                      <div className="text-muted" style={{ fontSize: '0.875rem' }}>{plant.latinName}</div>
                    </td>
                    <td><span className="badge">{plant.category}</span></td>
                    <td>{plant.quantity}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/admin/plants/${plant.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Detail & QR</Link>
                        <DeleteButton id={plant.id} deleteAction={handleDelete} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
