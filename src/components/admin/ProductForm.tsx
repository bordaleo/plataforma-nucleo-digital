"use client";

import type { Category, Product } from "@prisma/client";
import { useActionState } from "react";
import { createProductAction, updateProductAction, type ProductFormState } from "@/lib/actions/product";
import { formatPrice } from "@/lib/format";
import { faqToFormValue } from "@/lib/validations/product";

const fieldClass = "h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2";
const areaClass = "w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2";

function centsToInput(cents?: number | null) {
  if (cents == null) return "";
  return formatPrice(cents).replace("R$", "").trim();
}

export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const action = product
    ? updateProductAction.bind(null, product.id)
    : createProductAction;
  const [state, formAction, pending] = useActionState(action, {} as ProductFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      <Field label="Nome" name="name" error={state.errors?.name} defaultValue={product?.name} required />
      <Field label="Slug" name="slug" error={state.errors?.slug} defaultValue={product?.slug} hint="Deixe em branco para gerar a partir do nome." />
      <Field
        label="Descrição curta"
        name="shortDescription"
        error={state.errors?.shortDescription}
        defaultValue={product?.shortDescription}
        required
      />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Descrição completa</span>
        <textarea name="description" rows={7} required defaultValue={product?.description} className={areaClass} />
        {state.errors?.description ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.description}</p> : null}
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Preço (R$)"
          name="price"
          error={state.errors?.price}
          defaultValue={centsToInput(product?.priceCents)}
          required
        />
        <Field
          label="Preço promocional (R$)"
          name="promotionalPrice"
          error={state.errors?.promotionalPrice}
          defaultValue={centsToInput(product?.promotionalPriceCents)}
        />
      </div>
      <Field
        label="Imagem de capa"
        name="coverImage"
        error={state.errors?.coverImage}
        defaultValue={product?.coverImage}
        hint="Caminho local (/covers/arquivo.svg) ou URL https."
        required
      />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Categoria</span>
        <select name="categoryId" required defaultValue={product?.categoryId} className={fieldClass}>
          <option value="">Selecione</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {state.errors?.categoryId ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.categoryId}</p> : null}
      </label>
      <Field label="Tags" name="tags" defaultValue={product?.tags.join(", ")} hint="Separadas por vírgula." />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Informações do produto</span>
        <textarea name="details" rows={3} defaultValue={product?.details ?? ""} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Benefícios</span>
        <textarea name="benefits" rows={4} defaultValue={product?.benefits.join("\n")} className={areaClass} />
        <span className="mt-1 block text-xs text-muted">Um item por linha.</span>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Conteúdo incluído</span>
        <textarea name="contents" rows={4} defaultValue={product?.contents.join("\n")} className={areaClass} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Para quem é</span>
        <textarea name="audience" rows={4} required defaultValue={product?.audience} className={areaClass} />
        {state.errors?.audience ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.audience}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">FAQ do produto</span>
        <textarea name="faq" rows={6} defaultValue={faqToFormValue(product?.faq)} className={areaClass} />
        <span className="mt-1 block text-xs text-muted">
          Uma pergunta por bloco. Primeira linha: pergunta. Demais linhas: resposta. Separe blocos com linha em branco.
        </span>
      </label>
      <Field
        label="Checkout da Kiwify"
        name="kiwifyCheckoutUrl"
        error={state.errors?.kiwifyCheckoutUrl}
        defaultValue={product?.kiwifyCheckoutUrl}
        required
      />
      <Field
        label="ID do produto na Kiwify"
        name="kiwifyProductId"
        defaultValue={product?.kiwifyProductId ?? ""}
        hint="Opcional. Preencha quando o mapeamento real do webhook estiver definido."
      />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Status</span>
        <select name="status" defaultValue={product?.status ?? "ACTIVE"} className={fieldClass}>
          <option value="ACTIVE">Ativo</option>
          <option value="INACTIVE">Inativo</option>
        </select>
      </label>
      <label className="flex items-center gap-3 text-sm text-ink-soft">
        <input type="checkbox" name="featured" defaultChecked={product?.featured} />
        Destacar na página inicial
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Salvando..." : product ? "Salvar alterações" : "Criar produto"}
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
