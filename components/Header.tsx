"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/locations/", label: "Service Areas" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-white" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-blue text-lg font-bold text-on-accent shadow-glow">
            C
          </span>
          <span className="text-base font-bold leading-tight">
            Chrisko <span className="text-accent-cyan">Home Automation</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <a href={site.phoneHref} className="btn-primary !px-4 !py-2 text-sm">
            {site.phoneDisplay}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 text-white"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-800 bg-ink-950 lg:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-ink-850"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-primary mt-2 text-sm">
              Call {site.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
