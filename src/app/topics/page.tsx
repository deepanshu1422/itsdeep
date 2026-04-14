import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllClusterMetas } from '@/data/clusters';
import { getAllClusters } from '@/lib/content';

const SITE_URL = 'https://itsdeep.io';

export const metadata: Metadata = {
  title: 'All Topics | itsdeep',
  description: 'Browse all AI marketing topics — email marketing, SEO, content creation, automation, and more. Free in-depth guides by Deepanshu Udhwani.',
  alternates: { canonical: `${SITE_URL}/topics` },
  openGraph: {
    title: 'All Topics | itsdeep',
    description: 'Browse all AI marketing topics — free in-depth guides by Deepanshu Udhwani.',
    url: `${SITE_URL}/topics`,
    siteName: 'itsdeep',
    type: 'website',
  },
};

export default function TopicsIndexPage() {
  const metas = getAllClusterMetas();
  const clusters = getAllClusters();

  // Build a count map from content layer
  const countMap = new Map(clusters.map((c) => [c.slug, c.count]));

  return (
    <div className="mx-auto w-full max-w-[var(--max-content)] px-5 pb-20 pt-10">
      <h1
        className="text-[2rem] font-extrabold tracking-tight sm:text-[2.5rem]"
        style={{ color: 'var(--color-text)' }}
      >
        All Topics
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
        Every guide organized by topic. Pick what you want to learn — AI email marketing, SEO, automation, content creation, and more.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metas.map((meta) => {
          const count = countMap.get(meta.slug) ?? 0;
          return (
            <Link
              key={meta.slug}
              href={`/topics/${meta.slug}`}
              className="group flex flex-col rounded-[var(--radius-lg)] p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--color-accent)', color: '#5a4510' }}
                >
                  {meta.name}
                </span>
                <span className="text-[12px] shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                  {count} {count === 1 ? 'guide' : 'guides'}
                </span>
              </div>
              <p className="text-[14px] font-semibold leading-snug mb-2" style={{ color: 'var(--color-text)' }}>
                {meta.headline}
              </p>
              <p className="text-[13px] leading-relaxed flex-1 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                {meta.subheadline}
              </p>
              <span className="mt-4 text-[12px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                Explore {meta.name} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
