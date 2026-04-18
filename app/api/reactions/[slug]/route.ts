import { NextResponse } from 'next/server'

type Params = { params: Promise<{ slug: string }> }

// In-memory fallback when Vercel KV is not configured
const memoryStore: Record<string, number> = {}

async function getKV() {
  try {
    // Dynamically import @vercel/kv only when available
    const { kv } = await import('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const key = `reactions:${slug}`

  const kv = await getKV()
  const count = kv
    ? ((await kv.get<number>(key)) ?? 0)
    : (memoryStore[key] ?? 0)

  return NextResponse.json({ count })
}

export async function POST(_req: Request, { params }: Params) {
  const { slug } = await params
  const key = `reactions:${slug}`

  const kv = await getKV()
  let count: number

  if (kv) {
    count = await kv.incr(key)
  } else {
    memoryStore[key] = (memoryStore[key] ?? 0) + 1
    count = memoryStore[key]
  }

  return NextResponse.json({ count })
}
