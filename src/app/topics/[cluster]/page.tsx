import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { getGuidesByClusterSlug, getAllClusterSlugs } from '@/lib/content';
import { getClusterMeta, getAllClusterMetas } from '@/data/clusters';
import { fetchGuidePhoto, fetchClusterPhoto, type PexelsPhoto } from '@/lib/pexels';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structured-data';
import CTABlock from '@/components/content/CTABlock';

const SITE_URL = 'https://itsdeep.io';

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  const metas = getAllClusterMetas();
  return metas.map((m) => ({ cluster: m.slug }));
}

/* ---------- SEO metadata ---------- */

interface PageProps {
  params: Promise<{ cluster: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cluster } = await params;
  const meta = getClusterMeta(cluster);
  if (!meta) return { title: 'Topic Not Found' };

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    keywords: [meta.primaryKeyword, meta.name, 'AI marketing', 'itsdeep'],
    alternates: { canonical: `${SITE_URL}/topics/${cluster}` },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: `${SITE_URL}/topics/${cluster}`,
      siteName: 'itsdeep',
      type: 'website',
    },
  };
}

/* ---------- Sub-components ---------- */

function Breadcrumbs({ clusterName, clusterSlug }: { clusterName: string; clusterSlug: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
        <li><Link href="/" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>Home</Link></li>
        <li><span aria-hidden="true" style={{ color: 'var(--color-border)' }}> / </span></li>
        <li><Link href="/guides" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>Guides</Link></li>
        <li><span aria-hidden="true" style={{ color: 'var(--color-border)' }}> / </span></li>
        <li style={{ color: 'var(--color-text)' }}>{clusterName}</li>
      </ol>
    </nav>
  );
}

function BenefitCard({ text, index }: { text: string; index: number }) {
  const icons = ['✦', '◈', '◉', '✧'];
  return (
    <div
      className="flex gap-3 rounded-[var(--radius)] p-4"
      style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <span className="shrink-0 text-[18px] mt-0.5" style={{ color: 'var(--color-accent)' }}>{icons[index % icons.length]}</span>
      <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{text}</p>
    </div>
  );
}

function GuideCard({
  slug,
  title,
  description,
  readTime,
  photo,
}: {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  photo: PexelsPhoto | null;
}) {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
      style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="relative h-40 overflow-hidden">
        {photo ? (
          <>
            <Image
              src={photo.src.medium}
              alt={photo.alt || title}
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 40px), 380px"
            />
            <span
              className="absolute bottom-1.5 right-2 rounded px-1 py-0.5 text-[10px] pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)' }}
            >
              {photo.photographer} / Pexels
            </span>
          </>
        ) : (
          <div className="h-full w-full" style={{ background: 'var(--color-bg-warm)' }} />
        )}
      </div>
      <Link href={`/guides/${slug}`} className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{title}</h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{readTime}</span>
          <span className="text-[12px] font-semibold" style={{ color: 'var(--color-primary)' }}>Read →</span>
        </div>
      </Link>
    </div>
  );
}

