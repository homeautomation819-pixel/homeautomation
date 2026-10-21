// Downloads real, license-free photos from Unsplash (https://unsplash.com/license)
// and converts them to WebP in public/images/. Run: node scripts/fetch-images.mjs
import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "images");

// filename (no ext) -> Unsplash photo ID
const photos = {
  // Core / home
  "furniture-assembly-toronto-hero": "photo-1555041469-a586c61ea9bc",
  "furniture-assembly-team-toronto": "photo-1426927308491-6380b6a9936f",

  // Service: home furniture assembly
  "home-furniture-assembly-toronto": "photo-1578112010316-b44c50d27b2b",
  "furniture-assembly-tools-toronto": "photo-1530124566582-a618bc2615dc",
  "dining-set-assembly-toronto": "photo-1568347760450-1ef7874c5f5f",
  "dresser-assembly-toronto": "photo-1579283111509-855c7eea1c49",
  "sofa-assembly-toronto-condo": "photo-1590251024078-8a6d9f90b02d",
  "flat-pack-boxes-toronto-home": "photo-1657664066011-ed54a1be81d2",

  // Service: IKEA assembly
  "ikea-furniture-assembly-toronto": "photo-1657434743746-8264509ea3fd",
  "ikea-flat-pack-boxes-toronto": "photo-1623043453741-11aef9cb59b5",
  "ikea-pax-wardrobe-assembly-toronto": "photo-1611048268330-53de574cae3b",
  "ikea-billy-bookcase-assembly-toronto": "photo-1593430980369-68efc5a5eb34",
  "ikea-malm-dresser-assembly-toronto": "photo-1579656381254-1a60dc1ee3f4",
  "ikea-kitchen-assembly-toronto": "photo-1588854337236-6889d631faa8",

  // Service: office furniture assembly
  "office-furniture-assembly-toronto": "photo-1497366754035-f200968a6e72",
  "office-desk-assembly-toronto": "photo-1518455027359-f3f8164ba6bd",
  "office-chair-assembly-toronto": "photo-1571624436279-b272aff752b5",
  "office-cubicle-assembly-mississauga": "photo-1560264280-88b68371db39",
  "meeting-room-assembly-toronto": "photo-1517502884422-41eaead166d4",
  "home-office-setup-toronto": "photo-1504198070170-4ca53bb1c1fa",

  // Service: fitness equipment assembly
  "fitness-equipment-assembly-toronto": "photo-1584827387150-8ae4caebe906",
  "treadmill-assembly-toronto-condo": "photo-1633394782240-f81aba3f850d",
  "home-gym-assembly-toronto": "photo-1590487988357-5233b152a9b7",
  "exercise-bike-assembly-toronto": "photo-1598289431512-b97b0917affc",
  "weight-bench-assembly-toronto": "photo-1584827386894-fc939dad6078",
  "gym-equipment-assembly-gta": "photo-1590487988152-68aca60adba1",

  // Service: outdoor / patio / gazebo
  "gazebo-assembly-toronto": "photo-1573861046636-52f0d6ac48b7",
  "pergola-assembly-toronto": "photo-1580469322701-45b34d5e6e9b",
  "gazebo-assembly-richmond-hill": "photo-1503542179591-7cc9c0651195",
  "patio-furniture-assembly-toronto": "photo-1600210492090-a159ffa3aeaf",
  "patio-set-assembly-oakville": "photo-1613317447829-eea2ed59640f",
  "backyard-pergola-gta": "photo-1600376709132-33584c8ddb17",

  // Service: TV mounting & installation
  "tv-mounting-installation-toronto": "photo-1567690187548-f07b1d7bf5a9",
  "tv-wall-mount-toronto": "photo-1521782462922-9318be1cfd04",
  "tv-mounting-condo-toronto": "photo-1633604712918-6ab1173d0ecd",
  "tv-mount-above-fireplace-gta": "photo-1586024486164-ce9b3d87e09f",
  "mirror-wall-hanging-toronto": "photo-1513716875652-59c99449ee70",
  "curtain-rod-installation-toronto": "photo-1473252812967-d565c3607e28",

  // Service: wardrobe & closet assembly
  "wardrobe-assembly-toronto": "photo-1618236444721-4a8dba415c15",
  "closet-system-assembly-toronto": "photo-1530411554903-7e745b9f1f6d",
  "pax-wardrobe-assembly-north-york": "photo-1562740672-22db5c969f04",
  "armoire-assembly-toronto": "photo-1573311392049-4186e3a47e9c",
  "walk-in-closet-gta": "photo-1631067128698-2f4f8ce87e28",
  "closet-organizer-toronto": "photo-1577020914435-7ae6b1091ebd",

  // Service: bed frame assembly
  "bed-frame-assembly-toronto": "photo-1530629013299-6cb10d168419",
  "murphy-bed-assembly-toronto": "photo-1617198998846-56e8a4c6e7b7",
  "bunk-bed-assembly-toronto": "photo-1555854877-bab0e564b8d5",
  "king-bed-assembly-markham": "photo-1635594202056-9ea3b497e5c0",
  "bedroom-furniture-assembly-toronto": "photo-1560185893-a55cbc8c57e8",
  "kids-bunk-bed-scarborough": "photo-1588939349575-7ab15c8bd1ef",

  // Location heroes (GTA houses, condos, cityscapes)
  "furniture-assembly-toronto-city": "photo-1517935706615-2717063c2225",
  "furniture-assembly-north-york": "photo-1568723256924-ec521428cfe4",
  "furniture-assembly-scarborough": "photo-1570129477492-45c003edd2be",
  "furniture-assembly-etobicoke": "photo-1580587771525-78b9dba3b914",
  "furniture-assembly-mississauga": "photo-1600596542815-ffad4c1539a9",
  "furniture-assembly-brampton": "photo-1583608205776-bfd35f0d9f83",
  "furniture-assembly-vaughan": "photo-1613977257363-707ba9348227",
  "furniture-assembly-markham": "photo-1572120360610-d971b9d7767c",
  "furniture-assembly-richmond-hill": "photo-1627141234469-24711efb373c",
  "furniture-assembly-oakville": "photo-1628012209120-d9db7abf7eab",
  "furniture-assembly-ajax": "photo-1516156008625-3a9d6067fab5",
  "furniture-assembly-whitby": "photo-1584738766473-61c083514bf4",

  // Blog post headers
  "furniture-assembly-cost-toronto-guide": "photo-1624137527136-66e631bdaa0e",
  "ikea-pax-wardrobe-assembly-guide": "photo-1558997519-83ea9252edf8",
  "furniture-assembly-time-guide": "photo-1540103711724-ebf833bde8d1",
  "gazebo-assembly-guide": "photo-1537064108358-d6e6de5346d6",
};

await mkdir(outDir, { recursive: true });

const credits = [];

for (const [name, id] of Object.entries(photos)) {
  const url = `https://images.unsplash.com/${id}?w=1600&q=85&auto=format&fit=crop`;
  const file = path.join(outDir, `${name}.webp`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const webp = await sharp(buf).resize(1600, 900, { fit: "cover" }).webp({ quality: 80 }).toBuffer();
    if (webp.length < 10_000) throw new Error(`suspiciously small (${webp.length} bytes)`);
    await writeFile(file, webp);
    const s = await stat(file);
    console.log(`ok  ${name}.webp  ${Math.round(s.size / 1024)}KB`);
    credits.push(`- public/images/${name}.webp — ${url} (Unsplash License)`);
  } catch (err) {
    console.error(`FAIL ${name}: ${err.message}`);
  }
}

await writeFile(
  path.join(process.cwd(), "docs", "photo-credits.md"),
  `# Photo credits\n\nAll photos are from Unsplash and used under the Unsplash License\n(https://unsplash.com/license) — free for commercial use, no attribution required.\n\n${credits.join("\n")}\n`
);
console.log("done");
