import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";
import { packages, type Faq } from "@/content/pricing";
import { services } from "@/content/services";
import type { Project } from "@/content/projects";
import type { Crumb } from "@/components/breadcrumbs";
import { absoluteUrl } from "@/lib/seo";
import { slugify } from "@/lib/slug";

/**
 * JSON-LD builders. Everything here is derived from content that is
 * rendered on the page or committed in the repository; nothing is
 * asserted that a visitor could not also see. Entities reference each
 * other through stable @ids so Google can join the graph across pages.
 */

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  founder: `${site.url}/#founder`,
  logo: `${site.url}/#logo`,
} as const;

const austin = {
  "@type": "City",
  name: site.location.city,
  containedInPlace: { "@type": "State", name: site.location.regionFull },
};

const hasPortrait = fs.existsSync(path.join(process.cwd(), "public", "about", "portrait.jpg"));

/** Parses the visible package price strings ("$1,500", "$3,000+") into schema numbers. */
function offerPrice(price: string) {
  const amount = Number(price.replace(/[^0-9]/g, ""));
  return price.trim().endsWith("+")
    ? { priceSpecification: { "@type": "PriceSpecification", minPrice: amount, priceCurrency: "USD" } }
    : { price: amount, priceCurrency: "USD" };
}

/** The studio itself. Rendered once, in the root layout. */
export function organizationSchema() {
  const sameAs = [
    site.social.instagram,
    site.social.linkedin,
    site.social.x,
    site.googleBusinessProfileUrl,
  ].filter((v): v is string => Boolean(v));

  return {
    "@type": "ProfessionalService",
    "@id": ids.organization,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.png"),
      width: 512,
      height: 512,
      caption: `${site.name} logo`,
    },
    image: { "@id": ids.logo },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: austin,
    founder: { "@id": ids.founder },
    priceRange: "$500 - $3,000+",
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website packages",
      url: absoluteUrl("/pricing"),
      itemListElement: packages.map((pkg) => ({
        "@type": "Offer",
        name: `${pkg.name} website package`,
        description: pkg.bestFor,
        url: absoluteUrl("/pricing"),
        ...offerPrice(pkg.price),
        itemOffered: {
          "@type": "Service",
          name: `${pkg.name} website package`,
          serviceType: "Website design and development",
          provider: { "@id": ids.organization },
        },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function founderSchema() {
  return {
    "@type": "Person",
    "@id": ids.founder,
    name: site.founder.name,
    jobTitle: site.founder.role,
    worksFor: { "@id": ids.organization },
    url: absoluteUrl("/about"),
    ...(hasPortrait ? { image: absoluteUrl("/about/portrait.jpg") } : {}),
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ids.organization },
    inLanguage: "en-US",
  };
}

interface PageSchemaInput {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";
  image?: string;
  dateModified?: string;
  breadcrumbs?: Crumb[];
}

/** One per route. Pass the same title/description used in its metadata. */
export function webPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  image,
  dateModified,
  breadcrumbs,
}: PageSchemaInput) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
    inLanguage: "en-US",
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}

/** Feed it the same items as the visible <Breadcrumbs>, so they never diverge. */
export function breadcrumbSchema(items: Crumb[], currentPath: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(currentPath)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? currentPath),
    })),
  };
}

/** The services page: one Service per offering, anchored to its heading. */
export function serviceSchemas() {
  const base = absoluteUrl("/services");
  return services.map((s) => {
    const url = `${base}#${slugify(s.title)}`;
    return {
      "@type": "Service",
      "@id": url,
      url,
      name: s.title,
      serviceType: s.title,
      description: s.detail,
      provider: { "@id": ids.organization },
      areaServed: austin,
    };
  });
}

/** Only for a page that renders these exact questions and answers. */
export function faqSchema(faqs: Faq[], currentPath: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(currentPath)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** A case study: the studio's work, about a real client organisation. */
export function caseStudySchema(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#casestudy`,
    url,
    name: `${project.name} website`,
    headline: project.tagline,
    description: project.shortSolution,
    image: absoluteUrl(project.images.desktop.src),
    genre: project.industry,
    keywords: project.services.join(", "),
    dateModified: project.updated,
    creator: { "@id": ids.organization },
    about: { "@type": "Organization", name: project.name, url: project.url },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}
