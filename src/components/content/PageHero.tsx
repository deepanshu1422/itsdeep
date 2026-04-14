export interface PageHeroProps {
  title: string;
  description: string;
  readTime: string;
  lastUpdated: string;
  category: string;
}

export default function PageHero({ title, description, readTime, lastUpdated, category }: PageHeroProps) {
  return (
    <header className="mx-auto max-w-3xl pb-8 pt-10">
      <h1 className="text-[1.75rem] font-extrabold leading-[1.2] tracking-tight sm:text-[2.25rem]" style={{ color: 'var(--color-text)' }}>
        {title}
      </h1>
      <p className="mt-3 text-[1.0625rem] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
        <span>{readTime}</span>
        <span style={{ color: 'var(--color-border)' }}>|</span>
        <time dateTime={lastUpdated}>{lastUpdated}</time>
        <span style={{ color: 'var(--color-border)' }}>|</span>
        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: 'var(--color-accent)', color: '#5a4510' }}>
          {category}
        </span>
      </div>
    </header>
  );
}
