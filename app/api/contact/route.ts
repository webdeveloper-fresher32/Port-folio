import { NextResponse } from 'next/server'
import { validateContactForm } from '@/lib/validateContactForm'
import { sendContactEmail } from '@/lib/sendContactEmail'

export async function POST(request: Request) {
  const body = await request.json()
  const result = validateContactForm(body)

  if (!result.valid) {
    return NextResponse.json({ errors: result.errors }, { status: 400 })
  }

  try {
    await sendContactEmail(body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
  }
}
