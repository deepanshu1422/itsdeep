import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const GUIDES_DIR = path.join(process.cwd(), 'src/content/guides');

export interface GuideFrontmatter {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  cluster: string;
  clusterSlug: string;
  intent: 'informational' | 'commercial' | 'how-to' | 'comparison';
  lastUpdated: string;
  priority: number;
  relatedSlugs: string[];
  faq: Array<{ question: string; answer: string }>;
}

export interface Guide {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
  readTime: string;
}

function getGuideFiles(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith('.mdx'));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    content,
    readTime: stats.text,
  };
}

export function getAllGuides(): Guide[] {
  const files = getGuideFiles();

  const guides = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getGuideBySlug(slug);
    })
    .filter((guide): guide is Guide => guide !== null);

  return guides.sort((a, b) => a.frontmatter.priority - b.frontmatter.priority);
}

export function getGuidesByCluster(cluster: string): Guide[] {
  return getAllGuides().filter(
    (guide) => guide.frontmatter.cluster === cluster
  );
}

export function getGuidesByClusterSlug(clusterSlug: string): Guide[] {
  return getAllGuides().filter(
    (guide) => guide.frontmatter.clusterSlug === clusterSlug
  );
}

export function getAllClusterSlugs(): string[] {
  const guides = getAllGuides();
  const slugs = new Set<string>();
  for (const guide of guides) slugs.add(guide.frontmatter.clusterSlug);
  return Array.from(slugs);
}

export function getAllClusters(): Array<{ name: string; slug: string; count: number }> {
  const guides = getAllGuides();
  const clusterMap = new Map<string, { slug: string; count: number }>();

  for (const guide of guides) {
    const { cluster, clusterSlug } = guide.frontmatter;
    const existing = clusterMap.get(cluster);
    if (existing) {
      existing.count += 1;
    } else {
      clusterMap.set(cluster, { slug: clusterSlug, count: 1 });
    }
  }

  return Array.from(clusterMap.entries()).map(([name, { slug, count }]) => ({
    name,
    slug,
    count,
  }));
}
