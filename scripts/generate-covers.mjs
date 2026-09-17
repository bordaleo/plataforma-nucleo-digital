import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "covers");
mkdirSync(dir, { recursive: true });

const covers = [
  ["ainda-assim-espero", "#e4d9c6", "#1e3a32", "Ainda assim,", "espero", "Devocional"],
  ["sermao-do-monte", "#d7e0d6", "#1a2420", "O Sermão", "do Monte", "Estudo"],
  ["silencio-que-cura", "#ddd4c4", "#3d4a43", "O silêncio", "que cura", "E-book"],
  ["biblia-90-dias", "#e8dfd0", "#7a5c32", "Bíblia em", "90 dias", "Leitura"],
  ["30-dias-intercessao", "#dce3dc", "#1e3a32", "30 dias de", "intercessão", "Oração"],
  ["altar-em-casa", "#efe6d6", "#5e6f5c", "Altar", "em casa", "Família"],
  ["pequenos-discipulos", "#e7ddd0", "#9a7848", "Pequenos", "discípulos", "Infantil"],
  ["calendario-palavra", "#e3dacb", "#1a2420", "Calendário", "da Palavra", "Imprimível"],
  ["colecao-oliveiras", "#dfe6df", "#1e3a32", "Coleção", "Oliveiras", "Artes"],
  ["cat-devocionais", "#e8dfd0", "#1e3a32", "Devocionais", "", "Categoria"],
  ["cat-estudos", "#d7e0d6", "#1a2420", "Estudos", "", "Categoria"],
  ["cat-ebooks", "#ddd4c4", "#3d4a43", "E-books", "", "Categoria"],
  ["cat-leitura", "#e8dfd0", "#7a5c32", "Leitura", "", "Categoria"],
  ["cat-oracao", "#dce3dc", "#1e3a32", "Oração", "", "Categoria"],
  ["cat-familia", "#efe6d6", "#5e6f5c", "Família", "", "Categoria"],
  ["cat-infantil", "#e7ddd0", "#9a7848", "Infantil", "", "Categoria"],
  ["cat-imprimiveis", "#e3dacb", "#1a2420", "Imprimíveis", "", "Categoria"],
  ["cat-artes", "#dfe6df", "#1e3a32", "Artes", "", "Categoria"],
];

for (const [slug, bg, ink, line1, line2, kicker] of covers) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${bg}"/>
  <rect x="36" y="36" width="728" height="928" fill="none" stroke="${ink}" stroke-opacity="0.28" stroke-width="1"/>
  <path d="M400 210c70 28 118 86 118 160 0 92-54 140-118 190-64-50-118-98-118-190 0-74 48-132 118-160Z" fill="${ink}" fill-opacity="0.12"/>
  <circle cx="400" cy="188" r="8" fill="${ink}" fill-opacity="0.45"/>
  <text x="80" y="720" fill="${ink}" fill-opacity="0.55" font-family="Georgia, serif" font-size="16" letter-spacing="4">${kicker.toUpperCase()}</text>
  <text x="76" y="790" fill="${ink}" font-family="Georgia, serif" font-size="64">${line1}</text>
  ${line2 ? `<text x="76" y="862" fill="${ink}" font-family="Georgia, serif" font-size="64">${line2}</text>` : ""}
</svg>`;
  writeFileSync(join(dir, `${slug}.svg`), svg);
}

console.log(`generated ${covers.length} covers`);
