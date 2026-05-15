/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const os = require("os");

const publicDir = path.join(__dirname, "..", "public");

async function main() {
  const { default: toIco } = await import("png-to-ico");
  const logoSvg = fs.readFileSync(path.join(publicDir, "logo.svg"));
  const iconSvg = fs.readFileSync(path.join(publicDir, "icon-source.svg"));

  await sharp(logoSvg).resize({ height: 32 }).png().toFile(path.join(publicDir, "logo.png"));

  const icon192 = await sharp(iconSvg).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "icon.png"), icon192);

  const apple180 = await sharp(iconSvg).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), apple180);

  const tmp = os.tmpdir();
  const p16 = path.join(tmp, "halalstyle-fav16.png");
  const p32 = path.join(tmp, "halalstyle-fav32.png");
  await sharp(iconSvg).resize(16, 16).png().toFile(p16);
  await sharp(iconSvg).resize(32, 32).png().toFile(p32);
  const ico = await toIco([p16, p32]);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  fs.unlinkSync(p16);
  fs.unlinkSync(p32);

  console.log("Wrote logo.png, icon.png, apple-touch-icon.png, favicon.ico");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
