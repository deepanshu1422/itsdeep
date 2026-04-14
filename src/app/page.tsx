import Link from "next/link";
import Image from "next/image";
import { pages } from "@/data/pages";
import CTABlock from "@/components/content/CTABlock";
import {
  HeroPattern,
  TopicIllustration,
  WaveDivider,
} from "@/components/ui/GeneratedGraphics";
import { BlogGraphicSmall } from "@/components/ui/BlogGraphic";
import { fetchPexelsPhoto, getQueryForSlug } from "@/lib/pexels";

const SKOOL_LINK = "https://www.skool.com/ai-marketing-with-deepanshu-3730";

/* Clusters derived from pages data */
const clusterMeta: Record<string, string> = {
  "ai-marketing-tools": "Tools that move the needle",
  "ai-content-creation": "Create without AI slop",
  "ai-email-marketing": "Emails that convert",
  "ai-seo": "Rank higher, smarter",
  "marketing-automation": "Stop manual work",
  "ai-business-automation": "Automate operations",
  "ai-social-media-marketing": "Grow authentically",
  "ai-chatbots": "Chatbots that help",
  "ai-productivity": "Save hours weekly",
  "ai-advertising": "Spend smarter on ads",
  "ai-analytics": "Measure what matters",
  "ai-sales": "Close without grinding",
  "learn-ai": "Start from scratch",
  "ai-strategy": "Big picture frameworks",
  "ai-tools-guides": "Specific tool deep-dives",
  "industry-guides": "Industry-specific plays",
};

function getClusters() {
  const map = new Map<string, { name: string; count: number }>();
  for (const page of pages) {
    const e = map.get(page.clusterSlug);
    if (e) e.count++;
    else map.set(page.clusterSlug, { name: page.cluster, count: 1 });
  }
  return Array.from(map.entries()).map(([slug, { name, count }], i) => ({
    slug,
    name,
    count,
    desc: clusterMeta[slug] ?? "",
    seed: i,
  }));
}

const featured = [
  { title: "Best AI Marketing Tools", slug: "ai-marketing-tools", time: "18 min", tag: "Popular" },
  { title: "AI Writing Tools Compared", slug: "ai-writing-tools", time: "22 min", tag: "Editor's Pick" },
  { title: "AI Email Marketing Guide", slug: "ai-email-marketing", time: "15 min", tag: "High Impact" },
  { title: "How to Learn AI in 2026", slug: "how-to-learn-ai", time: "16 min", tag: "Start Here" },
];

