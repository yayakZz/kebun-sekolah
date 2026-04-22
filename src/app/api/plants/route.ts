import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import QRCode from 'qrcode'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const latinName = formData.get('latinName') as string
    const category = formData.get('category') as string
    const quantity = parseInt(formData.get('quantity') as string)
    const description = formData.get('description') as string
    const photo = formData.get('photo') as File

    if (!photo || !name || !latinName || !category) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    // Handle File Upload to Vercel Blob
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = `uploads/${uniqueSuffix}-${photo.name.replace(/\s+/g, '_')}`
    
    const blob = await put(filename, photo, {
      access: 'public',
    })

    const photoPath = blob.url

    // Create record in database
    const plant = await prisma.plant.create({
      data: {
        name,
        latinName,
        category,
        quantity,
        description,
        photoPath
      }
    })

    // Generate QR Code URL
    // Asumsikan URL produksi kita dapatkan dari request headers host
    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const plantUrl = `${protocol}://${host}/tanaman/${plant.id}`

    // Generate QR Code as Base64 Data URL
    const qrCodeUrl = await QRCode.toDataURL(plantUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1B5E20', // Hijau Tua
        light: '#FFFFFF'
      }
    })

    // Update plant with QR Code
    await prisma.plant.update({
      where: { id: plant.id },
      data: { qrCodeUrl }
    })

    return NextResponse.json({ success: true, plant })
  } catch (error) {
    console.error('Error creating plant:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
