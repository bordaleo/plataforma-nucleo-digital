import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { deleteCategoryAction } from "@/lib/actions/category";
import { getAdminCategory } from "@/lib/queries";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getAdminCategory(id);
  if (!category) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Editar categoria</h1>
          <p className="mt-3 text-ink-soft">{category.name}</p>
        </div>
        <form action={deleteCategoryAction.bind(null, category.id)}>
          <button type="submit" className="text-sm text-bronze-deep">
            Excluir
          </button>
        </form>
      </div>
      <div className="mt-8">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
