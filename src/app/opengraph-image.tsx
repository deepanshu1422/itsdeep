import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FDF1D5',
          padding: '64px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: '#E8B94A', opacity: 0.2, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: '#E8B94A', opacity: 0.15, display: 'flex' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'auto' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#202124', letterSpacing: '-0.5px' }}>
            itsdeep.io
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: 16, fontWeight: 700, color: '#5a4510',
              background: '#E8B94A', padding: '6px 16px', borderRadius: 20,
              width: 'fit-content', marginBottom: 28, letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            AI + Marketing
          </div>
          <h1 style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, color: '#202124', margin: 0, letterSpacing: '-1.5px' }}>
            Practical AI &amp; Marketing
            <br />
            Guides. Free. For Everyone.
          </h1>
          <p style={{ fontSize: 22, color: '#6b7280', marginTop: 24, lineHeight: 1.5 }}>
            103 free guides · 80,000+ students · No paywalls
          </p>
        </div>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40, paddingTop: 32, borderTop: '2px solid #E8B94A' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: '#E8B94A', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 20, color: '#5a4510',
          }}>
            DU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#202124' }}>Deepanshu Udhwani</span>
            <span style={{ fontSize: 15, color: '#9ca3af', marginTop: 2 }}>
              Ex-Alibaba Cloud · Ex-MakeMyTrip · 80,000+ Students
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
