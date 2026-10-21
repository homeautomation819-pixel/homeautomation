import type { FaqItem } from "@/components/FAQ";

export type Location = {
  slug: string;
  city: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  heroImage: { src: string; alt: string };
  housingTitle: string;
  housing: string[];
  popular: string[];
  galleryCaptions: { src: string; alt: string; caption: string }[];
};

function locationFaqs(city: string): FaqItem[] {
  return [
    {
      q: `Do you provide furniture assembly in ${city}?`,
      a: `Yes — ${city} is part of our core service area. Our assemblers work across ${city} and the GTA every day, with same/next-day appointments often available and no travel charges within the region.`,
    },
    {
      q: `How much does furniture assembly cost in ${city}?`,
      a: `House visits start at $199+HST (downtown Toronto condos from $249+HST), covering most single large items. Multi-item visits are quoted firmly upfront based on your item list, access and parking — never hourly surprises.`,
    },
    {
      q: "How quickly can you come out?",
      a: `We typically have same-day or next-day availability in ${city}. Call +1 (437) 870-1113 with your item list and we'll find the earliest slot.`,
    },
    {
      q: `Can you assemble IKEA furniture in ${city}?`,
      a: "Yes — IKEA is our most common brand: PAX wardrobes, MALM beds, BILLY bookcases, BESTÅ units and more. We also assemble Wayfair, Structube, Cozey, Costco and Amazon furniture.",
    },
    {
      q: "Are you insured to work in my home?",
      a: `Yes. We carry $2M liability insurance, and every ${city} assembly includes our written 12-month workmanship warranty. Certificates of insurance are available for condo property managers.`,
    },
  ];
}

