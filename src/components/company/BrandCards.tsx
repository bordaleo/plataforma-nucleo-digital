"use client";

import Link from "next/link";
import type { Store } from "@prisma/client";
import { BrandMotif } from "@/components/company/BrandMotif";
import { getBrandVisual } from "@/lib/brand-visual";

type BrandStore = Pick<
  Store,
  "id" | "name" | "slug" | "niche" | "description" | "logo" | "tagline" | "primaryColor" | "secondaryColor" | "backgroundColor" | "themeStyle"
>;

export function BrandCards({ stores }: { stores: BrandStore[] }) {
  return (
    <section id="marcas" className="border-b border-[#d8d0c4] bg-[#f7f3ec]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d55]">Portfólio</p>
          <h2 className="mt-3 font-serif text-4xl text-[#14120f] sm:text-5xl">Nossas marcas</h2>
          <p className="mt-4 text-[#5b5448]">
            Cada loja tem identidade, catálogo e checkout próprios. Escolha o universo que você procura.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stores.map((store, index) => {
            const visual = getBrandVisual(store);
            return (
              <article
                key={store.id}
                className="group flex flex-col overflow-hidden border border-[#ddd4c6] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-32px_rgba(20,18,15,0.55)]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-52 overflow-hidden" style={{ background: visual.surface, color: visual.ink }}>
                  <div className="absolute inset-0 opacity-90 transition duration-500 group-hover:scale-[1.04]">
                    <BrandMotif motif={visual.motif} accent={visual.accent} ink={visual.ink} />
                  </div>
                  <div className="relative flex h-full items-end justify-between p-5">
                    <div>
                      {store.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={store.logo} alt="" className="mb-3 h-9 w-9 object-contain" />
                      ) : (
                        <span
                          className="mb-3 flex h-9 w-9 items-center justify-center text-sm"
                          style={{ border: `1px solid ${visual.ink}33`, color: visual.ink }}
                        >
                          {store.name.slice(0, 1)}
                        </span>
                      )}
                      <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: visual.muted }}>
                        {store.niche}
                      </p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: visual.accent }}>
                      0{index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6" style={{ background: visual.panel }}>
                  <h3 className="font-serif text-3xl text-[#14120f]">{store.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5b5448]">
                    {store.tagline || store.description}
                  </p>
                  <Link
                    href={`/loja/${store.slug}`}
                    className="mt-8 inline-flex h-11 items-center justify-center self-start rounded-full px-5 text-sm text-white transition group-hover:translate-x-0.5"
                    style={{ background: visual.surface }}
                  >
                    Conhecer marca
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {stores.length === 0 ? <p className="mt-10 text-[#7a6d55]">Nenhuma marca ativa no momento.</p> : null}
      </div>
    </section>
  );
}
