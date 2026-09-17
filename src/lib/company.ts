import type { Company } from "@prisma/client";

export const DEFAULT_COMPANY_SLUG = "nucleo";

export type CompanyProfile = Pick<
  Company,
  | "id"
  | "name"
  | "slug"
  | "description"
  | "tagline"
  | "logo"
  | "favicon"
  | "primaryColor"
  | "secondaryColor"
  | "email"
  | "active"
>;

export const companyDefaults: CompanyProfile = {
  id: "clcompany00000000000000001",
  name: "Núcleo",
  slug: DEFAULT_COMPANY_SLUG,
  description:
    "Desenvolvemos e administramos marcas de produtos digitais. Cada loja tem identidade, catálogo e checkout próprios.",
  tagline: "Uma empresa. Várias marcas. Produtos digitais.",
  logo: null,
  favicon: null,
  primaryColor: "#141414",
  secondaryColor: "#6b7280",
  email: "ola@nucleo.com.br",
  active: true,
};

export function companyThemeStyle(company: CompanyProfile) {
  return {
    "--company-ink": company.primaryColor,
    "--company-muted": company.secondaryColor,
  } as Record<string, string>;
}
