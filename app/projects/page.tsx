import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import PortfolioGrid from "@/components/PortfolioGrid";
import BookingCard from "@/components/BookingCard";
import CtaBand from "@/components/CtaBand";
import { portfolioItems, portfolioServices } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Furniture Assembly Projects GTA",
  description:
    "Browse recent furniture assembly projects in Toronto & the GTA: PAX wardrobes, gazebos, offices & home gyms. Get your free quote: +1 (437) 870-1113 today.",
  alternates: { canonical: "/projects/" },
  openGraph: {
    title: "Furniture Assembly Projects Across Toronto & the GTA",
    description: "A portfolio of recent Chrisko Home Automation assemblies, from condo move-ins to backyard gazebos.",
    url: "/projects/",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Projects", href: "/projects/" }]} />
      <LastUpdated />
      <section className="section pt-8">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Furniture Assembly Projects in Toronto &amp; the GTA
            </h1>
          </div>
          <div className="mt-5 grid items-start gap-10 lg:grid-cols-2">
            <p className="text-lg leading-relaxed text-slate-300">
              A portfolio of recent assemblies by the Chrisko Home Automation team — filter by
              service type to see the work that matters to you. Every project was delivered with a
              firm written quote, our own insured crew, and a 12-month workmanship warranty.
            </p>
            <BookingCard service="Furniture Assembly" />
          </div>
          <div className="mt-10">
            <PortfolioGrid seedItems={portfolioItems} categories={[...portfolioServices]} />
          </div>
        </div>
      </section>
      <CtaBand heading="Want your project in this portfolio?" body="Every project starts with a free quote and a firm written price. Tell us what needs building." />
    </>
  );
}
