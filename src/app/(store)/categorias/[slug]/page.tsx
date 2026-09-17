import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetailView } from "@/components/store/views/CategoryDetailView";
import { getCategoryBySlug, getDefaultStore } from "@/lib/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getDefaultStore();
  const category = await getCategoryBySlug(store.id, slug);
  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const store = await getDefaultStore();
  const category = await getCategoryBySlug(store.id, slug);
  if (!category) notFound();
  return <CategoryDetailView store={store} category={category} />;
}
