export function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

export function cleanText(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return stripTags(value).replace(/\s+/g, " ").trim().slice(0, max);
}

export function cleanMultiline(value: unknown, max = 8000) {
  if (typeof value !== "string") return "";
  return stripTags(value).replace(/\r/g, "").trim().slice(0, max);
}

export function splitLines(value: unknown, maxItems = 30, maxLength = 240) {
  if (typeof value !== "string") return [];
  return stripTags(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((line) => line.slice(0, maxLength));
}

export function splitTags(value: unknown) {
  if (typeof value !== "string") return [];
  return stripTags(value)
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 16);
}

export function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isSafeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (url.protocol === "http:" && url.hostname === "localhost");
  } catch {
    return false;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return EMAIL_PATTERN.test(value) && value.length <= 160;
}
