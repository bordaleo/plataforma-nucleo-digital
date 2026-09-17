import { ProductStatus } from "@prisma/client";
import { catalogCategories, catalogCheckoutUrl, catalogProducts } from "@/lib/content/catalog";
import { financasCategories, financasProducts } from "@/lib/content/catalog-financas";
import { fitnessCategories, fitnessProducts } from "@/lib/content/catalog-fitness";
import { DEMO_OFFER_WINDOW, demoOfferSeeds } from "@/lib/content/demo-offers";
import { companyDefaults } from "@/lib/company";
import { computeDiscountPercent } from "@/lib/offer";
import {
  financasStoreDefaults,
  fitnessStoreDefaults,
  seededStores,
  semeiaStoreDefaults,
  type StoreProfile,
} from "@/lib/store";

const now = new Date("2026-01-01T12:00:00.000Z");

export const fallbackCompany = {
  ...companyDefaults,
  createdAt: now,
  updatedAt: now,
};

function withTimestamps(store: StoreProfile) {
  return { ...store, createdAt: now, updatedAt: now };
}

export const fallbackSemeiaStore = withTimestamps(semeiaStoreDefaults);
export const fallbackFinancasStore = withTimestamps(financasStoreDefaults);
export const fallbackFitnessStore = withTimestamps(fitnessStoreDefaults);

const catalogs = [
  { store: fallbackSemeiaStore, categories: catalogCategories, products: catalogProducts },
  { store: fallbackFinancasStore, categories: financasCategories, products: financasProducts },
  { store: fallbackFitnessStore, categories: fitnessCategories, products: fitnessProducts },
];

function buildFallbackCatalog(store: StoreProfile, categories: typeof catalogCategories, products: typeof catalogProducts) {
  const fallbackCategories = categories.map((category) => ({
    id: `${store.slug}_cat_${category.slug}`,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    storeId: store.id,
    createdAt: now,
    updatedAt: now,
  }));

  const fallbackProducts = products.map((product) => {
    const category = fallbackCategories.find((item) => item.slug === product.categorySlug);
    if (!category) {
      throw new Error(`Categoria ausente no fallback (${store.slug}): ${product.categorySlug}`);
    }
    const demo = demoOfferSeeds[product.slug];

    return {
      id: `${store.slug}_prod_${product.slug}`,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      priceCents: product.priceCents,
      promotionalPriceCents: product.promotionalPriceCents ?? null,
      coverImage: product.coverImage,
      galleryImages: [product.coverImage],
      mockupImages: [product.coverImage],
      videoUrl: null,
      tags: product.tags,
      details: product.details,
      benefits: product.benefits,
      contents: product.contents,
      audience: product.audience,
      audiencePoints: demo?.audiencePoints ?? [],
      notFor: demo?.notFor ?? [],
      faq: product.faq,
      stickyCtaEnabled: true,
      kiwifyCheckoutUrl: catalogCheckoutUrl(`${store.slug}-${product.slug}`),
      kiwifyProductId: null,
      status: ProductStatus.ACTIVE,
      featured: Boolean(product.featured),
      storeId: store.id,
      categoryId: category.id,
      createdAt: now,
      updatedAt: now,
      category,
    };
  });

  return { fallbackCategories, fallbackProducts };
}

const built = catalogs.map((item) => ({
  store: item.store,
  ...buildFallbackCatalog(item.store, item.categories, item.products),
}));

function catalogForStore(storeId: string) {
  return built.find((item) => item.store.id === storeId) ?? null;
}

export function fallbackStores() {
  return seededStores.map(withTimestamps);
}

export function fallbackStoreBySlug(slug: string) {
  return fallbackStores().find((store) => store.slug === slug) ?? null;
}

export function fallbackStoreById(id: string) {
  return fallbackStores().find((store) => store.id === id) ?? null;
}

export function getFallbackCompany() {
  return fallbackCompany;
}

export function fallbackCategoriesWithCount(storeId: string) {
  const catalog = catalogForStore(storeId);
  if (!catalog) return [];
  return catalog.fallbackCategories.map((category) => ({
    ...category,
    _count: {
      products: catalog.fallbackProducts.filter((product) => product.categoryId === category.id).length,
    },
  }));
}

export function fallbackCategoryBySlug(storeId: string, slug: string) {
  const catalog = catalogForStore(storeId);
  if (!catalog) return null;
  const category = catalog.fallbackCategories.find((item) => item.slug === slug);
  if (!category) return null;
  return {
    ...category,
    products: catalog.fallbackProducts.filter((product) => product.categoryId === category.id),
  };
}

export function fallbackActiveProducts(storeId: string) {
  return catalogForStore(storeId)?.fallbackProducts ?? [];
}

export function fallbackFeaturedProducts(storeId: string) {
  return fallbackActiveProducts(storeId).filter((product) => product.featured).slice(0, 4);
}

export function fallbackProductBySlug(storeId: string, slug: string) {
  return fallbackActiveProducts(storeId).find((product) => product.slug === slug) ?? null;
}

export function fallbackRelatedProducts(storeId: string, productId: string, categoryId: string) {
  return fallbackActiveProducts(storeId)
    .filter((product) => product.categoryId === categoryId && product.id !== productId)
    .slice(0, 3);
}

export function fallbackOfferForProduct(product: { id: string; slug: string; priceCents: number; promotionalPriceCents: number | null }) {
  const seed = demoOfferSeeds[product.slug];
  if (!seed) return null;
  const originalPriceCents = product.priceCents;
  const promotionalPriceCents = product.promotionalPriceCents ?? Math.round(product.priceCents * 0.8);
  return {
    id: `offer_${product.id}`,
    productId: product.id,
    name: seed.name,
    headline: seed.headline,
    subheadline: seed.subheadline,
    originalPriceCents,
    promotionalPriceCents,
    discountPercentage: computeDiscountPercent(originalPriceCents, promotionalPriceCents),
    badge: seed.badge,
    barText: seed.barText,
    startsAt: DEMO_OFFER_WINDOW.startsAt,
    endsAt: DEMO_OFFER_WINDOW.endsAt,
    guaranteeEnabled: false,
    guaranteeDays: null,
    guaranteeText: null,
    expiredBehavior: "hide_urgency",
    stickyCtaEnabled: true,
    demo: true,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
}
