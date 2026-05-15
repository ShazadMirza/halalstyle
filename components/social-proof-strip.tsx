const PARTNERS = ["Modanisa", "Saffron Road", "Ethical Finance Partners"] as const;

export function SocialProofStrip() {
  return (
    <section
      className="border-b border-halal-border/25 bg-halal-forest/40 px-6 py-8 backdrop-blur-sm"
      aria-label="Trusted by the Circle"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="section-eyebrow mb-5">Trusted by the Circle</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <li
              key={name}
              className="font-brand text-[clamp(0.95rem,2.5vw,1.25rem)] tracking-[0.12em] text-halal-cream opacity-40 grayscale"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
