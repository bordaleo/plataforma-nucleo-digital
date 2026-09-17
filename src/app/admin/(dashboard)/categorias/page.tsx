import Link from "next/link";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { getAdminCategories } from "@/lib/queries";

export default async function AdminCategoriesPage() {
  const store = await getSelectedAdminStore();
  const categories = await getAdminCategories(store.id);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Categorias</h1>
          <p className="mt-2 text-ink-soft">
            {store.name} · {categories.length} categorias
          </p>
        </div>
        <Link href="/admin/categorias/novo" className="inline-flex h-11 items-center rounded-full bg-forest px-5 text-sm text-cream">
          Nova categoria
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto border border-line bg-cream">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Slug</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-line/70">
                <td className="px-4 py-4">
                  <Link href={`/admin/categorias/${category.id}`} className="font-medium text-ink hover:text-forest">
                    {category.name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-ink-soft">{category.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 ? <p className="px-4 py-8 text-ink-soft">Nenhuma categoria nesta loja.</p> : null}
      </div>
    </div>
  );
}
