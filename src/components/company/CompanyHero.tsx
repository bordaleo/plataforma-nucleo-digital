"use client";

import Link from "next/link";
import type { Store } from "@prisma/client";
import { getBrandVisual } from "@/lib/brand-visual";
import { BrandMotif } from "@/components/company/BrandMotif";
import type { CompanyProfile } from "@/lib/company";

type HeroStore = Pick<Store, "id" | "name" | "slug" | "niche" | "primaryColor" | "secondaryColor" | "backgroundColor" | "themeStyle">;

export function CompanyHero({ company, stores }: { company: CompanyProfile; stores: HeroStore[] }) {
  return (
    <section className="relative overflow-hidden border-b border-[#d8d0c4]">
      <div className="company-grain absolute inset-0" />
      <div className="company-dotgrid absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="company-rise">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6d55]">{company.name} digital</p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.04] text-[#14120f] sm:text-6xl lg:text-[4.4rem]">
            Marcas digitais criadas para diferentes públicos.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#5b5448]">
            Criamos, desenvolvemos e operamos marcas independentes de produtos digitais — cada uma com sua própria
            identidade, catálogo e experiência.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#marcas"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#14120f] px-6 text-sm text-[#f6f1e8] transition hover:-translate-y-0.5"
            >
              Conhecer marcas
            </a>
            <a
              href="#sobre"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#cfc6b8] px-6 text-sm text-[#14120f] transition hover:border-[#14120f]"
            >
              Como a {company.name} opera
            </a>
          </div>
        </div>

        <div className="relative min-h-[360px] company-rise" style={{ animationDelay: "120ms" }}>
          <div className="absolute left-1/2 top-6 hidden h-[78%] w-px -translate-x-1/2 bg-[#cfc6b8] lg:block" />
          <div className="relative mx-auto grid max-w-md gap-4">
            {stores.map((store, index) => {
              const visual = getBrandVisual(store);
              return (
                <Link
                  key={store.id}
                  href={`/loja/${store.slug}`}
                  className="company-float group relative overflow-hidden rounded-[1.4rem] border border-white/10 p-5 shadow-[0_18px_50px_-28px_rgba(20,18,15,0.7)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-22px_rgba(20,18,15,0.55)]"
                  style={{
                    background: visual.surface,
                    color: visual.ink,
                    marginLeft: index === 1 ? "12%" : index === 2 ? "4%" : "0",
                    marginRight: index === 0 ? "10%" : "0",
                    animationDelay: `${index * 0.35}s`,
                  }}
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-36 opacity-80 transition duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    <BrandMotif motif={visual.motif} accent={visual.accent} ink={visual.ink} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: visual.muted }}>
                    {store.niche}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl">{store.name}</h2>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
