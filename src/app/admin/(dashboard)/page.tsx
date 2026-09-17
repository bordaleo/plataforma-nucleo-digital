import Link from "next/link";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { formatPrice } from "@/lib/format";
import { getAdminDashboard, getCompany, getPlatformStoreSummaries } from "@/lib/queries";

export default async function AdminHomePage() {
  const store = await getSelectedAdminStore();
  const [company, stats, platform, summaries] = await Promise.all([
    getCompany(),
    getAdminDashboard(store.id),
    getAdminDashboard(),
    getPlatformStoreSummaries(),
  ]);

  const cards = [
    { label: "Produtos", value: stats.products, href: "/admin/produtos" },
    { label: "Vendas", value: stats.orders, href: "/admin/vendas" },
    { label: "Clientes", value: stats.customers, href: "/admin/clientes" },
    { label: "Pagamentos confirmados", value: stats.payments, href: "/admin/vendas" },
  ];

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
        {company?.name ?? "Empresa"} → {store.name}
      </p>
      <h1 className="mt-2 font-serif text-4xl text-ink">Visão geral</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Dados da loja <strong>{store.name}</strong>. A empresa administra as marcas; produtos, categorias e vendas ficam em cada loja.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="border border-line bg-cream p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{card.label}</p>
            <p className="mt-3 font-serif text-4xl text-ink">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 border border-line bg-cream p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Faturamento pago desta loja</p>
        <p className="mt-3 font-serif text-4xl text-ink">{formatPrice(stats.revenueCents)}</p>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-3xl text-ink">Marcas da empresa</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Totais de todas as lojas: {platform.products} produtos, {platform.orders} vendas, {formatPrice(platform.revenueCents)} pagos.
        </p>
        <div className="mt-6 overflow-x-auto border border-line bg-cream">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Loja</th>
                <th className="px-4 py-3 font-medium">Produtos</th>
                <th className="px-4 py-3 font-medium">Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((item) => (
                <tr key={item.id} className="border-b border-line/70">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item._count.products}</td>
                  <td className="px-4 py-3">{item._count.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
