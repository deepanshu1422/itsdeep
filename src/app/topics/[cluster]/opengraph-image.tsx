import { ImageResponse } from 'next/og';
import { getClusterMeta, getAllClusterMetas } from '@/data/clusters';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllClusterMetas().map((m) => ({ cluster: m.slug }));
}

export default async function ClusterOGImage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const meta = getClusterMeta(cluster);

  const name = meta?.name ?? 'Topic';
  const headline = meta?.headline ?? 'In-depth guides on AI Marketing';
  const description = meta?.metaDescription ?? 'Free guides by Deepanshu Udhwani';

  // Truncate headline for display
  const shortHeadline = headline.length > 70 ? headline.slice(0, 67) + '...' : headline;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FDF8EE',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 340, height: 340, borderRadius: '50%', background: '#E8B94A', opacity: 0.12 }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, borderRadius: '50%', background: '#F8D481', opacity: 0.18 }} />
        <div style={{ position: 'absolute', top: 120, right: 200, width: 80, height: 80, borderRadius: '50%', background: '#E8B94A', opacity: 0.2 }} />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 60px 0' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>itsdeep.io</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#5a4510', background: '#E8B94A', padding: '6px 14px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {name}
          </span>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 60px' }}>
          <div style={{ fontSize: headline.length > 50 ? 44 : 52, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, letterSpacing: '-1px', maxWidth: 900 }}>
            {shortHeadline}
          </div>
          <div style={{ marginTop: 20, fontSize: 20, color: '#5a5a5a', lineHeight: 1.5, maxWidth: 740 }}>
            {description.length > 120 ? description.slice(0, 117) + '...' : description}
          </div>
        </div>

        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 60px 44px', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff' }}>
            DU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>Deepanshu Udhwani</span>
            <span style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Ex-Alibaba · Ex-MakeMyTrip · 80,000+ students</span>
          </div>
        </div>

        {/* Bottom gold bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #E8B94A, #F8D481)' }} />
      </div>
    ),
    { ...size }
  );
}
