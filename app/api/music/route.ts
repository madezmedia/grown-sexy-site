import { NextResponse } from 'next/server'
import { getMusic } from '@/lib/outstatic'

export async function GET() {
  try {
    const tracks = await getMusic()
    return NextResponse.json(tracks)
  } catch (error) {
    console.error('Error fetching music:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
