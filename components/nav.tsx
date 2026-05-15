"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vault", label: "The Vault" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "Our Story" },
  { href: "/partners", label: "Partners" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isJournalArticle = pathname.startsWith("/journal/") && pathname !== "/journal";

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[60] border-b border-halal-border/30 bg-halal-forest/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="group flex flex-col leading-none">
            <Image
              src="/logo.png"
              alt="HalalStyle"
              width={160}
              height={32}
              priority
              className="h-8 w-auto max-w-[200px] object-contain object-left drop-shadow-[0_0_10px_rgba(212,175,55,0.35)] transition-opacity group-hover:opacity-95"
            />
            <span className="mt-0.5 text-[0.5rem] uppercase tracking-[0.3em] text-halal-gold/40">
              The Excellence Filter
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                  pathname === href ? "text-halal-gold" : "text-halal-cream/60 hover:text-halal-cream"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#quiz"
              onClick={() => setOpen(false)}
              className="btn-gold btn-shop-glow shrink-0 px-3 py-2 text-[0.65rem] sm:px-4 sm:py-2.5 sm:text-[0.72rem] md:px-5 md:text-[0.75rem]"
            >
              <span className="md:hidden">Quiz</span>
              <span className="hidden md:inline">Take the Quiz</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-5 bg-halal-cream transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {open && (
          <div className="relative z-[61] border-t border-halal-border/30 bg-halal-forest/95 px-6 pb-6 pt-4 shadow-lg backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-[0.85rem] font-medium uppercase tracking-[0.1em] text-halal-cream/70 hover:text-halal-gold"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {!open && (
        <Link
          href="/#quiz"
          className={`btn-gold btn-shop-glow fixed right-4 z-[45] px-4 py-2.5 text-[0.72rem] shadow-gold md:hidden ${
            isJournalArticle ? "bottom-24" : "bottom-4"
          }`}
        >
          Take the Quiz
        </Link>
      )}
    </>
  );
}


