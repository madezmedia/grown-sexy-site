import { NextResponse } from 'next/server'
import { getEvents, getFeaturedEvents } from '@/lib/outstatic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    const events = featured === 'true'
      ? await getFeaturedEvents()
      : await getEvents()

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
