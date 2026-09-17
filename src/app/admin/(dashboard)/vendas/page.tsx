import { getSelectedAdminStore } from "@/lib/admin-store";
import { formatDate, formatPrice } from "@/lib/format";
import { getAdminDashboard, getAdminOrders } from "@/lib/queries";

const labels = {
  PENDING: "Pendente",
  PAID: "Paga",
  REFUNDED: "Reembolsada",
  CANCELLED: "Cancelada",
  FAILED: "Falhou",
};

export default async function AdminOrdersPage() {
  const store = await getSelectedAdminStore();
  const [orders, stats] = await Promise.all([getAdminOrders(store.id), getAdminDashboard(store.id)]);

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">Vendas</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Pedidos de {store.name}, preenchidos pelo webhook `/api/webhooks/kiwify`.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="border border-line bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Pedidos</p>
          <p className="mt-2 font-serif text-3xl">{stats.orders}</p>
        </div>
        <div className="border border-line bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Pagos</p>
          <p className="mt-2 font-serif text-3xl">{stats.payments}</p>
        </div>
        <div className="border border-line bg-cream p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Faturamento</p>
          <p className="mt-2 font-serif text-3xl">{formatPrice(stats.revenueCents)}</p>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto border border-line bg-cream">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Pedido</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pagamento</th>
              <th className="px-4 py-3 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-line/70">
                <td className="px-4 py-4 font-mono text-xs">{order.providerRef ?? order.id}</td>
                <td className="px-4 py-4">{order.customer.email}</td>
                <td className="px-4 py-4">{formatPrice(order.totalCents)}</td>
                <td className="px-4 py-4">{labels[order.status]}</td>
                <td className="px-4 py-4">{order.payment ? labels[order.payment.status] : "—"}</td>
                <td className="px-4 py-4">{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 ? <p className="px-4 py-8 text-ink-soft">Nenhuma venda recebida ainda.</p> : null}
      </div>
    </div>
  );
}
