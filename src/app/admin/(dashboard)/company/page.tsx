import { CompanyForm } from "@/components/admin/CompanyForm";
import { getCompany } from "@/lib/queries";

export default async function AdminCompanyPage() {
  const company = await getCompany();
  if (!company) {
    return <p className="text-ink-soft">Empresa não encontrada. Rode as migrations e o seed.</p>;
  }

  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Empresa</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{company.name}</h1>
      <p className="mt-3 text-ink-soft">
        Identidade institucional da plataforma. As lojas abaixo desta empresa mantêm marca e catálogo próprios.
      </p>
      <div className="mt-8">
        <CompanyForm company={company} />
      </div>
    </div>
  );
}
