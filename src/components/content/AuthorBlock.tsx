export default function AuthorBlock() {
  return (
    <div className="flex items-center gap-4 border-t border-zinc-200 py-6 dark:border-zinc-700">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
      >
        DU
      </div>
      <div className="min-w-0">
        <a
          href="/about"
          className="text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
        >
          Deepanshu Udhwani
        </a>
        <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Senior Engineer (ex-Alibaba, ex-MakeMyTrip) &middot; MBA &middot;
          Teaching AI + Marketing to 10M entrepreneurs
        </p>
      </div>
    </div>
  );
}
