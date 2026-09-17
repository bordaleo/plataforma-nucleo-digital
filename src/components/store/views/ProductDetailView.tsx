import Link from "next/link";
import { FaqList } from "@/components/store/FaqList";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductPrice } from "@/components/store/ProductPrice";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { site } from "@/lib/site";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { ProductFaqItem } from "@/lib/validations/product";
import type { Category, Product } from "@prisma/client";

type ProductRow = Product & { category: Category };

function asFaq(value: unknown): ProductFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ProductFaqItem => {
    return Boolean(item && typeof item === "object" && "question" in item && "answer" in item);
  });
}

export function ProductDetailView({
  store,
  product,
  related,
}: {
  store: StoreProfile;
  product: ProductRow;
  related: ProductRow[];
}) {
  const faq = asFaq(product.faq);
  const offerPrice = ((product.promotionalPriceCents ?? product.priceCents) / 100).toFixed(2);
  const image = product.coverImage.startsWith("http") ? product.coverImage : `${site.url}${product.coverImage}`;
  const productUrl = `${site.url}${storeHref(store.slug, `/produtos/${product.slug}`)}`;

  return (
    <article className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            image,
            brand: store.name,
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              price: offerPrice,
              availability: "https://schema.org/InStock",
              url: productUrl,
            },
          }),
        }}
      />
      <Container>
        <p className="text-sm text-muted">
          <Link href={storeHref(store.slug, "/produtos")} className="hover:text-ink">
            Materiais
          </Link>
          <span className="px-2">/</span>
          <Link href={storeHref(store.slug, `/categorias/${product.category.slug}`)} className="hover:text-ink">
            {product.category.name}
          </Link>
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-parchment-deep">
            <CoverImage src={product.coverImage} alt={product.name} priority sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">{product.category.name}</p>
            <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{product.shortDescription}</p>
            <div className="mt-6">
              <ProductPrice
                priceCents={product.priceCents}
                promotionalPriceCents={product.promotionalPriceCents}
                size="lg"
              />
            </div>
            {product.details ? <p className="mt-3 text-sm text-muted">{product.details}</p> : null}
            <a
              href={product.kiwifyCheckoutUrl}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-forest px-7 text-sm text-cream"
            >
              Comprar agora
            </a>
            <p className="mt-3 text-xs text-muted">Você será direcionado ao checkout seguro da Kiwify.</p>
            {product.tags.length > 0 ? (
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">{product.tags.join(" · ")}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-3xl text-ink">Sobre este material</h2>
            <div className="mt-5 space-y-4 whitespace-pre-line text-ink-soft">{product.description}</div>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-ink">Para quem é</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{product.audience}</p>
          </section>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-3xl text-ink">Benefícios</h2>
            <ul className="mt-5 space-y-3 text-ink-soft">
              {product.benefits.map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-ink">O que está incluído</h2>
            <ul className="mt-5 space-y-3 text-ink-soft">
              {product.contents.map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {faq.length > 0 ? (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-3xl text-ink">Dúvidas sobre este material</h2>
            <FaqList items={faq} />
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-serif text-3xl text-ink">Outros materiais desta categoria</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} storeSlug={store.slug} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </article>
  );
}
