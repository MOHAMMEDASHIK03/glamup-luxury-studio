import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { buildWhatsAppLink } from "@/lib/services";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Glamupbykirthi Melbourne" },
      { name: "description", content: "Visit our Docklands studio or message us on WhatsApp. Glamupbykirthi — luxury beauty in Melbourne." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try WhatsApp.");
    } else {
      toast.success("Thank you — we'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Visit the <span className="text-gradient-gold">studio</span>.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-2xl">Studio</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" />628 Flinders Street, Docklands, VIC 3008, Melbourne, Australia</li>
              <li className="flex gap-3"><Phone className="h-5 w-5 text-primary" />+61 481 308 396</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-primary" />hello@glamupbykirthi.com</li>
              <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" />Mon–Sat · 9am – 7pm</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 hover:bg-primary hover:text-primary-foreground transition"><Instagram className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 hover:bg-primary hover:text-primary-foreground transition"><Facebook className="h-4 w-4" /></a>
              <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-gradient-luxury px-5 py-2 text-sm text-primary-foreground">WhatsApp Us</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="Studio location"
              src="https://www.google.com/maps?q=628+Flinders+Street+Docklands+Melbourne&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h3 className="font-display text-2xl">Send a message</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" placeholder="Your name" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="email" type="email" placeholder="Email" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="phone" placeholder="Phone (optional)" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="service" placeholder="Service of interest" className="rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          </div>
          <textarea name="message" rows={5} placeholder="Tell us about your event..." className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          <button disabled={loading} className="w-full rounded-full bg-gradient-luxury px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60">
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>
    </>
  );
}
