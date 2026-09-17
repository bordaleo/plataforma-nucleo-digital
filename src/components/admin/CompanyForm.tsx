"use client";

import type { Company } from "@prisma/client";
import { useActionState } from "react";
import { updateCompanyAction, type CompanyFormState } from "@/lib/actions/company";

const fieldClass = "h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2";
const areaClass = "w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2";

export function CompanyForm({ company }: { company: Company }) {
  const [state, formAction, pending] = useActionState(updateCompanyAction, {} as CompanyFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      <Field label="Nome" name="name" defaultValue={company.name} error={state.errors?.name} required />
      <Field label="Slug" name="slug" defaultValue={company.slug} error={state.errors?.slug} />
      <Field label="Tagline" name="tagline" defaultValue={company.tagline} />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Descrição institucional</span>
        <textarea name="description" rows={5} required defaultValue={company.description} className={areaClass} />
        {state.errors?.description ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.description}</p> : null}
      </label>
      <Field label="Logo" name="logo" defaultValue={company.logo ?? ""} error={state.errors?.logo} />
      <Field label="Favicon" name="favicon" defaultValue={company.favicon ?? ""} error={state.errors?.favicon} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Cor primária" name="primaryColor" defaultValue={company.primaryColor} error={state.errors?.primaryColor} />
        <Field label="Cor secundária" name="secondaryColor" defaultValue={company.secondaryColor} error={state.errors?.secondaryColor} />
      </div>
      <Field label="E-mail" name="email" defaultValue={company.email ?? ""} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Salvando..." : "Salvar empresa"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ink-soft">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className={fieldClass} />
      {error ? <p className="mt-1 text-sm text-bronze-deep">{error}</p> : null}
    </label>
  );
}
