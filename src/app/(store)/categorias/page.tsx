import type { Metadata } from "next";
import { CategoriesView } from "@/components/store/views/CategoriesView";
import { getActiveCategories, getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Navegue pelos materiais digitais da Semeia por categoria.",
};

export default async function CategoriesPage() {
  const store = await getDefaultStore();
  const categories = await getActiveCategories(store.id);
  return <CategoriesView store={store} categories={categories} />;
}
