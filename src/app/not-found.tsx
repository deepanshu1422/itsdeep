import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — itsdeep",
  description: "The page you're looking for doesn't exist. Browse our guides on AI and marketing for entrepreneurs.",
};

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        The page you are looking for does not exist or has been moved. Try one of
        the links below to get back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          Go Home
        </Link>
        <Link
          href="/guides"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:bg-neutral-900"
        >
          Browse Guides
        </Link>
      </div>
    </section>
  );
}
