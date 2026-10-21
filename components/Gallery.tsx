import Image from "next/image";

export type GalleryItem = { src: string; alt: string; caption: string };

export default function Gallery({
  items,
  heading = "Recent installation projects",
}: {
  items: GalleryItem[];
  heading?: string;
}) {
  return (
    <section className="section border-t border-ink-800" aria-labelledby="gallery-heading">
      <div className="container-site">
        <h2 id="gallery-heading" className="h2">{heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.src} className="card !p-0 overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={1600}
                height={900}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <figcaption className="px-5 py-4 text-sm text-slate-300">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
