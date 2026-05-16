import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import bridal from "@/assets/bridal.jpg";
import glam from "@/assets/glam.jpg";
import hair from "@/assets/hair.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Glamupbykirthi Melbourne" },
      { name: "description", content: "Bridal, glam and hairstyling portfolio of Glamupbykirthi, a luxury beauty studio in Melbourne." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const images = [bridal, glam, hair, hero, about, bridal, glam, hair, hero, about, bridal, glam];

function GalleryPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">The <span className="text-gradient-gold">gallery</span>.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {images.map((src, i) => (
            <button key={i} onClick={() => setOpen(src)} className="zoom-img block w-full overflow-hidden rounded-2xl shadow-soft">
              <img src={src} alt="Gallery" loading="lazy" className="w-full" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-softblack/85 p-5">
          <button onClick={() => setOpen(null)} className="absolute right-5 top-5 rounded-full bg-background p-2"><X /></button>
          <img src={open} alt="Preview" className="max-h-[90vh] max-w-full rounded-2xl shadow-luxury" />
        </div>
      )}
    </>
  );
}
