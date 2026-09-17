import { PrismaClient, ProductStatus } from "@prisma/client";
import { catalogCategories, catalogCheckoutUrl, catalogProducts, type CatalogProduct } from "../src/lib/content/catalog";
import { financasCategories, financasProducts } from "../src/lib/content/catalog-financas";
import { fitnessCategories, fitnessProducts } from "../src/lib/content/catalog-fitness";
import { companyDefaults } from "../src/lib/company";
import {
  financasStoreDefaults,
  fitnessStoreDefaults,
  semeiaStoreDefaults,
  type StoreProfile,
} from "../src/lib/store";

const prisma = new PrismaClient();

function storeWriteData(store: StoreProfile, companyId: string) {
  return {
    name: store.name,
    niche: store.niche,
    description: store.description,
    tagline: store.tagline,
    logo: store.logo,
    favicon: store.favicon,
    primaryColor: store.primaryColor,
    secondaryColor: store.secondaryColor,
    backgroundColor: store.backgroundColor,
    themeStyle: store.themeStyle,
    email: store.email,
    instagram: store.instagram,
    companyId,
    active: true,
  };
}

async function upsertStore(store: StoreProfile, companyId: string) {
  return prisma.store.upsert({
    where: { slug: store.slug },
    update: storeWriteData(store, companyId),
    create: { id: store.id, slug: store.slug, ...storeWriteData(store, companyId) },
  });
}

async function upsertCatalog(
  storeId: string,
  categories: { name: string; slug: string; description: string; image: string }[],
  products: CatalogProduct[],
) {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { storeId_slug: { storeId, slug: category.slug } },
      update: {
        name: category.name,
        description: category.description,
        image: category.image,
      },
      create: {
        ...category,
        storeId,
      },
    });
  }

  const createdCategories = await prisma.category.findMany({ where: { storeId } });
  const bySlug = Object.fromEntries(createdCategories.map((category) => [category.slug, category.id]));

  for (const product of products) {
    const categoryId = bySlug[product.categorySlug];
    if (!categoryId) continue;

    await prisma.product.upsert({
      where: { storeId_slug: { storeId, slug: product.slug } },
      update: {
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        priceCents: product.priceCents,
        promotionalPriceCents: product.promotionalPriceCents,
        coverImage: product.coverImage,
        tags: product.tags,
        details: product.details,
        benefits: product.benefits,
        contents: product.contents,
        audience: product.audience,
        faq: product.faq,
        featured: Boolean(product.featured),
        categoryId,
        status: ProductStatus.ACTIVE,
      },
      create: {
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        description: product.description,
        priceCents: product.priceCents,
        promotionalPriceCents: product.promotionalPriceCents,
        coverImage: product.coverImage,
        tags: product.tags,
        details: product.details,
        benefits: product.benefits,
        contents: product.contents,
        audience: product.audience,
        faq: product.faq,
        kiwifyCheckoutUrl: catalogCheckoutUrl(`${storeId.slice(0, 8)}-${product.slug}`),
        kiwifyProductId: null,
        status: ProductStatus.ACTIVE,
        featured: Boolean(product.featured),
        storeId,
        categoryId,
      },
    });
  }
}

async function main() {
  const company = await prisma.company.upsert({
    where: { slug: companyDefaults.slug },
    update: {
      name: companyDefaults.name,
      description: companyDefaults.description,
      tagline: companyDefaults.tagline,
      primaryColor: companyDefaults.primaryColor,
      secondaryColor: companyDefaults.secondaryColor,
      email: companyDefaults.email,
      active: true,
    },
    create: {
      id: companyDefaults.id,
      name: companyDefaults.name,
      slug: companyDefaults.slug,
      description: companyDefaults.description,
      tagline: companyDefaults.tagline,
      primaryColor: companyDefaults.primaryColor,
      secondaryColor: companyDefaults.secondaryColor,
      email: companyDefaults.email,
      active: true,
    },
  });

  const semeia = await upsertStore(semeiaStoreDefaults, company.id);
  const financas = await upsertStore(financasStoreDefaults, company.id);
  const fitness = await upsertStore(fitnessStoreDefaults, company.id);

  await upsertCatalog(semeia.id, catalogCategories, catalogProducts);
  await upsertCatalog(financas.id, financasCategories, financasProducts);
  await upsertCatalog(fitness.id, fitnessCategories, fitnessProducts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
