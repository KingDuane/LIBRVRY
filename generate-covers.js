// generate-covers.js
// Generates covers.json from files in ./covers, sorted by filename.

import fs from "node:fs";
import path from "node:path";

const coversDir = path.join(process.cwd(), "covers");
const outFile = path.join(process.cwd(), "covers.json");

const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

if (!fs.existsSync(coversDir)) {
  console.error("Missing ./covers folder");
  process.exit(1);
}

const files = fs.readdirSync(coversDir)
  .filter(f => allowed.has(path.extname(f).toLowerCase()))
  .sort((a,b) => a.localeCompare(b, "en"));

const list = files.map(f => `covers/${f}`);

fs.writeFileSync(outFile, JSON.stringify(list, null, 2));
console.log(`Wrote ${list.length} entries to covers.json`);