import type { Metadata } from "next";
import { CatalogView } from "@/components/store/views/CatalogView";
import { getActiveCategories, getActiveProducts, getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Materiais",
  description: "Catálogo de materiais digitais da Semeia: devocionais, estudos, e-books e recursos para a casa.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const store = await getDefaultStore();
  const [products, categories] = await Promise.all([
    getActiveProducts(store.id),
    getActiveCategories(store.id),
  ]);

  return (
    <CatalogView store={store} products={products} categories={categories} selectedCategory={categoria} />
  );
}
