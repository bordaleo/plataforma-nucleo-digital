"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/actions/auth";

export function LoginForm({ from }: { from?: string }) {
  const [state, action, pending] = useActionState(loginAction, {} as AuthState);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="from" value={from && from.startsWith("/admin") ? from : "/admin"} />
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">E-mail</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="h-12 w-full border border-line bg-cream px-4 outline-none ring-bronze/30 focus:ring-2"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-ink-soft">Senha</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-12 w-full border border-line bg-cream px-4 outline-none ring-bronze/30 focus:ring-2"
        />
      </label>
      {state.error ? <p className="text-sm text-bronze-deep">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-forest text-sm text-cream disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
