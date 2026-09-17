import { ProductStatus } from "@prisma/client";
import { parsePriceToCents } from "@/lib/format";
import {
  cleanMultiline,
  cleanText,
  isSafeHttpUrl,
  splitLines,
  splitTags,
} from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export type ProductFaqItem = {
  question: string;
  answer: string;
};

export type ProductInput = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  promotionalPriceCents: number | null;
  coverImage: string;
  tags: string[];
  details: string | null;
  benefits: string[];
  contents: string[];
  audience: string;
  faq: ProductFaqItem[];
  kiwifyCheckoutUrl: string;
  kiwifyProductId: string | null;
  status: ProductStatus;
  featured: boolean;
  categoryId: string;
};

export type FieldErrors = Record<string, string>;

export function parseFaq(value: unknown): ProductFaqItem[] {
  if (typeof value !== "string" || !value.trim()) return [];

  return value
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      return {
        question: cleanText(question, 180),
        answer: cleanMultiline(rest.join("\n"), 800),
      };
    })
    .filter((item) => item.question && item.answer);
}

export function parseProductForm(formData: FormData): { data?: ProductInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = cleanText(formData.get("name"), 120);
  const slug = slugify(cleanText(formData.get("slug") || name, 80));
  const shortDescription = cleanText(formData.get("shortDescription"), 220);
  const description = cleanMultiline(formData.get("description"), 8000);
  const priceCents = parsePriceToCents(String(formData.get("price") ?? ""));
  const promoRaw = String(formData.get("promotionalPrice") ?? "").trim();
  const promotionalPriceCents = promoRaw ? parsePriceToCents(promoRaw) : null;
  const coverImage = cleanText(formData.get("coverImage"), 400);
  const categoryId = cleanText(formData.get("categoryId"), 40);
  const audience = cleanMultiline(formData.get("audience"), 1200);
  const details = cleanMultiline(formData.get("details"), 2000) || null;
  const kiwifyCheckoutUrl = cleanText(formData.get("kiwifyCheckoutUrl"), 400);
  const kiwifyProductId = cleanText(formData.get("kiwifyProductId"), 80) || null;
  const status = formData.get("status") === "INACTIVE" ? ProductStatus.INACTIVE : ProductStatus.ACTIVE;
  const featured = formData.get("featured") === "on";

  if (name.length < 3) errors.name = "Informe um nome com pelo menos 3 caracteres.";
  if (!slug) errors.slug = "Informe um slug válido.";
  if (shortDescription.length < 10) errors.shortDescription = "Escreva uma descrição curta.";
  if (description.length < 20) errors.description = "Escreva a descrição completa.";
  if (priceCents === null || priceCents < 0) errors.price = "Informe um preço válido.";
  if (promoRaw && promotionalPriceCents === null) errors.promotionalPrice = "Preço promocional inválido.";
  if (promotionalPriceCents !== null && priceCents !== null && promotionalPriceCents >= priceCents) {
    errors.promotionalPrice = "O preço promocional deve ser menor que o preço cheio.";
  }
  if (!coverImage) errors.coverImage = "Informe a imagem de capa.";
  if (coverImage && !coverImage.startsWith("/") && !isSafeHttpUrl(coverImage)) {
    errors.coverImage = "Use um caminho local (/covers/...) ou uma URL http(s).";
  }
  if (!categoryId) errors.categoryId = "Selecione uma categoria.";
  if (audience.length < 8) errors.audience = "Descreva para quem o material é indicado.";
  if (!kiwifyCheckoutUrl) errors.kiwifyCheckoutUrl = "Informe o link de checkout da Kiwify.";
  if (kiwifyCheckoutUrl && !isSafeHttpUrl(kiwifyCheckoutUrl)) {
    errors.kiwifyCheckoutUrl = "O checkout deve ser uma URL válida.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      name,
      slug,
      shortDescription,
      description,
      priceCents: priceCents ?? 0,
      promotionalPriceCents,
      coverImage,
      tags: splitTags(formData.get("tags")),
      details,
      benefits: splitLines(formData.get("benefits")),
      contents: splitLines(formData.get("contents")),
      audience,
      faq: parseFaq(formData.get("faq")),
      kiwifyCheckoutUrl,
      kiwifyProductId,
      status,
      featured,
      categoryId,
    },
  };
}

export function faqToFormValue(faq: unknown) {
  if (!Array.isArray(faq)) return "";
  return faq
    .map((item) => {
      if (!item || typeof item !== "object") return "";
      const question = "question" in item ? String(item.question) : "";
      const answer = "answer" in item ? String(item.answer) : "";
      return `${question}\n${answer}`.trim();
    })
    .filter(Boolean)
    .join("\n\n");
}
