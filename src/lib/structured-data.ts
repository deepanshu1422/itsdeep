const SITE_URL = 'https://itsdeep.io';

export interface ArticleSchemaInput {
  title: string;
  description: string;
  slug: string;
  lastUpdated: string;
  authorName?: string;
}

export interface FAQSchemaInput {
  faq: Array<{ question: string; answer: string }>;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateArticleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: `${SITE_URL}/guides/${input.slug}`,
    dateModified: input.lastUpdated,
    datePublished: input.lastUpdated,
    author: {
      '@type': 'Person',
      name: input.authorName ?? 'Deepanshu Udhwani',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Deepanshu Udhwani',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guides/${input.slug}`,
    },
  };
}

export function generateFAQSchema(input: FAQSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: input.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'itsdeep',
    url: SITE_URL,
    description:
      'Guides, insights, and resources on AI marketing by Deepanshu Udhwani.',
    author: {
      '@type': 'Person',
      name: 'Deepanshu Udhwani',
      url: SITE_URL,
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Deepanshu Udhwani',
    url: SITE_URL,
    sameAs: [
      'https://www.skool.com/ai-marketing-with-deepanshu-3730',
    ],
    jobTitle: 'AI Marketing Expert',
    description:
      'Deepanshu Udhwani helps businesses grow with AI-powered marketing strategies.',
  };
}
