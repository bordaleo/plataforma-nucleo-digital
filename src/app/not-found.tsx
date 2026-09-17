import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">404</p>
      <h1 className="mt-4 font-serif text-4xl text-ink">Esta página não foi encontrada.</h1>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-forest px-5 text-sm text-cream">
        Voltar ao início
      </Link>
    </div>
  );
}
