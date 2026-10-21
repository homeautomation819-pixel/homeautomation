import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import LastUpdated from "@/components/LastUpdated";
import CtaBand from "@/components/CtaBand";
import BookingCard from "@/components/BookingCard";
import JsonLd from "@/components/JsonLd";
import { posts, type BlogPost } from "@/lib/blog";
import { services } from "@/lib/services";
import { articleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function getPost(slug: string): BlogPost {
  const p = posts.find((post) => post.slug === slug);
  if (!p) notFound();
  return p;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.metaDescription,
      url: `/blog/${p.slug}/`,
      images: [{ url: p.image, width: 1600, height: 900 }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const related = posts.filter((post) => post.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema({ headline: p.title, description: p.metaDescription, path: `/blog/${p.slug}/`, image: p.image, date: p.date })} />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: p.title, href: `/blog/${p.slug}/` }]} />
      <LastUpdated />

      <article className="section pt-8">
        <div className="container-site max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{p.h1}</h1>
          <p className="mt-4 text-sm text-slate-500">
            Published {p.dateDisplay} · {p.readTime} · By the Chrisko Home Automation team
          </p>
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-3">
            <Image
              src={p.image}
              alt={p.imageAlt}
              width={1600}
              height={900}
              priority
              fetchPriority="high"
              className="rounded-2xl border border-ink-700 lg:col-span-2"
            />
            <BookingCard service="Furniture Assembly" />
          </div>
          <p className="mt-8 text-xl leading-relaxed text-slate-300">{p.excerpt}</p>

          <div className="prose-site mt-8">
            {p.sections.map((sec) => (
              <div key={sec.h2} className="mb-10">
                <h2 className="h2 !text-3xl">{sec.h2}</h2>
                {sec.paragraphs.map((para, i) => <p key={i} className="mt-4">{para}</p>)}
                {sec.list && (
                  <ul className="mt-4">
                    {sec.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Related reading + services */}
      <section className="section border-t border-ink-800" aria-labelledby="related-heading">
        <div className="container-site">
          <h2 id="related-heading" className="h2 !text-2xl">Keep reading</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}/`} className="card block !p-4 text-sm font-semibold text-white transition hover:border-accent-blue/50 hover:text-accent-cyan">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-bold text-white">Ready to talk to an assembler?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="card block !p-4 text-sm font-semibold text-white transition hover:border-accent-blue/50 hover:text-accent-cyan">
                  {s.shortName} in Toronto
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
