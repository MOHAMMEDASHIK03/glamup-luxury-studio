import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Award, Heart, Clock, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import bridal from "@/assets/bridal.jpg";
import glam from "@/assets/glam.jpg";
import hair from "@/assets/hair.jpg";
import { services, buildWhatsAppLink } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glamupbykirthi — Luxury Makeup & Hairstyling Studio in Melbourne" },
      { name: "description", content: "Bridal, HD and soft glam makeup with expert hairstyling in Docklands, Melbourne. Book directly via WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const featured = services.filter((s) => ["bridal-makeup", "hd-makeup", "soft-glam-makeup", "bridal-hairstyle"].includes(s.slug));

const testimonials = [
  { name: "Aisha M.", text: "Kirthi did my bridal look and I felt unreal. Lasted all day, photographed beautifully. Absolutely the best in Melbourne.", rating: 5 },
  { name: "Priya R.", text: "Soft glam for my engagement — flawless skin, romantic eyes. Studio is gorgeous and so calming.", rating: 5 },
  { name: "Hannah L.", text: "HD makeup for a shoot — the finish was unreal under the lights. Highly recommend.", rating: 5 },
];

const faqs = [
  { q: "Where is the studio located?", a: "628 Flinders Street, Docklands, Victoria 3008, Melbourne. We also offer on-location bridal services." },
  { q: "How do I book?", a: "All bookings happen directly through WhatsApp — tap any Book button and a prefilled message will open." },
  { q: "Do you travel for bridal bookings?", a: "Yes — travel is available across Melbourne and regional Victoria. Travel fees may apply." },
  { q: "What products do you use?", a: "Only premium, long-wear, photo-safe brands curated for Australian skin and climate." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Luxury Beauty Studio · Melbourne</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
              Effortless <span className="text-gradient-gold">glamour</span>, crafted for you.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Bridal, HD and soft glam artistry with expert hairstyling — in the heart of Docklands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer"
                 className="rounded-full bg-gradient-luxury px-7 py-3 text-sm font-medium text-primary-foreground shadow-soft hover-lift">
                Book Appointment
              </a>
              <Link to="/services"
                    className="rounded-full border border-primary/40 px-7 py-3 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition">
                View Services
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
                <span className="ml-2">5.0 · 200+ brides</span>
              </div>
            </div>
          </div>
          <div className="relative reveal">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-luxury opacity-20 blur-3xl" />
            <img src={hero} alt="Luxury makeup model" width={1600} height={1280}
                 className="rounded-[2rem] shadow-luxury object-cover w-full h-[520px] md:h-[640px]" />
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Signature Services</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Beauty that lasts the day.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="text-sm text-primary underline-offset-4 hover:underline">View all services →</Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gradient-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-4">
          {[
            { i: Sparkles, t: "Premium products", d: "Only luxury, long-wear, photo-safe brands." },
            { i: Award, t: "Award-winning artistry", d: "Trained and certified bridal specialist." },
            { i: Heart, t: "Personalised looks", d: "Designed around your features and outfit." },
            { i: Clock, t: "Punctual & calm", d: "Relaxed pacing — you arrive, we deliver." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl glass p-6 hover-lift">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Kind Words</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Loved by Melbourne brides.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
              <p className="mt-4 font-display text-xl leading-relaxed">"{t.text}"</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Portfolio</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Recent looks.</h2>
          </div>
          <Link to="/gallery" className="text-sm text-primary hover:underline">View gallery →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[bridal, glam, hair, hero].map((src, i) => (
            <div key={i} className="zoom-img aspect-square overflow-hidden rounded-2xl">
              <img src={src} loading="lazy" alt="Beauty work" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl bg-gradient-luxury px-8 py-16 text-center text-primary-foreground shadow-luxury">
          <h2 className="font-display text-4xl md:text-5xl">Ready to glow?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">Book directly via WhatsApp — quick replies, easy scheduling.</p>
          <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer"
             className="mt-7 inline-block rounded-full bg-background px-8 py-3 text-sm font-medium text-foreground shadow-soft hover-lift">
            Message on WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-center font-display text-4xl">Frequently asked</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-soft">
              <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
