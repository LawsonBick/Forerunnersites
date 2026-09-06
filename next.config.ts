import type { NextConfig } from "next";
import { site } from "./src/config/site";

/**
 * The project's Vercel alias. Unlike the apex, Vercel does not redirect it,
 * so it serves the whole site as a duplicate of the real domain.
 */
const VERCEL_ALIAS = "forerunner-sites.vercel.app";

/**
 * Vercel exposes the project's production domain at build time: a custom
 * domain once one is attached, otherwise the *.vercel.app alias. Testing
 * for "not a vercel.app host" rather than an exact string means this keeps
 * working whether the primary domain is the apex or www.
 */
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const customDomainAttached = Boolean(productionUrl && !productionUrl.endsWith(".vercel.app"));

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // AVIF first, WebP for the rest; source JPGs stay untouched in /public.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    // Deliberately no apex/www rule here. Vercel's domain settings already
    // redirect one to the other, and a rule in the app pointing the
    // opposite way would bounce requests between the two forever. Host
    // canonicalisation has exactly one owner, and it is Vercel.
    if (!customDomainAttached) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: VERCEL_ALIAS }],
        destination: `${site.url}/:path*`,
        permanent: true,
      },
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
