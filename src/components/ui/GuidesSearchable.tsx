'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface SerializableGuide {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  clusterSlug: string;
  readTime: string;
  photoUrl: string | null;
}

interface ClusterSection {
  name: string;
  slug: string;
  count: number;
  guides: SerializableGuide[];
}

interface Props {
  clusters: ClusterSection[];
  totalCount: number;
}

function GuideCard({ guide }: { guide: SerializableGuide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group overflow-hidden rounded-[var(--radius)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
      style={{ background: 'var(--color-bg-white)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'block' }}
    >
      {guide.photoUrl ? (
        <div style={{ position: 'relative', width: '100%', height: 96, overflow: 'hidden' }}>
          <Image
            src={guide.photoUrl}
            alt={guide.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div style={{ width: '100%', height: 96, background: 'var(--color-bg-warm)' }} />
      )}
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              borderRadius: 9999, padding: '2px 8px',
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              background: 'var(--color-accent)', color: '#5a4510',
            }}
          >
            {guide.cluster}
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{guide.readTime}</span>
        </div>
        <h3 style={{ marginTop: 8, fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: 'var(--color-text)' }}>
          {guide.title}
        </h3>
        <p style={{ marginTop: 4, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {guide.description}
        </p>
      </div>
    </Link>
  );
}

export default function GuidesSearchable({ clusters, totalCount }: Props) {
  const [query, setQuery] = useState('');

  const allGuides = useMemo(
    () => clusters.flatMap((c) => c.guides),
    [clusters],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null; // null = show grouped by cluster
    return allGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.cluster.toLowerCase().includes(q),
    );
  }, [query, allGuides]);

  return (
    <>
      {/* Search bar */}
      <div style={{ marginTop: 24, position: 'relative' }}>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            width: 17, height: 17, color: 'var(--color-text-muted)', pointerEvents: 'none',
          }}
        >
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <input
          type="search"
          placeholder={`Search ${totalCount} guides…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            height: 44,
            paddingLeft: 40,
            paddingRight: 16,
            fontSize: 15,
            borderRadius: 'var(--radius)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-white)',
            color: 'var(--color-text)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-muted)', fontSize: 18, lineHeight: 1, padding: 4,
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Search results */}
      {filtered !== null ? (
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 16 }}>
            {filtered.length === 0
              ? `No guides found for "${query}"`
              : `${filtered.length} guide${filtered.length === 1 ? '' : 's'} matching "${query}"`}
          </p>
          {filtered.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Grouped by cluster */
        clusters.map((cluster) => (
          <section key={cluster.slug} style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                {cluster.name}
              </h2>
              <span
                style={{
                  borderRadius: 9999, padding: '2px 8px',
                  fontSize: 11, fontWeight: 600,
                  background: 'var(--color-accent)', color: '#5a4510',
                }}
              >
                {cluster.count}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cluster.guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
