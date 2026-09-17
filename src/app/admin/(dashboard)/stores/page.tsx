import Link from "next/link";
import { StoreActions } from "@/components/admin/StoreActions";
import { fallbackActiveProducts, fallbackCategoriesWithCount, fallbackStores } from "@/lib/content/fallback";
import { prisma } from "@/lib/prisma";
import { withDb } from "@/lib/safe-db";

export default async function AdminStoresPage() {
  const stores = await withDb(
    () =>
      prisma.store.findMany({
        orderBy: [{ createdAt: "asc" }, { name: "asc" }],
        include: {
          _count: { select: { products: true, categories: true, orders: true } },
        },
      }),
    fallbackStores().map((store) => ({
      ...store,
      _count: {
        products: fallbackActiveProducts(store.id).length,
        categories: fallbackCategoriesWithCount(store.id).length,
        orders: 0,
      },
    })),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Lojas</h1>
          <p className="mt-2 text-ink-soft">Marcas da empresa. Cada loja tem nicho, catálogo e identidade próprios.</p>
        </div>
        <Link href="/admin/stores/novo" className="inline-flex h-11 items-center rounded-full bg-forest px-5 text-sm text-cream">
          Nova loja
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto border border-line bg-cream">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Loja</th>
              <th className="px-4 py-3 font-medium">Nicho</th>
              <th className="px-4 py-3 font-medium">Catálogo</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => {
              const canDelete = store._count.products + store._count.categories + store._count.orders === 0;
              return (
                <tr key={store.id} className="border-b border-line/70">
                  <td className="px-4 py-4">
                    <Link href={`/admin/stores/${store.id}`} className="font-medium text-ink hover:text-forest">
                      {store.name}
                    </Link>
                    <p className="text-xs text-muted">/loja/{store.slug}</p>
                  </td>
                  <td className="px-4 py-4">{store.niche}</td>
                  <td className="px-4 py-4 text-ink-soft">
                    {store._count.products} produtos · {store._count.categories} categorias
                  </td>
                  <td className="px-4 py-4">{store.active ? "Ativa" : "Inativa"}</td>
                  <td className="px-4 py-4">
                    <StoreActions id={store.id} active={store.active} canDelete={canDelete} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {stores.length === 0 ? <p className="px-4 py-8 text-ink-soft">Nenhuma loja cadastrada.</p> : null}
      </div>
    </div>
  );
}
