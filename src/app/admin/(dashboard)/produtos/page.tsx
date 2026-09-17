import Link from "next/link";
import { ProductActions } from "@/components/admin/ProductActions";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { formatPrice } from "@/lib/format";
import { getAdminProducts } from "@/lib/queries";

export default async function AdminProductsPage() {
  const store = await getSelectedAdminStore();
  const products = await getAdminProducts(store.id);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Produtos</h1>
          <p className="mt-2 text-ink-soft">{store.name} · {products.length} cadastrados</p>
        </div>
        <Link href="/admin/produtos/novo" className="inline-flex h-11 items-center rounded-full bg-forest px-5 text-sm text-cream">
          Novo produto
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto border border-line bg-cream">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line/70">
                <td className="px-4 py-4">
                  <Link href={`/admin/produtos/${product.id}`} className="font-medium text-ink hover:text-forest">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted">{product.slug}</p>
                </td>
                <td className="px-4 py-4 text-ink-soft">{product.category.name}</td>
                <td className="px-4 py-4">{formatPrice(product.promotionalPriceCents ?? product.priceCents)}</td>
                <td className="px-4 py-4">{product.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
                <td className="px-4 py-4">
                  <ProductActions id={product.id} status={product.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 ? <p className="px-4 py-8 text-ink-soft">Nenhum produto cadastrado.</p> : null}
      </div>
    </div>
  );
}
