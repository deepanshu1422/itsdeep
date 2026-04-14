export interface CTABlockProps {
  variant?: "default" | "compact" | "hero";
}

const SKOOL_LINK = "https://www.skool.com/ai-marketing-with-deepanshu-3730";

export default function CTABlock({ variant = "default" }: CTABlockProps) {
  if (variant === "compact") {
    return (
      <aside
        style={{
          margin: "2rem 0",
          padding: "1.25rem 1.5rem",
          background: "var(--color-bg-white)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            flex: "1 1 auto",
          }}
        >
          <strong style={{ color: "var(--color-text)" }}>80,000+ entrepreneurs</strong> learn
          AI + Marketing for free.
        </p>
        <a
          href={SKOOL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            height: "36px",
            padding: "0 1rem",
            fontSize: "13px",
            fontWeight: 700,
            color: "#1a1a1a",
            background: "var(--color-accent)",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
        >
          Join now
        </a>
      </aside>
    );
  }

  if (variant === "hero") {
    return (
      <aside
        style={{
          padding: "2.5rem 2rem",
          background: "var(--color-bg-white)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--color-text)",
            lineHeight: 1.3,
          }}
        >
          Your competitors are already using AI. Are you?
        </h2>

        <p
          style={{
            margin: "0.75rem auto 0",
            maxWidth: "520px",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--color-text-secondary)",
          }}
        >
          80,000+ people have already learned AI + Marketing with Deepanshu. The
          community is free. Deepanshu posts daily. You get AI workflows, marketing
          systems, and automation templates -- all inside one Skool group.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "left", fontSize: "14px", color: "var(--color-text)" }}>
            <p style={{ margin: "0.25rem 0" }}>Daily AI + Marketing breakdowns</p>
            <p style={{ margin: "0.25rem 0" }}>Frameworks from Alibaba-scale systems</p>
            <p style={{ margin: "0.25rem 0" }}>Direct access to Deepanshu</p>
          </div>
        </div>

        <div style={{ marginTop: "1.75rem" }}>
          <a
            href={SKOOL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              height: "48px",
              padding: "0 2rem",
              fontSize: "15px",
              fontWeight: 700,
              color: "#1a1a1a",
              background: "var(--color-accent)",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              transition: "opacity 0.15s",
            }}
          >
            Join Free — It Takes 10 Seconds
          </a>
        </div>

        <p
          style={{
            margin: "0.75rem 0 0",
            fontSize: "13px",
            color: "var(--color-text-muted)",
          }}
        >
          Free forever. No credit card. No upsell. Leave anytime.
        </p>

        <p
          style={{
            margin: "1.25rem auto 0",
            maxWidth: "440px",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
            fontStyle: "italic",
          }}
        >
          AI is moving fast. The entrepreneurs who learn now will be the ones who win.
        </p>
      </aside>
    );
  }

  // Default
  return (
    <aside
      style={{
        margin: "2.5rem 0",
        padding: "1.75rem 2rem",
        background: "var(--color-bg-white)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--color-text)",
        }}
      >
        Want frameworks like this delivered daily?
      </h2>
      <p
        style={{
          margin: "0.5rem 0 0",
          maxWidth: "500px",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
        }}
      >
        80,000+ people are already learning AI + Marketing with Deepanshu. The
        community is free — join, ask questions, get answers.
      </p>
      <a
        href={SKOOL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          height: "44px",
          padding: "0 1.5rem",
          marginTop: "1rem",
          fontSize: "14px",
          fontWeight: 700,
          color: "#1a1a1a",
          background: "var(--color-accent)",
          borderRadius: "var(--radius)",
          textDecoration: "none",
          transition: "opacity 0.15s",
        }}
      >
        Join Free Community
      </a>
      <p
        style={{
          margin: "0.5rem 0 0",
          fontSize: "12px",
          color: "var(--color-text-muted)",
        }}
      >
        Free forever. No catch.
      </p>
    </aside>
  );
}
