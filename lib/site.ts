export const site = {
  name: "Chrisko Home Automation",
  url: "https://www.chriskohomeautomation.com",
  phoneDisplay: "+1 (437) 870-1113",
  phoneHref: "tel:+14378701113",
  email: "info@chriskohomeautomation.com",
  locality: "Toronto, ON",
  region: "Ontario",
  country: "Canada",
  hours: "Mon–Sat 8am–8pm",
  hoursSchema: "Mo-Sa 08:00-20:00",
  areaServed: [
    "Toronto",
    "North York",
    "Scarborough",
    "Etobicoke",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Richmond Hill",
    "Oakville",
    "Ajax",
    "Whitby",
  ],
  lastUpdated: "2026-01-15",
  tagline:
    "Professional furniture assembly and installation across Toronto and the Greater Toronto Area.",
} as const;

export const lastUpdatedDisplay = "January 15, 2026";

export const whatsappNumber = "14378701113";

export function whatsappUrl(text: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const brands = [
  "IKEA",
  "Wayfair",
  "Structube",
  "Cozey",
  "West Elm",
  "Costco",
  "Amazon",
  "CB2",
  "EQ3",
  "Article",
  "Home Depot",
  "Leon\u2019s",
];

export const trustBadges = [
  "$2M insured",
  "Upfront pricing",
  "12-month workmanship warranty",
];

export const whyChooseUs = [
  {
    title: "Experienced with all brands",
    body: "IKEA PAX wardrobes, Wayfair beds, Structube dining sets, Cozey modular sofas, Costco gazebos — we've assembled them all, hundreds of times, with the right tools for every cam lock and allen bolt.",
  },
  {
    title: "Upfront, honest pricing",
    body: "Tell us your items and we quote a firm price before we start. House visits from $199+HST, downtown condo visits from $249+HST — no hourly meters running, no surprises.",
  },
  {
    title: "White-glove care",
    body: "Floor and wall protection, packaging removed and flattened for recycling, every door and drawer aligned, and a completion check with you before we leave.",
  },
  {
    title: "Fully insured local team",
    body: "We carry $2M liability insurance, and every assembler is a trained, background-checked member of our own GTA crew — never random subcontractors.",
  },
  {
    title: "12-month workmanship warranty",
    body: "Every assembly is backed by a written 12-month workmanship warranty. If a hinge loosens or a panel shifts because of our work, we come back and make it right.",
  },
  {
    title: "On-time, same/next-day",
    body: "We show up in the window we promise — and same-day or next-day appointments are available across most of the GTA when you need it done now.",
  },
];

export const processSteps = [
  {
    title: "Show us your items",
    body: "Call, text a photo, or send the quote form with your furniture list — product links or model numbers (like IKEA PAX or MALM) help us quote precisely.",
  },
  {
    title: "Get an honest quote",
    body: "We reply with a firm, upfront price based on your items, access and location. You approve the exact number before anything is booked.",
  },
  {
    title: "Pick your time",
    body: "Choose a window that works — evenings and Saturdays included. Same-day and next-day slots are available across most of the GTA.",
  },
  {
    title: "We build, you relax",
    body: "Our insured crew arrives with professional tools, assembles everything, anchors what needs anchoring, and removes the packaging.",
  },
  {
    title: "Completion check & warranty",
    body: "We walk through every door, drawer and joint with you, then leave your space clean — backed by a 12-month workmanship warranty.",
  },
];
