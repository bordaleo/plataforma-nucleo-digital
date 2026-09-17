import { ProductForm } from "@/components/admin/ProductForm";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { getAdminCategories } from "@/lib/queries";

export default async function NewProductPage() {
  const store = await getSelectedAdminStore();
  const categories = await getAdminCategories(store.id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl text-ink">Novo produto</h1>
      <p className="mt-3 text-ink-soft">O produto será criado em {store.name}. Cada um tem o próprio checkout da Kiwify.</p>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
