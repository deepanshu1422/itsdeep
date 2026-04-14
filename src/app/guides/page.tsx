import type { Metadata } from 'next';

import { getAllGuides, getAllClusters } from '@/lib/content';
import { fetchGuidePhoto } from '@/lib/pexels';
import GuidesSearchable, { type SerializableGuide } from '@/components/ui/GuidesSearchable';

const SITE_URL = 'https://itsdeep.io';

export const metadata: Metadata = {
  title: 'Guides | itsdeep',
  description: 'In-depth guides on AI marketing, automation, and growth strategies by Deepanshu Udhwani.',
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'Guides | itsdeep',
    description: 'In-depth guides on AI marketing, automation, and growth strategies.',
    url: `${SITE_URL}/guides`,
    siteName: 'itsdeep',
    type: 'website',
  },
};

export default async function GuidesIndexPage() {
  const guides = getAllGuides();
  const clusters = getAllClusters();

  // Fetch a unique photo per guide using its primaryKeyword + slug hash for visual variety
  const guidePhotoEntries = await Promise.all(
    guides.map(async (g) => {
      const photo = await fetchGuidePhoto(g.frontmatter.primaryKeyword, g.slug);
      return [g.slug, photo?.src.medium ?? null] as const;
    })
  );
  const guidePhotoMap = Object.fromEntries(guidePhotoEntries);

  // Group guides by cluster
  const grouped = new Map<string, SerializableGuide[]>();
  for (const guide of guides) {
    const cluster = guide.frontmatter.cluster;
    const existing = grouped.get(cluster) ?? [];
    existing.push({
      slug: guide.slug,
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      cluster: guide.frontmatter.cluster,
      clusterSlug: guide.frontmatter.clusterSlug,
      readTime: guide.readTime,
      photoUrl: guidePhotoMap[guide.slug] ?? null,
    });
    grouped.set(cluster, existing);
  }

  const clusterSections = clusters.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: c.count,
    guides: grouped.get(c.name) ?? [],
  }));

  return (
    <div className="mx-auto w-full max-w-[var(--max-content)] px-5 pb-20 pt-10">
      <h1
        className="text-[2rem] font-extrabold tracking-tight sm:text-[2.5rem]"
        style={{ color: 'var(--color-text)' }}
      >
        Guides
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        In-depth resources on AI marketing, automation, and growth strategies.
      </p>

      {clusters.length === 0 ? (
        <p className="mt-12" style={{ color: 'var(--color-text-muted)' }}>
          No guides published yet. Check back soon.
        </p>
      ) : (
        <GuidesSearchable clusters={clusterSections} totalCount={guides.length} />
      )}
    </div>
  );
}
