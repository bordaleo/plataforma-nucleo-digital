import { HomeView } from "@/components/store/views/HomeView";
import { getActiveCategories, getFeaturedProducts } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandHomePage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const { storeSlug } = await params;
  const store = await requirePublicStore(storeSlug);
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(store.id),
    getActiveCategories(store.id),
  ]);
  return <HomeView store={store} featured={featured} categories={categories} />;
}
