import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-900">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">
            Chrisko <span className="text-accent-cyan">Home Automation</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{site.tagline}</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-slate-300">
            {site.locality}, {site.country}
            <br />
            <a href={site.phoneHref} className="text-accent-cyan hover:underline">
              {site.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-accent-cyan hover:underline">
              {site.email}
            </a>
            <br />
            Hours: {site.hours}
          </address>
        </div>

        <nav aria-label="Services">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="text-slate-300 hover:text-white">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service areas">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Service Areas</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
            {site.areaServed.map((city) => (
              <li key={city}>
                <Link
                  href={`/locations/${city.toLowerCase().replace(/ /g, "-")}/`}
                  className="text-slate-300 hover:text-white"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about/" className="text-slate-300 hover:text-white">About Us</Link></li>
            <li><Link href="/projects/" className="text-slate-300 hover:text-white">Projects Gallery</Link></li>
            <li><Link href="/blog/" className="text-slate-300 hover:text-white">Blog &amp; Guides</Link></li>
            <li><Link href="/contact/" className="text-slate-300 hover:text-white">Get a Free Quote</Link></li>
            <li><a href="/llm.txt" className="text-slate-300 hover:text-white">llm.txt</a></li>
            <li><Link href="/admin/" className="text-slate-400 hover:text-white">Admin</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Serving {site.locality} &amp; the GTA.
          </p>
          <p>Fully insured · 12-month workmanship warranty · Upfront pricing</p>
        </div>
      </div>
    </footer>
  );
}
