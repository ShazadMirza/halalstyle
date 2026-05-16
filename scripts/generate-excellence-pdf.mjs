/**
 * HalalStyles 2026 Excellence Guide — PDF Generator v6
 * Uses page.setContent() with live Unsplash URLs + waitUntil:networkidle
 * No image downloading needed — Playwright loads them directly.
 * Run: node scripts/generate-excellence-pdf.mjs
 */
import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { statSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/guides/halalstyle-2026-excellence.pdf");

const C = { bg:"#021910", forest2:"#0A3D28", gold:"#D4AF37", cream:"#FAF7F2", muted:"#9CA3AF" };

// Direct Unsplash URLs — loaded by Playwright's real Chromium browser
const I = {
  cover:   "https://images.unsplash.com/photo-1565008576519-a61d59963765?auto=format&fit=crop&w=1200&q=85",
  thobe:   "https://images.unsplash.com/photo-1593030767217-7f768dee6ebb?auto=format&fit=crop&w=500&q=80",
  abaya:   "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=500&q=80",
  palazzo: "https://images.unsplash.com/photo-1441986300917-647bde3668e8?auto=format&fit=crop&w=500&q=80",
  rug:     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
  travel:  "https://images.unsplash.com/photo-1590076215577-87543389193d?auto=format&fit=crop&w=500&q=80",
  miswak:  "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=500&q=80",
  laptop:  "https://images.unsplash.com/photo-1525547719571-a2d4ac7d6f2f?auto=format&fit=crop&w=500&q=80",
  quran:   "https://images.unsplash.com/photo-1505740420920-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
  tasbee:  "https://images.unsplash.com/photo-1594736797933-d0401ba2fe01?auto=format&fit=crop&w=500&q=80",
};

const AMAZON = "https://www.amazon.ca/s"; const TAG = "tag=halalstyle50d-20";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html,body{width:210mm;background:${C.bg};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
@media print{*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}
.page{width:210mm;height:297mm;background:${C.bg};overflow:hidden;position:relative;page-break-after:always;break-after:page;display:flex;flex-direction:column;}
.page:last-child{page-break-after:avoid;break-after:avoid;}
.ey{font-family:'Inter',sans-serif;font-size:7px;font-weight:600;letter-spacing:.35em;text-transform:uppercase;color:${C.gold};}
.gr{height:.5px;background:linear-gradient(90deg,transparent,${C.gold},transparent);}
.bx{font-family:'Inter',sans-serif;font-size:6px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:${C.gold};color:${C.bg};padding:2px 5px;border-radius:2px;display:inline-block;}
.cbg{position:absolute;inset:0;background-size:cover;background-position:center top;}
.cov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,25,16,.2) 0%,rgba(2,25,16,.5) 38%,rgba(2,25,16,.92) 65%,${C.bg} 100%);}
.cgl{position:absolute;inset:0;background:radial-gradient(ellipse 75% 45% at 50% 18%,rgba(212,175,55,.16),transparent 62%);}
.cbd{position:relative;z-index:2;padding:0 13mm 8mm;display:flex;flex-direction:column;align-items:center;text-align:center;}
.fc{width:100%;border:1px solid rgba(212,175,55,.25);border-radius:6px;background:rgba(6,44,29,.8);padding:5mm 6mm;margin-bottom:6mm;}
.toc{width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:3mm;margin-bottom:5mm;}
.ti{border:1px solid rgba(212,175,55,.2);border-radius:4px;padding:3.5mm;text-align:center;background:rgba(10,61,40,.4);}
.cft{position:relative;z-index:2;padding:2.5mm 13mm;border-top:1px solid rgba(212,175,55,.15);display:flex;justify-content:space-between;align-items:center;margin-top:auto;}
.sec{padding:9mm 13mm 7mm;position:relative;overflow:hidden;}
.sgl{position:absolute;right:-20mm;top:-20mm;width:80mm;height:80mm;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,.07),transparent 70%);}
.sh{text-align:center;margin-bottom:5mm;}
.st{font-family:'Playfair Display',serif;font-size:25px;font-weight:700;color:${C.cream};margin:3mm 0 2.5mm;line-height:1.15;}
.si{font-family:'Playfair Display',serif;font-style:italic;font-size:9px;color:${C.muted};line-height:1.75;max-width:145mm;margin:0 auto;}
.card{display:flex;gap:4mm;border:1px solid rgba(212,175,55,.2);border-radius:6px;background:rgba(10,61,40,.3);padding:4mm;margin-bottom:3.5mm;}
.card:last-child{margin-bottom:0;}
.ci{width:33mm;min-width:33mm;height:33mm;border-radius:4px;object-fit:cover;flex-shrink:0;border:1px solid rgba(212,175,55,.18);display:block;background:${C.forest2};}
.cb{flex:1;display:flex;flex-direction:column;}
.ct{display:flex;justify-content:space-between;align-items:flex-start;gap:2mm;margin-bottom:1.5mm;}
.cn{font-family:'Playfair Display',serif;font-size:11px;font-weight:600;color:${C.cream};line-height:1.25;flex:1;}
.cp{font-family:'Inter',sans-serif;font-size:8px;font-weight:600;color:${C.gold};white-space:nowrap;}
.cbr{font-family:'Inter',sans-serif;font-size:7px;color:${C.muted};text-transform:uppercase;letter-spacing:.1em;margin-bottom:2mm;}
.cd{font-family:'Inter',sans-serif;font-size:8px;color:rgba(250,247,242,.72);line-height:1.6;flex:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:2mm;}
.cf{display:flex;justify-content:space-between;align-items:center;margin-top:auto;}
.hn{font-family:'Inter',sans-serif;font-size:6.5px;color:rgba(212,175,55,.6);flex:1;padding-right:2mm;line-height:1.4;}
.hn::before{content:'✦  ';}
.sl{font-family:'Inter',sans-serif;font-size:7px;font-weight:600;color:${C.gold};border:1px solid rgba(212,175,55,.4);border-radius:2px;padding:2px 6px;white-space:nowrap;text-decoration:none;}
.sf{margin-top:auto;padding-top:3mm;border-top:1px solid rgba(212,175,55,.12);font-family:'Inter',sans-serif;font-size:6px;color:${C.muted};text-align:center;letter-spacing:.05em;}
.coda{justify-content:center;align-items:center;text-align:center;padding:14mm;}
.codagl{position:absolute;inset:0;background:radial-gradient(ellipse 65% 50% at 50% 42%,rgba(212,175,55,.09),transparent 65%);}
.codain{position:relative;z-index:2;max-width:148mm;}
.codat{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:30px;color:${C.gold};margin-bottom:4mm;}
.codap{font-family:'Playfair Display',serif;font-style:italic;font-size:10.5px;color:${C.muted};line-height:1.85;margin-bottom:4.5mm;}
.codacta{display:inline-block;margin-top:8mm;border:1px solid rgba(212,175,55,.3);border-radius:4px;padding:3mm 9mm;font-family:'Inter',sans-serif;font-size:8px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${C.gold};text-decoration:none;}
.codaft{position:absolute;bottom:7mm;left:0;right:0;font-family:'Inter',sans-serif;font-size:6.5px;color:${C.muted};text-align:center;}
`;

const card=(img,name,brand,price,badge,desc,halal,kw)=>`
<div class="card"><img class="ci" src="${img}" alt="${name}"/>
<div class="cb"><div class="ct"><div class="cn">${name}</div><div class="cp">${price}</div></div>
<div class="cbr">${brand} &nbsp;·&nbsp; <span class="bx">${badge}</span></div>
<div class="cd">${desc}</div>
<div class="cf"><div class="hn">${halal}</div>
<a class="sl" href="${AMAZON}?k=${kw}&${TAG}">Shop Amazon.ca →</a></div></div></div>`;

const sec=(ey,title,intro,cards)=>`
<div class="page sec"><div class="sgl"></div>
<div class="sh"><div class="ey">${ey}</div><div class="st">${title}</div>
<div class="gr" style="width:30mm;margin:3.5mm auto;"></div><div class="si">${intro}</div></div>
${cards}<div class="sf">halalstyles55.com &nbsp;·&nbsp; 2026 Excellence Guide &nbsp;·&nbsp; All Amazon.ca links include tag=halalstyle50d-20</div></div>`;

const S=`font-family:'Playfair Display',serif;`,IT=`font-style:italic;`;
const cover=`<div class="page" style="justify-content:flex-end;">
<div class="cbg" style="background-image:url('${I.cover}');"></div><div class="cov"></div><div class="cgl"></div>
<div class="cbd">
<div class="ey" style="margin-bottom:7mm;letter-spacing:.42em;">HalalStyles &nbsp;·&nbsp; Private &nbsp;·&nbsp; 2026</div>
<div style="${S}font-size:36px;font-weight:700;color:${C.cream};line-height:1.1;margin-bottom:3px;">2026 Excellence:</div>
<div style="${S}font-size:36px;font-weight:700;${IT}color:${C.gold};line-height:1.1;margin-bottom:6mm;">The Private Lookbook</div>
<div style="${S}${IT}font-size:12px;color:${C.cream};margin-bottom:2px;">Curated for the Muslim High-Achiever. Vetted for Barakah.</div>
<div style="font-family:'Inter',sans-serif;font-size:7.5px;color:${C.muted};letter-spacing:.07em;margin-bottom:7mm;">9 halal-verified picks &nbsp;·&nbsp; 3 editorial sections &nbsp;·&nbsp; Amazon.ca affiliate links</div>
<div class="gr" style="width:44mm;margin-bottom:7mm;"></div>
<div class="fc"><div class="ey" style="margin-bottom:3px;">Founder's Welcome</div>
<div style="${S}font-size:13px;font-weight:600;color:${C.cream};margin-bottom:5px;">Deen Ali Mirza</div>
<div style="${S}${IT}font-size:9.5px;color:${C.muted};line-height:1.7;">"Welcome to the Circle. This guide is your first step toward a wardrobe of barakah and excellence. Every piece was chosen with one question: does this reflect who we're meant to be?"</div></div>
<div class="toc">
<div class="ti"><div class="ey" style="font-size:6.5px;">Section I</div><div style="${S}font-size:9px;color:${C.cream};margin-top:2px;">The Doha Executive</div></div>
<div class="ti"><div class="ey" style="font-size:6.5px;">Section II</div><div style="${S}font-size:9px;color:${C.cream};margin-top:2px;">The Friday Standard</div></div>
<div class="ti"><div class="ey" style="font-size:6.5px;">Section III</div><div style="${S}font-size:9px;color:${C.cream};margin-top:2px;">The Tech Edit</div></div>
</div></div>
<div class="cft"><span style="font-family:'Inter',sans-serif;font-size:6.5px;color:${C.muted};">halalstyles55.com</span><span style="color:${C.gold};font-size:12px;">✦</span><span style="font-family:'Inter',sans-serif;font-size:6.5px;color:${C.muted};">All Amazon.ca links include tag=halalstyle50d-20</span></div></div>`;

const s1=sec("Section I · The Excellence Filter","The Doha Executive","Three high-ticket silhouettes for the boardroom, the masjid, and the gala — halal-verified, barakah-aligned, worth every dirham.",
card(I.thobe,"Premium Thobe — Linen Blend","Nabeel & Sons","$110–$130 CAD","Editor's Pick","Tailored linen-blend thobe with mandarin collar. Modern cut, breathable for the Canadian climate — from Jummah to executive meetings.","Loose modest cut, covers ankles, men's Islamic dress code","premium+men+thobe+linen")+
card(I.abaya,"Luxury Crepe Abaya","East Essentials","$80–$100 CAD","Editor's Pick","Flowing full-length abaya in premium crepe. Relaxed fit with elegant drape — effortless modesty for every occasion.","Full body coverage, opaque fabric, loose modest silhouette","luxury+crepe+abaya+women")+
card(I.palazzo,"Modest Palazzo Suit Set","Mirra Modest","$95–$115 CAD","Editor's Pick","Two-piece palazzo suit in stretch crepe. Tailored blazer, wide-leg trousers — boardroom credibility without compromise.","Full coverage, non-sheer, loose wide-leg silhouette","modest+palazzo+suit+women"));
const s2=sec("Section II · The Excellence Filter","The Friday Standard","Two prayer rugs that earn permanent floor space — plus a luxury miswak set worthy of your travel duffle or Eid table. Effortless. Intentional. Excellent.",
card(I.rug,"Prayer Rug — Luxury Velvet","Al-Noor","$50–$60 CAD","Bestseller","Plush velvet prayer rug with compass-embedded pouch. Thick anti-slip base — the rug that makes you look forward to salah.","Purpose-built for Islamic prayer, clean modest design","luxury+velvet+prayer+rug+compass")+
card(I.travel,"Silk-Route Travel Prayer Rug","Al-Noor","$44–$54 CAD","New","Lightweight jacquard prayer mat with carrying strap. Folds slim for carry-on without losing masjid-grade feel.","Qibla-ready, non-figurative patterning, purpose-built for salah on the road","travel+prayer+rug+islamic+portable")+
card(I.miswak,"Luxury Miswak Gift Set — Natural Siwak","Dar al-Sunnah","$24–$32 CAD","Editor's Pick","Hand-cut natural siwak with brass case and presentation box — the understated Jummah essential and perfect Eid gift.","Sunnah oral care, alcohol-free, no doubtful additives","luxury+miswak+siwak+gift+set"));
const s3=sec("Section III · The Excellence Filter","The Tech Edit","Gold-accented laptop protection, a faith-forward bedside command centre, and stainless dhikr hardware — tools that respect both the boardroom and the masjid.",
card(I.laptop,"Minimalist Laptop Sleeve — Vegan Leather","NoorTech","$38–$48 CAD","New","Slim 13–15\" sleeve in matte vegan leather with magnetic closure. Quiet confidence for every commute.","Modest professional accessory, no inappropriate branding, ethical material","minimalist+laptop+sleeve+vegan+leather")+
card(I.quran,"Quran Speaker with Azan & LED Lamp","NoorTech","$90–$110 CAD","Bestseller","All-in-one reciter, prayer times, and soft reading light — ideal bedside command centre for the Muslim who optimises every moment.","Faith-forward utility, supports salah and learning","quran+speaker+azan+clock+led")+
card(I.tasbee,"Tasbeeh Counter — Stainless Steel","Dar al-Sunnah","$30–$38 CAD","Best Value","Elegant stainless steel mechanical tasbeeh counter. Resets at 33 and 99 — gift-boxed for Eid. Dhikr, engineered to last.","Supports dhikr practice, Islamic devotional tool","stainless+steel+tasbeeh+counter"));
const coda=`<div class="page coda"><div class="codagl"></div><div class="codain">
<div class="ey" style="margin-bottom:4mm;">Coda</div>
<div class="codat">The Excellence Filter</div>
<div class="gr" style="width:22mm;margin:0 auto 7mm;"></div>
<div class="codap">Excellence is not a single purchase — it is the slow craft of choosing fabrics that breathe, cuts that respect adab, and objects that remind you of salah between meetings.</div>
<div class="codap">At HalalStyles we filter for coverage you can trust, materials that age with dignity, and affiliate paths that keep the lights on without ever taxing your values.</div>
<div style="${S}font-size:12px;color:${C.cream};">Welcome to the Circle.</div>
<div style="${S}${IT}font-size:9.5px;color:rgba(212,175,55,.6);margin-top:4mm;">— Deen Ali Mirza, Founder, HalalStyles</div>
<a class="codacta" href="https://www.halalstyles55.com/vault">Explore the Full Vault →</a>
</div><div class="codaft">halalstyles55.com &nbsp;·&nbsp; HalalStyles 2026 Excellence Guide &nbsp;·&nbsp; Amazon.ca: tag=halalstyle50d-20 &nbsp;·&nbsp; Shelburne, Ontario</div></div>`;

const fullHtml=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><style>${CSS}</style></head><body>${cover}${s1}${s2}${s3}${coda}</body></html>`;

console.log("Launching Chromium...");
const browser = await chromium.launch();
const pg = await browser.newPage();

// setContent (not file://) so external images load freely
await pg.setContent(fullHtml, { waitUntil: "networkidle", timeout: 45000 });
await pg.waitForTimeout(1500);

await pg.pdf({ path: OUT, format:"A4", printBackground:true, margin:{top:"0",right:"0",bottom:"0",left:"0"}, displayHeaderFooter:false });
await browser.close();

const kb=(statSync(OUT).size/1024).toFixed(0);
console.log(`\n✅  PDF → ${OUT}\n    Size : ${kb} KB\n    Pages: 5\n`);
