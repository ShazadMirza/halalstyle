"""
HalalStyle 2026 Excellence Guide — PDF Generator
Outputs: public/guides/halalstyle-2026-excellence.pdf
Run:     python scripts/generate-excellence-pdf.py
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

# ── Brand tokens ──────────────────────────────────────────────────────────
MIDNIGHT   = colors.HexColor("#0a0a0a")
GOLD       = colors.HexColor("#D4AF37")
GOLD_DIM   = colors.HexColor("#8B6914")
CREAM      = colors.HexColor("#F5F0E8")
MUTED      = colors.HexColor("#6B7280")
FOREST     = colors.HexColor("#0d1f1a")
DIVIDER    = colors.HexColor("#1f1f1f")

W, H = A4   # 595.27 x 841.89 pt
MARGIN = 28 * mm

# ── Vault content ──────────────────────────────────────────────────────────
SECTIONS = [
    {
        "eyebrow": "SECTION I",
        "title": "The Doha Executive",
        "intro": "Three high-ticket silhouettes for the Muslim high-achiever — boardroom to gala, all halal-verified.",
        "items": [
            {
                "id": "01",
                "title": "Premium Thobe — Linen Blend",
                "brand": "Nabeel & Sons",
                "price": "$110–$130 CAD",
                "badge": "Editor's Pick",
                "description": "Tailored linen-blend thobe with mandarin collar. Modern cut, breathable for the Canadian climate.",
                "halal": "Loose modest cut, covers ankles, men's Islamic dress code",
                "url": "https://www.amazon.ca/s?k=premium+men+thobe+linen&tag=halalstyle50d-20",
            },
            {
                "id": "02",
                "title": "Luxury Crepe Abaya",
                "brand": "East Essentials",
                "price": "$80–$100 CAD",
                "badge": "Editor's Pick",
                "description": "Flowing full-length abaya in premium crepe fabric. Relaxed fit with elegant drape — effortless modesty.",
                "halal": "Full body coverage, opaque fabric, loose modest silhouette",
                "url": "https://www.amazon.ca/s?k=luxury+crepe+abaya+women&tag=halalstyle50d-20",
            },
            {
                "id": "03",
                "title": "Modest Palazzo Suit Set",
                "brand": "Mirra Modest",
                "price": "$95–$115 CAD",
                "badge": "Editor's Pick",
                "description": "Two-piece palazzo suit in stretch crepe. Tailored blazer, wide-leg trousers — boardroom to gala.",
                "halal": "Full coverage, non-sheer, loose wide-leg silhouette",
                "url": "https://www.amazon.ca/s?k=modest+palazzo+suit+women&tag=halalstyle50d-20",
            },
        ],
    },
    {
        "eyebrow": "SECTION II",
        "title": "The Friday Standard",
        "intro": "Two prayer rugs that earn permanent floor space — plus a luxury miswak set worthy of your travel duffle or Eid table.",
        "items": [
            {
                "id": "04",
                "title": "Prayer Rug — Luxury Velvet",
                "brand": "Al-Noor",
                "price": "$50–$60 CAD",
                "badge": "Bestseller",
                "description": "Plush velvet prayer rug with compass-embedded pouch. Thick anti-slip base, travel-friendly.",
                "halal": "Purpose-built for Islamic prayer, clean modest design",
                "url": "https://www.amazon.ca/s?k=luxury+velvet+prayer+rug+compass&tag=halalstyle50d-20",
            },
            {
                "id": "05",
                "title": "Silk-Route Travel Prayer Rug",
                "brand": "Al-Noor",
                "price": "$44–$54 CAD",
                "badge": "New",
                "description": "Lightweight jacquard prayer mat with carrying strap — folds slim for carry-on without losing masjid-grade feel.",
                "halal": "Qibla-ready, clean non-figurative patterning, purpose-built for salah on the road",
                "url": "https://www.amazon.ca/s?k=travel+prayer+rug+islamic+portable&tag=halalstyle50d-20",
            },
            {
                "id": "06",
                "title": "Luxury Miswak Gift Set — Natural Siwak",
                "brand": "Dar al-Sunnah",
                "price": "$24–$32 CAD",
                "badge": "Editor's Pick",
                "description": "Hand-cut natural siwak sticks with brass case and presentation box — the understated Jummah bag essential.",
                "halal": "Sunnah oral care, alcohol-free, no doubtful additives",
                "url": "https://www.amazon.ca/s?k=luxury+miswak+siwak+gift+set&tag=halalstyle50d-20",
            },
        ],
    },
    {
        "eyebrow": "SECTION III",
        "title": "The Tech Edit",
        "intro": "Gold-accented laptop protection, a faith-forward bedside command centre, and stainless dhikr hardware — tools that respect both boardroom and masjid.",
        "items": [
            {
                "id": "07",
                "title": "Minimalist Laptop Sleeve — Vegan Leather",
                "brand": "NoorTech",
                "price": "$38–$48 CAD",
                "badge": "New",
                "description": "Slim 13–15\" sleeve in matte vegan leather with magnetic closure. Fits boardroom and coffee-shop commutes.",
                "halal": "Modest professional accessory, no inappropriate branding, ethical material",
                "url": "https://www.amazon.ca/s?k=minimalist+laptop+sleeve+vegan+leather&tag=halalstyle50d-20",
            },
            {
                "id": "08",
                "title": "Quran Speaker with Azan & LED Lamp",
                "brand": "NoorTech",
                "price": "$90–$110 CAD",
                "badge": "Bestseller",
                "description": "All-in-one reciter, prayer times, and soft reading light — ideal for bedside or student desk.",
                "halal": "Faith-forward utility, supports salah and learning",
                "url": "https://www.amazon.ca/s?k=quran+speaker+azan+clock+led&tag=halalstyle50d-20",
            },
            {
                "id": "09",
                "title": "Tasbeeh Counter — Stainless Steel",
                "brand": "Dar al-Sunnah",
                "price": "$30–$38 CAD",
                "badge": "Best Value",
                "description": "Elegant stainless steel mechanical tasbeeh counter. Resets at 33 and 99 — gift-boxed for Eid.",
                "halal": "Supports dhikr practice, Islamic devotional tool",
                "url": "https://www.amazon.ca/s?k=stainless+steel+tasbeeh+counter&tag=halalstyle50d-20",
            },
        ],
    },
]

# ── Drawing helpers ────────────────────────────────────────────────────────

def dark_page(c):
    c.setFillColor(MIDNIGHT)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def gold_line(c, x1, y, x2, width=0.5):
    c.setStrokeColor(GOLD)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)

def draw_text(c, text, x, y, font="Helvetica", size=10, color=CREAM, max_width=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if max_width:
        lines = simpleSplit(text, font, size, max_width)
        for i, line in enumerate(lines):
            c.drawString(x, y - i * (size * 1.4), line)
        return len(lines) * (size * 1.4)
    else:
        c.drawString(x, y, text)
        return size * 1.4

def draw_centered(c, text, y, font="Helvetica", size=10, color=CREAM):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawCentredString(W / 2, y, text)

def gold_badge(c, text, x, y):
    c.setFont("Helvetica", 6)
    tw = c.stringWidth(text, "Helvetica", 6)
    pad = 4
    c.setFillColor(GOLD)
    c.roundRect(x, y - 2, tw + pad * 2, 10, 2, fill=1, stroke=0)
    c.setFillColor(MIDNIGHT)
    c.drawString(x + pad, y + 1, text)


# ── Cover page ─────────────────────────────────────────────────────────────

def cover_page(c):
    dark_page(c)

    # Gold radial wash — simulate with a large faded circle
    c.setFillColor(colors.HexColor("#D4AF37"))
    c.setFillAlpha(0.06)
    c.circle(W / 2, H - 80, 320, fill=1, stroke=0)
    c.setFillAlpha(1.0)

    # Top eyebrow
    draw_centered(c, "HALALSTYLE  ·  PRIVATE  ·  2026", H - 60,
                  font="Helvetica", size=7, color=GOLD)

    # Gold rule
    gold_line(c, MARGIN, H - 72, W - MARGIN, width=0.4)

    # Main title
    draw_centered(c, "2026 Excellence:", H - 160,
                  font="Helvetica-Bold", size=32, color=CREAM)
    draw_centered(c, "The Private Lookbook", H - 200,
                  font="Helvetica-Bold", size=32, color=GOLD)

    gold_line(c, MARGIN * 2, H - 225, W - MARGIN * 2, width=0.3)

    draw_centered(c, "Curated for the Muslim High-Achiever. Vetted for Barakah.",
                  H - 252, font="Helvetica-Oblique", size=12, color=CREAM)

    draw_centered(c, "9 halal-verified picks  ·  3 editorial sections  ·  Amazon.ca affiliate links",
                  H - 272, font="Helvetica", size=9, color=MUTED)

    # Founder note card
    card_y = H - 420
    card_h = 110
    c.setFillColor(colors.HexColor("#111111"))
    c.roundRect(MARGIN, card_y, W - MARGIN * 2, card_h, 6, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.4)
    c.roundRect(MARGIN, card_y, W - MARGIN * 2, card_h, 6, fill=0, stroke=1)

    draw_centered(c, "FOUNDER'S WELCOME", card_y + card_h - 20,
                  font="Helvetica", size=7, color=GOLD)
    draw_centered(c, "Deen Ali Mirza", card_y + card_h - 38,
                  font="Helvetica-Bold", size=11, color=CREAM)

    welcome = "You're in the Circle. Start your journey with our top picks for 2026."
    draw_centered(c, welcome, card_y + card_h - 60,
                  font="Helvetica-Oblique", size=10, color=MUTED)
    draw_centered(c, "\"Welcome to the Circle. This guide is your first step toward",
                  card_y + card_h - 78, font="Helvetica-Oblique", size=9, color=MUTED)
    draw_centered(c, "a wardrobe of barakah and excellence.\"",
                  card_y + card_h - 92, font="Helvetica-Oblique", size=9, color=MUTED)

    # Section index
    index_y = H - 565
    draw_centered(c, "CONTENTS", index_y, font="Helvetica", size=7, color=GOLD)
    gold_line(c, MARGIN * 3, index_y - 10, W - MARGIN * 3, width=0.3)

    for i, s in enumerate(SECTIONS):
        ty = index_y - 28 - i * 22
        draw_centered(c, f"{s['eyebrow']}  ·  {s['title']}", ty,
                      font="Helvetica", size=10, color=CREAM)

    # Bottom
    gold_line(c, MARGIN, 55, W - MARGIN, width=0.4)
    draw_centered(c, "halalstyles55.com  ·  All Amazon.ca links include tag=halalstyle50d-20 at no extra cost to you.",
                  40, font="Helvetica", size=7, color=MUTED)
    draw_centered(c, "Excellence is not a destination — it is the discipline of choosing correctly, every time.",
                  24, font="Helvetica-Oblique", size=8, color=GOLD_DIM)


# ── Section page ───────────────────────────────────────────────────────────

def section_page(c, section):
    dark_page(c)

    y = H - MARGIN

    # Eyebrow
    draw_centered(c, section["eyebrow"], y,
                  font="Helvetica", size=7, color=GOLD)
    y -= 18

    # Title
    draw_centered(c, section["title"], y,
                  font="Helvetica-Bold", size=26, color=CREAM)
    y -= 14

    gold_line(c, MARGIN, y, W - MARGIN, width=0.4)
    y -= 14

    # Intro
    intro_lines = simpleSplit(section["intro"], "Helvetica-Oblique", 10, W - MARGIN * 2)
    for line in intro_lines:
        c.setFont("Helvetica-Oblique", 10)
        c.setFillColor(MUTED)
        c.drawCentredString(W / 2, y, line)
        y -= 14
    y -= 8

    # Items
    for item in section["items"]:
        item_h = 108
        if y - item_h < MARGIN:
            c.showPage()
            dark_page(c)
            y = H - MARGIN

        # Card background
        c.setFillColor(colors.HexColor("#111111"))
        c.roundRect(MARGIN, y - item_h, W - MARGIN * 2, item_h, 5, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor("#D4AF37"))
        c.setLineWidth(0.3)
        c.roundRect(MARGIN, y - item_h, W - MARGIN * 2, item_h, 5, fill=0, stroke=1)

        ix = MARGIN + 10
        iy = y - 16

        # Number + badge
        c.setFont("Helvetica-Bold", 18)
        c.setFillColor(GOLD)
        c.drawString(ix, iy - 4, item["id"])

        badge_x = ix + 28
        gold_badge(c, item["badge"].upper(), badge_x, iy)

        # Title
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(CREAM)
        c.drawString(ix + 28 + c.stringWidth(item["badge"].upper(), "Helvetica", 6) + 18, iy, item["title"])

        # Brand + price on same line right-aligned
        c.setFont("Helvetica", 8)
        c.setFillColor(MUTED)
        right_x = W - MARGIN - 10
        brand_price = f"{item['brand']}  ·  {item['price']}"
        tw = c.stringWidth(brand_price, "Helvetica", 8)
        c.drawString(right_x - tw, iy, brand_price)

        iy -= 18
        gold_line(c, ix, iy, W - MARGIN - 10, width=0.2)
        iy -= 10

        # Description
        desc_lines = simpleSplit(item["description"], "Helvetica", 9, W - MARGIN * 2 - 20)
        for line in desc_lines:
            c.setFont("Helvetica", 9)
            c.setFillColor(CREAM)
            c.drawString(ix, iy, line)
            iy -= 13

        iy -= 3

        # Halal note
        c.setFont("Helvetica", 8)
        c.setFillColor(GOLD_DIM)
        c.drawString(ix, iy, f"✦  {item['halal']}")
        iy -= 13

        # Affiliate link
        c.setFont("Helvetica", 8)
        c.setFillColor(GOLD)
        link_text = "Shop on Amazon.ca →"
        c.drawString(ix, iy, link_text)
        lw = c.stringWidth(link_text, "Helvetica", 8)
        c.linkURL(item["url"], (ix, iy - 2, ix + lw, iy + 9), relative=0)

        y -= item_h + 10

    # Footer
    gold_line(c, MARGIN, 44, W - MARGIN, width=0.3)
    draw_centered(c, "halalstyles55.com  ·  HalalStyle 2026 Excellence Guide",
                  30, font="Helvetica", size=7, color=MUTED)


# ── Coda page ──────────────────────────────────────────────────────────────

def coda_page(c):
    dark_page(c)

    y = H - MARGIN * 2
    draw_centered(c, "CODA", y, font="Helvetica", size=7, color=GOLD)
    y -= 20
    draw_centered(c, "The Excellence Filter", y, font="Helvetica-Bold", size=22, color=GOLD)
    y -= 12
    gold_line(c, MARGIN * 2, y, W - MARGIN * 2, width=0.4)
    y -= 22

    paras = [
        "Excellence is not a single purchase — it is the slow craft of choosing fabrics that breathe, cuts that respect adab, and objects that remind you of salah between meetings.",
        "At HalalStyle we filter for coverage you can trust, materials that age with dignity, and affiliate paths that keep the lights on without ever taxing your values.",
        "Every link in this guide carries our Amazon.ca affiliate tag (halalstyle50d-20). You pay nothing extra. We earn a small commission that funds the next edition of this guide.",
        "Welcome to the Circle.",
    ]

    for para in paras:
        lines = simpleSplit(para, "Helvetica", 11, W - MARGIN * 2.5)
        for line in lines:
            c.setFont("Helvetica", 11)
            c.setFillColor(MUTED if para != "Welcome to the Circle." else CREAM)
            c.drawCentredString(W / 2, y, line)
            y -= 16
        y -= 8

    y -= 20
    draw_centered(c, "— Deen Ali Mirza, Founder, HalalStyle", y,
                  font="Helvetica-Oblique", size=10, color=GOLD_DIM)

    y -= 40
    gold_line(c, MARGIN * 2, y, W - MARGIN * 2, width=0.3)
    y -= 18
    draw_centered(c, "Explore the full Vault at halalstyles55.com/vault",
                  y, font="Helvetica", size=9, color=CREAM)
    c.linkURL("https://www.halalstyles55.com/vault",
              (MARGIN * 2, y - 3, W - MARGIN * 2, y + 10), relative=0)

    gold_line(c, MARGIN, 44, W - MARGIN, width=0.3)
    draw_centered(c, "halalstyles55.com  ·  HalalStyle 2026 Excellence Guide",
                  30, font="Helvetica", size=7, color=MUTED)


# ── Build ──────────────────────────────────────────────────────────────────

OUT = os.path.join(os.path.dirname(__file__),
                   "..", "public", "guides", "halalstyle-2026-excellence.pdf")
OUT = os.path.normpath(OUT)

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("2026 Excellence: The Private Lookbook — HalalStyle")
c.setAuthor("HalalStyle / Deen Ali Mirza")
c.setSubject("Modest luxury for the Muslim high-achiever. 9 halal-verified picks.")
c.setKeywords("modest fashion, halal, muslim, luxury, canada")

cover_page(c)
c.showPage()

for section in SECTIONS:
    section_page(c, section)
    c.showPage()

coda_page(c)
c.save()

print(f"PDF generated: {OUT}")
size_kb = os.path.getsize(OUT) / 1024
print(f"File size: {size_kb:.1f} KB")
