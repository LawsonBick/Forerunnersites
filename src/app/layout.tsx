import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import Script from "next/script";
import { site } from "@/config/site";
import { defaultShareImage, isPreviewDeployment } from "@/lib/seo";
import { founderSchema, organizationSchema, webSiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealManager } from "@/components/reveal-manager";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

/**
 * Site-wide defaults. Every page overrides title, description, canonical,
 * and the social fields through `buildMetadata()`; what is set here is
 * the fallback (for the 404, say) plus the fields that are the same
 * everywhere: robots, verification, and the base URL that turns relative
 * paths into absolute ones.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [defaultShareImage],
  },
  twitter: { card: "summary_large_image" },
  // Vercel preview deployments render the real content at a throwaway
  // URL; they must never be indexed or they compete with the canonical.
  // In production, indexing is the default, so only the snippet limits
  // are stated; asserting "index" here would contradict the automatic
  // noindex Next.js puts on the 404 page.
  robots: isPreviewDeployment
    ? { index: false, follow: false }
    : {
        googleBot: {
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class
    // to <html> before hydration (it gates reveal animations).
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Gates reveal animations so content is never hidden without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[var(--radius-xs)] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pt-16 lg:pt-[72px]">
          {children}
        </main>
        <SiteFooter />
        <RevealManager />
        {/* The studio, its founder, and the site: one graph, referenced by
            @id from every page's own WebPage node. */}
        <JsonLd data={[organizationSchema(), founderSchema(), webSiteSchema()]} />
        {site.googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.googleAnalyticsId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
