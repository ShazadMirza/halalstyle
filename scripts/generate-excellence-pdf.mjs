/**
 * HalalStyle 2026 Excellence Guide — Designer PDF Generator
 * Renders pixel-perfect HTML/CSS → A4 PDF via Playwright Chromium.
 * Run: node scripts/generate-excellence-pdf.mjs
 * Output: public/guides/halalstyle-2026-excellence.pdf
 */
import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/guides/halalstyle-2026-excellence.pdf");

// ── Images (same Unsplash sources as vault-items.ts) ──────────────────────
const IMG = {
  cover:   "https://images.unsplash.com/photo-1565008576519-a61d59963765?auto=format&fit=crop&w=1600&q=90",
  thobe:   "https://images.unsplash.com/photo-1593030767217-7f768dee6ebb?auto=format&fit=crop&w=800&q=85",
  abaya:   "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=85",
  palazzo: "https://images.unsplash.com/photo-1441986300917-647bde3668e8?auto=format&fit=crop&w=800&q=85",
  rug:     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85",
  travel:  "https://images.unsplash.com/photo-1590076215577-87543389193d?auto=format&fit=crop&w=800&q=85",
  miswak:  "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=85",
  laptop:  "https://images.unsplash.com/photo-1525547719571-a2d4ac7d6f2f?auto=format&fit=crop&w=800&q=85",
  quran:   "https://images.unsplash.com/photo-1505740420920-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
  tasbee:  "https://images.unsplash.com/photo-1594736797933-d0401ba2fe01?auto=format&fit=crop&w=800&q=85",
  doha:    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=90",
  friday:  "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1600&q=90",
  tech:    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90",
};

const AMAZON_BASE = "https://www.amazon.ca";
const TAG = "tag=halalstyle50d-20";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>2026 Excellence: The Private Lookbook — HalalStyle</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html,body{width:210mm;background:#0a0a0a;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}

/* ── Page shell ── */
.page{
  width:210mm;min-height:297mm;height:297mm;
  background:#0a0a0a;overflow:hidden;
  position:relative;
  page-break-after:always;break-after:page;
  display:flex;flex-direction:column;
}
.page:last-child{page-break-after:avoid;break-after:avoid;}

/* ── Typography ── */
.serif{font-family:'Playfair Display',Georgia,serif;}
.sans{font-family:'Inter','Helvetica Neue',sans-serif;}

/* ── Brand colours ── */
:root{
  --gold:#D4AF37;--gold-dim:#8B6914;--gold-faint:rgba(212,175,55,0.12);
  --cream:#F5F0E8;--muted:#9CA3AF;--midnight:#0a0a0a;--surface:#111111;
  --border:rgba(212,175,55,0.22);
}

/* ── Utilities ── */
.eyebrow{
  font-family:'Inter',sans-serif;font-size:7.5px;font-weight:600;
  letter-spacing:.32em;text-transform:uppercase;color:var(--gold);
}
.gold-rule{height:.4px;background:linear-gradient(90deg,transparent,var(--gold),transparent);width:100%;}
.badge{
  display:inline-block;font-family:'Inter',sans-serif;font-size:6.5px;
  font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  background:var(--gold);color:#0a0a0a;padding:2px 6px;border-radius:2px;
}

/* ════════════════════════════════════════════════
   COVER PAGE
════════════════════════════════════════════════ */
.cover{position:relative;justify-content:flex-end;}
.cover-bg{
  position:absolute;inset:0;
  background:url('${IMG.cover}') center/cover no-repeat;
}
.cover-overlay{
  position:absolute;inset:0;
  background:linear-gradient(
    to bottom,
    rgba(10,10,10,0.35) 0%,
    rgba(10,10,10,0.6)  40%,
    rgba(10,10,10,0.92) 70%,
    #0a0a0a 100%
  );
}
.cover-radial{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 50% at 50% 20%,rgba(212,175,55,0.18),transparent 60%);
}
.cover-content{
  position:relative;z-index:2;
  padding:0 14mm 10mm;
  display:flex;flex-direction:column;align-items:center;text-align:center;
}
.cover-eyebrow{
  font-family:'Inter',sans-serif;font-size:7px;font-weight:500;
  letter-spacing:.42em;text-transform:uppercase;color:var(--gold);
  margin-bottom:8mm;
}
.cover-title{
  font-family:'Playfair Display',serif;
  font-size:38px;font-weight:700;line-height:1.1;
  color:var(--cream);margin-bottom:4px;
}
.cover-title-gold{
  font-family:'Playfair Display',serif;
  font-size:38px;font-weight:700;font-style:italic;
  color:var(--gold);line-height:1.1;margin-bottom:6mm;
}
.cover-sub{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:13px;color:var(--cream);opacity:.9;margin-bottom:3px;
}
.cover-meta{
  font-family:'Inter',sans-serif;font-size:8px;color:var(--muted);
  margin-bottom:8mm;letter-spacing:.06em;
}
.cover-rule{width:48mm;margin-bottom:8mm;}

