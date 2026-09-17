import Link from "next/link";
import type { ReactNode } from "react";
import type { CompanyProfile } from "@/lib/company";

export function CompanyShell({ company, children }: { company: CompanyProfile; children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-[#f3efe7] text-[#14120f]">
      <header className="sticky top-0 z-40 border-b border-[#d8d0c4]/80 bg-[#f3efe7]/88 backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            {company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logo} alt="" className="h-8 w-8 object-contain" />
            ) : (
              <span className="block h-2.5 w-2.5 rounded-full bg-[#14120f]" />
            )}
            <span className="font-serif text-2xl tracking-tight">{company.name}</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[#5b5448] md:flex">
            <a href="#marcas" className="transition hover:text-[#14120f]">
              Marcas
            </a>
            <a href="#sobre" className="transition hover:text-[#14120f]">
              Sobre
            </a>
            <a href="#contato" className="transition hover:text-[#14120f]">
              Contato
            </a>
          </nav>
          <a
            href="#marcas"
            className="inline-flex h-10 items-center rounded-full bg-[#14120f] px-4 text-sm text-[#f6f1e8] transition hover:-translate-y-0.5"
          >
            Conhecer marcas
          </a>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#d8d0c4] bg-[#14120f] text-[#f6f1e8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-3xl">{company.name}</p>
            <p className="mt-3 max-w-sm text-sm text-[#cfc6b8]">Marcas digitais, experiências independentes.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#c4b49a]">Navegar</p>
            <ul className="mt-4 space-y-2 text-sm text-[#ddd4c6]">
              <li>
                <a href="#marcas" className="hover:text-white">
                  Marcas
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl px-5 py-5 text-xs text-[#9d9486] sm:px-8">
            <p>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
