import Link from "next/link";
import { FaqList } from "@/components/store/FaqList";
import { ProductCard } from "@/components/store/ProductCard";
import { Container } from "@/components/ui/Container";
import { getStorefrontCopy } from "@/lib/content/storefront";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { Category, Product } from "@prisma/client";

type Featured = Product & { category: Category };
type CategoryRow = Category & { _count: { products: number } };

export function HomeView({
  store,
  featured,
  categories,
}: {
  store: StoreProfile;
  featured: Featured[];
  categories: CategoryRow[];
}) {
  const copy = getStorefrontCopy(store);
  const theme = store.themeStyle;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        {theme === "modern" ? (
          <div className="ledger-grid absolute inset-0" />
        ) : theme === "energy" ? (
          <div className="motion-grain absolute inset-0" />
        ) : (
          <div className="paper-grid absolute inset-0 opacity-70" />
        )}
        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-bronze">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
              {copy.headline}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{copy.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={storeHref(store.slug, "/produtos")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm text-cream"
              >
                {copy.primaryCta}
              </Link>
              <Link
                href={storeHref(store.slug, "/sobre")}
                className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm text-ink"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>
          {copy.quote ? (
            <blockquote className="border-l border-bronze/50 pl-6">
              <p className="font-serif text-2xl leading-snug text-ink-soft sm:text-3xl">“{copy.quote}”</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">{copy.quoteRef}</footer>
            </blockquote>
          ) : theme === "modern" ? (
            <div className="border border-line bg-cream p-6 shadow-[8px_8px_0_0_var(--forest)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Nicho</p>
              <p className="mt-3 font-serif text-3xl text-ink">{store.niche}</p>
              <div className="mt-6 space-y-2 text-sm text-ink-soft">
                <p className="flex justify-between border-b border-line pb-2"><span>Registro</span><span>mensal</span></p>
                <p className="flex justify-between border-b border-line pb-2"><span>Formato</span><span>digital</span></p>
                <p className="flex justify-between"><span>Checkout</span><span>Kiwify</span></p>
              </div>
            </div>
          ) : theme === "energy" ? (
            <div className="relative overflow-hidden bg-forest p-8 text-cream">
              <div className="absolute -right-8 -top-8 h-28 w-28 rotate-12 border border-cream/20" />
              <div className="absolute -bottom-10 left-10 h-20 w-20 -rotate-6 border border-bronze/50" />
              <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Nicho</p>
              <p className="mt-3 font-serif text-4xl">{store.niche}</p>
              <p className="mt-5 max-w-xs text-sm text-cream/70">Materiais para registrar movimento e hábitos — sem protocolo.</p>
            </div>
          ) : (
            <div className="border-l border-bronze/50 pl-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Nicho</p>
              <p className="mt-3 font-serif text-3xl text-ink">{store.niche}</p>
            </div>
          )}
        </Container>
      </section>

      <section className="border-b border-line py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">A proposta</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">{copy.proposalTitle}</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft">
            {copy.proposal.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Em destaque</p>
              <h2 className="mt-3 font-serif text-4xl text-ink">{copy.featuredTitle}</h2>
            </div>
            <Link
              href={storeHref(store.slug, "/produtos")}
              className="hidden text-sm text-bronze-deep underline-offset-4 hover:underline sm:inline"
            >
              Ver catálogo
            </Link>
          </div>
          {featured.length === 0 ? (
            <p className="text-ink-soft">Em breve, novos materiais.</p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} storeSlug={store.slug} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-line bg-cream py-20">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Categorias</p>
          <h2 className="mt-3 font-serif text-4xl text-ink">{copy.categoriesTitle}</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={storeHref(store.slug, `/categorias/${category.slug}`)}
                  className="flex items-baseline justify-between gap-6 py-5 transition hover:text-forest"
                >
                  <span className="font-serif text-2xl sm:text-3xl">{category.name}</span>
                  <span className="text-sm text-muted">{category._count.products} materiais</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Por que comprar aqui</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl text-ink">{copy.benefitsTitle}</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {copy.benefits.map((benefit, index) => (
              <article key={benefit.title} className="border-t border-line pt-6">
                <p className="text-xs text-bronze">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{benefit.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {copy.showTestimonials ? (
        <section className="bg-forest py-20 text-cream">
          <Container>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Depoimentos</p>
            <h2 className="mt-3 font-serif text-4xl">Quem já recebeu os materiais</h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {copy.testimonials.map((item) => (
                <figure key={item.name} className="border-t border-cream/15 pt-6">
                  <blockquote className="font-serif text-2xl leading-snug text-cream/90">“{item.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm text-cream/65">
                    {item.name}
                    <span className="block text-xs uppercase tracking-[0.16em] text-cream/45">{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Dúvidas</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">Perguntas frequentes</h2>
            <Link
              href={storeHref(store.slug, "/faq")}
              className="mt-6 inline-block text-sm text-bronze-deep underline-offset-4 hover:underline"
            >
              Ver FAQ completo
            </Link>
          </div>
          <FaqList items={copy.faq} />
        </Container>
      </section>

      <section className="border-t border-line bg-parchment-deep/50 py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="font-serif text-4xl text-ink sm:text-5xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">{copy.ctaText}</p>
          <Link
            href={storeHref(store.slug, "/produtos")}
            className="mt-8 inline-flex h-12 items-center rounded-full bg-forest px-7 text-sm text-cream"
          >
            Ir para o catálogo
          </Link>
        </Container>
      </section>
    </>
  );
}