export const locations: Location[] = [
  {
    slug: "toronto",
    city: "Toronto",
    h1: "Furniture Assembly Services in Toronto",
    metaTitle: "Furniture Assembly Toronto",
    metaDescription:
      "Furniture assembly in Toronto: IKEA, beds, wardrobes, offices & more, built by insured pros. Upfront pricing, 12-month warranty. Call +1 (437) 870-1113 today.",
    intro:
      "Need furniture assembly in Toronto? Chrisko Home Automation professionally assembles furniture across the entire city — downtown condos, midtown apartments and family homes from the Beaches to Downsview. IKEA PAX wardrobes, Wayfair beds, Structube dining sets, office desks, treadmills, gazebos and TV mounting: one fully insured crew with professional tools, firm upfront pricing (house visits from $199+HST, downtown condos from $249+HST), packaging removed, and a 12-month workmanship warranty. Call +1 (437) 870-1113 — same-day and next-day appointments are often available.",
    heroImage: { src: "/images/furniture-assembly-toronto-city.webp", alt: "Toronto skyline — furniture assembly services across the city" },
    housingTitle: "Assembly for Toronto condos, apartments and homes",
    housing: [
      "Downtown Toronto condos are our most common call: furniture delivered in flat-pack boxes that barely fit the freight elevator, assembled in compact living spaces with building rules to follow. We handle COI requests for property managers, book elevators properly, and protect hallways and floors so your concierge has nothing to complain about.",
      "In Toronto's houses — from Victorian semis to post-war bungalows — the challenges shift to narrow staircases, uneven floors and rooms where a PAX wardrobe must be built upright. We've assembled furniture in every housing type this city has, and we plan for yours at quoting.",
    ],
    popular: ["Home Furniture Assembly", "IKEA Furniture Assembly", "Wardrobe & Closet Assembly", "TV Mounting & Installation", "Bed Frame Assembly"],
    galleryCaptions: [
      { src: "/images/sofa-assembly-toronto-condo.webp", alt: "Sectional sofa assembled in a downtown Toronto condo", caption: "Modular sectional — Downtown Toronto condo" },
      { src: "/images/dining-set-assembly-toronto.webp", alt: "Dining set assembled in a Toronto home", caption: "6-piece dining set — Toronto" },
      { src: "/images/pax-wardrobe-assembly-north-york.webp", alt: "IKEA PAX wardrobe assembled in a Toronto area bedroom", caption: "PAX wardrobe — Toronto" },
      { src: "/images/tv-mounting-condo-toronto.webp", alt: "TV wall mounted in a Toronto condo", caption: "TV mount + cable concealment — Toronto" },
    ],
  },
  {
    slug: "north-york",
    city: "North York",
    h1: "Furniture Assembly Services in North York",
    metaTitle: "Furniture Assembly North York",
    metaDescription:
      "Furniture assembly in North York: IKEA, beds, wardrobes, desks & TV mounting by insured local pros. Upfront quotes, 12-month warranty. Call +1 (437) 870-1113.",
    intro:
      "Looking for furniture assembly in North York? Chrisko Home Automation serves every North York neighbourhood — the Yonge Street condo corridor, Willowdale, Bayview Village, Downsview and Don Mills. We assemble IKEA, Wayfair, Structube, Cozey and Costco furniture: beds, PAX wardrobes, desks, dining sets, office fit-outs and more. Fully insured with $2M liability, firm upfront pricing (house visits from $199+HST, condos from $249+HST), packaging removed, and a 12-month workmanship warranty. Call +1 (437) 870-1113 — same/next-day slots are often available.",
    heroImage: { src: "/images/furniture-assembly-north-york.webp", alt: "North York condo interior with professionally assembled furniture" },
    housingTitle: "From Yonge Street condos to Willowdale family homes",
    housing: [
      "North York's condo towers along Yonge and Sheppard keep us busy with move-in builds: entire units of IKEA and Wayfair furniture assembled in a single day, with elevator bookings and building rules handled for you.",
      "In the detached homes of Willowdale and Bayview Village, the work is often bigger: multi-room bedroom sets, basement gym equipment, backyard gazebos and playsets. Larger homes mean more assembly — and our project pricing means the per-item cost drops as the list grows.",
    ],
    popular: ["IKEA Furniture Assembly", "Home Furniture Assembly", "Office Furniture Assembly", "Fitness Equipment Assembly", "Wardrobe & Closet Assembly"],
    galleryCaptions: [
      { src: "/images/pax-wardrobe-assembly-north-york.webp", alt: "IKEA PAX wardrobe assembled in a North York condo", caption: "PAX 3-frame wall — North York" },
      { src: "/images/treadmill-assembly-toronto-condo.webp", alt: "Treadmill assembled in a North York condo", caption: "Treadmill setup — North York condo" },
      { src: "/images/home-office-setup-toronto.webp", alt: "Home office desk assembled in North York", caption: "Home office setup — North York" },
      { src: "/images/ikea-malm-dresser-assembly-toronto.webp", alt: "IKEA MALM dresser assembled in North York", caption: "MALM dresser — North York" },
    ],
  },
  {
    slug: "scarborough",
    city: "Scarborough",
    h1: "Furniture Assembly Services in Scarborough",
    metaTitle: "Furniture Assembly Scarborough",
    metaDescription:
      "Furniture assembly in Scarborough: beds, wardrobes, dining sets & gazebos by insured pros. Upfront pricing from $199+HST, 12-month warranty. +1 (437) 870-1113.",
    intro:
      "Need furniture assembly in Scarborough? Chrisko Home Automation assembles furniture across every Scarborough neighbourhood — Agincourt, Woburn, Guildwood, Birch Cliff, Malvern and West Hill. Beds and bunk beds, IKEA wardrobes, dining sets, home gyms, gazebos and TV mounting, all by one fully insured crew with professional tools. House visits from $199+HST with firm upfront pricing, packaging removed, and a 12-month workmanship warranty. Call +1 (437) 870-1113 for same-day or next-day availability.",
    heroImage: { src: "/images/furniture-assembly-scarborough.webp", alt: "Scarborough family home with professionally assembled furniture" },
    housingTitle: "Assembly for Scarborough's family homes",
    housing: [
      "Scarborough's post-war bungalows and side-splits are full of growing families — and growing families buy furniture in volume. Kids' bunk beds, full bedroom sets, basement rec-room furniture and backyard playsets are our everyday work here, always with safety anchoring included.",
      "The area's generous backyards make it prime gazebo and patio territory every spring, and its multi-generational households appreciate that we work around busy homes: quiet tools, protected floors, and packaging gone before dinner.",
    ],
    popular: ["Bed Frame Assembly", "Home Furniture Assembly", "Outdoor & Patio Assembly", "IKEA Furniture Assembly", "Fitness Equipment Assembly"],
    galleryCaptions: [
      { src: "/images/kids-bunk-bed-scarborough.webp", alt: "Kids bunk bed assembled in a Scarborough home", caption: "Kids' bunk + safety check — Scarborough" },
      { src: "/images/gazebo-assembly-richmond-hill.webp", alt: "Gazebo assembled in a Scarborough backyard", caption: "Hardtop gazebo — Scarborough" },
      { src: "/images/dresser-assembly-toronto.webp", alt: "Dresser assembled and anchored in a Scarborough bedroom", caption: "Dresser + wall anchor — Scarborough" },
      { src: "/images/weight-bench-assembly-toronto.webp", alt: "Weight bench assembled in a Scarborough garage gym", caption: "Garage gym bench — Scarborough" },
    ],
  },
  {
    slug: "etobicoke",
    city: "Etobicoke",
    h1: "Furniture Assembly Services in Etobicoke",
    metaTitle: "Furniture Assembly Etobicoke",
    metaDescription:
      "Furniture assembly in Etobicoke: IKEA, beds, wardrobes, office & patio furniture by insured pros. Upfront quotes, 12-month warranty. +1 (437) 870-1113.",
    intro:
      "Looking for furniture assembly in Etobicoke? Chrisko Home Automation serves all of Etobicoke — the Humber Bay Shores and Mimico condo communities, plus family homes in The Kingsway, Long Branch, Sunnylea and Rexdale. We assemble beds, wardrobes, dining sets, desks, fitness equipment, gazebos and more from IKEA, Wayfair, Structube and Costco. Fully insured ($2M liability), firm upfront pricing from $199+HST for houses and $249+HST for condos, packaging removed, 12-month workmanship warranty. Call +1 (437) 870-1113.",
    heroImage: { src: "/images/furniture-assembly-etobicoke.webp", alt: "Etobicoke home with professionally assembled furniture" },
    housingTitle: "Lakeshore condos and Kingsway family homes",
    housing: [
      "Humber Bay Shores and Mimico's condo strips are some of our busiest territory: full-unit move-in builds with elevator bookings, COIs for property managers, and furniture assembled in compact spaces without a scratch on the building.",
      "Inland Etobicoke's larger homes bring bigger projects: basement gyms, backyard gazebos and playsets, multi-room bedroom furniture and home offices. Many homes here are mid-century — we plan for tight staircases and older construction at quoting.",
    ],
    popular: ["Home Furniture Assembly", "Wardrobe & Closet Assembly", "Outdoor & Patio Assembly", "TV Mounting & Installation", "IKEA Furniture Assembly"],
    galleryCaptions: [
      { src: "/images/tv-mount-above-fireplace-gta.webp", alt: "TV mounted above a fireplace in an Etobicoke home", caption: "Above-fireplace mount — Etobicoke" },
      { src: "/images/patio-set-assembly-oakville.webp", alt: "Patio set assembled in an Etobicoke backyard", caption: "Patio dining set — Etobicoke" },
      { src: "/images/armoire-assembly-toronto.webp", alt: "Armoire assembled in an Etobicoke bedroom", caption: "Armoire + anchoring — Etobicoke" },
      { src: "/images/home-furniture-assembly-toronto.webp", alt: "Living room furniture assembled in Etobicoke", caption: "Living room set — Etobicoke" },
    ],
  },
  {
    slug: "mississauga",
    city: "Mississauga",
    h1: "Furniture Assembly Services in Mississauga",
    metaTitle: "Furniture Assembly Mississauga",
    metaDescription:
      "Furniture assembly in Mississauga: IKEA, office furniture, beds, gyms & gazebos by insured pros. Upfront pricing from $199+HST. Call +1 (437) 870-1113 today.",
    intro:
      "Need furniture assembly in Mississauga? Chrisko Home Automation assembles furniture across the city — Square One condos, Port Credit, Streetsville, Erin Mills and Meadowvale. From full condo move-ins to office fit-outs, backyard gazebos and home gyms, one fully insured crew handles it with professional tools and firm upfront pricing (houses from $199+HST, condos from $249+HST). Packaging removed, 12-month workmanship warranty, and same/next-day appointments often available. Call +1 (437) 870-1113.",
    heroImage: { src: "/images/furniture-assembly-mississauga.webp", alt: "Mississauga home with professionally assembled furniture" },
    housingTitle: "Square One condos to Erin Mills family homes",
    housing: [
      "The City Centre condo district around Square One is full of new residents with full units of flat-pack furniture. We book the freight elevator, protect the hallways and assemble everything in a day — beds, sofas, desks, dining sets and TV mounts included.",
      "Mississauga's business community keeps us busy too: office furniture rollouts with COIs and after-hours scheduling. And in the detached neighbourhoods, it's backyard season from April to October — gazebos, sheds, playsets and patio sets.",
    ],
    popular: ["Office Furniture Assembly", "Home Furniture Assembly", "Outdoor & Patio Assembly", "Fitness Equipment Assembly", "IKEA Furniture Assembly"],
    galleryCaptions: [
      { src: "/images/office-cubicle-assembly-mississauga.webp", alt: "Office workstations assembled in a Mississauga office", caption: "12-station rollout — Mississauga" },
      { src: "/images/sofa-assembly-toronto-condo.webp", alt: "Sofa assembled in a Mississauga condo", caption: "Sectional build — Square One condo" },
      { src: "/images/backyard-pergola-gta.webp", alt: "Pergola assembled in a Mississauga backyard", caption: "Pergola & seating — Mississauga" },
      { src: "/images/gym-equipment-assembly-gta.webp", alt: "Home gym equipment assembled in Mississauga", caption: "Home gym — Mississauga" },
    ],
  },
  {
    slug: "brampton",
    city: "Brampton",
    h1: "Furniture Assembly Services in Brampton",
    metaTitle: "Furniture Assembly Brampton",
    metaDescription:
      "Furniture assembly in Brampton: beds, wardrobes, dining sets & home gyms by insured local pros. Upfront quotes, 12-month warranty. Call +1 (437) 870-1113 today.",
    intro:
      "Looking for furniture assembly in Brampton? Chrisko Home Automation serves Brampton's growing communities — Mount Pleasant, Credit Valley, Bramalea, Castlemore and downtown. We assemble full households of furniture: bedroom sets, bunk beds, dining room sets, home gyms, office desks and backyard structures from IKEA, Wayfair, Costco and Amazon. One fully insured crew, firm upfront pricing from $199+HST, packaging removed, and a 12-month workmanship warranty. Call +1 (437) 870-1113 — same/next-day slots are often available.",
    heroImage: { src: "/images/furniture-assembly-brampton.webp", alt: "Brampton detached home with professionally assembled furniture" },
    housingTitle: "Full-household assembly for Brampton's growing families",
    housing: [
      "Brampton's newer two-storey homes and townhouses are often furnished all at once — a move-in or a big delivery weekend. Whole-house assembly is where our project pricing shines: the more items on the list, the lower the per-item cost, and a full house is usually done in a day.",
      "Multi-generational households are common here, and we build for them: sturdy beds and wardrobes properly anchored, dining sets that seat everyone, and backyard gazebos and playsets that make the most of Brampton's generous lots.",
    ],
    popular: ["Home Furniture Assembly", "Bed Frame Assembly", "IKEA Furniture Assembly", "Outdoor & Patio Assembly", "Fitness Equipment Assembly"],
    galleryCaptions: [
      { src: "/images/dining-set-assembly-toronto.webp", alt: "Large dining set assembled in a Brampton home", caption: "8-seat dining set — Brampton" },
      { src: "/images/home-gym-assembly-toronto.webp", alt: "Home gym assembled in a Brampton basement", caption: "Basement gym — Brampton" },
      { src: "/images/kids-bunk-bed-scarborough.webp", alt: "Bunk beds assembled in a Brampton kids room", caption: "Twin bunks — Brampton" },
      { src: "/images/flat-pack-boxes-toronto-home.webp", alt: "Flat-pack furniture delivery assembled in Brampton", caption: "Move-in day build — Brampton" },
    ],
  },
  {
    slug: "vaughan",
    city: "Vaughan",
    h1: "Furniture Assembly Services in Vaughan",
    metaTitle: "Furniture Assembly Vaughan",
    metaDescription:
      "Furniture assembly in Vaughan: wardrobes, beds, office, gazebos & more by insured pros. Upfront pricing from $199+HST. Free quotes: +1 (437) 870-1113.",
    intro:
      "Need furniture assembly in Vaughan? Chrisko Home Automation serves Woodbridge, Maple, Kleinburg and the Vaughan Metropolitan Centre with professional furniture assembly: PAX wardrobe walls, bedroom sets, office fit-outs, home gyms, gazebos and patio furniture. We're fully insured with $2M liability, quote firmly upfront (house visits from $199+HST), remove all packaging, and back every build with a 12-month workmanship warranty. Call +1 (437) 870-1113 for a firm quote — same/next-day availability is common.",
    heroImage: { src: "/images/furniture-assembly-vaughan.webp", alt: "Vaughan custom home with professionally assembled furniture" },
    housingTitle: "Big builds for Vaughan's spacious homes",
    housing: [
      "Vaughan's custom homes mean big furniture projects: full walk-in closet systems, wall-to-wall PAX installations, home gyms in generous basements, and outdoor structures on large lots. These are multi-item project builds — our specialty, with per-item pricing that improves as the list grows.",
      "Newer subdivisions in Maple and around the VMC see a steady stream of move-in builds and nursery furniture — always assembled with anti-tip anchoring and safety checks as standard, not as an upsell.",
    ],
    popular: ["Wardrobe & Closet Assembly", "Home Furniture Assembly", "Office Furniture Assembly", "Outdoor & Patio Assembly", "Bed Frame Assembly"],
    galleryCaptions: [
      { src: "/images/walk-in-closet-gta.webp", alt: "Walk-in closet system assembled in a Vaughan home", caption: "Walk-in closet system — Vaughan" },
      { src: "/images/gym-equipment-assembly-gta.webp", alt: "Home gym equipment assembled in a Vaughan basement", caption: "Home gym build — Vaughan" },
      { src: "/images/patio-furniture-assembly-toronto.webp", alt: "Patio furniture assembled in a Vaughan backyard", caption: "Patio conversation set — Vaughan" },
      { src: "/images/ikea-billy-bookcase-assembly-toronto.webp", alt: "BILLY bookcases assembled in a Vaughan home", caption: "BILLY wall run — Vaughan" },
    ],
  },
  {
    slug: "markham",
    city: "Markham",
    h1: "Furniture Assembly Services in Markham",
    metaTitle: "Furniture Assembly Markham",
    metaDescription:
      "Furniture assembly in Markham: IKEA, beds, desks, wardrobes & TV mounting by insured pros. Upfront quotes, 12-month warranty. Call +1 (437) 870-1113 today.",
    intro:
      "Looking for furniture assembly in Markham? Chrisko Home Automation serves Unionville, Cornell, Box Grove, Wismer and Milliken with professional assembly of beds, wardrobes, dining sets, home offices, fitness equipment and more — IKEA, Wayfair, Structube, Cozey and Costco all covered. Fully insured ($2M liability), firm upfront pricing from $199+HST, packaging removed, and a 12-month workmanship warranty on every job. Call +1 (437) 870-1113 — same-day and next-day appointments are often available across Markham.",
    heroImage: { src: "/images/furniture-assembly-markham.webp", alt: "Markham family home with professionally assembled furniture" },
    housingTitle: "Assembly for Markham's tech-community homes",
    housing: [
      "Markham's townhouse and detached communities — Cornell, Box Grove, Wismer — are full of home offices, and we build them daily: sit-stand desks, ergonomic chairs, shelving and cable management done properly.",
      "From heritage homes near Main Street Unionville to brand-new builds on Ninth Line, we've assembled furniture in every Markham housing type. Families here plan ahead — book the Saturday slot early, because they fill first.",
    ],
    popular: ["Home Furniture Assembly", "Office Furniture Assembly", "IKEA Furniture Assembly", "Bed Frame Assembly", "Wardrobe & Closet Assembly"],
    galleryCaptions: [
      { src: "/images/king-bed-assembly-markham.webp", alt: "King bed frame assembled in a Markham home", caption: "King storage bed — Markham" },
      { src: "/images/office-desk-assembly-toronto.webp", alt: "Sit-stand desk assembled in a Markham home office", caption: "Home office build — Markham" },
      { src: "/images/closet-organizer-toronto.webp", alt: "Closet organizer installed in a Markham townhouse", caption: "Closet organizer — Markham" },
      { src: "/images/treadmill-assembly-toronto-condo.webp", alt: "Treadmill assembled in a Markham home gym", caption: "Treadmill setup — Markham" },
    ],
  },
  {
    slug: "richmond-hill",
    city: "Richmond Hill",
    h1: "Furniture Assembly Services in Richmond Hill",
    metaTitle: "Furniture Assembly Richmond Hill",
    metaDescription:
      "Furniture assembly in Richmond Hill: gazebos, beds, wardrobes & home gyms by insured pros. Upfront pricing, 12-month warranty. Call +1 (437) 870-1113 today.",
    intro:
      "Need furniture assembly in Richmond Hill? Chrisko Home Automation serves Bayview Hill, Jefferson, Oak Ridges, Mill Pond and Langstaff — assembling bedroom sets, PAX wardrobes, home gyms, office furniture, gazebos and playsets across the town. Fully insured with $2M liability, firm upfront pricing from $199+HST, packaging removed and recycled, and every build backed by a 12-month workmanship warranty. Call +1 (437) 870-1113 for a firm quote; same/next-day slots are often available.",
    heroImage: { src: "/images/furniture-assembly-richmond-hill.webp", alt: "Richmond Hill home with professionally assembled furniture" },
    housingTitle: "Big homes, big backyards, big builds",
    housing: [
      "Richmond Hill's spacious detached homes mean multi-room projects: full bedroom sets for the kids, walk-in closet systems, basement gyms and theatre-room furniture — often combined into a single project-quoted day that costs less per item than separate visits.",
      "The town's generous lots make it our gazebo capital: hardtop gazebos, pergolas, sheds and playsets fill our spring and summer schedule here. We level, anchor and seal every structure for Canadian weather.",
    ],
    popular: ["Outdoor & Patio Assembly", "Home Furniture Assembly", "Wardrobe & Closet Assembly", "Fitness Equipment Assembly", "Bed Frame Assembly"],
    galleryCaptions: [
      { src: "/images/gazebo-assembly-richmond-hill.webp", alt: "Hardtop gazebo assembled in a Richmond Hill backyard", caption: "Hardtop gazebo — Richmond Hill" },
      { src: "/images/bedroom-furniture-assembly-toronto.webp", alt: "Bedroom set assembled in a Richmond Hill home", caption: "Full bedroom set — Richmond Hill" },
      { src: "/images/exercise-bike-assembly-toronto.webp", alt: "Exercise equipment assembled in a Richmond Hill home gym", caption: "Home gym setup — Richmond Hill" },
      { src: "/images/murphy-bed-assembly-toronto.webp", alt: "Murphy bed assembled in a Richmond Hill condo", caption: "Murphy bed — Richmond Hill" },
    ],
  },
  {
    slug: "oakville",
    city: "Oakville",
    h1: "Furniture Assembly Services in Oakville",
    metaTitle: "Furniture Assembly Oakville",
    metaDescription:
      "Furniture assembly in Oakville: wardrobes, patio sets, office & beds by insured local pros. Upfront quotes, 12-month warranty. Call +1 (437) 870-1113.",
    intro:
      "Looking for furniture assembly in Oakville? Chrisko Home Automation serves Glen Abbey, Bronte, River Oaks, Joshua Creek and Old Oakville with professional furniture assembly: wardrobes and closet systems, bedroom sets, home offices, patio and backyard structures, and TV mounting. One fully insured crew ($2M liability), firm upfront pricing from $199+HST, packaging removed, and a 12-month workmanship warranty on every build. Call +1 (437) 870-1113 — same/next-day appointments are often available across Oakville.",
    heroImage: { src: "/images/furniture-assembly-oakville.webp", alt: "Oakville home with professionally assembled furniture" },
    housingTitle: "Careful assembly for Oakville's finer finishes",
    housing: [
      "Oakville homes tend to have finishes worth protecting — hardwood, custom millwork, fresh paint. Our white-glove standard fits right in: floor and corner protection, quiet tools, and packaging gone before we leave.",
      "Lakeside properties in Bronte and Old Oakville keep us busy with patio sets and outdoor structures, while newer North Oakville builds in Joshua Creek and the Preserve call for full move-in packages: beds, wardrobes, offices and playsets in a single project-quoted day.",
    ],
    popular: ["Home Furniture Assembly", "Wardrobe & Closet Assembly", "Outdoor & Patio Assembly", "Office Furniture Assembly", "TV Mounting & Installation"],
    galleryCaptions: [
      { src: "/images/patio-set-assembly-oakville.webp", alt: "Outdoor dining set assembled in an Oakville backyard", caption: "Outdoor dining set — Oakville" },
      { src: "/images/armoire-assembly-toronto.webp", alt: "Wardrobe assembled in an Oakville bedroom", caption: "Armoire + anchoring — Oakville" },
      { src: "/images/meeting-room-assembly-toronto.webp", alt: "Office furniture assembled in an Oakville business", caption: "Office fit-out — Oakville" },
      { src: "/images/walk-in-closet-gta.webp", alt: "Walk-in closet assembled in an Oakville home", caption: "Walk-in closet — Oakville" },
    ],
  },
  {
    slug: "ajax",
    city: "Ajax",
    h1: "Furniture Assembly Services in Ajax",
    metaTitle: "Furniture Assembly in Ajax",
    metaDescription:
      "Furniture assembly in Ajax: beds, wardrobes, dining sets, gyms & playsets by insured pros. Upfront pricing from $199+HST. Call +1 (437) 870-1113 today.",
    intro:
      "Need furniture assembly in Ajax? Chrisko Home Automation serves the whole town — the lakeside neighbourhoods, downtown Ajax, and the newer communities along Salem Road and Rossland. We assemble bedroom sets, bunk beds, wardrobes, dining sets, home gyms, playsets and patio furniture from IKEA, Wayfair, Costco and Amazon. Fully insured with $2M liability, firm upfront pricing from $199+HST, packaging removed, and a 12-month workmanship warranty. Call +1 (437) 870-1113 — same-day and next-day slots are often available.",
    heroImage: { src: "/images/furniture-assembly-ajax.webp", alt: "Ajax family home with professionally assembled furniture" },
    housingTitle: "Family-first assembly in Ajax",
    housing: [
      "Ajax's newer two-storey homes and townhouses north of the 401 are full of young families furnishing fast. Our most common Ajax day: two kids' beds, a dresser set and a dining table — done in one visit with anti-tip anchoring on everything tall.",
      "Closer to the lake, established homes bring renovation follow-ups: new furniture for refreshed rooms, basement gyms and backyard upgrades. One crew, one quote, one clean finish.",
    ],
    popular: ["Bed Frame Assembly", "Home Furniture Assembly", "IKEA Furniture Assembly", "Outdoor & Patio Assembly", "Fitness Equipment Assembly"],
    galleryCaptions: [
      { src: "/images/bunk-bed-assembly-toronto.webp", alt: "Bunk bed assembled in an Ajax kids room", caption: "Twin-over-full bunk — Ajax" },
      { src: "/images/dresser-assembly-toronto.webp", alt: "Dresser set assembled in an Ajax bedroom", caption: "Dresser + nightstands — Ajax" },
      { src: "/images/patio-furniture-assembly-toronto.webp", alt: "Patio set assembled in an Ajax backyard", caption: "Patio set — Ajax" },
      { src: "/images/wardrobe-assembly-toronto.webp", alt: "Wardrobe assembled in an Ajax bedroom", caption: "Wardrobe build — Ajax" },
    ],
  },
  {
    slug: "whitby",
    city: "Whitby",
    h1: "Furniture Assembly Services in Whitby",
    metaTitle: "Furniture Assembly Whitby",
    metaDescription:
      "Furniture assembly in Whitby: IKEA, beds, gazebos, home gyms & offices by insured pros. Upfront quotes, 12-month warranty. Call +1 (437) 870-1113 today.",
    intro:
      "Looking for furniture assembly in Whitby? Chrisko Home Automation serves Brooklin, Port Whitby, downtown and the newer communities north of Taunton with professional assembly of beds, wardrobes, dining sets, home gyms, gazebos, playsets and office furniture. Fully insured with $2M liability, firm upfront pricing from $199+HST, all packaging removed, and a 12-month workmanship warranty on every job. Call +1 (437) 870-1113 — same/next-day appointments are often available across Whitby.",
    heroImage: { src: "/images/furniture-assembly-whitby.webp", alt: "Whitby home with professionally assembled furniture" },
    housingTitle: "Assembly for Whitby's growing north end",
    housing: [
      "Whitby's newer communities north of Taunton and around Brooklin are full of growing families furnishing entire homes at once — whole-house move-in builds are our signature here, project-quoted so the per-item cost keeps dropping as your list grows.",
      "Older Whitby near the downtown core and the port district brings character-home challenges: narrow stairs, tight doorways and rooms where large wardrobes are built upright. We plan for your home's specifics at quoting, not on build day.",
    ],
    popular: ["Home Furniture Assembly", "Bed Frame Assembly", "Outdoor & Patio Assembly", "IKEA Furniture Assembly", "Office Furniture Assembly"],
    galleryCaptions: [
      { src: "/images/gazebo-assembly-toronto.webp", alt: "Gazebo assembled in a Whitby backyard", caption: "Backyard gazebo — Whitby" },
      { src: "/images/king-bed-assembly-markham.webp", alt: "Bed frame assembled in a Whitby master bedroom", caption: "King bed build — Whitby" },
      { src: "/images/home-office-setup-toronto.webp", alt: "Home office assembled in a Whitby home", caption: "Home office — Whitby" },
      { src: "/images/ikea-furniture-assembly-toronto.webp", alt: "IKEA flat-pack furniture assembled in Whitby", caption: "IKEA flat-pack day — Whitby" },
    ],
  },
];

export { locationFaqs };

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
