#!/usr/bin/env python3
"""Pre-publish QA audit over out/**/index.html: content benchmarks, schema, NAP, links, OG, alts."""
import re, os, json, html as htmlmod
from html.parser import HTMLParser

OUT = "out"
BRAND = "Chrisko Home Automation"
PHONE = "+1 (437) 870-1113"
EMAIL = "info@chriskohomeautomation.com"
DOMAIN = "https://www.chriskohomeautomation.com"

# primary keyword per page path (prefix match on directory)
KEYWORDS = {
    "": "furniture assembly Toronto",
    "about": "Chrisko Home Automation",
    "projects": "furniture assembly projects",
    "contact": "furniture assembly quote Toronto",
    "services": "furniture assembly services",
    "locations": "service areas",
    "blog": "furniture assembly",
}

def page_key(path):
    rel = os.path.relpath(path, OUT).replace("\\", "/")
    return rel[:-len("/index.html")] if rel.endswith("/index.html") else rel

def primary_keyword(key):
    if key in KEYWORDS: return KEYWORDS[key]
    if key.startswith("services/"):
        slug = key.split("/")[1]
        return {
            "home-furniture-assembly": "home furniture assembly",
            "ikea-furniture-assembly": "IKEA furniture assembly",
            "office-furniture-assembly": "office furniture assembly",
            "fitness-equipment-assembly": "fitness equipment assembly",
            "outdoor-patio-assembly": "gazebo",
            "tv-mounting-installation": "TV mounting",
            "wardrobe-closet-assembly": "wardrobe",
            "bed-frame-assembly": "bed frame assembly",
        }[slug]
    if key.startswith("locations/"):
        return "furniture assembly " + key.split("/")[1].replace("-", " ")
    if key.startswith("blog/"):
        return {
            "furniture-assembly-cost-toronto": "furniture assembly cost",
            "ikea-pax-wardrobe-assembly-guide": "PAX wardrobe assembly",
            "how-long-does-furniture-assembly-take": "furniture assembly take",
            "gazebo-assembly-what-to-know": "gazebo assembly",
        }[key.split("/")[1]]
    return None

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.text = []
        self.in_main = False
        self.main_text = []
        self.h1s = []
        self.in_h1 = False
        self.h1_buf = []
        self.imgs = []
        self.links = []
        self.details = 0
        self.summaries = []
        self.in_summary = False
        self.sum_buf = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style"): self.skip += 1
        if tag == "main": self.in_main = True
        if tag == "h1": self.in_h1 = True; self.h1_buf = []
        if tag == "img": self.imgs.append(a)
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag == "details": self.details += 1
        if tag == "summary": self.in_summary = True; self.sum_buf = []
    def handle_endtag(self, tag):
        if tag in ("script", "style") and self.skip: self.skip -= 1
        if tag == "main": self.in_main = False
        if tag == "h1": self.in_h1 = False; self.h1s.append(" ".join("".join(self.h1_buf).split()))
        if tag == "summary": self.in_summary = False; self.summaries.append(" ".join("".join(self.sum_buf).split()))
    def handle_data(self, data):
        if self.skip: return
        self.text.append(data)
        if self.in_main: self.main_text.append(data)
        if self.in_h1: self.h1_buf.append(data)
        if self.in_summary: self.sum_buf.append(data)

results = {"pages": {}, "nap": {}, "links_broken": [], "schema_errors": [], "alt_errors": []}
all_files = []
for root, _, files in os.walk(OUT):
    for f in files:
        if f.endswith(".html"):
            all_files.append(os.path.join(root, f))

def target_exists(href):
    p = href.split("#")[0].split("?")[0]
    if not p or p.startswith("http") or p.startswith("tel:") or p.startswith("mailto:") or p.startswith("data:"): return True
    if not p.startswith("/"): return True
    # trailing slash site
    if not p.endswith("/") and not os.path.splitext(p)[1]: p += "/"
    cand = os.path.join(OUT, p.lstrip("/"))
    if os.path.splitext(p)[1]:  # file like /llm.txt or /images/x.webp
        return os.path.exists(cand.rstrip("/"))
    return os.path.exists(os.path.join(cand, "index.html"))

