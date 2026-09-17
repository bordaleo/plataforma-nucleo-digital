import { cleanMultiline, cleanText, isSafeHttpUrl } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export type CategoryInput = {
  name: string;
  slug: string;
  description: string;
  image: string | null;
};

export function parseCategoryForm(formData: FormData) {
  const errors: Record<string, string> = {};
  const name = cleanText(formData.get("name"), 80);
  const slug = slugify(cleanText(formData.get("slug") || name, 60));
  const description = cleanMultiline(formData.get("description"), 400);
  const imageRaw = cleanText(formData.get("image"), 400);
  const image = imageRaw
    ? imageRaw.startsWith("/") || isSafeHttpUrl(imageRaw)
      ? imageRaw
      : undefined
    : null;

  if (name.length < 2) errors.name = "Informe o nome da categoria.";
  if (!slug) errors.slug = "Informe um slug válido.";
  if (description.length < 8) errors.description = "Escreva uma descrição.";
  if (imageRaw && image === undefined) errors.image = "Use um caminho local ou uma URL http(s).";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: { name, slug, description, image: image ?? null } satisfies CategoryInput,
  };
}
