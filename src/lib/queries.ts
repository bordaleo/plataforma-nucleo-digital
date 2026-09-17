import { ProductStatus } from "@prisma/client";
import {
  fallbackActiveProducts,
  fallbackCategoriesWithCount,
  fallbackCategoryBySlug,
  fallbackCompany,
  fallbackFeaturedProducts,
  fallbackOfferForProduct,
  fallbackProductBySlug,
  fallbackRelatedProducts,
  fallbackSemeiaStore,
  fallbackStoreById,
  fallbackStoreBySlug,
  fallbackStores,
} from "@/lib/content/fallback";
import { prisma } from "@/lib/prisma";
import { selectPrimaryOffer } from "@/lib/offer";
import { withDb } from "@/lib/safe-db";
import { DEFAULT_STORE_SLUG } from "@/lib/store";

export async function getCompany() {
  return withDb(
    () => prisma.company.findFirst({ orderBy: { createdAt: "asc" } }),
    fallbackCompany,
  );
}

export async function getStores() {
  return withDb(
    () => prisma.store.findMany({ orderBy: [{ createdAt: "asc" }, { name: "asc" }] }),
    fallbackStores(),
  );
}

export async function getActiveStores() {
  return withDb(
    () => prisma.store.findMany({ where: { active: true }, orderBy: [{ createdAt: "asc" }, { name: "asc" }] }),
    fallbackStores().filter((store) => store.active),
  );
}

export async function getStoreBySlug(slug: string) {
  return withDb(
    () => prisma.store.findUnique({ where: { slug } }),
    fallbackStoreBySlug(slug),
  );
}

export async function getStoreById(id: string) {
  return withDb(
    () => prisma.store.findUnique({ where: { id } }),
    fallbackStoreById(id),
  );
}

export async function getDefaultStore() {
  const store = await getStoreBySlug(DEFAULT_STORE_SLUG);
  return store ?? fallbackSemeiaStore;
}

export async function getActiveCategories(storeId: string) {
  return withDb(
    () =>
      prisma.category.findMany({
        where: { storeId },
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: { products: { where: { status: ProductStatus.ACTIVE, storeId } } },
          },
        },
      }),
    fallbackCategoriesWithCount(storeId),
  );
}

export async function getCategoryBySlug(storeId: string, slug: string) {
  return withDb(
    () =>
      prisma.category.findUnique({
        where: { storeId_slug: { storeId, slug } },
        include: {
          products: {
            where: { status: ProductStatus.ACTIVE, storeId },
            orderBy: { createdAt: "desc" },
            include: { category: true },
          },
        },
      }),
    fallbackCategoryBySlug(storeId, slug),
  );
}

export async function getActiveProducts(storeId: string) {
  return withDb(
    () =>
      prisma.product.findMany({
        where: { status: ProductStatus.ACTIVE, storeId },
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
    fallbackActiveProducts(storeId),
  );
}

export async function getFeaturedProducts(storeId: string) {
  return withDb(
    () =>
      prisma.product.findMany({
        where: { status: ProductStatus.ACTIVE, featured: true, storeId },
        orderBy: { updatedAt: "desc" },
        take: 4,
        include: { category: true },
      }),
    fallbackFeaturedProducts(storeId),
  );
}

export async function getProductBySlug(storeId: string, slug: string) {
  return withDb(
    () =>
      prisma.product.findFirst({
        where: { slug, status: ProductStatus.ACTIVE, storeId },
        include: { category: true },
      }),
    fallbackProductBySlug(storeId, slug),
  );
}

export async function getRelatedProducts(storeId: string, productId: string, categoryId: string) {
  return withDb(
    () =>
      prisma.product.findMany({
        where: {
          status: ProductStatus.ACTIVE,
          storeId,
          categoryId,
          id: { not: productId },
        },
        take: 3,
        include: { category: true },
      }),
    fallbackRelatedProducts(storeId, productId, categoryId),
  );
}

export async function getAdminProducts(storeId: string) {
  return withDb(
    () =>
      prisma.product.findMany({
        where: { storeId },
        orderBy: { updatedAt: "desc" },
        include: { category: true },
      }),
    [],
  );
}

export async function getAdminProduct(id: string) {
  return withDb(
    () =>
      prisma.product.findUnique({
        where: { id },
        include: { offers: { orderBy: { updatedAt: "desc" } }, store: true, category: true },
      }),
    null,
  );
}

export async function getOfferLanding(storeId: string, productSlug: string) {
  const product = await getProductBySlug(storeId, productSlug);
  if (!product) return null;
  const offer = await withDb(
    async () => {
      const offers = await prisma.offer.findMany({
        where: { productId: product.id, active: true },
        orderBy: { endsAt: "desc" },
      });
      return selectPrimaryOffer(offers);
    },
    fallbackOfferForProduct(product),
  );
  return { product, offer };
}

export async function getAdminCategories(storeId: string) {
  return withDb(
    () => prisma.category.findMany({ where: { storeId }, orderBy: { name: "asc" } }),
    [],
  );
}

export async function getAdminCategory(id: string) {
  return withDb(() => prisma.category.findUnique({ where: { id } }), null);
}

export async function getAdminOrders(storeId: string) {
  return withDb(
    () =>
      prisma.order.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" },
        include: { customer: true, payment: true, items: true, store: true },
      }),
    [],
  );
}

export async function getAdminCustomers(storeId: string) {
  return withDb(
    () =>
      prisma.customer.findMany({
        where: { orders: { some: { storeId } } },
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { orders: { where: { storeId } } } },
        },
      }),
    [],
  );
}

export async function getAdminDashboard(storeId?: string) {
  return withDb(async () => {
    const storeFilter = storeId ? { storeId } : {};
    const [products, orders, customers, payments, revenue] = await Promise.all([
      prisma.product.count({ where: storeFilter }),
      prisma.order.count({ where: storeFilter }),
      storeId
        ? prisma.customer.count({ where: { orders: { some: { storeId } } } })
        : prisma.customer.count(),
      prisma.payment.count({ where: { status: "PAID", ...(storeId ? { order: { storeId } } : {}) } }),
      prisma.order.aggregate({
        where: { status: "PAID", ...storeFilter },
        _sum: { totalCents: true },
      }),
    ]);
    return {
      products,
      orders,
      customers,
      payments,
      revenueCents: revenue._sum.totalCents ?? 0,
    };
  }, { products: 0, orders: 0, customers: 0, payments: 0, revenueCents: 0 });
}

export async function getPlatformStoreSummaries() {
  return withDb(
    () =>
      prisma.store.findMany({
        orderBy: [{ createdAt: "asc" }, { name: "asc" }],
        include: {
          _count: {
            select: {
              products: true,
              orders: true,
            },
          },
        },
      }),
    [],
  );
}