/* Founder card */
.founder-card{
  width:100%;border:1px solid var(--border);border-radius:6px;
  background:rgba(12,12,12,0.85);backdrop-filter:blur(8px);
  padding:5mm 7mm;margin-bottom:7mm;
}
.founder-card .eyebrow{margin-bottom:3px;}
.founder-name{
  font-family:'Playfair Display',serif;font-size:14px;font-weight:600;
  color:var(--cream);margin-bottom:4px;
}
.founder-quote{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:10px;color:var(--muted);line-height:1.65;
}

/* Contents */
.contents-grid{
  width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm;
  margin-bottom:6mm;
}
.contents-item{
  border:1px solid var(--border);border-radius:4px;
  padding:4mm;text-align:center;
}
.contents-item .eyebrow{font-size:6.5px;margin-bottom:3px;}
.contents-title{
  font-family:'Playfair Display',serif;font-size:9.5px;
  color:var(--cream);line-height:1.3;
}

/* Cover footer */
.cover-footer{
  position:relative;z-index:2;
  padding:3mm 14mm;border-top:1px solid rgba(212,175,55,.18);
  display:flex;justify-content:space-between;align-items:center;
  margin-top:auto;
}
.cover-footer span{
  font-family:'Inter',sans-serif;font-size:6.5px;
  color:var(--muted);letter-spacing:.06em;
}
</style>
</head>
<body>

<!-- ═══════════════════════════════ COVER ═══════════════════════════════ -->
<div class="page cover">
  <div class="cover-bg"></div>
  <div class="cover-overlay"></div>
  <div class="cover-radial"></div>

  <div class="cover-content">
    <div class="cover-eyebrow">HalalStyle &nbsp;·&nbsp; Private &nbsp;·&nbsp; 2026</div>

    <div class="cover-title">2026 Excellence:</div>
    <div class="cover-title-gold">The Private Lookbook</div>

    <div class="cover-sub">Curated for the Muslim High-Achiever. Vetted for Barakah.</div>
    <div class="cover-meta">9 halal-verified picks &nbsp;·&nbsp; 3 editorial sections &nbsp;·&nbsp; Amazon.ca affiliate links</div>

    <div class="cover-rule gold-rule"></div>

    <div class="founder-card">
      <div class="eyebrow" style="margin-bottom:4px;">Founder's Welcome</div>
      <div class="founder-name">Deen Ali Mirza</div>
      <div class="founder-quote">
        "Welcome to the Circle. This guide is your first step toward a wardrobe of barakah
        and excellence. Every piece was chosen with one question: does this reflect who we're meant to be?"
      </div>
    </div>

    <div class="contents-grid">
      <div class="contents-item">
        <div class="eyebrow">Section I</div>
        <div class="contents-title">The Doha Executive</div>
      </div>
      <div class="contents-item">
        <div class="eyebrow">Section II</div>
        <div class="contents-title">The Friday Standard</div>
      </div>
      <div class="contents-item">
        <div class="eyebrow">Section III</div>
        <div class="contents-title">The Tech Edit</div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <span>halalstyles55.com</span>
    <span style="color:var(--gold);font-size:11px;">✦</span>
    <span>All Amazon.ca links include tag=halalstyle50d-20</span>
  </div>
</div>
`;

// ── Continue building HTML ───────────────────────────────────────────────
const sectionCss = `
<style>
/* ════════════════════════════════════════════════
   SECTION PAGES
════════════════════════════════════════════════ */
.section-page{padding:10mm 14mm 8mm;}

