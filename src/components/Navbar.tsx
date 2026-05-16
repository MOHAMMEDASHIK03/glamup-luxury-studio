import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/services";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 glass">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="font-display text-xl tracking-wide">
          <span className="text-gradient-gold">Glamup</span>
          <span className="text-foreground">bykirthi</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm tracking-wide transition-colors hover:text-primary ${
                  path === l.to ? "text-primary" : "text-foreground/80"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-gradient-luxury px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft hover-lift md:inline-flex"
        >
          Book Now
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm tracking-wide"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full bg-gradient-luxury px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Book Now on WhatsApp
            </a>
          </ul>
        </div>
      )}
    </header>
  );
}
