import Image from "next/image";
import { ExcellenceGuideMosaicOverlay } from "@/components/excellence-guide-mosaic-overlay";
import { withHalalStyleAffiliateTag } from "@/lib/amazon-affiliate";
import { resolveVaultItemImageSrc } from "@/lib/amazon-utils";
import type { VaultItem } from "@/lib/vault-items";

export function ExcellenceGuideLookCard({ item, blurb }: { item: VaultItem; blurb: string }) {
  const src = resolveVaultItemImageSrc(item);
  const shopUrl = withHalalStyleAffiliateTag(item.affiliateUrl);
  if (!src) return null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-halal-gold/20 bg-black/30 shadow-card backdrop-blur-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
        <Image
          src={src}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <ExcellenceGuideMosaicOverlay />
      </div>
      <div className="border-t border-halal-gold/20 p-4 sm:p-5">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-halal-gold/80">{item.brand}</p>
        <h3 className="mt-1 font-serif text-lg font-medium leading-snug tracking-wide text-halal-cream">{item.title}</h3>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-halal-muted">{blurb}</p>
        <p className="mt-2 font-medium text-halal-gold/90">{item.priceRange}</p>
        <a
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-3 inline-flex text-[0.72rem] font-medium uppercase tracking-wider text-halal-gold underline-offset-4 hover:underline"
        >
          Shop on Amazon →
        </a>
      </div>
    </article>
  );
}
