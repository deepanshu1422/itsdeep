import type { Metadata } from "next";
import CTABlock from "@/components/content/CTABlock";

export const metadata: Metadata = {
  title: "About Deepanshu Udhwani — itsdeep",
  description:
    "Engineer at Alibaba Cloud and MakeMyTrip, MBA, founder of 30DaysCoding (80,000+ students). Now teaching AI + marketing to 10 million people for free and building custom AI automation systems.",
  alternates: {
    canonical: "https://itsdeep.io/about",
  },
  openGraph: {
    title: "About Deepanshu Udhwani — itsdeep",
    description:
      "Engineer at Alibaba Cloud and MakeMyTrip, MBA, founder of 30DaysCoding (80,000+ students). Now teaching AI + marketing to 10 million people for free.",
    url: "https://itsdeep.io/about",
    type: "profile",
  },
};

function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deepanshu Udhwani",
    url: "https://itsdeep.io",
    image: "https://itsdeep.io/deepanshu.jpg",
    sameAs: [
      "https://www.youtube.com/@itsdeep-io",
      "https://www.instagram.com/itsdeep.io/",
      "https://www.linkedin.com/in/deepanshu-udhwani/",
      "https://www.skool.com/ai-marketing-with-deepanshu-3730",
    ],
    jobTitle: "Founder, 30DaysCoding",
    description:
      "Engineer who built systems at Alibaba Cloud and MakeMyTrip, MBA graduate, founder of 30DaysCoding (80,000+ students across 15 countries). Teaching AI and marketing to 10 million people for free.",
    worksFor: {
      "@type": "Organization",
      name: "30DaysCoding",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Thapar Institute of Engineering and Technology",
      },
      {
        "@type": "EducationalOrganization",
        name: "Thapar School of Management",
      },
    ],
    knowsAbout: [
      "AI Automation",
      "AI Marketing",
      "Digital Marketing",
      "Marketing Automation",
      "Content Strategy",
      "Growth Engineering",
      "Python",
      "Django",
      "Linux Kernel",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Social link data                                                   */
/* ------------------------------------------------------------------ */

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@itsdeep-io",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/itsdeep.io/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deepanshu-udhwani/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Skool Community",
    href: "https://www.skool.com/ai-marketing-with-deepanshu-3730",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Experience timeline data                                           */
/* ------------------------------------------------------------------ */

interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  badge?: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    period: "Jul 2020 - Sep 2020",
    role: "Software Engineer Intern",
    company: "Alibaba Cloud",
    badge: "Top 29 worldwide",
    highlights: [
      "Selected as one of the top 29 open-source interns worldwide in Alibaba Summer of Code",
      "Implemented io_uring support for PostgreSQL on Aliyun Linux 2",
      "Achieved 6.5% increase in I/O speeds",
      "Balanced full-time studies with 20-30 hours/week internship",
    ],
  },
  {
    period: "Jun 2021 - Jul 2023",
    role: "Engineer",
    company: "MakeMyTrip",
    badge: "Super Starter 2021",
    highlights: [
      "Built SEO backend for GOIBIBO Rails (Django, Python, Redis, Kafka, MongoDB)",
      "RESTful APIs serving 100,000+ concurrent users",
      "Re-architected monolith to microservices",
      "Automation scripts that delivered 4x throughput increase",
      'Won "Super Starter of the Year" 2021 and 2022 Inter-team Hackathon',
    ],
  },
  {
    period: "May 2023 - Present",
    role: "Founder",
    company: "30DaysCoding",
    badge: "80,000+ students",
    highlights: [
      "80,000+ students across 15 countries",
      "Zero external funding -- built entirely bootstrapped",
      "Handled everything: product, marketing, ads, email, content, community, sales",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Automation services data                                           */
/* ------------------------------------------------------------------ */

const AUTOMATION_SERVICES = [
  {
    title: "AI Agents for Lead Follow-Up",
    description:
      "Automated lead nurturing that responds, qualifies, and routes prospects without manual intervention.",
  },
  {
    title: "Automated Reporting Systems",
    description:
      "Dashboards and reports that build themselves. Data in, decisions out.",
  },
  {
    title: "Content Repurposing Pipelines",
    description:
      "One piece of content becomes many. Blog to threads, video to reels, podcast to newsletters.",
  },
  {
    title: "End-to-End Automation Setups",
    description:
      "Full workflow automation from trigger to output. No manual steps in between.",
  },
  {
    title: "Custom Workflows",
    description:
      "Marketing, sales, and operations workflows tailored to how your business actually works.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />

      <article style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}>
        {/* ========== HEADER ========== */}
        <header
          className="px-4 pt-16 pb-10 sm:pt-24 sm:pb-14"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Avatar */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center text-2xl font-bold sm:h-24 sm:w-24 sm:text-3xl"
              style={{
                background: "var(--color-bg-warm)",
                color: "var(--color-text)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
              }}
            >
              DU
            </div>
            <div>
              <h1
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ color: "var(--color-text)" }}
              >
                Deepanshu Udhwani
              </h1>
              <p
                className="mt-2 text-[15px] leading-relaxed sm:text-[16px]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Teach 10M -- AI and Marketing | Ex-Alibaba Cloud + MakeMyTrip
              </p>
              <p
                className="mt-1 text-[13px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Bangalore, India
              </p>
            </div>
          </div>
        </header>

        {/* ========== THE STORY ========== */}
        <section className="px-4 pt-12 pb-10">
          <h2
            className="text-xl font-bold sm:text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            The short version
          </h2>
          <div
            className="mt-5 space-y-4 text-[15px] leading-[1.75] sm:text-[16px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <p>
              I have never been good at sitting still. Not in school. Not at
              MakeMyTrip. Not at Alibaba Cloud.
            </p>
            <p>
              At 20, I was one of the top 29 open-source interns in the world at
              Alibaba, hacking on PostgreSQL internals and Linux kernel I/O. At
              MakeMyTrip, I built the SEO backend that served 100,000+
              concurrent users and won &ldquo;Super Starter of the Year&rdquo;
              my first year there. I re-architected their monolith into
              microservices. I won their inter-team hackathon. Then I left.
            </p>
            <p>
              Not because it was bad. Because I wanted to build something of my
              own.
            </p>
            <p>
              I started 30DaysCoding. No funding. No co-founder. No safety net.
              I did everything -- product, marketing, ads, email sequences,
              content, community management, sales. All of it.
            </p>
            <p>
              80,000+ students later, across 15 countries, I realized the thing I
              was best at was not coding. It was teaching people how to use
              technology to grow. AI, marketing, automation -- the stuff that
              actually moves the needle for businesses.
            </p>
            <p style={{ color: "var(--color-text)" }}>
              <strong>
                The mission now: teach 10 million people AI and Marketing. For
                free.
              </strong>
            </p>
          </div>
        </section>

        {/* ========== EXPERIENCE TIMELINE ========== */}
        <section
          className="px-4 pt-10 pb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h2
            className="text-xl font-bold sm:text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            Where I have worked
          </h2>
          <div className="mt-8 space-y-6">
            {TIMELINE.map((entry) => (
              <div
                key={entry.company}
                className="rounded-[var(--radius-lg)] p-5 sm:p-6"
                style={{
                  background: "var(--color-bg-white)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3
                      className="text-[16px] font-bold sm:text-[17px]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {entry.role}{" "}
                      <span style={{ color: "var(--color-text-muted)" }}>
                        at
                      </span>{" "}
                      {entry.company}
                    </h3>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {entry.period}
                    </p>
                  </div>
                  {entry.badge && (
                    <span
                      className="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{
                        background: "var(--color-bg-warm)",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {entry.badge}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {entry.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[14px] leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span
                        className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========== EDUCATION ========== */}
        <section
          className="px-4 pt-10 pb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h2
            className="text-xl font-bold sm:text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            Education
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-[var(--radius)] p-5"
              style={{
                background: "var(--color-bg-white)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                className="text-[15px] font-bold"
                style={{ color: "var(--color-text)" }}
              >
                B.E. Computer Science
              </p>
              <p
                className="mt-1 text-[14px]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Thapar Institute of Engineering and Technology
              </p>
              <p
                className="mt-0.5 text-[13px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                2016 - 2019
              </p>
            </div>
            <div
              className="rounded-[var(--radius)] p-5"
              style={{
                background: "var(--color-bg-white)",
                border: "1px solid var(--color-border)",
              }}
            >
              <p
                className="text-[15px] font-bold"
                style={{ color: "var(--color-text)" }}
              >
                MBA, Management Information Systems
              </p>
              <p
                className="mt-1 text-[14px]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Thapar School of Management
              </p>
              <p
                className="mt-0.5 text-[13px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                2019 - 2021
              </p>
            </div>
          </div>
          <p
            className="mt-4 text-[13px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Certification: Linux Kernel Developer
          </p>
        </section>

        {/* ========== WHAT I BUILD NOW ========== */}
        <section
          className="px-4 pt-10 pb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h2
            className="text-xl font-bold sm:text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            What I build now
          </h2>
          <p
            className="mt-3 text-[15px] leading-relaxed sm:text-[16px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Custom AI automation systems for business owners. The kind of setups
            that replace 3-4 manual steps with one trigger.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {AUTOMATION_SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-[var(--radius)] p-5"
                style={{
                  background: "var(--color-bg-cream)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  className="text-[14px] font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  {service.title}
                </p>
                <p
                  className="mt-1.5 text-[13px] leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========== SOCIAL LINKS ========== */}
        <section
          className="px-4 pt-10 pb-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h2
            className="text-xl font-bold sm:text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            Find me here
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[var(--radius)] px-4 py-2.5 text-[14px] font-medium transition-all hover:opacity-80"
                style={{
                  background: "var(--color-bg-white)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span style={{ color: "var(--color-text-muted)" }}>
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section
          className="px-4 pt-10 pb-16 sm:pb-24"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <CTABlock variant="hero" />
        </section>
      </article>
    </>
  );
}
