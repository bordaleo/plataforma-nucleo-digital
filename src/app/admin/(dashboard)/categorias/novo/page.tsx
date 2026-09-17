import { CategoryForm } from "@/components/admin/CategoryForm";
import { getSelectedAdminStore } from "@/lib/admin-store";

export default async function NewCategoryPage() {
  const store = await getSelectedAdminStore();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl text-ink">Nova categoria</h1>
      <p className="mt-3 text-ink-soft">A categoria será criada em {store.name}.</p>
      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
