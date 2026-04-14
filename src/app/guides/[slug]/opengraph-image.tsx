import { ImageResponse } from 'next/og';
import { getGuideBySlug, getAllGuides } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  const title = guide?.frontmatter.title ?? 'AI Marketing Guide';
  const cluster = guide?.frontmatter.cluster ?? 'AI Marketing';
  const readTime = guide?.readTime ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FDF1D5',
          padding: '56px 72px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 380, height: 380, borderRadius: '50%', background: '#E8B94A', opacity: 0.18, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 6, background: '#E8B94A', display: 'flex' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#202124', letterSpacing: '-0.5px' }}>
            itsdeep.io
          </span>
          {readTime && (
            <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 500 }}>
              {readTime} read
            </span>
          )}
        </div>

        {/* Cluster badge */}
        <div
          style={{
            fontSize: 13, fontWeight: 700, color: '#5a4510',
            background: '#E8B94A', padding: '5px 14px', borderRadius: 20,
            width: 'fit-content', marginBottom: 24,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}
        >
          {cluster}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 60 ? 46 : title.length > 45 ? 52 : 60,
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#202124',
            margin: 0,
            letterSpacing: '-1px',
            flex: 1,
          }}
        >
          {title}
        </h1>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40, paddingTop: 28, borderTop: '1.5px solid #e5d9b6' }}>
          <div
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: '#E8B94A', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18, color: '#5a4510',
            }}
          >
            DU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#202124' }}>
              Deepanshu Udhwani
            </span>
            <span style={{ fontSize: 14, color: '#9ca3af' }}>
              Ex-Alibaba Cloud · Ex-MakeMyTrip · 80,000+ Students
            </span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>103 Free Guides</span>
            <span style={{ fontSize: 13, color: '#9ca3af' }}>No paywalls</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
