export interface PexelsPhoto {
  id: number;
  src: {
    large2x: string;
    large: string;
    medium: string;
    small: string;
    original: string;
  };
  alt: string;
  photographer: string;
  photographer_url: string;
  width: number;
  height: number;
}

// One representative query per cluster slug
const CLUSTER_QUERIES: Record<string, string> = {
  'ai-marketing-tools': 'AI marketing digital technology',
  'ai-content-creation': 'content creation writing desk',
  'ai-email-marketing': 'email inbox laptop business',
  'ai-seo': 'SEO search engine ranking',
  'marketing-automation': 'automation workflow business',
  'ai-business-automation': 'business automation productivity',
  'ai-social-media-marketing': 'social media phone marketing',
  'ai-chatbots': 'chatbot AI robot assistant',
  'ai-productivity': 'productivity focus work laptop',
  'ai-advertising': 'digital advertising screen billboard',
  'ai-analytics': 'data analytics charts dashboard',
  'ai-sales': 'sales business growth success',
  'learn-ai': 'online learning education laptop',
  'ai-strategy': 'business strategy planning whiteboard',
  'ai-tools-guides': 'software tools technology computer',
  'industry-guides': 'professional business office team',
};

// Derive a search query from a guide slug
export function getQueryForSlug(slug: string): string {
  if (CLUSTER_QUERIES[slug]) return CLUSTER_QUERIES[slug];

  const s = slug.toLowerCase();
  if (s.includes('email') || s.includes('newsletter')) return 'email marketing laptop business';
  if (s.includes('seo') || s.includes('keyword') || s.includes('search-console')) return 'SEO search engine ranking';
  if (s.includes('social') || s.includes('linkedin') || s.includes('instagram') || s.includes('tiktok')) return 'social media marketing phone';
  if (s.includes('automation') || s.includes('workflow') || s.includes('zapier') || s.includes('n8n')) return 'automation workflow business technology';
  if (s.includes('writing') || s.includes('content') || s.includes('copywriting')) return 'writing content creation laptop';
  if (s.includes('ads') || s.includes('ppc') || s.includes('advertising') || s.includes('google-ads')) return 'digital advertising technology';
  if (s.includes('analytics') || s.includes('roi') || s.includes('data')) return 'data analytics dashboard charts';
  if (s.includes('chatbot') || s.includes('agent') || s.includes('assistant')) return 'AI chatbot robot technology';
  if (s.includes('funnel') || s.includes('lead') || s.includes('conversion')) return 'sales funnel business growth';
  if (s.includes('learn') || s.includes('course') || s.includes('beginner')) return 'online learning education laptop';
  if (s.includes('strategy') || s.includes('growth') || s.includes('market-research')) return 'business strategy planning';
  if (s.includes('ecommerce') || s.includes('product') || s.includes('saas')) return 'ecommerce business online shopping';
  if (s.includes('productivity') || s.includes('time-saving')) return 'productivity work efficiency';
  if (s.includes('youtube') || s.includes('video')) return 'video content creation studio';
  if (s.includes('prompt')) return 'AI prompt engineering technology';

  return 'digital marketing AI technology';
}

// Deterministic hash of a string → non-negative integer
export function strHash(s: string): number {
  let h = 0;
  for (const ch of s) h = (((h << 5) - h) + ch.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/**
 * Fetch a Pexels photo for `query`.
 * `resultIndex` (0-9) lets you pick a different photo from the result set
 * so two guides with similar queries still get visually distinct images.
 * The API response is cached for 1 week by Next.js data cache.
 */
export async function fetchPexelsPhoto(
  query: string,
  resultIndex: number = 0,
): Promise<PexelsPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        next: { revalidate: 604800 }, // cache 1 week
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { photos?: PexelsPhoto[] };
    const photos = data.photos ?? [];
    if (photos.length === 0) return null;
    return photos[resultIndex % photos.length];
  } catch {
    return null;
  }
}

export async function fetchClusterPhoto(clusterSlug: string): Promise<PexelsPhoto | null> {
  const query = CLUSTER_QUERIES[clusterSlug] ?? 'digital marketing AI technology';
  return fetchPexelsPhoto(query);
}

/**
 * Fetch a photo unique to a specific guide.
 * Uses `primaryKeyword` as the search query and the guide's slug hash
 * as the result index so guides with similar keywords still differ visually.
 */
export async function fetchGuidePhoto(
  primaryKeyword: string,
  slug: string = '',
): Promise<PexelsPhoto | null> {
  const index = strHash(slug || primaryKeyword) % 10;
  return fetchPexelsPhoto(`${primaryKeyword} technology`, index);
}
