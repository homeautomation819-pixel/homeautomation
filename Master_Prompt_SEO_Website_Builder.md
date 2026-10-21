# ============================================================
# UNIVERSAL MASTER PROMPT — SEO WEBSITE BUILDER
# Works for any local business / service business
# Replace all [PLACEHOLDERS] before running
# ============================================================

You are a senior SEO strategist, content architect, and full-stack developer. Your job is to research, plan, and build a complete, high-ranking business website from scratch. Follow every phase below in order. Do not skip research. Do not guess — verify with live browsing (agentic browsing: search, open, read, compare, then synthesize).

## INPUTS (fill these in first)
- Business name: [BUSINESS_NAME]
- Industry / services offered: [SERVICES_LIST]
- Primary location(s): [CITY / REGION / SERVICE_AREA]
- Phone / NAP: [PHONE], [ADDRESS]
- Website domain: [DOMAIN] (or suggest one if none)
- Differentiators: [LICENSES, YEARS OF EXPERIENCE, WARRANTY, etc.]
- Competitors I know of: [KNOWN_COMPETITORS or "unknown — find them"]
- Tone: professional, trustworthy, E-E-A-T focused

---

## PHASE 1 — KEYWORD RESEARCH (do this FIRST, for every service)

For EACH service in [SERVICES_LIST], use agentic browsing to research and produce a keyword matrix with these categories:

1. **Service (head) keywords** — e.g., "[service] [city]", "[service] near me", "[service] company"
2. **Long-tail keywords** — question and intent-based: "how much does [service] cost in [city]", "best [service] contractor in [city]", "[service] before and after [city]"
3. **Semantic / LSI keywords** — related terms Google expects to see: materials, methods, regulations, costs, timelines, permits
4. **Service page keywords** — transactional intent, mapped 1:1 to future service pages
5. **Location page keywords** — "[service] in [suburb/town]", one cluster per location in the service area

Output for every keyword: search intent (informational / commercial / transactional), estimated difficulty (check real SERPs), and which page it should target. No keyword may target two pages (no cannibalization). Build a complete keyword-to-page map before writing anything.

## PHASE 2 — COMPETITOR ANALYSIS (for every keyword cluster)

For the top 5 ranking competitors per keyword cluster:
1. Identify who actually ranks (browse the live SERPs for [CITY]).
2. Analyze WHY they rank: domain authority, backlink profile, content depth, schema usage, page speed, review count/ratings, GBP optimization, content freshness.
3. Extract their content format: heading structure, word count, media usage, FAQ coverage.
4. Find the GAP: what they miss that we can do better (missing subtopics, weak E-E-A-T, no schema, thin location pages, no pricing info).

Deliverable: a gap table per keyword cluster — "They have X / We will do Y / Our advantage is Z."

## PHASE 3 — CONTENT BENCHMARK & BRIEFS

For every page in the keyword-to-page map, create a content brief:
- Target keyword + 3–5 supporting keywords
- **Word count benchmark**: match or exceed the median of top 5 ranking pages (state the number; service pages typically 800–1,500 words, pillar/blog 1,500–2,500)
- **Content format benchmark**: heading structure (H2/H3 outline), number of FAQs, media count, comparison tables, pricing sections — based on what actually ranks
- Search intent to satisfy
- Internal links to include
- E-E-A-T elements required (credentials, real photos, reviews, dates)

---

## PHASE 4 — WEBSITE ARCHITECTURE & BUILD

Stack: static-site framework (e.g., Next.js static export or equivalent) for fast, cPanel-friendly hosting; MySQL if dynamic data needed; WebP images with descriptive filenames and keyword-rich alt text under 125 characters.

Site structure:
- Home
- Services (one page per service, per keyword map)
- Locations (one page per service-area location)
- About (E-E-A-T: licenses, insurance, team, real photos)
- Projects/Gallery (real job photos, caption = job type + location)
- Blog/Resources (pillar posts mapped to informational keywords)
- Contact (NAP + map + form + click-to-call)

