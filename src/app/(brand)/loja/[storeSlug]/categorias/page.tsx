import { CategoriesView } from "@/components/store/views/CategoriesView";
import { getActiveCategories } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandCategoriesPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const store = await requirePublicStore(storeSlug);
  const categories = await getActiveCategories(store.id);
  return <CategoriesView store={store} categories={categories} />;
}
