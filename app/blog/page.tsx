import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCard from "@/components/BookingCard";
import LastUpdated from "@/components/LastUpdated";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Furniture Assembly Blog Toronto",
  description:
    "Practical furniture assembly guides for Toronto homeowners: real costs, IKEA PAX tips, assembly times & gazebo advice from GTA pros. +1 (437) 870-1113.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    title: "Furniture Assembly Guides for Toronto Homes",
    description: "Costs, IKEA PAX tips, assembly times and gazebo know-how — written by working GTA assemblers.",
    url: "/blog/",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Furniture Assembly Guides for Toronto Homeowners
          </h1>
          <div className="mt-5 grid items-start gap-10 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-slate-300">
            Practical, honest guides written by working assemblers — real GTA pricing, IKEA PAX
            know-how, realistic assembly times, and outdoor-structure advice that saves weekends.
          </p>
            <BookingCard service="Furniture Assembly" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card group !p-0 overflow-hidden transition hover:border-accent-blue/50 hover:shadow-glow">
                <Image src={p.image} alt={p.imageAlt} width={1600} height={900} loading="lazy" className="aspect-video w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-slate-500">{p.dateDisplay} · {p.readTime}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-accent-cyan">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand heading="Questions about your own furniture?" body="Our guides cover the general case — your items are specific. Call for free advice from an assembler who works in the GTA every day." />
    </>
  );
}
