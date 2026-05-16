import { buildWhatsAppLink, type Service } from "@/lib/services";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover-lift">
      <div className="zoom-img aspect-[4/5] bg-muted">
        <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary">{s.category}</p>
            <h3 className="mt-1 font-display text-2xl">{s.name}</h3>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
            AUD ${s.price}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
        <a
          href={buildWhatsAppLink(s.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-luxury px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Book via WhatsApp
        </a>
      </div>
    </article>
  );
}
