import type { NextConfig } from "next";
import { site } from "./src/config/site";

const canonical = new URL(site.url);

/**
 * The project's Vercel alias. Once the custom domain is attached it is a
 * duplicate of the real site and must redirect, but until then it is the
 * only place the site exists, so the redirect is gated below.
 */
const VERCEL_ALIAS = "forerunner-sites.vercel.app";

/**
 * Vercel exposes the project's production domain at build time: the
 * shortest custom domain if one is attached, otherwise the *.vercel.app
 * alias. So this is true exactly when forerunnersites.com is live.
 */
const customDomainAttached = process.env.VERCEL_PROJECT_PRODUCTION_URL === canonical.host;

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // AVIF first, WebP for the rest; source JPGs stay untouched in /public.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    const toCanonical = (host: string) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${site.url}/:path*`,
      permanent: true,
    });
    return [
      toCanonical(`www.${canonical.host}`),
      ...(customDomainAttached ? [toCanonical(VERCEL_ALIAS)] : []),
    ];
  },

  async headers() {
    return [
      {
        // Portfolio media is fetched straight from /public (the video and
        // its poster bypass the image optimizer). Files are replaced in
        // place when refreshed, so cache for a week rather than forever.
        source: "/work/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
