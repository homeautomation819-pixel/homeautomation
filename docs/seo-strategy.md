# SEO Strategy — Chrisko Home Automation (Furniture Assembly)

Last updated: 2026-01-15

Note: the brand name is "Chrisko Home Automation" but the business is **furniture assembly & installation**. All copy is written for furniture assembly; the name is treated purely as the brand.

## Keyword-to-page matrix (one keyword per page, no cannibalization)

| Keyword | Intent | Target page |
|---|---|---|
| furniture assembly Toronto | Transactional | `/` |
| furniture assembly service near me / professional furniture assembly GTA | Transactional | `/` |
| about Chrisko Home Automation | Navigational / E-E-A-T | `/about/` |
| furniture assembly projects Toronto | Commercial investigation | `/projects/` |
| furniture assembly quote Toronto | Transactional | `/contact/` |
| home furniture assembly Toronto | Transactional | `/services/home-furniture-assembly/` |
| IKEA furniture assembly Toronto (+ PAX/MALM/BILLY/BESTÅ/HEMNES/SEKTION long-tail) | Transactional | `/services/ikea-furniture-assembly/` |
| office furniture assembly Toronto | Transactional (B2B) | `/services/office-furniture-assembly/` |
| fitness equipment assembly Toronto | Transactional | `/services/fitness-equipment-assembly/` |
| gazebo assembly Toronto (+ pergola/shed/playset/patio) | Transactional | `/services/outdoor-patio-assembly/` |
| TV mounting Toronto | Transactional | `/services/tv-mounting-installation/` |
| wardrobe assembly Toronto (+ closet systems) | Transactional | `/services/wardrobe-closet-assembly/` |
| bed frame assembly Toronto (+ Murphy/bunk beds) | Transactional | `/services/bed-frame-assembly/` |
| furniture assembly [city] (×12) | Transactional | `/locations/[city]/` |
| how much does furniture assembly cost in Toronto | Informational | `/blog/furniture-assembly-cost-toronto/` |
| IKEA PAX wardrobe assembly guide | Informational | `/blog/ikea-pax-wardrobe-assembly-guide/` |
| how long does furniture assembly take | Informational | `/blog/how-long-does-furniture-assembly-take/` |
| gazebo assembly cost and what to know | Informational | `/blog/gazebo-assembly-what-to-know/` |

## Competitor gap table (6ixassembly.ca, assemblygta.ca, furnituremaster.ca)

| They have X | We do Y | Advantage Z |
|---|---|---|
| Strong conversion structure (trust badges, pricing, FAQ) | Same structure PLUS per-service pricing tables and per-city pages with local detail | Matches their conversion strength while out-covering them on local and cost intent |
| Thin or duplicated location coverage | 12 genuinely varied location pages with local housing context, local FAQs and local project captions | Rank for "furniture assembly [city]" across the whole GTA |
| Generic service pages | 8 deep service pages (900–1,400 words) with brand-specific detail (PAX, MALM, SEKTION, COIs, Murphy beds) | Captures brand + product long-tail they leave on the table |
| FAQ content not always schema-matched | Visible `<details>` FAQs matching FAQPage JSON-LD exactly on home, every service and every location page | FAQ rich-result eligibility; LLM-extractable answers |
| No named warranty process | Written 12-month workmanship warranty, 5-step process, 7 service guarantees, on-time promise | Trust signals that convert comparison shoppers |
| Static galleries | Filterable portfolio with job-type + city captions on every key page, owner-editable via /admin/ | Fresh local proof that stays current |

## Content briefs per page type

### Service pages (×8, 900–1,400 words)
- H1 = primary keyword + "Toronto & the GTA"; answer-first intro (150–200 words) with keyword + Toronto in first 100 words.
- 3–4 H2 sections: what we assemble (brands/items), process detail, service-specific pricing guidance (CAD).
- Benefits (4), common problems (4: missing parts, unclear instructions, partial DIY, anchoring), 5-step process, why-choose-us (6 cards).
- Gallery: 4 unique real photos, captions = job type + city; 6 unique images per page total (hero + feature row + gallery).
- 5–7 PAA-style FAQs in `<details>` matching FAQPage schema exactly.
- Schema: Service + FAQPage + BreadcrumbList.

### Location pages (×12, 600–900 words)
- Varied intros per city (housing stock, neighbourhoods, common job types); unique per-city hero photo.
- Local housing section, popular services with links, city pricing guidance ($199/$249 model).
- Process, why-choose-us, 4 gallery images with city captions, 5 FAQs with city name.
- Schema: Service (areaServed = city) + FAQPage + BreadcrumbList.

### Blog posts (×4, 1,400–2,000 words)
- Informational intent, H2-structured, honest CAD numbers, internal CTAs to service pages.
- Schema: Article + BreadcrumbList.

### Core pages
- Home: hero (trust badges: $2M insured, upfront pricing, 12-month warranty) → stat band → services grid (8 cards, each with a real photo) → reviews → projects → why us (3 cards) → 4-step process → pricing ($199/$249 visit model) → brands marquee (IKEA, Wayfair, Structube, Cozey, West Elm, Costco, Amazon, CB2, EQ3, Article, Home Depot, Leon's) → commitments band → 12 service areas → quote form → 9 FAQs.
- About: E-E-A-T (story, 7 guarantees, process, NAP block).
- Contact: NAP + form + click-to-call + service area list.
- Projects: filterable portfolio (12 seeded items, admin-editable via Supabase).

## Technical notes
- 100% static export (`output: 'export'`), trailing slashes, local WebP photos, self-hosted Inter font.
- Light theme default + class-based dark toggle; motion via one small observer component.
- Every page: unique title (50–60 chars) + meta description (150–160 chars), one H1, OG/Twitter cards with branded og-image.jpg, canonical via metadataBase (.com).
- Sitewide JSON-LD: Organization + LocalBusiness (HomeAndConstructionBusiness, knowsAbout furniture services) + WebSite; NAP identical in footer, contact page, schema and llm.txt.
- `sitemap.ts` + `robots.ts` generated at build; `/admin/` is noindex and excluded; `/llm.txt` served from `public/` and linked in footer.
- Admin panel: quote submissions, portfolio manager (Storage bucket `portfolio`), content editor (hero/pricing/announcement/testimonials overrides).
