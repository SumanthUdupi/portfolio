import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Sumanth Udupi'
  const sub   = searchParams.get('sub')   ?? 'Product Designer'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 64,
          background: '#F5F0E8',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: 14, color: '#5C4F3D', marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' as const }}>
          chaos.curious.me
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, color: '#1A1410', lineHeight: 1.15, maxWidth: 800 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#5C4F3D', marginTop: 16 }}>
          {sub}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#1D6A72',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