.section-header{
  display:flex;flex-direction:column;align-items:center;
  text-align:center;margin-bottom:6mm;
}
.section-header .eyebrow{margin-bottom:3mm;}
.section-title{
  font-family:'Playfair Display',serif;font-weight:700;
  font-size:28px;color:var(--cream);line-height:1.15;margin-bottom:2mm;
}
.section-intro{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:9.5px;color:var(--muted);line-height:1.7;
  max-width:140mm;
}
.section-rule{width:32mm;margin:4mm auto;}

/* ── Product card ── */
.product-card{
  display:flex;gap:5mm;
  border:1px solid var(--border);border-radius:6px;
  background:rgba(255,255,255,0.025);
  padding:4.5mm;margin-bottom:4mm;
  overflow:hidden;
}
.product-card:last-child{margin-bottom:0;}

.product-img{
  width:36mm;min-width:36mm;height:36mm;
  border-radius:4px;object-fit:cover;
  border:1px solid rgba(212,175,55,.15);
  flex-shrink:0;
}

.product-body{flex:1;display:flex;flex-direction:column;justify-content:space-between;}

.product-top{display:flex;justify-content:space-between;align-items:flex-start;gap:3mm;margin-bottom:2.5mm;}
.product-title{
  font-family:'Playfair Display',serif;font-weight:600;
  font-size:12px;color:var(--cream);line-height:1.3;flex:1;
}
.product-price{
  font-family:'Inter',sans-serif;font-size:8px;font-weight:600;
  color:var(--gold);white-space:nowrap;letter-spacing:.03em;
}

.product-brand{
  font-family:'Inter',sans-serif;font-size:7.5px;font-weight:500;
  color:var(--muted);letter-spacing:.08em;text-transform:uppercase;
  margin-bottom:2mm;
}

.product-desc{
  font-family:'Inter',sans-serif;font-size:8.5px;color:rgba(245,240,232,.75);
  line-height:1.6;margin-bottom:2mm;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
}

.product-footer{display:flex;justify-content:space-between;align-items:center;margin-top:auto;}
.halal-note{
  font-family:'Inter',sans-serif;font-size:7px;color:var(--gold-dim);
  display:flex;align-items:center;gap:3px;flex:1;
  line-height:1.4;
}
.halal-note::before{content:'✦';color:var(--gold);flex-shrink:0;}
.shop-link{
  font-family:'Inter',sans-serif;font-size:7.5px;font-weight:600;
  color:var(--gold);letter-spacing:.08em;white-space:nowrap;
  border:1px solid rgba(212,175,55,.4);border-radius:2px;
  padding:2px 6px;text-decoration:none;
}

/* ── Section bg accents ── */
.section-accent{
  position:absolute;right:-20mm;top:-20mm;
  width:80mm;height:80mm;border-radius:50%;
  background:radial-gradient(circle,rgba(212,175,55,.07),transparent 70%);
  pointer-events:none;
}

/* ── Coda page ── */
.coda-page{
  justify-content:center;align-items:center;text-align:center;
  padding:14mm;position:relative;
}
.coda-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 55% at 50% 40%,rgba(212,175,55,.08),transparent 65%);
}
.coda-content{position:relative;z-index:2;max-width:148mm;}
.coda-title{
  font-family:'Playfair Display',serif;font-weight:700;font-style:italic;
  font-size:32px;color:var(--gold);margin-bottom:4mm;
}
.coda-rule{width:24mm;margin:0 auto 7mm;}
.coda-para{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:11px;color:var(--muted);line-height:1.8;margin-bottom:5mm;
}
.coda-cta{
  display:inline-block;margin-top:7mm;
  border:1px solid var(--border);border-radius:4px;padding:3mm 8mm;
  font-family:'Inter',sans-serif;font-size:8.5px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;color:var(--gold);
  text-decoration:none;
}
.coda-footer{
  position:absolute;bottom:8mm;left:0;right:0;
  font-family:'Inter',sans-serif;font-size:6.5px;color:var(--muted);
  text-align:center;letter-spacing:.06em;
}
</style>
`;

// ── Product card builder ──────────────────────────────────────────────────
function card(img, title, brand, price, badge, desc, halal, url) {
  return `
  <div class="product-card">
    <img class="product-img" src="${img}" alt="${title}" loading="eager"/>
    <div class="product-body">
      <div>
        <div class="product-top">
          <div class="product-title">${title}</div>
          <div class="product-price">${price}</div>
        </div>
        <div class="product-brand">${brand} &nbsp;·&nbsp; <span class="badge">${badge}</span></div>
        <div class="product-desc">${desc}</div>
      </div>
      <div class="product-footer">
        <div class="halal-note">${halal}</div>
        <a class="shop-link" href="${AMAZON_BASE}/s?k=${url}&${TAG}">Shop Amazon.ca →</a>
      </div>
    </div>
  </div>`;
}

// ── Section page builder ──────────────────────────────────────────────────
function sectionPage(eyebrow, title, intro, bg, items) {
  return `
