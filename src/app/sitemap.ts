import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/content";
import { getAllClusterMetas } from "@/data/clusters";

const BASE_URL = "https://itsdeep.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const clusterMetas = getAllClusterMetas();

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: guide.frontmatter.lastUpdated
      ? new Date(guide.frontmatter.lastUpdated)
      : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const topicEntries: MetadataRoute.Sitemap = clusterMetas.map((meta) => ({
    url: `${BASE_URL}/topics/${meta.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...topicEntries,
    ...guideEntries,
  ];
}
