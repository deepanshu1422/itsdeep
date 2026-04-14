export interface RelatedPage {
  title: string;
  slug: string;
  description: string;
}

export interface RelatedPagesProps {
  pages: RelatedPage[];
}

export default function RelatedPages({ pages }: RelatedPagesProps) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Related pages
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {pages.map((page) => (
          <a
            key={page.slug}
            href={`/${page.slug}`}
            className="group rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {page.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              {page.description}
            </p>
            <span
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200"
              aria-hidden="true"
            >
              Read more
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
