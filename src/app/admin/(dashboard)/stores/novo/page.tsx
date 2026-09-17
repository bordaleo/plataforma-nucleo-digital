import { StoreForm } from "@/components/admin/StoreForm";
import { getCompany } from "@/lib/queries";

export default async function NewStorePage() {
  const company = await getCompany();

  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Empresa → Loja</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">Nova loja</h1>
      <p className="mt-3 text-ink-soft">
        A marca será criada em {company?.name ?? "a empresa"}. Depois selecione a loja e cadastre categorias e produtos.
      </p>
      <div className="mt-8">
        <StoreForm companyName={company?.name} />
      </div>
    </div>
  );
}
