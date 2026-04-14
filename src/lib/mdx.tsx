import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { ReactElement } from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract headings from raw MDX content for table-of-contents generation.
 * Parses lines starting with ## or ### (skips h1 since the page title covers that).
 */
export function extractHeadings(rawContent: string): TOCHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(rawContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Custom MDX component map.
 * Wraps standard HTML elements with Tailwind prose classes and
 * maps custom component names to our content components.
 */
function getMDXComponents() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const components: Record<string, any> = {
    h2: (props: any) => (
      <h2
        className="mt-10 scroll-mt-20 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        {...props}
      />
    ),
    h3: (props: any) => (
      <h3
        className="mt-8 scroll-mt-20 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        {...props}
      />
    ),
    p: (props: any) => (
      <p
        className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400"
        {...props}
      />
    ),
    a: (props: any) => (
      <a
        className="font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className="mt-4 list-disc space-y-2 pl-6 text-zinc-600 dark:text-zinc-400"
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className="mt-4 list-decimal space-y-2 pl-6 text-zinc-600 dark:text-zinc-400"
        {...props}
      />
    ),
    li: (props: any) => <li className="leading-7" {...props} />,
    blockquote: (props: any) => (
      <blockquote
        className="mt-4 border-l-2 border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
        {...props}
      />
    ),
    code: (props: any) => (
      <code
        className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
        {...props}
      />
    ),
    pre: (props: any) => (
      <pre
        className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm leading-relaxed dark:bg-zinc-900"
        {...props}
      />
    ),
    table: (props: any) => (
      <div className="mt-4 overflow-x-auto">
        <table
          className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400"
          {...props}
        />
      </div>
    ),
    th: (props: any) => (
      <th
        className="border-b border-zinc-200 px-4 py-2 font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        {...props}
      />
    ),
    td: (props: any) => (
      <td
        className="border-b border-zinc-100 px-4 py-2 dark:border-zinc-800"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
    Callout: ({
      type = 'info',
      children,
    }: {
      type?: 'info' | 'warning' | 'tip';
      children: React.ReactNode;
    }) => {
      const styles = {
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
        warning:
          'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100',
        tip: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100',
      };
      return (
        <aside
          className={`mt-4 rounded-lg border p-4 text-sm leading-relaxed ${styles[type]}`}
        >
          {children}
        </aside>
      );
    },
    ComparisonTable: ({
      headers,
      rows,
    }: {
      headers: string[];
      rows: string[][];
    }) => (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead>
            <tr>
              {headers.map((h: string) => (
                <th
                  key={h}
                  className="border-b border-zinc-200 px-4 py-2 font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: string[], i: number) => (
              <tr key={i}>
                {row.map((cell: string, j: number) => (
                  <td
                    key={j}
                    className="border-b border-zinc-100 px-4 py-2 dark:border-zinc-800"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return components;
}

/**
 * Compile raw MDX content into a renderable React element.
 * Uses next-mdx-remote/rsc for React Server Component compatibility.
 */
export async function compileMDXContent(source: string): Promise<ReactElement> {
  const { content } = await compileMDX({
    source,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
      },
    },
  });

  return content;
}
