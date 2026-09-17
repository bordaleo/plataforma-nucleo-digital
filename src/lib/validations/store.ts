import { cleanMultiline, cleanText, isSafeHttpUrl } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";
import { STORE_THEME_STYLES } from "@/lib/store";

export type StoreInput = {
  name: string;
  slug: string;
  niche: string;
  description: string;
  tagline: string;
  logo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  themeStyle: string;
  domain: string | null;
  email: string | null;
  instagram: string | null;
  active: boolean;
};

export type FieldErrors = Record<string, string>;

const COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function optionalAsset(value: string) {
  if (!value) return null;
  if (value.startsWith("/") || isSafeHttpUrl(value)) return value;
  return undefined;
}

export function parseStoreForm(formData: FormData): { data?: StoreInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = cleanText(formData.get("name"), 80);
  const slug = slugify(cleanText(formData.get("slug") || name, 60));
  const niche = cleanText(formData.get("niche"), 60);
  const description = cleanMultiline(formData.get("description"), 800);
  const tagline = cleanText(formData.get("tagline"), 160);
  const logoRaw = cleanText(formData.get("logo"), 400);
  const faviconRaw = cleanText(formData.get("favicon"), 400);
  const primaryColor = cleanText(formData.get("primaryColor"), 7) || "#1e3a32";
  const secondaryColor = cleanText(formData.get("secondaryColor"), 7) || "#9a7848";
  const backgroundColor = cleanText(formData.get("backgroundColor"), 7) || "#f3eee4";
  const themeStyleRaw = cleanText(formData.get("themeStyle"), 20) || "editorial";
  const themeStyle = STORE_THEME_STYLES.includes(themeStyleRaw as (typeof STORE_THEME_STYLES)[number])
    ? themeStyleRaw
    : "editorial";
  const domain = cleanText(formData.get("domain"), 160) || null;
  const email = cleanText(formData.get("email"), 160) || null;
  const instagram = cleanText(formData.get("instagram"), 200) || null;
  const active = formData.get("active") === "on";

  if (name.length < 2) errors.name = "Informe o nome da loja.";
  if (!slug) errors.slug = "Informe um slug válido.";
  if (niche.length < 2) errors.niche = "Informe o nicho.";
  if (description.length < 10) errors.description = "Escreva a descrição da loja.";
  if (!COLOR_PATTERN.test(primaryColor)) errors.primaryColor = "Use uma cor hexadecimal, como #1e3a32.";
  if (!COLOR_PATTERN.test(secondaryColor)) errors.secondaryColor = "Use uma cor hexadecimal, como #9a7848.";
  if (!COLOR_PATTERN.test(backgroundColor)) errors.backgroundColor = "Use uma cor hexadecimal, como #f3eee4.";

  const logo = optionalAsset(logoRaw);
  const favicon = optionalAsset(faviconRaw);
  if (logoRaw && logo === undefined) errors.logo = "Use um caminho local ou uma URL http(s).";
  if (faviconRaw && favicon === undefined) errors.favicon = "Use um caminho local ou uma URL http(s).";
  if (instagram && !isSafeHttpUrl(instagram)) errors.instagram = "Informe uma URL válida.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      name,
      slug,
      niche,
      description,
      tagline,
      logo: logo ?? null,
      favicon: favicon ?? null,
      primaryColor,
      secondaryColor,
      backgroundColor,
      themeStyle,
      domain,
      email,
      instagram,
      active,
    },
  };
}
