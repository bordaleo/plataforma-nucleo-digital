"use client";

import type { Category } from "@prisma/client";
import { useActionState } from "react";
import { createCategoryAction, updateCategoryAction, type CategoryFormState } from "@/lib/actions/category";

const fieldClass = "h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2";
const areaClass = "w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2";

export function CategoryForm({ category }: { category?: Category }) {
  const action = category ? updateCategoryAction.bind(null, category.id) : createCategoryAction;
  const [state, formAction, pending] = useActionState(action, {} as CategoryFormState);

  return (
    <form action={formAction} className="grid gap-6">
      {state.message ? <p className="text-sm text-sage">{state.message}</p> : null}
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Nome</span>
        <input name="name" required defaultValue={category?.name} className={fieldClass} />
        {state.errors?.name ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.name}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Slug</span>
        <input name="slug" defaultValue={category?.slug} className={fieldClass} />
        {state.errors?.slug ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.slug}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Descrição</span>
        <textarea name="description" rows={4} required defaultValue={category?.description} className={areaClass} />
        {state.errors?.description ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.description}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Imagem</span>
        <input name="image" defaultValue={category?.image ?? ""} className={fieldClass} />
        {state.errors?.image ? <p className="mt-1 text-sm text-bronze-deep">{state.errors.image}</p> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Salvando..." : category ? "Salvar categoria" : "Criar categoria"}
      </button>
    </form>
  );
}
