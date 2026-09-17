export function normalizeHex(value: string, fallback: string) {
  const hex = value.trim();
  if (/^#([0-9a-fA-F]{3})$/.test(hex)) {
    const [, r, g, b] = hex.match(/^#(.)(.)(.)$/) ?? [];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex.toLowerCase();
  return fallback;
}

function toRgb(hex: string) {
  const value = normalizeHex(hex, "#141414").slice(1);
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0")).join("")}`;
}

export function mixHex(hex: string, toward: string, amount: number) {
  const from = toRgb(hex);
  const to = toRgb(toward);
  return toHex(
    from.r + (to.r - from.r) * amount,
    from.g + (to.g - from.g) * amount,
    from.b + (to.b - from.b) * amount,
  );
}

export function readableInk(hex: string) {
  const { r, g, b } = toRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#141414" : "#f6f3ec";
}
