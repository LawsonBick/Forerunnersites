import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { isPreviewDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments are for review, never for search engines.
  if (isPreviewDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The contact endpoint is the only non-page route. Everything under
      // /_next (scripts, styles, optimized images) stays crawlable.
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
