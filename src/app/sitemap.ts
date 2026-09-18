import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { landingPages } from "@/content/landing-pages";
import { resources } from "@/content/resources";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every indexable, canonical URL and nothing else. The contact page's
 * `?package=` variants, the API, and the 404 are deliberately absent.
 *
 * <lastmod> comes from dated content fields rather than the build clock,
 * so it only moves when something actually changed.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hosting", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing/launch", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing/growth", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing/custom", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = new Date(site.contentUpdated);

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: siteUpdated,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...landingPages.map((p) => ({ url: absoluteUrl(`/${p.slug}`), lastModified: new Date(p.updated), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...resources.map((r) => ({ url: absoluteUrl(`/resources/${r.slug}`), lastModified: new Date(r.modified), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: new Date(p.updated),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
