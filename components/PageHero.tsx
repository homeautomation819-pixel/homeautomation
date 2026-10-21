import Image from "next/image";
import Link from "next/link";
import { site, trustBadges } from "@/lib/site";
import BookingCard from "@/components/BookingCard";

export default function PageHero({
  title,
  intro,
  image,
  imageAlt,
  bookingService,
  lockService = false,
}: {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  bookingService: string;
  lockService?: boolean;
}) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-ink-800">
      <div className="container-site grid items-start gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <div className="lg:pt-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn-primary">
              Call {site.phoneDisplay}
            </a>
            <Link href="/contact/" className="btn-amber">
              Get a Free Quote
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {trustBadges.map((b) => (
              <li key={b} className="badge">
                <svg className="h-4 w-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <Image
            src={image}
            alt={imageAlt}
            width={1600}
            height={900}
            priority
            fetchPriority="high"
            className="rounded-2xl border border-ink-700 shadow-glow"
          />
          <BookingCard service={bookingService} lockService={lockService} />
        </div>
      </div>
    </section>
  );
}
