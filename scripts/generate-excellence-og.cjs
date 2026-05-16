/* One-off / CI: generates public/og/excellence-guide-2026.jpg (1200×630) for OG tags. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const w = 1200;
const h = 630;
const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062c1d"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="40%" text-anchor="middle" fill="#D4AF37" font-family="Georgia,serif" font-size="48" font-weight="600">2026 Excellence Guide</text>
  <text x="50%" y="52%" text-anchor="middle" fill="#c9a54a" font-family="Georgia,serif" font-size="26">Modest luxury lookbook</text>
  <text x="50%" y="64%" text-anchor="middle" fill="#8BA99A" font-family="Georgia,serif" font-size="22">HalalStyles</text>
</svg>`;

async function main() {
  const dir = path.join(__dirname, "..", "public", "og");
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, "excellence-guide-2026.jpg");
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(out);
  console.log("Wrote", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
