'use client'

import { useTransition } from 'react'

export default function DeleteButton({ id, deleteAction }: { id: string, deleteAction: (id: string) => Promise<void> }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm('Yakin ingin menghapus tanaman ini?')) {
      startTransition(() => {
        deleteAction(id)
      })
    }
  }

  return (
    <button 
      className="btn btn-danger" 
      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} 
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? 'Menghapus...' : 'Hapus'}
    </button>
  )
}
