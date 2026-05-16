import { createFileRoute, Link } from "@tanstack/react-router";
import about from "@/assets/about.jpg";
import { buildWhatsAppLink } from "@/lib/services";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Glamupbykirthi Luxury Beauty Studio" },
      { name: "description", content: "Meet Kirthi — a Melbourne-based luxury makeup artist and hairstylist obsessed with crafting confidence." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">Beauty that <span className="text-gradient-gold">feels like you</span>.</h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Glamupbykirthi is a luxury makeup & hairstyling studio in Docklands, Melbourne — founded on the idea that
              great beauty is never loud. It's the way light catches your skin. The confidence of a hold that lasts the day.
              The quiet thrill of feeling unmistakably you.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              With years of bridal, editorial and event experience, Kirthi blends precise technique with a soft,
              personal approach. Every booking starts with a conversation and ends with a look you'll remember.
            </p>
          </div>
          <img src={about} alt="Kirthi at work" loading="lazy" className="rounded-[2rem] shadow-luxury w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { n: "8+", l: "Years experience" },
            { n: "200+", l: "Brides styled" },
            { n: "50+", l: "Editorial shoots" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <div className="font-display text-5xl text-gradient-gold">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="rounded-full bg-gradient-luxury px-7 py-3 text-sm text-primary-foreground hover-lift inline-block mr-3">Book on WhatsApp</a>
          <Link to="/services" className="text-sm text-primary underline-offset-4 hover:underline">See services →</Link>
        </div>
      </section>
    </>
  );
}
