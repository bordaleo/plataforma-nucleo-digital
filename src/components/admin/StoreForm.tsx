"use client";

import type { Store } from "@prisma/client";
import { useActionState } from "react";
import { createStoreAction, updateStoreAction, type StoreFormState } from "@/lib/actions/store";

const fieldClass = "h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2";
const areaClass = "w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2";

export function StoreForm({ store, companyName }: { store?: Store; companyName?: string }) {
  const action = store ? updateStoreAction.bind(null, store.id) : createStoreAction;
  const [state, formAction, pending] = useActionState(action, {} as StoreFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      {companyName ? (
        <p className="border border-line bg-parchment px-4 py-3 text-sm text-ink-soft">
          Esta loja pertence à empresa <strong className="text-ink">{companyName}</strong>.
        </p>
      ) : null}
      <Field label="Nome" name="name" defaultValue={store?.name} error={state.errors?.name} required />
      <Field label="Slug" name="slug" defaultValue={store?.slug} error={state.errors?.slug} hint="Usado em /loja/slug" />
      <Field label="Nicho" name="niche" defaultValue={store?.niche} error={state.errors?.niche} required />
      <Field label="Tagline" name="tagline" defaultValue={store?.tagline} />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Descrição</span>
        <textarea name="description" rows={5} required defaultValue={store?.description} className={areaClass} />
        {state.errors?.description ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.description}</p> : null}
      </label>
      <Field label="Logo" name="logo" defaultValue={store?.logo ?? ""} error={state.errors?.logo} hint="Caminho local ou URL." />
      <Field label="Favicon" name="favicon" defaultValue={store?.favicon ?? ""} error={state.errors?.favicon} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Cor primária" name="primaryColor" defaultValue={store?.primaryColor ?? "#1e3a32"} error={state.errors?.primaryColor} />
        <Field label="Cor secundária" name="secondaryColor" defaultValue={store?.secondaryColor ?? "#9a7848"} error={state.errors?.secondaryColor} />
      </div>
      <Field label="Cor de fundo" name="backgroundColor" defaultValue={store?.backgroundColor ?? "#f3eee4"} error={state.errors?.backgroundColor} />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Estilo / tipografia</span>
        <select name="themeStyle" defaultValue={store?.themeStyle ?? "editorial"} className={fieldClass}>
          <option value="editorial">Editorial — serifado, como a Semeia</option>
          <option value="modern">Moderno — organizado, como Finanças</option>
          <option value="energy">Energia — direto, como Fitness</option>
        </select>
      </label>
      <Field label="Domínio futuro" name="domain" defaultValue={store?.domain ?? ""} hint="Ex.: financas.com.br — não altera o roteamento agora." />
      <Field label="E-mail" name="email" defaultValue={store?.email ?? ""} />
      <Field label="Instagram" name="instagram" defaultValue={store?.instagram ?? ""} error={state.errors?.instagram} />
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="active" defaultChecked={store?.active ?? true} />
        Loja ativa
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Salvando..." : store ? "Salvar loja" : "Criar loja"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  hint,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-ink-soft">{label}</span>
      <input name={name} defaultValue={defaultValue} required={required} className={fieldClass} />
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
      {error ? <p className="mt-1 text-sm text-bronze-deep">{error}</p> : null}
    </label>
  );
}
