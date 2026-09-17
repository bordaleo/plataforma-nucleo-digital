import { parsePriceToCents } from "@/lib/format";
import { OFFER_EXPIRED_BEHAVIORS } from "@/lib/offer";
import { cleanMultiline, cleanText, isSafeHttpUrl, splitLines } from "@/lib/sanitize";
import { parseFaq, type ProductFaqItem } from "@/lib/validations/product";

export type OfferInput = {
  name: string;
  headline: string;
  subheadline: string;
  originalPriceCents: number;
  promotionalPriceCents: number;
  discountPercentage: number;
  badge: string;
  barText: string;
  startsAt: Date;
  endsAt: Date;
  guaranteeEnabled: boolean;
  guaranteeDays: number | null;
  guaranteeText: string | null;
  expiredBehavior: string;
  stickyCtaEnabled: boolean;
  demo: boolean;
  active: boolean;
};

export type SalesContentInput = {
  galleryImages: string[];
  mockupImages: string[];
  videoUrl: string | null;
  benefits: string[];
  contents: string[];
  audiencePoints: string[];
  notFor: string[];
  faq: ProductFaqItem[];
  stickyCtaEnabled: boolean;
};

export type FieldErrors = Record<string, string>;

function parseDate(value: unknown) {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseAssetList(value: unknown) {
  return splitLines(value, 12, 400).filter((item) => item.startsWith("/") || isSafeHttpUrl(item));
}

export function parseOfferForm(formData: FormData): { data?: OfferInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = cleanText(formData.get("name"), 120);
  const headline = cleanText(formData.get("headline"), 160);
  const subheadline = cleanMultiline(formData.get("subheadline"), 400);
  const originalPriceCents = parsePriceToCents(String(formData.get("originalPrice") ?? ""));
  const promotionalPriceCents = parsePriceToCents(String(formData.get("promotionalPrice") ?? ""));
  const badge = cleanText(formData.get("badge"), 40) || "Oferta especial";
  const barText = cleanText(formData.get("barText"), 180);
  const startsAt = parseDate(formData.get("startsAt"));
  const endsAt = parseDate(formData.get("endsAt"));
  const guaranteeEnabled = formData.get("guaranteeEnabled") === "on";
  const guaranteeDaysRaw = String(formData.get("guaranteeDays") ?? "").trim();
  const guaranteeDays = guaranteeDaysRaw ? Number.parseInt(guaranteeDaysRaw, 10) : null;
  const guaranteeText = cleanMultiline(formData.get("guaranteeText"), 600) || null;
  const expiredBehaviorRaw = cleanText(formData.get("expiredBehavior"), 40) || "hide_urgency";
  const expiredBehavior = OFFER_EXPIRED_BEHAVIORS.includes(expiredBehaviorRaw as (typeof OFFER_EXPIRED_BEHAVIORS)[number])
    ? expiredBehaviorRaw
    : "hide_urgency";
  const stickyCtaEnabled = formData.get("stickyCtaEnabled") === "on";
  const demo = formData.get("demo") === "on";
  const active = formData.get("active") === "on";

  if (name.length < 3) errors.name = "Informe o nome da oferta.";
  if (headline.length < 8) errors.headline = "Informe a headline.";
  if (subheadline.length < 8) errors.subheadline = "Informe a subheadline.";
  if (originalPriceCents === null) errors.originalPrice = "Informe o preço original.";
  if (promotionalPriceCents === null) errors.promotionalPrice = "Informe o preço da oferta.";
  if (
    originalPriceCents !== null &&
    promotionalPriceCents !== null &&
    promotionalPriceCents > originalPriceCents
  ) {
    errors.promotionalPrice = "O preço da oferta não pode ser maior que o original.";
  }
  if (!startsAt) errors.startsAt = "Informe o início.";
  if (!endsAt) errors.endsAt = "Informe o término.";
  if (startsAt && endsAt && endsAt <= startsAt) errors.endsAt = "O término deve ser depois do início.";
  if (guaranteeEnabled && (!guaranteeDays || guaranteeDays < 1)) errors.guaranteeDays = "Informe os dias de garantia.";
  if (guaranteeEnabled && !guaranteeText) errors.guaranteeText = "Descreva a garantia real.";

  if (Object.keys(errors).length > 0) return { errors };

  const original = originalPriceCents ?? 0;
  const promotional = promotionalPriceCents ?? 0;
  const discountPercentage =
    original > 0 && promotional < original ? Math.round(((original - promotional) / original) * 100) : 0;

  return {
    errors,
    data: {
      name,
      headline,
      subheadline,
      originalPriceCents: original,
      promotionalPriceCents: promotional,
      discountPercentage,
      badge,
      barText,
      startsAt: startsAt!,
      endsAt: endsAt!,
      guaranteeEnabled,
      guaranteeDays: guaranteeEnabled ? guaranteeDays : null,
      guaranteeText: guaranteeEnabled ? guaranteeText : null,
      expiredBehavior,
      stickyCtaEnabled,
      demo,
      active,
    },
  };
}

export function parseSalesContentForm(formData: FormData): { data?: SalesContentInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const videoRaw = cleanText(formData.get("videoUrl"), 400);
  const videoUrl = videoRaw ? videoRaw : null;
  if (videoUrl && !isSafeHttpUrl(videoUrl)) errors.videoUrl = "Use uma URL http(s) para o vídeo.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      galleryImages: parseAssetList(formData.get("galleryImages")),
      mockupImages: parseAssetList(formData.get("mockupImages")),
      videoUrl,
      benefits: splitLines(formData.get("benefits")),
      contents: splitLines(formData.get("contents")),
      audiencePoints: splitLines(formData.get("audiencePoints")),
      notFor: splitLines(formData.get("notFor")),
      faq: parseFaq(formData.get("faq")),
      stickyCtaEnabled: formData.get("stickyCtaEnabled") === "on",
    },
  };
}

export function toDateTimeLocal(date: Date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}
