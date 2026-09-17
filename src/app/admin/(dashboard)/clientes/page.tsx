import { getSelectedAdminStore } from "@/lib/admin-store";
import { formatDate } from "@/lib/format";
import { getAdminCustomers } from "@/lib/queries";

export default async function AdminCustomersPage() {
  const store = await getSelectedAdminStore();
  const customers = await getAdminCustomers(store.id);

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">Clientes</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Pessoas com pedidos em {store.name}. O e-mail é global: o mesmo cliente pode comprar em outras lojas.
      </p>
      <div className="mt-8 overflow-x-auto border border-line bg-cream">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Pedidos</th>
              <th className="px-4 py-3 font-medium">Desde</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-line/70">
                <td className="px-4 py-4">{customer.name ?? "—"}</td>
                <td className="px-4 py-4">{customer.email}</td>
                <td className="px-4 py-4">{customer._count.orders}</td>
                <td className="px-4 py-4">{formatDate(customer.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 ? <p className="px-4 py-8 text-ink-soft">Nenhum cliente recebido ainda.</p> : null}
      </div>
    </div>
  );
}
