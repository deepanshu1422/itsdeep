import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { getGuideBySlug, getAllGuides } from '@/lib/content';
import { compileMDXContent, extractHeadings } from '@/lib/mdx';
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data';
import PageHero from '@/components/content/PageHero';
import BlogGraphic, { BlogGraphicSmall } from '@/components/ui/BlogGraphic';
import CTABlock from '@/components/content/CTABlock';
import { fetchGuidePhoto, type PexelsPhoto } from '@/lib/pexels';
import ReadingProgress from '@/components/ui/ReadingProgress';
import SocialShare from '@/components/content/SocialShare';

const SITE_URL = 'https://itsdeep.io';

/* ---------- Guide header image (Pexels or SVG fallback) ---------- */

function GuideHeaderImage({
  photo,
  slug,
  title,
}: {
  photo: PexelsPhoto | null;
  slug: string;
  title: string;
}) {
  if (photo) {
    return (
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] h-48 sm:h-56">
        <Image
          src={photo.src.large}
          alt={photo.alt || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) calc(100vw - 40px), 736px"
          priority
        />
        <a
          href={photo.photographer_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-3 text-[10px] rounded px-1.5 py-0.5"
          style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.85)' }}
        >
          {photo.photographer} / Pexels
        </a>
      </div>
    );
  }
  return (
    <BlogGraphic
      slug={slug}
      title={title}
      className="rounded-[var(--radius-lg)] h-48 sm:h-56"
    />
  );
}

/* ---------- Static generation ---------- */

export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

/* ---------- SEO metadata ---------- */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found' };

  const { frontmatter } = guide;
  return {
    title: `${frontmatter.title} | itsdeep`,
    description: frontmatter.description,
    keywords: [frontmatter.primaryKeyword, ...frontmatter.secondaryKeywords],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${SITE_URL}/guides/${slug}`,
      siteName: 'itsdeep',
      type: 'article',
      modifiedTime: frontmatter.lastUpdated,
    },
    authors: [{ name: 'Deepanshu Udhwani', url: 'https://itsdeep.io/about' }],
    alternates: { canonical: `${SITE_URL}/guides/${slug}` },
  };
}

/* ---------- Sub-components ---------- */

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-5 pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
        <li><Link href="/" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>Home</Link></li>
        <li><span aria-hidden="true" style={{ color: 'var(--color-border)' }}> / </span></li>
        <li><Link href="/guides" className="hover:underline" style={{ color: 'var(--color-text-muted)' }}>Guides</Link></li>
        <li><span aria-hidden="true" style={{ color: 'var(--color-border)' }}> / </span></li>
        <li style={{ color: 'var(--color-text)' }}>{title}</li>
      </ol>
    </nav>
  );
}

function TOCSidebar({ headings }: { headings: Array<{ id: string; text: string; level: number }> }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="hidden lg:block sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>On this page</p>
      <ul className="space-y-1 text-[13px]" style={{ borderLeft: '2px solid var(--color-border)' }}>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}>
            <a href={`#${h.id}`} className="block py-1 transition-colors hover:underline" style={{ color: 'var(--color-text-muted)' }}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AuthorBlock() {
  return (
    <div className="mt-10 rounded-[var(--radius)] p-5" style={{ background: 'var(--color-bg-warm)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: 'var(--color-primary)' }}>
          DU
        </div>
        <div>
          <p className="text-[15px] font-semibold" style={{ color: 'var(--color-text)' }}>Deepanshu Udhwani</p>
          <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Ex-Alibaba Cloud &middot; Ex-MakeMyTrip &middot; Taught 80,000+ students</p>
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
  );
}

function FAQSection({ faq }: { faq: Array<{ question: string; answer: string }> }) {
  if (!faq || faq.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-[20px] font-bold" style={{ color: 'var(--color-text)' }}>Frequently Asked Questions</h2>
      <div className="mt-4 rounded-[var(--radius)]" style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        {faq.map((item, i) => (
          <details key={item.question} className="group" style={i < faq.length - 1 ? { borderBottom: '1px solid var(--color-border)' } : undefined}>
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-[15px] font-semibold" style={{ color: 'var(--color-text)' }}>
              {item.question}
              <span className="shrink-0 text-[18px] transition-transform group-open:rotate-45" style={{ color: 'var(--color-text-muted)' }}>+</span>
            </summary>
            <div className="px-5 pb-5 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {item.answer}
            </div>
          </details>
        ))}
      </div>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </section>
  );
}

function RelatedGuides({ slugs }: { slugs: string[] }) {
  if (!slugs || slugs.length === 0) return null;
  const related = slugs.map((s) => getGuideBySlug(s)).filter((g): g is NonNullable<typeof g> => g !== null);
  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-[20px] font-bold" style={{ color: 'var(--color-text)' }}>Related Guides</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group overflow-hidden rounded-[var(--radius)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <BlogGraphicSmall slug={guide.slug} className="w-full h-24" />
            <div className="p-4">
              <p className="text-[14px] font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
                {guide.frontmatter.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                {guide.frontmatter.description}
              </p>
              <span className="mt-2 inline-block text-[12px] font-semibold" style={{ color: 'var(--color-primary)' }}>Read Guide →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { frontmatter, content, readTime } = guide;
  const headings = extractHeadings(content);
  const [mdxContent, heroPhoto] = await Promise.all([
    compileMDXContent(content),
    fetchGuidePhoto(frontmatter.primaryKeyword, slug),
  ]);

  const articleSchema = {
    ...generateArticleSchema({
      title: frontmatter.title,
      description: frontmatter.description,
      slug,
      lastUpdated: frontmatter.lastUpdated,
    }),
    author: {
      '@type': 'Person',
      name: 'Deepanshu Udhwani',
      url: 'https://itsdeep.io/about',
      sameAs: [
        'https://www.youtube.com/@itsdeep-io',
        'https://www.linkedin.com/in/deepanshu-udhwani/',
        'https://www.instagram.com/itsdeep.io/',
      ],
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: frontmatter.title, href: `/guides/${slug}` },
  ]);

  const guideUrl = `https://itsdeep.io/guides/${slug}`;

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumbs title={frontmatter.title} />

      {/* Guide header: real Pexels photo, falls back to SVG if API unavailable */}
      <div className="mx-auto max-w-3xl px-5 pt-4">
        <GuideHeaderImage photo={heroPhoto} slug={slug} title={frontmatter.title} />
      </div>

      <div className="mx-auto max-w-3xl px-5">
        <PageHero
          title={frontmatter.title}
          description={frontmatter.description}
          readTime={readTime}
          lastUpdated={frontmatter.lastUpdated}
          category={frontmatter.cluster}
        />
      </div>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-16 lg:grid-cols-[1fr_220px]">
        <article className="prose-content mx-auto w-full max-w-3xl">
          {mdxContent}
        </article>
        <aside className="order-first lg:order-last">
          <TOCSidebar headings={headings} />
        </aside>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-20">
        <SocialShare title={frontmatter.title} url={guideUrl} />
        <AuthorBlock />
        <FAQSection faq={frontmatter.faq} />
        <CTABlock />
        <RelatedGuides slugs={frontmatter.relatedSlugs} />
      </div>
    </>
  );
}
