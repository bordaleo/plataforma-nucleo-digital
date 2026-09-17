import { cleanMultiline, cleanText, isSafeHttpUrl } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export type CompanyInput = {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  email: string | null;
};

const COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function optionalAsset(value: string) {
  if (!value) return null;
  if (value.startsWith("/") || isSafeHttpUrl(value)) return value;
  return undefined;
}

export function parseCompanyForm(formData: FormData) {
  const errors: Record<string, string> = {};
  const name = cleanText(formData.get("name"), 80);
  const slug = slugify(cleanText(formData.get("slug") || name, 60));
  const description = cleanMultiline(formData.get("description"), 800);
  const tagline = cleanText(formData.get("tagline"), 180);
  const logoRaw = cleanText(formData.get("logo"), 400);
  const faviconRaw = cleanText(formData.get("favicon"), 400);
  const primaryColor = cleanText(formData.get("primaryColor"), 7) || "#141414";
  const secondaryColor = cleanText(formData.get("secondaryColor"), 7) || "#6b7280";
  const email = cleanText(formData.get("email"), 160) || null;

  if (name.length < 2) errors.name = "Informe o nome da empresa.";
  if (!slug) errors.slug = "Informe um slug válido.";
  if (description.length < 10) errors.description = "Escreva a descrição institucional.";
  if (!COLOR_PATTERN.test(primaryColor)) errors.primaryColor = "Use uma cor hexadecimal.";
  if (!COLOR_PATTERN.test(secondaryColor)) errors.secondaryColor = "Use uma cor hexadecimal.";

  const logo = optionalAsset(logoRaw);
  const favicon = optionalAsset(faviconRaw);
  if (logoRaw && logo === undefined) errors.logo = "Use um caminho local ou uma URL http(s).";
  if (faviconRaw && favicon === undefined) errors.favicon = "Use um caminho local ou uma URL http(s).";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      name,
      slug,
      description,
      tagline,
      logo: logo ?? null,
      favicon: favicon ?? null,
      primaryColor,
      secondaryColor,
      email,
    } satisfies CompanyInput,
  };
}
