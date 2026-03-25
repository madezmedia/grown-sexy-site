import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'The Grown & Sexy Movement'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1A0A0A, #0A0000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          border: '12px solid #DAA520',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '84px',
              fontWeight: '900',
              background: 'linear-gradient(to right, #FFD700, #DAA520, #B8860B)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            GODDE$$
          </h1>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#DC143C',
              marginTop: '-10px',
              letterSpacing: '0.05em',
            }}
          >
            Featured Artist
          </h2>
          <p
            style={{
              fontSize: '28px',
              color: '#FAF9F6',
              opacity: 0.8,
              maxWidth: '800px',
              marginTop: '40px',
            }}
          >
            An exclusive lifestyle community for individuals ages 30+.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: '#DAA520',
            letterSpacing: '0.2em',
          }}
        >
          ESTABLISHED 2026 • LUXURY • CULTURE • VITALITY
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
