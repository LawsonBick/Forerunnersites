import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Vercel sets VERCEL_ENV on every build. Only "preview" is treated as
 * non-production: a local `next build` (VERCEL_ENV unset) must produce the
 * real, indexable output, and "development" never leaves a laptop.
 */
export const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

/** Absolute production URL for a site path. "/" resolves to the bare origin. */
export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return p === "/" ? site.url : `${site.url}${p}`;
}

/** The default share image, used wherever a page has no image of its own. */
export const defaultShareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

interface PageMeta {
  /** Page title without the site name; the root template appends it. */
  title: string;
  /**
   * The homepage carries the primary keyword itself, so it opts out of the
   * "%s | Site" template and sets the whole document title.
   */
  absoluteTitle?: boolean;
  description: string;
  /** Site-relative path, e.g. "/pricing". Becomes the canonical and og:url. */
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  ogType?: "website" | "article";
}

/**
 * Builds a page's complete metadata so every route sets the same fields
 * the same way. Next.js does not merge nested `openGraph` objects across
 * segments (a page that sets any openGraph field replaces the layout's
 * entirely), so the shared values are spread into every page here rather
 * than relying on inheritance.
 */
export function buildMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  image = defaultShareImage,
  ogType = "website",
}: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      siteName: site.name,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
