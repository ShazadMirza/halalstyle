/**
 * Emerald + gold lattice overlay for editorial / guide surfaces.
 * Sits above photography; keep pointer-events-none so links beneath stay clickable where needed.
 */
export function ExcellenceGuideMosaicOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-halal-forest/88 via-[#041a12]/75 to-halal-gold/20" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(212,175,55,0.22) 1px, transparent 1px),
            linear-gradient(0deg, rgba(212,175,55,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.12),transparent_60%)]" />
    </div>
  );
}
