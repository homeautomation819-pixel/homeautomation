import { site } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneDisplay,
    sameAs: [
      "https://www.facebook.com/chriskohomeautomation",
      "https://www.instagram.com/chriskohomeautomation",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneDisplay,
    image: `${site.url}/images/furniture-assembly-toronto-hero.webp`,
    description:
      "Professional furniture assembly and installation serving Toronto and the GTA — IKEA, Wayfair, Structube and more. Fully insured, upfront pricing, 12-month workmanship warranty.",
    knowsAbout: [
      "furniture assembly",
      "IKEA furniture assembly",
      "office furniture assembly",
      "fitness equipment assembly",
      "gazebo and patio assembly",
      "TV mounting",
      "wardrobe and closet assembly",
      "bed frame assembly",
    ],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: site.areaServed.map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/chriskohomeautomation",
      "https://www.instagram.com/chriskohomeautomation",
    ],
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    provider: { "@id": `${site.url}/#localbusiness` },
    areaServed: site.areaServed.map((city) => ({ "@type": "City", name: city })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: `${site.url}${opts.image}`,
    datePublished: opts.date,
    dateModified: site.lastUpdated,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}