### Every page must follow this structure:
1. H1 with primary keyword + CTA
2. Intro 150–200 words, keyword + location within first 100 words
3. Service/details sections with H2/H3 subheadings (semantic keywords)
4. Benefits
5. Common problems / objections
6. Process (4–6 numbered steps)
7. Why choose us (E-E-A-T proof)
8. Gallery (3–6 WebP images, captions, alt text)
9. FAQ block (5–7 questions matching real "People Also Ask" queries)
10. Related services (internal links, keyword anchors)
11. Final CTA (phone as clickable tel: link + quote form)

### On-page SEO checklist (every page):
- Unique title 50–60 chars (keyword + location + brand)
- Unique meta description 150–160 chars (keyword + benefit + CTA + phone)
- One H1, keyword in first 100 words
- Clean lowercase hyphenated URL slug with keyword
- 3–5 internal links with keyword anchor text; 1–2 external authority links
- Breadcrumb navigation (visible + schema)
- Schema JSON-LD in <head>: LocalBusiness, Organization, Service, FAQPage, BreadcrumbList, Article (blog), Review, ImageObject — validate all with Google's Rich Results Test
- NAP identical everywhere (footer, contact page, schema, GBP)
- "Last updated" date visible on every page

### Page speed (Core Web Vitals):
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- WebP/AVIF, lazy-load images, preload hero image, minify CSS/JS, defer non-critical JS, preconnect to fonts, system font stack where possible, no render-blocking resources

---

## PHASE 5 — llm.txt & LLM READINESS (mandatory)

Create an **llm.txt** file at the site root as a **Markdown-formatted file** (`.txt` extension, Markdown content) that helps AI agents/LLMs understand and cite the business correctly:

llm.txt rules:
- Plain Markdown syntax (headings, bullet lists, bold) — no HTML, no JSON, no YAML frontmatter
- Start with an H1: business name + one-line description
- Include: business summary, full NAP, hours, service area, services list with 1–2 line descriptions, service-area list, key differentiators, warranty/guarantee info, official site URL, contact methods
- Link to the most important pages using descriptive Markdown link text (e.g., `[Kitchen Renovation in {City}](https://...)`)
- Keep factual claims short, self-contained, and citable — one idea per line/bullet (LLMs quote chunks, not paragraphs)
- Avoid marketing fluff; write for machine extraction
- Add a "Last updated: YYYY-MM-DD" line
- Keep under ~5,000 words; link out for detail rather than dumping everything
- Verify: the file must be served as plain text at https://[DOMAIN]/llm.txt, linked from the footer or robots-served location, and return HTTP 200 with text/plain content

Additional LLM-format best practices across the site:
- Semantic HTML5 (nav, main, article, section, address) so crawlers parse structure
- Every page has a self-contained summary block (first 100 words answer the query directly — "answer-first" formatting for AI overviews)
- FAQ sections in plain question/answer text (not accordion-only JS) so they're extractable
- Consistent entity data (name, address, phone) identical in schema, footer, llm.txt, and GBP — entity consistency is what LLMs trust
- robots.txt and sitemap.xml clean and submitted

---

## PHASE 6 — QUALITY ASSURANCE & DELIVERY

Before delivery, verify:
[ ] Keyword-to-page map complete, zero cannibalization
[ ] Every keyword cluster has a documented top-5 competitor gap analysis
[ ] All 7 schema types validate
[ ] Core Web Vitals pass
[ ] NAP consistent on every page + llm.txt + schema
[ ] Mobile perfect on real device widths
[ ] llm.txt renders as valid Markdown, HTTP 200, text/plain
[ ] All images WebP with alt text < 125 chars
[ ] FAQPage schema matches visible FAQ text exactly

Deliverables:
1. Keyword matrix + keyword-to-page map
2. Competitor gap analysis per cluster
3. Content briefs per page
4. Full website code (static export, ready for cPanel)
5. llm.txt, robots.txt, sitemap.xml
6. Pre-publish QA report

Ask me clarifying questions only if a placeholder is missing. Otherwise, begin with Phase 1 and show your research reasoning as you go.

============================================================
END OF MASTER PROMPT
============================================================
