import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/store/views/CategoryDetailView";
import { getCategoryBySlug, getStoreBySlug } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";

type PageProps = {
  params: Promise<{ storeSlug: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storeSlug, slug } = await params;
  const store = await getStoreBySlug(storeSlug);
  if (!store) return { title: "Categoria não encontrada" };
  const category = await getCategoryBySlug(store.id, slug);
  if (!category) return { title: "Categoria não encontrada" };
  return { title: category.name, description: category.description };
}

export default async function BrandCategoryPage({ params }: PageProps) {
  const { storeSlug, slug } = await params;
  const store = await requirePublicStore(storeSlug);
  const category = await getCategoryBySlug(store.id, slug);
  if (!category) notFound();
  return <CategoryDetailView store={store} category={category} />;
}