<div class="page section-page" style="position:relative;">
  <div class="section-accent"></div>

  <div class="section-header">
    <div class="eyebrow">${eyebrow}</div>
    <div style="height:2.5mm;"></div>
    <div class="section-title">${title}</div>
    <div class="section-rule gold-rule"></div>
    <div class="section-intro">${intro}</div>
  </div>

  ${items.map(i => card(i.img, i.title, i.brand, i.price, i.badge, i.desc, i.halal, i.url)).join("")}

  <div style="margin-top:auto;padding-top:3mm;border-top:1px solid rgba(212,175,55,.12);
              font-family:'Inter',sans-serif;font-size:6px;color:var(--muted);
              text-align:center;letter-spacing:.06em;">
    halalstyles55.com &nbsp;·&nbsp; HalalStyle 2026 Excellence Guide &nbsp;·&nbsp; All Amazon.ca links include tag=halalstyle50d-20
  </div>
</div>`;
}

// ── Section data ──────────────────────────────────────────────────────────
const sec1 = sectionPage(
  "Section I &nbsp;·&nbsp; The Excellence Filter",
  "The Doha Executive",
  "Three high-ticket silhouettes for the boardroom, the masjid, and the gala. Each piece carries the Excellence Filter — halal-verified, barakah-aligned, worth every dirham.",
  IMG.doha,
  [
    { img: IMG.thobe,   title: "Premium Thobe — Linen Blend",  brand: "Nabeel & Sons",  price: "$110–$130 CAD", badge: "Editor's Pick", desc: "Tailored linen-blend thobe with mandarin collar. Modern cut, breathable for the Canadian climate — from Jummah to executive meetings.", halal: "Loose modest cut, covers ankles, men's Islamic dress code", url: "premium+men+thobe+linen" },
    { img: IMG.abaya,   title: "Luxury Crepe Abaya",           brand: "East Essentials", price: "$80–$100 CAD",  badge: "Editor's Pick", desc: "Flowing full-length abaya in premium crepe. Relaxed fit with elegant drape — effortless modesty for every occasion.", halal: "Full body coverage, opaque fabric, loose modest silhouette", url: "luxury+crepe+abaya+women" },
    { img: IMG.palazzo, title: "Modest Palazzo Suit Set",       brand: "Mirra Modest",   price: "$95–$115 CAD",  badge: "Editor's Pick", desc: "Two-piece palazzo suit in stretch crepe. Tailored blazer, wide-leg trousers — boardroom credibility without compromise.", halal: "Full coverage, non-sheer, loose wide-leg silhouette", url: "modest+palazzo+suit+women" },
  ]
);

const sec2 = sectionPage(
  "Section II &nbsp;·&nbsp; The Excellence Filter",
  "The Friday Standard",
  "Two prayer rugs that earn permanent floor space — plus a luxury miswak set worthy of your travel duffle or Eid table. The Friday Standard is effortless, intentional, excellent.",
  IMG.friday,
  [
    { img: IMG.rug,    title: "Prayer Rug — Luxury Velvet",               brand: "Al-Noor",        price: "$50–$60 CAD",  badge: "Bestseller",    desc: "Plush velvet prayer rug with compass-embedded pouch. Thick anti-slip base — the kind of rug that makes you look forward to salah.", halal: "Purpose-built for Islamic prayer, clean modest design", url: "luxury+velvet+prayer+rug+compass" },
    { img: IMG.travel, title: "Silk-Route Travel Prayer Rug",              brand: "Al-Noor",        price: "$44–$54 CAD",  badge: "New",           desc: "Lightweight jacquard prayer mat with carrying strap. Folds slim for carry-on without losing masjid-grade feel — essential for the travelling Muslim.", halal: "Qibla-ready, non-figurative patterning, purpose-built for salah on the road", url: "travel+prayer+rug+islamic+portable" },
    { img: IMG.miswak, title: "Luxury Miswak Gift Set — Natural Siwak",   brand: "Dar al-Sunnah",  price: "$24–$32 CAD",  badge: "Editor's Pick", desc: "Hand-cut natural siwak sticks with brass case and presentation box. The understated Jummah bag essential — and the perfect Eid gift.", halal: "Sunnah oral care, alcohol-free, no doubtful additives", url: "luxury+miswak+siwak+gift+set" },
  ]
);

const sec3 = sectionPage(
  "Section III &nbsp;·&nbsp; The Excellence Filter",
  "The Tech Edit",
  "Gold-accented laptop protection, a faith-forward bedside command centre, and stainless dhikr hardware. Tools that respect both the boardroom and the masjid.",
  IMG.tech,
  [
    { img: IMG.laptop, title: "Minimalist Laptop Sleeve — Vegan Leather", brand: "NoorTech",       price: "$38–$48 CAD",  badge: "New",        desc: "Slim 13–15\" sleeve in matte vegan leather with magnetic closure. Fits boardroom commutes and coffee-shop sessions — quiet confidence.", halal: "Modest professional accessory, no inappropriate branding, ethical material", url: "minimalist+laptop+sleeve+vegan+leather" },
    { img: IMG.quran,  title: "Quran Speaker with Azan & LED Lamp",        brand: "NoorTech",       price: "$90–$110 CAD", badge: "Bestseller", desc: "All-in-one reciter, prayer times, and soft reading light. The ideal bedside command centre — for the Muslim who optimises every moment.", halal: "Faith-forward utility, supports salah and learning", url: "quran+speaker+azan+clock+led" },
    { img: IMG.tasbee, title: "Tasbeeh Counter — Stainless Steel",         brand: "Dar al-Sunnah",  price: "$30–$38 CAD",  badge: "Best Value", desc: "Elegant stainless steel mechanical tasbeeh counter. Resets at 33 and 99 — gift-boxed for Eid. Dhikr, engineered to last a lifetime.", halal: "Supports dhikr practice, Islamic devotional tool", url: "stainless+steel+tasbeeh+counter" },
  ]
);

// ── Coda page ─────────────────────────────────────────────────────────────
const coda = `
<div class="page coda-page">
  <div class="coda-bg"></div>
  <div class="coda-content">
    <div class="eyebrow" style="margin-bottom:4mm;font-size:7px;">Coda</div>
    <div class="coda-title">The Excellence Filter</div>
    <div class="coda-rule gold-rule"></div>

    <div class="coda-para">
      Excellence is not a single purchase — it is the slow craft of choosing fabrics
      that breathe, cuts that respect adab, and objects that remind you of salah
      between meetings.
    </div>
    <div class="coda-para">
      At HalalStyle we filter for coverage you can trust, materials that age with
      dignity, and affiliate paths that keep the lights on without ever taxing your values.
    </div>
    <div class="coda-para" style="color:var(--cream);font-size:12px;">
      Welcome to the Circle.
    </div>
    <div style="margin-top:5mm;font-family:'Playfair Display',serif;font-style:italic;
                font-size:10px;color:var(--gold-dim);">
      — Deen Ali Mirza, Founder, HalalStyle
    </div>

    <a class="coda-cta" href="https://www.halalstyles55.com/vault">
      Explore the Full Vault →
    </a>
  </div>

  <div class="coda-footer">
    halalstyles55.com &nbsp;·&nbsp; HalalStyle 2026 Excellence Guide
    &nbsp;·&nbsp; Amazon.ca affiliate: tag=halalstyle50d-20 &nbsp;·&nbsp; Shelburne, Ontario, Canada
  </div>
</div>
`;

// ── Assemble full HTML ────────────────────────────────────────────────────
const fullHtml = html + sectionCss + sec1 + sec2 + sec3 + coda + `</body></html>`;

// ── Playwright render ─────────────────────────────────────────────────────
console.log("Launching Chromium...");
const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 794, height: 1123 });
await page.setContent(fullHtml, { waitUntil: "networkidle", timeout: 30000 });

// Wait for fonts + images
await page.waitForTimeout(2000);

await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
  displayHeaderFooter: false,
});

await browser.close();

import { statSync } from "fs";
const size = (statSync(OUT).size / 1024).toFixed(1);
console.log(`\n✅ PDF generated: ${OUT}`);
console.log(`   Size: ${size} KB`);
console.log(`   Pages: 5 (Cover + 3 Sections + Coda)\n`);
