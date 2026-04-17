/**
 * copy-tesseract-assets.mjs
 * P7-02b-fix: Kopiert Tesseract.js-Assets aus node_modules nach public/
 * so dass alle OCR-Dateien same-origin aus dem eigenen Netlify-Build
 * geladen werden. Kein CDN-Request zur Laufzeit.
 *
 * Ausgeführt via: npm run prebuild (automatisch vor vite build)
 */

import { copyFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const nm = resolve(root, "node_modules");

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function cp(src, dest) {
  copyFileSync(src, dest);
  console.log(`  ✓ ${dest.replace(root + "/", "")}`);
}

// --- 1. Tesseract Worker ---
const workerDir = resolve(root, "public/tesseract");
ensureDir(workerDir);
cp(
  resolve(nm, "tesseract.js/dist/worker.min.js"),
  resolve(workerDir, "worker.min.js")
);

// --- 2. Tesseract Core (WASM, alle 4 Varianten — Worker wählt je nach Browser) ---
const coreFiles = [
  "tesseract-core-simd-lstm.wasm.js",
  "tesseract-core-simd.wasm.js",
  "tesseract-core-lstm.wasm.js",
  "tesseract-core.wasm.js",
];
for (const f of coreFiles) {
  cp(resolve(nm, "tesseract.js-core", f), resolve(workerDir, f));
}

// --- 3. Sprachdaten (deu + eng, gzip, aus @tesseract.js-data npm-Paketen) ---
const tessDir = resolve(root, "public/tessdata");
ensureDir(tessDir);
cp(
  resolve(nm, "@tesseract.js-data/deu/4.0.0/deu.traineddata.gz"),
  resolve(tessDir, "deu.traineddata.gz")
);
cp(
  resolve(nm, "@tesseract.js-data/eng/4.0.0/eng.traineddata.gz"),
  resolve(tessDir, "eng.traineddata.gz")
);

console.log("✓ Tesseract assets → public/ (same-origin)");
