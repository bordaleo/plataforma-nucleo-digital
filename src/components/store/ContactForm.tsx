"use client";

import { useActionState } from "react";
import { contactAction, type ContactState } from "@/lib/actions/contact";

const initial: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(contactAction, initial);

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Nome</span>
        <input
          name="name"
          required
          className="h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2"
        />
        {state.fieldErrors?.name ? <p className="mt-1 text-sm text-bronze-deep">{state.fieldErrors.name}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">E-mail</span>
        <input
          name="email"
          type="email"
          required
          className="h-12 w-full border border-line bg-cream px-4 text-ink outline-none ring-bronze/30 focus:ring-2"
        />
        {state.fieldErrors?.email ? <p className="mt-1 text-sm text-bronze-deep">{state.fieldErrors.email}</p> : null}
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Mensagem</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full border border-line bg-cream px-4 py-3 text-ink outline-none ring-bronze/30 focus:ring-2"
        />
        {state.fieldErrors?.message ? <p className="mt-1 text-sm text-bronze-deep">{state.fieldErrors.message}</p> : null}
      </label>
      {state.error ? <p className="text-sm text-bronze-deep">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-sage">{state.success}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
