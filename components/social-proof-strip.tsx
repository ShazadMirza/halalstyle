const TRUST_BRANDS = [
  "Modanisa",
  "Saffron Road",
  "East Essentials",
  "Shukr",
  "Artizara",
  "Aab",
  "The Giving Movement",
] as const;

/** Duplicated for seamless CSS marquee loop */
const MARQUEE_BRANDS = [...TRUST_BRANDS, ...TRUST_BRANDS] as const;

export function SocialProofStrip() {
  return (
    <section
      className="relative overflow-hidden border-b border-halal-border/20 bg-halal-forest/30 py-6 backdrop-blur-sm"
      aria-label="Trusted partners"
    >
      <p className="section-eyebrow mb-4 text-center">Trusted by the Circle</p>
      <div className="trust-marquee-mask">
        <ul className="trust-marquee-track flex items-center gap-16 whitespace-nowrap px-6">
          {MARQUEE_BRANDS.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="font-brand shrink-0 text-[clamp(0.9rem,2.2vw,1.15rem)] tracking-[0.14em] text-halal-cream opacity-30 grayscale"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
