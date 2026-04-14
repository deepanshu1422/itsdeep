import Link from "next/link";

const SKOOL_LINK = "https://www.skool.com/ai-marketing-with-deepanshu-3730";

const topics = [
  { label: "AI Marketing Tools", href: "/guides?cluster=ai-marketing-tools" },
  { label: "AI Content", href: "/guides?cluster=ai-content-creation" },
  { label: "AI Email", href: "/guides?cluster=ai-email-marketing" },
  { label: "AI SEO", href: "/guides?cluster=ai-seo" },
  { label: "Automation", href: "/guides?cluster=marketing-automation" },
  { label: "Learn AI", href: "/guides?cluster=learn-ai" },
];

const resources = [
  { label: "All Guides", href: "/guides", external: false },
  { label: "About", href: "/about", external: false },
  { label: "Free Community", href: SKOOL_LINK, external: true },
];

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@itsdeep-io" },
  { label: "Instagram", href: "https://www.instagram.com/itsdeep.io/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/deepanshu-udhwani/" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-white)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-content)",
          margin: "0 auto",
          padding: "48px 20px 0",
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "var(--color-text)",
              }}
            >
              itsdeep.io
            </div>
            <p
              style={{
                marginTop: "8px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--color-text-muted)",
              }}
            >
              Teach 10M people AI + Marketing. For free.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
            >
              Topics
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {topics.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
            >
              Resources
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {resources.map((r) =>
                r.external ? (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {r.label}
                  </a>
                ) : (
                  <Link
                    key={r.href}
                    href={r.href}
                    style={{
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                    }}
                  >
                    {r.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4
              style={{
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
            >
              Connect
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "13px",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={SKOOL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "13px",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Skool
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px 0",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-text-muted)",
            }}
          >
            Built by Deepanshu Udhwani in Bangalore, India
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-text-muted)",
            }}
          >
            &copy; {new Date().getFullYear()} itsdeep.io
          </p>
        </div>
      </div>
    </footer>
  );
}
