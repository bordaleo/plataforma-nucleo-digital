import type { Store } from "@prisma/client";
import { mixHex } from "@/lib/color";
import { site } from "@/lib/site";

export const DEFAULT_STORE_SLUG = "semeia";
export const ADMIN_STORE_COOKIE = "admin_store_id";
export const STORE_THEME_STYLES = ["editorial", "modern", "energy"] as const;
export type StoreThemeStyle = (typeof STORE_THEME_STYLES)[number];

export type StoreProfile = Pick<
  Store,
  | "id"
  | "name"
  | "slug"
  | "niche"
  | "description"
  | "tagline"
  | "logo"
  | "favicon"
  | "primaryColor"
  | "secondaryColor"
  | "backgroundColor"
  | "themeStyle"
  | "domain"
  | "email"
  | "instagram"
  | "active"
  | "companyId"
>;

export const semeiaStoreDefaults: StoreProfile = {
  id: "clsemeia000000000000000001",
  name: "Semeia",
  slug: DEFAULT_STORE_SLUG,
  niche: "Cristão",
  description: site.description,
  tagline: site.tagline,
  logo: "/logo.svg",
  favicon: "/logo.svg",
  primaryColor: "#1e3a32",
  secondaryColor: "#9a7848",
  backgroundColor: "#f3eee4",
  themeStyle: "editorial",
  domain: null,
  email: site.email,
  instagram: site.instagram,
  active: true,
  companyId: "clcompany00000000000000001",
};

export const financasStoreDefaults: StoreProfile = {
  id: "clfinancas0000000000000001",
  name: "Finanças",
  slug: "financas",
  niche: "Finanças",
  description: "Materiais digitais para organizar melhor sua vida financeira.",
  tagline: "Clareza para o dinheiro do mês.",
  logo: "/brands/financas.svg",
  favicon: "/brands/financas.svg",
  primaryColor: "#10233d",
  secondaryColor: "#b0893e",
  backgroundColor: "#eef2f5",
  themeStyle: "modern",
  domain: null,
  email: null,
  instagram: null,
  active: true,
  companyId: "clcompany00000000000000001",
};

export const fitnessStoreDefaults: StoreProfile = {
  id: "clfitness00000000000000001",
  name: "Fitness",
  slug: "fitness",
  niche: "Fitness",
  description: "Materiais digitais para organizar treinos, hábitos e uma rotina mais ativa.",
  tagline: "Movimento com método, no seu ritmo.",
  logo: "/brands/fitness.svg",
  favicon: "/brands/fitness.svg",
  primaryColor: "#161616",
  secondaryColor: "#d85a2b",
  backgroundColor: "#f4f1ec",
  themeStyle: "energy",
  domain: null,
  email: null,
  instagram: null,
  active: true,
  companyId: "clcompany00000000000000001",
};

export const seededStores = [semeiaStoreDefaults, financasStoreDefaults, fitnessStoreDefaults];

export function storeThemeClass(store: Pick<StoreProfile, "themeStyle">) {
  const style = STORE_THEME_STYLES.includes(store.themeStyle as StoreThemeStyle)
    ? store.themeStyle
    : "editorial";
  return `store-theme-${style}`;
}

export function storeThemeStyle(store: StoreProfile) {
  const parchment = store.backgroundColor || "#f3eee4";
  const base = {
    "--forest": store.primaryColor,
    "--bronze": store.secondaryColor,
    "--bronze-deep": store.secondaryColor,
    "--parchment": parchment,
    "--parchment-deep": mixHex(parchment, store.primaryColor, 0.1),
    "--cream": mixHex(parchment, "#ffffff", 0.42),
  } as Record<string, string>;

  if (store.themeStyle === "editorial") return base;

  return {
    ...base,
    "--ink": mixHex(store.primaryColor, "#0b0d0c", 0.28),
    "--ink-soft": mixHex(store.primaryColor, "#5c6670", 0.38),
    "--line": mixHex(parchment, store.primaryColor, 0.2),
  };
}

export function storeHref(storeSlug: string, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/loja/${storeSlug}`;
  if (storeSlug === DEFAULT_STORE_SLUG) {
    return normalized;
  }
  return `/loja/${storeSlug}${normalized}`;
}

export function storeNavLinks(storeSlug: string) {
  return [
    { href: storeHref(storeSlug, "/produtos"), label: "Materiais" },
    { href: storeHref(storeSlug, "/categorias"), label: "Categorias" },
    { href: storeHref(storeSlug, "/sobre"), label: "Sobre" },
    { href: storeHref(storeSlug, "/faq"), label: "FAQ" },
    { href: storeHref(storeSlug, "/contato"), label: "Contato" },
  ];
}

/**
 * Preparado para resolução futura por domínio.
 * Hoje o catálogo público usa apenas o slug da URL.
 */
export function matchStoreByHost(stores: StoreProfile[], host?: string | null) {
  if (!host) return null;
  const hostname = host.split(":")[0]?.toLowerCase();
  return stores.find((store) => store.domain && store.domain.replace(/^https?:\/\//, "").split("/")[0]?.toLowerCase() === hostname) ?? null;
}
