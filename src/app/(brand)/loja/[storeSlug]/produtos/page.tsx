import { CatalogView } from "@/components/store/views/CatalogView";
import { getActiveCategories, getActiveProducts } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ storeSlug: string }>;
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [{ storeSlug }, { categoria }] = await Promise.all([params, searchParams]);
  const store = await requirePublicStore(storeSlug);
  const [products, categories] = await Promise.all([
    getActiveProducts(store.id),
    getActiveCategories(store.id),
  ]);
  return <CatalogView store={store} products={products} categories={categories} selectedCategory={categoria} />;
}