function FAQSection({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="text-[22px] font-bold" style={{ color: 'var(--color-text)' }}>Frequently Asked Questions</h2>
      <div
        className="mt-5 rounded-[var(--radius-lg)]"
        style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
      >
        {faqs.map((item, i) => (
          <details
            key={item.question}
            className="group"
            style={i < faqs.length - 1 ? { borderBottom: '1px solid var(--color-border)' } : undefined}
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-4 p-5 text-[15px] font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              {item.question}
              <span className="shrink-0 text-[18px] transition-transform group-open:rotate-45" style={{ color: 'var(--color-text-muted)' }}>+</span>
            </summary>
            <div className="px-5 pb-5 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default async function TopicClusterPage({ params }: PageProps) {
  const { cluster } = await params;
  const meta = getClusterMeta(cluster);
  if (!meta) notFound();

  const guides = getGuidesByClusterSlug(cluster);

  // Fetch per-guide photos in parallel
  const photoEntries = await Promise.all(
    guides.map(async (g) => {
      const photo = await fetchGuidePhoto(g.frontmatter.primaryKeyword, g.slug);
      return [g.slug, photo] as const;
    })
  );
  const photoMap = Object.fromEntries(photoEntries);

  // Hero photo for the cluster
  const heroPhoto = await fetchClusterPhoto(cluster);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: meta.name, href: `/topics/${cluster}` },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.metaTitle,
    description: meta.metaDescription,
    url: `${SITE_URL}/topics/${cluster}`,
    author: {
      '@type': 'Person',
      name: 'Deepanshu Udhwani',
      url: `${SITE_URL}/about`,
    },
    hasPart: guides.map((g) => ({
      '@type': 'Article',
      name: g.frontmatter.title,
      url: `${SITE_URL}/guides/${g.slug}`,
      description: g.frontmatter.description,
    })),
  };

  const faqSchema = meta.faqs.length > 0 ? generateFAQSchema({ faq: meta.faqs }) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="mx-auto w-full max-w-[var(--max-content)] px-5 pb-24 pt-10">
        <Breadcrumbs clusterName={meta.name} clusterSlug={cluster} />

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] mb-12"
          style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-border)' }}>
          {heroPhoto && (
            <div className="absolute inset-0">
              <Image
                src={heroPhoto.src.large}
                alt={heroPhoto.alt || meta.name}
                fill
                className="object-cover opacity-20"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          )}
          <div className="relative px-8 py-14 sm:px-14 sm:py-20">
            <span
              className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-5"
              style={{ background: 'var(--color-accent)', color: '#5a4510' }}
            >
              {meta.name}
            </span>
            <h1
              className="text-[2rem] font-extrabold leading-[1.2] tracking-tight sm:text-[2.75rem] max-w-3xl"
              style={{ color: 'var(--color-text)' }}
            >
              {meta.headline}
            </h1>
            <p
              className="mt-4 text-[1.0625rem] leading-relaxed max-w-2xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {meta.subheadline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
              <span>{guides.length} guides</span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span>By Deepanshu Udhwani</span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span>Free, no signup</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        {meta.benefits.length > 0 && (
          <section className="mb-14">
            <h2 className="text-[18px] font-bold mb-5" style={{ color: 'var(--color-text)' }}>
              What you&apos;ll learn
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {meta.benefits.map((benefit, i) => (
                <BenefitCard key={i} text={benefit} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Guides grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-bold" style={{ color: 'var(--color-text)' }}>
              All {meta.name} Guides
            </h2>
            <span className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
              {guides.length} {guides.length === 1 ? 'guide' : 'guides'}
            </span>
          </div>

          {guides.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>No guides in this topic yet — check back soon.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard
                  key={guide.slug}
                  slug={guide.slug}
                  title={guide.frontmatter.title}
                  description={guide.frontmatter.description}
                  readTime={guide.readTime}
                  photo={photoMap[guide.slug] ?? null}
                />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="mt-16">
          <CTABlock variant="hero" />
        </div>

        {/* Author block */}
        <div
          className="mt-10 rounded-[var(--radius)] p-5"
          style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              DU
            </div>
            <div>
              <p className="text-[15px] font-semibold" style={{ color: 'var(--color-text)' }}>Deepanshu Udhwani</p>
              <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Ex-Alibaba Cloud · Ex-MakeMyTrip · Taught 80,000+ students</p>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Building AI + Marketing systems. Teaching everything for free.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <a href="https://www.youtube.com/@itsdeep-io" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>YouTube</a>
            <a href="https://www.linkedin.com/in/deepanshu-udhwani/" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>LinkedIn</a>
          </div>
        </div>

        {/* FAQ */}
        <FAQSection faqs={meta.faqs} />

        {/* Browse all topics */}
        <div className="mt-16 rounded-[var(--radius)] p-6 text-center" style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)' }}>
          <p className="text-[15px] font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
            Explore more topics
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {getAllClusterMetas()
              .filter((m) => m.slug !== cluster)
              .slice(0, 8)
              .map((m) => (
                <Link
                  key={m.slug}
                  href={`/topics/${m.slug}`}
                  className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors hover:opacity-80"
                  style={{ background: 'var(--color-bg-warm)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
                >
                  {m.name}
                </Link>
              ))}
            <Link
              href="/guides"
              className="rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors"
              style={{ background: 'var(--color-accent)', color: '#5a4510' }}
            >
              All Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
