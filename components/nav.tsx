"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vault", label: "The Vault" },
  { href: "/about", label: "Our Story" },
  { href: "/partners", label: "Partners" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-halal-border/30 bg-halal-forest/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-[1.35rem] font-medium tracking-[0.2em] text-halal-gold group-hover:text-halal-gold-2 transition-colors duration-300">
            HalalStyle
          </span>
          <span className="text-[0.5rem] uppercase tracking-[0.3em] text-halal-gold/40 mt-0.5">
            The Excellence Filter
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200
                ${pathname === href ? "text-halal-gold" : "text-halal-cream/60 hover:text-halal-cream"}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link href="/#quiz" className="btn-gold btn-shop-glow hidden px-5 py-2.5 text-[0.75rem] md:inline-flex">
            Take the Quiz
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden">
            <span className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-halal-border/30 bg-halal-forest/85 px-6 pb-6 pt-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="text-[0.85rem] font-medium uppercase tracking-[0.1em] text-halal-cream/70 hover:text-halal-gold">
                {label}
              </Link>
            ))}
            <Link href="/#quiz" onClick={() => setOpen(false)} className="btn-gold btn-shop-glow mt-2 text-[0.8rem]">
              Take the Quiz
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
