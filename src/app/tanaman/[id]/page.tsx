import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import HomeContent from '@/app/HomeContent'
import PlantModal from './PlantModal'

export default async function PublicPlantDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = await prisma.plant.findUnique({
    where: { id }
  })

  if (!plant) {
    notFound()
  }

  return (
    <>
      {/* Latar belakang menampilkan beranda (website) */}
      <HomeContent />
      
      {/* Modal overlay di atasnya */}
      <PlantModal plant={plant} />
    </>
  )
}
