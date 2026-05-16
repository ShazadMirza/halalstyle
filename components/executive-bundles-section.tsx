"use client";

import Image from "next/image";
import Link from "next/link";
import { withHalalStyleAffiliateTag } from "@/lib/amazon-affiliate";
import {
  amazonAffiliateUrlToAsinLabel,
  trackAffiliateShopNow,
  trackFirstShopNow,
} from "@/lib/analytics-events";
import { EXECUTIVE_BUNDLES, resolveBundleItems } from "@/lib/executive-bundles";

export function ExecutiveBundlesSection() {
  return (
    <section
      id="executive-bundles"
      className="border-b border-halal-border/30 bg-halal-surface/50 px-6 py-16"
      aria-labelledby="executive-bundles-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-3">Shop the Look</p>
          <h2 id="executive-bundles-heading" className="section-title">
            Executive Bundles
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.9rem] leading-relaxed text-halal-muted">
            Curated pairings for the modern Muslim high-achiever — each bundle passes the same Excellence
            Filter as The Vault.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {EXECUTIVE_BUNDLES.map((bundle) => {
            const items = resolveBundleItems(bundle);
            const bundleTotal = items.reduce((sum, item) => sum + item.priceCAD, 0);

            return (
              <article key={bundle.id} className="card-luxury flex flex-col overflow-hidden p-6">
                <h3 className="font-brand text-lg tracking-[0.06em] text-halal-cream">{bundle.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-halal-muted">{bundle.subtitle}</p>

                <ul className="mt-5 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-halal-border/40 bg-halal-forest-2">
                        <Image
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.85rem] font-medium text-halal-cream">{item.title}</p>
                        <p className="text-[0.7rem] text-halal-muted">{item.brand}</p>
                        <p className="mt-0.5 text-[0.75rem] text-halal-gold">${item.priceCAD} CAD</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[0.72rem] uppercase tracking-[0.18em] text-halal-muted">
                  Bundle from ~${bundleTotal} CAD
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  {items.map((item) => {
                    const href = withHalalStyleAffiliateTag(item.affiliateUrl);
                    return (
                      <a
                        key={item.id}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={() => {
                          trackAffiliateShopNow({
                            productId: item.id,
                            productTitle: item.title,
                            category: item.category,
                            priceCAD: item.priceCAD,
                          });
                          const asin = item.asin?.trim() || amazonAffiliateUrlToAsinLabel(href);
                          trackFirstShopNow(asin, item.title);
                        }}
                        className="btn-outline w-full py-2.5 text-[0.72rem]"
                      >
                        Shop {item.title.split("—")[0].trim()} →
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.7rem] text-halal-muted">
          Amazon affiliate links — we may earn a commission at no extra cost.{" "}
          <Link href="/how-we-earn" className="text-halal-gold/90 underline-offset-2 hover:underline">
            Disclosure
          </Link>
        </p>
      </div>
    </section>
  );
}
