import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">Page not found</h1>
        <p className="mt-4 text-lg text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist. Head back home or give us a call —
          we&apos;re happy to help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <a href={site.phoneHref} className="btn-outline">Call {site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