export default async function Home() {
  const clusters = getClusters();

  // Fetch photos for the 4 featured guides in parallel
  const featuredPhotos = await Promise.all(
    featured.map((g) => fetchPexelsPhoto(getQueryForSlug(g.slug)))
  );

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-5 pt-14 pb-16 sm:pt-24 sm:pb-28">
        <HeroPattern className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[720px] text-center">
          <h1
            className="text-[2.25rem] font-extrabold leading-[1.12] tracking-tight sm:text-[3.25rem]"
            style={{ color: "var(--color-text)" }}
          >
            Your Competitors Are Already
            <br />
            <span
              style={{
                background: "var(--color-highlight)",
                padding: "2px 12px",
                borderRadius: "6px",
              }}
            >
              Using AI to Market
            </span>
          </h1>
          <p
            className="mx-auto mt-5 max-w-[520px] text-[1.0625rem] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            103 free guides from an engineer selected top 29 worldwide at Alibaba Cloud,
            who&apos;s already taught 80,000+ people AI and marketing. No fluff. No paywalls.
            Just what works.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/guides"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius)] px-7 text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--color-text)", color: "var(--color-bg-white)" }}
            >
              Browse 103 Free Guides
            </Link>
            <a
              href={SKOOL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius)] px-7 text-[15px] font-bold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--color-accent)", color: "#1a1a1a" }}
            >
              Join Free Community
            </a>
          </div>
          <p className="mt-4 text-[13px]" style={{ color: "var(--color-text-muted)" }}>
            As seen building at Alibaba Cloud, MakeMyTrip, and 30DaysCoding
          </p>
        </div>
      </section>

      {/* ===== CREDIBILITY BAR ===== */}
      <section className="px-5 pb-12">
        <div
          className="mx-auto max-w-[var(--max-content)] rounded-[var(--radius-lg)] px-6 py-5"
          style={{
            background: "var(--color-bg-white)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <p
            className="mb-3 text-center text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            Built systems at
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
            <div>
              <p className="text-[15px] font-bold" style={{ color: "var(--color-text)" }}>
                Alibaba Cloud
              </p>
              <p className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>
                Top 29 open-source interns worldwide
              </p>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: "var(--color-text)" }}>
                MakeMyTrip
              </p>
              <p className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>
                Backend for 100,000+ concurrent users
              </p>
            </div>
            <div>
              <p className="text-[15px] font-bold" style={{ color: "var(--color-text)" }}>
                30DaysCoding
              </p>
              <p className="text-[13px]" style={{ color: "var(--color-text-muted)" }}>
                80,000+ students across 15 countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS EXISTS ===== */}
      <section className="px-5 py-14" style={{ background: "var(--color-bg-warm)" }}>
        <div className="mx-auto max-w-[640px]">
          <h2
            className="mb-6 text-[22px] font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Why This Exists
          </h2>
          <div
            className="space-y-4 text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <p>
              I started my career implementing io_uring support for PostgreSQL at{" "}
              <strong style={{ color: "var(--color-text)" }}>Alibaba Cloud</strong>,
              where I was selected among the top 29 open-source interns worldwide and
              achieved a 6.5% I/O speed increase on a database used by millions. Then I
              moved to{" "}
              <strong style={{ color: "var(--color-text)" }}>MakeMyTrip</strong> --
              India&apos;s largest travel platform -- where I built backend systems handling
              100,000+ concurrent users, delivered a 4x throughput increase, won
              &quot;Super Starter of the Year,&quot; and took first place at the 2022
              Inter-team Hackathon.
            </p>
            <p>
              Somewhere along the way, I co-founded{" "}
              <strong style={{ color: "var(--color-text)" }}>30DaysCoding</strong> and
              taught 80,000+ students across 15 countries -- with zero external funding.
              I realized the biggest gap wasn&apos;t talent or desire. It was access.
              People wanted to learn AI and marketing, but every resource was either
              watered down, outdated, or locked behind a paywall.
            </p>
            <p>
              <strong style={{ color: "var(--color-text)" }}>
                Now I&apos;m giving away everything I learned. For free.
              </strong>{" "}
              Every system, every workflow, every tool recommendation -- extracted from
              building at Alibaba scale and refined through teaching 80,000+ students.
              My mission is to teach 10 million people AI and marketing, and this site
              is how it starts.
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="px-5 py-10" style={{ background: "var(--color-bg-white)" }}>
        <div className="mx-auto grid max-w-[var(--max-content)] grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: "80,000+", l: "Students Taught" },
            { n: "100,000+", l: "Users Served at Scale" },
            { n: "103", l: "Free Guides" },
            { n: "15", l: "Countries Reached" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-[var(--radius)] p-5 text-center"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="text-[1.5rem] font-extrabold"
                style={{ color: "var(--color-text)" }}
              >
                {s.n}
              </div>
              <div
                className="mt-1 text-[12px] font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider className="w-full h-8 -mb-1" />

      {/* ===== FEATURED GUIDES ===== */}
      <section className="px-5 py-14" style={{ background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-[var(--max-content)]">
          <h2
            className="mb-1 text-[20px] font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Start Here
          </h2>
          <p className="mb-6 text-[14px]" style={{ color: "var(--color-text-muted)" }}>
            The guides people read first. Each one gives you something you can use today.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((g, i) => {
              const photo = featuredPhotos[i];
              return (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group overflow-hidden rounded-[var(--radius)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
                style={{
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  background: "var(--color-bg-white)",
                }}
              >
                {photo ? (
                  <div className="relative w-full h-28 overflow-hidden">
                    <Image
                      src={photo.src.medium}
                      alt={photo.alt || g.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <BlogGraphicSmall slug={g.slug} className="w-full h-28" />
                )}
                <div className="p-4" style={{ background: "var(--color-bg-white)" }}>
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: "var(--color-accent)", color: "#5a4510" }}
                    >
                      {g.tag}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {g.time}
                    </span>
                  </div>
                  <h3
                    className="mt-2 text-[15px] font-semibold leading-snug"
                    style={{ color: "var(--color-text)" }}
                  >
                    {g.title}
                  </h3>
                  <div
                    className="mt-2 text-[13px] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Read Guide
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDivider flip className="w-full h-8 -mt-1" />

      {/* ===== WHAT YOU'LL LEARN ===== */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-[var(--max-content)]">
          <h2
            className="mb-2 text-center text-[22px] font-bold"
            style={{ color: "var(--color-text)" }}
          >
            What You&apos;ll Walk Away With
          </h2>
          <p
            className="mx-auto mb-8 max-w-[480px] text-center text-[14px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Not theory. Not hype. Specific systems you can implement this week.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "AI That Actually Works",
                subtitle: "Specific tools + workflows, not vague predictions",
                points: [
                  "Which AI tools are worth your time (and which are noise)",
                  "Copy-paste prompts that produce usable marketing output",
                  "Workflows tested on 80,000+ students, not just in theory",
                ],
              },
              {
                title: "Marketing Systems",
                subtitle: "From someone who built at Alibaba scale",
                points: [
                  "Funnels, email sequences, and content engines that convert",
                  "SEO strategies from ranking real pages, not blog posts about SEO",
                  "The exact playbook that grew 30DaysCoding to 80K+ students",
                ],
              },
              {
                title: "Automation",
                subtitle: "Stop doing manually what machines handle",
                points: [
                  "Automate content creation without producing AI slop",
                  "Set up lead nurturing that runs while you sleep",
                  "Connect tools into pipelines that save 10+ hours per week",
                ],
              },
            ].map((col) => (
              <div
                key={col.title}
                className="overflow-hidden rounded-[var(--radius)]"
                style={{
                  background: "var(--color-bg-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="p-5 pb-2" style={{ background: "var(--color-bg-warm)" }}>
                  <h3
                    className="text-[16px] font-bold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {col.title}
                  </h3>
                  <p
                    className="mt-0.5 text-[13px]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {col.subtitle}
                  </p>
                </div>
                <ul className="p-5 space-y-3">
                  {col.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2.5 text-[14px] leading-snug"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / COMMUNITY ===== */}
      <section className="px-5 py-14" style={{ background: "var(--color-bg-cream)" }}>
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className="text-[22px] font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Join 80,000+ People Learning with Deepanshu
          </h2>
          <p
            className="mx-auto mt-3 max-w-[460px] text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            While you&apos;re thinking about it, someone who started last week is already
            automating their marketing. The community is free, the guides are free, and
            the only cost of waiting is falling further behind.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {[
              { n: "80K+", l: "Students" },
              { n: "15", l: "Countries" },
              { n: "103", l: "Guides" },
              { n: "$0", l: "Cost" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div
                  className="text-[1.25rem] font-extrabold"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[11px] font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <a
            href={SKOOL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-[var(--radius)] px-7 text-[14px] font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "var(--color-accent)", color: "#1a1a1a" }}
          >
            Join the Free Community
          </a>
        </div>
      </section>

      {/* ===== BROWSE BY TOPIC ===== */}
      <section className="px-5 py-14" style={{ background: "var(--color-bg-white)" }}>
        <div className="mx-auto max-w-[var(--max-content)]">
          <h2
            className="mb-1 text-[20px] font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Browse by Topic
          </h2>
          <p className="mb-6 text-[14px]" style={{ color: "var(--color-text-muted)" }}>
            Every guide solves one specific problem. Pick yours.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clusters.map((c) => (
              <Link
                key={c.slug}
                href={`/guides?cluster=${c.slug}`}
                className="group relative overflow-hidden rounded-[var(--radius)] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <TopicIllustration
                  seed={c.seed * 13 + 7}
                  className="absolute right-0 top-0 h-full w-20 opacity-30"
                />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <h3
                      className="truncate text-[14px] font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {c.name}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-bold"
                      style={{ background: "var(--color-accent)", color: "#5a4510" }}
                    >
                      {c.count}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[13px] leading-snug"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {c.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT CARD ===== */}
      <section className="px-5 py-14">
        <div
          className="mx-auto max-w-[680px] overflow-hidden rounded-[var(--radius-lg)]"
          style={{
            background: "var(--color-bg-white)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            className="relative h-20 overflow-hidden"
            style={{ background: "var(--color-bg-warm)" }}
          >
            <HeroPattern className="absolute inset-0 w-full h-full opacity-30" />
          </div>
          <div className="relative -mt-8 p-6 sm:p-8">
            <div className="flex items-end gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold ring-4 ring-white"
                style={{ background: "var(--color-accent)", color: "#5a4510" }}
              >
                DU
              </div>
              <div className="pb-1">
                <h2
                  className="text-[17px] font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  Deepanshu Udhwani
                </h2>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Engineer / ex-Alibaba Cloud / ex-MakeMyTrip / MBA
                </p>
              </div>
            </div>
            <div
              className="mt-4 space-y-2 text-[14px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p>
                <strong style={{ color: "var(--color-text)" }}>Alibaba Cloud:</strong>{" "}
                Top 29 open-source interns worldwide. Implemented io_uring support for
                PostgreSQL with 6.5% I/O speed increase.
              </p>
              <p>
                <strong style={{ color: "var(--color-text)" }}>MakeMyTrip:</strong>{" "}
                Backend systems for 100K+ concurrent users. 4x throughput increase.
                Super Starter of the Year. 2022 Hackathon winner.
              </p>
              <p>
                <strong style={{ color: "var(--color-text)" }}>30DaysCoding:</strong>{" "}
                Co-founded and grew to 80,000+ students across 15 countries with zero
                external funding.
              </p>
              <p>
                <strong style={{ color: "var(--color-text)" }}>Education:</strong>{" "}
                B.E. Computer Science (Thapar Institute) + MBA in MIS (Thapar School
                of Management). Certified Linux Kernel Developer.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://youtube.com/@itsdeep-io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                YouTube
              </a>
              <a
                href="https://instagram.com/itsdeep.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/in/deepanshu-udhwani/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                LinkedIn
              </a>
              <Link
                href="/about"
                className="text-[13px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-5 py-12 pb-20">
        <div className="mx-auto max-w-[680px]">
          <CTABlock variant="hero" />
        </div>
      </section>
    </div>
  );
}