for path in sorted(all_files):
    raw = open(path, encoding="utf-8").read()
    key = page_key(path)
    if key.startswith("admin") or "404" in key: continue
    ex = TextExtractor(); ex.feed(raw)
    p = {}

    main_text = " ".join("".join(ex.main_text).split())
    words = len(main_text.split())
    p["words"] = words

    p["h1_count"] = len(ex.h1s)
    p["h1"] = ex.h1s[0] if ex.h1s else ""
    kw = primary_keyword(key)
    if kw:
        p["kw_in_h1"] = kw.lower() in p["h1"].lower()
        p["kw_in_intro"] = kw.lower() in main_text[:800].lower()

    t = re.search(r"<title>(.*?)</title>", raw)
    title = htmlmod.unescape(t.group(1)) if t else ""
    p["title_len"] = len(title)
    p["title_brand_count"] = title.count(BRAND)
    d = re.search(r'<meta name="description" content="([^"]*)"', raw)
    desc = htmlmod.unescape(d.group(1)) if d else ""
    p["desc_len"] = len(desc)
    p["desc_has_phone"] = PHONE in desc

    p["breadcrumbs"] = 'aria-label="Breadcrumb"' in raw
    p["last_updated"] = "Last updated:" in raw
    p["faq_count"] = ex.details
    internal = [l for l in ex.links if l.startswith("/")]
    p["internal_links"] = len(set(internal))
    external = [l for l in ex.links if l.startswith("http") and not l.startswith(DOMAIN)]
    p["external_links"] = sorted(set(external))

    p["viewport"] = 'name="viewport"' in raw
    p["og_title"] = 'property="og:title"' in raw
    p["og_image"] = 'property="og:image"' in raw
    p["twitter_card"] = 'name="twitter:card"' in raw

    for img in ex.imgs:
        alt = img.get("alt")
        if alt is None:
            results["alt_errors"].append(f"{key}: img missing alt ({img.get('src','?')[:60]})")
        elif len(htmlmod.unescape(alt)) > 125:
            results["alt_errors"].append(f"{key}: alt {len(alt)} chars > 125")

    for l in internal:
        if not target_exists(l):
            results["links_broken"].append(f"{key} -> {l}")

    # schema validation
    types = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', raw, re.S):
        try:
            data = json.loads(htmlmod.unescape(m.group(1)))
        except Exception as e:
            results["schema_errors"].append(f"{key}: JSON parse error {e}")
            continue
        items = data if isinstance(data, list) else [data]
        for it in items:
            t2 = it.get("@type")
            types.append(t2)
            if t2 == "FAQPage":
                qs = [q.get("name", "").strip() for q in it.get("mainEntity", [])]
                vis = [s.replace("&amp;", "&") for s in ex.summaries]
                vis_page = [v for v in vis]
                if sorted(qs) != sorted(vis_page):
                    results["schema_errors"].append(f"{key}: FAQPage schema/visible mismatch: schema={len(qs)} visible={len(vis_page)}")
    p["schema_types"] = types

    # expectations
    is_service = key.startswith("services/") and key.count("/") == 1
    is_location = key.startswith("locations/") and key.count("/") == 1
    is_blog = key.startswith("blog/") and key.count("/") == 1
    if is_service or is_location:
        for req in ("Service", "FAQPage", "BreadcrumbList"):
            if req not in types: results["schema_errors"].append(f"{key}: missing {req}")
    if is_blog:
        for req in ("Article", "BreadcrumbList"):
            if req not in types: results["schema_errors"].append(f"{key}: missing {req}")
    if key == "":
        for req in ("FAQPage",):
            if req not in types: results["schema_errors"].append(f"home: missing {req}")
    for req in ("Organization", "HomeAndConstructionBusiness", "WebSite"):
        if req not in types: results["schema_errors"].append(f"{key}: missing sitewide {req}")

    # word count targets
    if is_service: p["target"] = "800-1500"; p["ok"] = words >= 800
    elif is_location: p["target"] = "600-900"; p["ok"] = words >= 600
    elif is_blog: p["target"] = "1400-2000"; p["ok"] = words >= 1400
    else: p["target"] = "-"; p["ok"] = True

    results["pages"][key or "(home)"] = p

# NAP checks
foot = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
contact = open(os.path.join(OUT, "contact/index.html"), encoding="utf-8").read()
llm = open(os.path.join(OUT, "llm.txt"), encoding="utf-8").read()
schema_txt = foot
for label, content in [("footer(home)", foot), ("contact", contact), ("llm.txt", llm)]:
    results["nap"][label] = {"name": BRAND in content, "phone": PHONE in content, "email": EMAIL in content}
lb = re.search(r'"@type":"HomeAndConstructionBusiness".*?"telephone":"([^"]*)"', foot)
results["nap"]["schema_phone"] = lb.group(1) if lb else None
results["nap"]["schema_email"] = EMAIL in foot

print(json.dumps(results, indent=1))
