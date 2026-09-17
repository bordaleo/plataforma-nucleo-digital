import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { StoreSwitcher } from "@/components/admin/StoreSwitcher";
import type { Company, Store } from "@prisma/client";

const companyLinks = [
  { href: "/admin/company", label: "Empresa" },
  { href: "/admin/stores", label: "Lojas" },
];

const storeLinks = [
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/vendas", label: "Vendas" },
  { href: "/admin/clientes", label: "Clientes" },
];

export function AdminNav({
  company,
  stores,
  selectedStore,
}: {
  company: Pick<Company, "name"> | null;
  stores: Pick<Store, "id" | "name" | "slug" | "active">[];
  selectedStore: Pick<Store, "id" | "name" | "slug">;
}) {
  return (
    <aside className="border-b border-line bg-cream lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-5 lg:block">
        <Link href="/admin" className="font-serif text-2xl text-ink">
          {company?.name ?? "Empresa"}
        </Link>
        <form action={logoutAction} className="lg:mt-6">
          <button type="submit" className="text-sm text-muted hover:text-ink">
            Sair
          </button>
        </form>
      </div>
      <div className="px-5 pb-4">
        <StoreSwitcher stores={stores} selectedId={selectedStore.id} />
      </div>
      <nav className="flex gap-4 overflow-x-auto px-5 pb-4 text-sm lg:flex-col lg:gap-5 lg:pb-8">
        <div className="flex gap-4 lg:flex-col lg:gap-2">
          <p className="hidden text-[11px] uppercase tracking-[0.16em] text-muted lg:block">Empresa</p>
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-ink-soft hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 lg:flex-col lg:gap-2">
          <p className="hidden text-[11px] uppercase tracking-[0.16em] text-muted lg:block">Loja · {selectedStore.name}</p>
          {storeLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-ink-soft hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href={`/loja/${selectedStore.slug}`} className="whitespace-nowrap text-bronze hover:text-bronze-deep">
          Ver loja
        </Link>
        <Link href="/" className="whitespace-nowrap text-muted hover:text-ink">
          Ver empresa
        </Link>
      </nav>
    </aside>
  );
}
