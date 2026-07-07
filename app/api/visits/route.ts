import { NextResponse } from 'next/server'
import { getVisitCount, logVisit } from '@/lib/visitorLog'

export async function GET() {
  try {
    const count = getVisitCount()
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: null }, { status: 502 })
  }
}

export async function POST(request: Request) {
  const { page } = await request.json()
  const userAgent = request.headers.get('user-agent') ?? 'unknown'
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  try {
    const count = logVisit({ page, userAgent, ip })
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: null }, { status: 502 })
  }
}
