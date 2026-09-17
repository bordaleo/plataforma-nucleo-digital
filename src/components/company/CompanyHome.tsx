import Link from "next/link";
import type { Store } from "@prisma/client";
import { BrandCards } from "@/components/company/BrandCards";
import { CompanyHero } from "@/components/company/CompanyHero";
import { getBrandVisual } from "@/lib/brand-visual";
import type { CompanyProfile } from "@/lib/company";

type PublicStore = Pick<
  Store,
  | "id"
  | "name"
  | "slug"
  | "niche"
  | "description"
  | "logo"
  | "tagline"
  | "primaryColor"
  | "secondaryColor"
  | "backgroundColor"
  | "themeStyle"
>;

const steps = [
  { n: "01", title: "Criamos a marca", text: "Nome, nicho e identidade visual próprios — sem misturar públicos." },
  { n: "02", title: "Desenvolvemos os produtos", text: "Materiais digitais com catálogo, categorias e páginas de oferta." },
  { n: "03", title: "Construímos a experiência", text: "Cada loja tem vitrine, tom e navegação independentes." },
  { n: "04", title: "Operamos o catálogo", text: "A operação e o checkout na Kiwify ficam atrás da marca." },
];

const shared = ["Produto", "Checkout", "Operação", "Tecnologia"];

export function CompanyHome({
  company,
  stores,
}: {
  company: CompanyProfile;
  stores: PublicStore[];
}) {
  return (
    <>
      <CompanyHero company={company} stores={stores} />
      <BrandCards stores={stores} />

      <section className="border-b border-[#d8d0c4] bg-[#f3efe7]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d55]">Posicionamento</p>
              <h2 className="mt-3 font-serif text-4xl text-[#14120f] sm:text-5xl">Marcas independentes, operação em comum.</h2>
              <p className="mt-5 max-w-md text-[#5b5448]">
                A {company.name} fica acima das lojas. Cada marca fala com o seu público. Por trás, a mesma estrutura de
                catálogo, pedido e checkout.
              </p>
            </div>

            <div className="relative overflow-hidden border border-[#d8d0c4] bg-[#faf7f1] px-6 py-10 sm:px-10">
              <div className="company-dotgrid absolute inset-0 opacity-40" />
              <div className="relative text-center">
                <p className="inline-flex rounded-full border border-[#14120f] px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-[#14120f]">
                  {company.name}
                </p>
                <div className="mx-auto mt-5 h-10 w-px bg-[#cfc6b8]" />
                <div className="flex flex-wrap justify-center gap-3">
                  {stores.map((store) => {
                    const visual = getBrandVisual(store);
                    return (
                      <span
                        key={store.id}
                        className="min-w-[7.5rem] border px-4 py-3 text-center"
                        style={{ background: visual.surface, color: visual.ink, borderColor: visual.surface }}
                      >
                        <span className="block font-serif text-xl">{store.name}</span>
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.18em]" style={{ color: visual.muted }}>
                          {store.niche}
                        </span>
                      </span>
                    );
                  })}
                </div>
                <div className="mx-auto mt-6 h-10 w-px bg-[#cfc6b8]" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {shared.map((item) => (
                    <span key={item} className="border border-[#d8d0c4] bg-white px-3 py-3 text-[11px] uppercase tracking-[0.16em] text-[#5b5448]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="border-b border-[#d8d0c4] bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d55]">Como funciona</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl text-[#14120f]">Do nome da marca ao catálogo no ar.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.n}
                className="border border-[#ddd4c6] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#14120f]"
              >
                <p className="font-serif text-3xl text-[#8a7a5a]">{step.n}</p>
                <h3 className="mt-5 font-serif text-2xl text-[#14120f]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5b5448]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#14120f] text-[#f6f1e8]">
        <div className="absolute inset-0 opacity-30">
          <div className="company-dotgrid h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c4b49a]">Uma estrutura</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-6xl">Uma estrutura. Diferentes experiências.</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-6">
            {stores.map((store, index) => {
              const visual = getBrandVisual(store);
              const span = index === 0 ? "md:col-span-3 md:row-span-2 min-h-[280px]" : "md:col-span-3 min-h-[160px]";
              return (
                <Link
                  key={store.id}
                  href={`/loja/${store.slug}`}
                  className={`group relative overflow-hidden p-6 transition hover:brightness-110 ${span}`}
                  style={{ background: visual.surface, color: visual.ink }}
                >
                  <div className="absolute inset-0 opacity-70 transition duration-500 group-hover:scale-105">
                    <svg className="h-full w-full" viewBox="0 0 400 240" aria-hidden>
                      {visual.motif === "botanical" ? (
                        <path d="M300 20c70 40 90 110 40 190" fill="none" stroke={visual.accent} strokeOpacity="0.45" strokeWidth="40" />
                      ) : visual.motif === "ledger" ? (
                        <>
                          <line x1="20" y1="70" x2="380" y2="70" stroke={visual.ink} strokeOpacity="0.12" />
                          <line x1="20" y1="120" x2="380" y2="120" stroke={visual.ink} strokeOpacity="0.12" />
                          <line x1="20" y1="170" x2="380" y2="170" stroke={visual.ink} strokeOpacity="0.12" />
                        </>
                      ) : (
                        <path d="M0 200 160 20 240 160 400 40" fill="none" stroke={visual.accent} strokeWidth="16" />
                      )}
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: visual.muted }}>
                      {store.niche}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl sm:text-4xl">{store.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#f7f3ec]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d55]">Sobre</p>
            <h2 className="mt-3 font-serif text-4xl text-[#14120f]">A empresa por trás das lojas.</h2>
            <p className="mt-5 max-w-lg text-[#5b5448]">{company.description}</p>
          </div>
          <div className="border border-[#ddd4c6] bg-white p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a6d55]">Contato</p>
            <p className="mt-4 text-[#5b5448]">
              Para assuntos da empresa, use o e-mail institucional. Cada loja também tem o próprio canal de contato.
            </p>
            {company.email ? (
              <a href={`mailto:${company.email}`} className="mt-6 inline-block text-lg text-[#14120f] underline-offset-4 hover:underline">
                {company.email}
              </a>
            ) : (
              <p className="mt-6 text-[#7a6d55]">E-mail institucional ainda não cadastrado.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
