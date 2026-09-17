import type { Metadata } from "next";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 font-serif text-4xl text-ink">Área administrativa</h1>
        <p className="mt-3 text-sm text-ink-soft">Acesso restrito ao administrador da loja.</p>
        <div className="mt-8">
          <LoginForm from={from} />
        </div>
      </div>
    </div>
  );
}
