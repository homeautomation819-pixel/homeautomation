import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";
import { posts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastUpdated);

  const staticPages = ["", "/about/", "/projects/", "/contact/", "/services/", "/locations/", "/blog/"].map(
    (path) => ({ url: `${site.url}${path || "/"}`, lastModified, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })
  );

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const locationPages = locations.map((l) => ({
    url: `${site.url}/locations/${l.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}
