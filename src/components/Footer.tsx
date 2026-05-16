import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl">
            <span className="text-gradient-gold">Glamupbykirthi</span>
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Luxury Makeup & Hairstyling Studio in Melbourne.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Studio</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" />628 Flinders Street, Docklands, VIC 3008, Melbourne, Australia</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" />+61 481 308 396</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" />hello@glamupbykirthi.com</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Follow</h4>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 hover:bg-primary hover:text-primary-foreground transition"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full border border-border p-2 hover:bg-primary hover:text-primary-foreground transition"><Facebook className="h-4 w-4" /></a>
          </div>
          <a href={buildWhatsAppLink()} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full bg-gradient-luxury px-5 py-2 text-sm text-primary-foreground">Book on WhatsApp</a>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Glamupbykirthi. Crafted with love in Melbourne.
      </div>
    </footer>
  );
}
