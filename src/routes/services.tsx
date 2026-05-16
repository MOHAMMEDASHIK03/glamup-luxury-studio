import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/ServiceCard";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Glamupbykirthi Melbourne" },
      { name: "description", content: "Bridal makeup, HD, soft glam, glossy and hairstyling. Premium beauty services in Melbourne. View pricing and book on WhatsApp." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const makeup = services.filter((s) => s.category === "Makeup");
  const hair = services.filter((s) => s.category === "Hairstyling");
  return (
    <>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Services & Pricing</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">The full <span className="text-gradient-gold">menu</span>.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">All prices in AUD. Booking is direct through WhatsApp.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="font-display text-3xl md:text-4xl">Makeup</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {makeup.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="font-display text-3xl md:text-4xl">Hairstyling</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hair.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </section>
    </>
  );
}
