import type { Category, Offer, Product } from "@prisma/client";
import Link from "next/link";
import { OfferCheckoutButton } from "@/components/offer/OfferCheckoutButton";
import { OfferCountdown } from "@/components/offer/OfferCountdown";
import { OfferPixel } from "@/components/offer/OfferPixel";
import { OfferStickyCta } from "@/components/offer/OfferStickyCta";
import { FaqList } from "@/components/store/FaqList";
import { CoverImage } from "@/components/ui/CoverImage";
import { formatPrice } from "@/lib/format";
import { getOfferState, type OfferState } from "@/lib/offer";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { ProductFaqItem } from "@/lib/validations/product";

type ProductRow = Product & { category: Category };

function asFaq(value: unknown): ProductFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ProductFaqItem => {
    return Boolean(item && typeof item === "object" && "question" in item && "answer" in item);
  });
}

function videoEmbed(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed${parsed.pathname}`;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

function Cta({
  offer,
  product,
  storeSlug,
  disabled,
  className,
}: {
  offer: Offer;
  product: Product;
  storeSlug: string;
  disabled?: boolean;
  className: string;
}) {
  if (disabled) {
    return (
      <Link href={storeHref(storeSlug, `/produtos/${product.slug}`)} className={`${className} opacity-70`}>
        Ver o material no catálogo
      </Link>
    );
  }
  return (
    <OfferCheckoutButton
      href={product.kiwifyCheckoutUrl}
      productId={product.id}
      offerId={offer.id}
      productName={product.name}
      value={offer.promotionalPriceCents / 100}
      label="Quero acessar agora"
      className={className}
    />
  );
}

export function OfferLanding({
  store,
  product,
  offer,
}: {
  store: StoreProfile;
  product: ProductRow;
  offer: Offer;
}) {
  const state: OfferState = getOfferState(offer);
  const unavailable = state.expired && offer.expiredBehavior === "unavailable";
  const showCountdown = !offer.demo && state.live;
  const showDemoClock = offer.demo && !state.expired;
  const discount = state.discountPercent;
  const heroImage = product.mockupImages[0] || product.coverImage;
  const gallery = [...product.mockupImages, ...product.galleryImages].filter(Boolean);
  const uniqueGallery = Array.from(new Set(gallery.length > 0 ? gallery : [product.coverImage]));
  const faq = asFaq(product.faq);
  const embed = product.videoUrl ? videoEmbed(product.videoUrl) : null;
  const sticky = (offer.stickyCtaEnabled && product.stickyCtaEnabled) && !unavailable;
  const ctaClass =
    "inline-flex h-12 w-full items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream sm:w-auto";

  return (
    <div className="flex min-h-full flex-col bg-parchment pb-24 text-ink md:pb-0">
      <OfferPixel
        payload={{
          content_ids: [product.id],
          content_type: "product",
          content_name: product.name,
          value: offer.promotionalPriceCents / 100,
          currency: "BRL",
        }}
      />

      {offer.demo ? (
        <div className="bg-ink px-4 py-2 text-center text-[11px] uppercase tracking-[0.16em] text-cream">
          Página de demonstração · preços e prazo são dados de exemplo
        </div>
      ) : null}

      {showCountdown || showDemoClock ? (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-forest px-4 py-2.5 text-cream">
          <p className="text-[11px] uppercase tracking-[0.18em]">{offer.badge}</p>
          {offer.barText ? <p className="text-xs text-cream/80">{offer.barText}</p> : null}
          <OfferCountdown endsAt={offer.endsAt.toISOString()} />
        </div>
      ) : null}

      <header className="border-b border-line/70 bg-parchment/90 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href={storeHref(store.slug, "/")} className="font-serif text-xl text-ink">
            {store.name}
          </Link>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{product.category.name}</p>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">{offer.badge}</p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.08] text-ink sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-xl leading-snug text-ink">{offer.headline}</p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{offer.subheadline}</p>
            <div className="mt-6">
              {discount > 0 ? (
                <p className="text-xs uppercase tracking-[0.16em] text-bronze">{discount}% off · valores da oferta</p>
              ) : null}
              <p className="mt-2 flex flex-wrap items-end gap-3">
                <span className="text-sm text-muted line-through">{formatPrice(offer.originalPriceCents)}</span>
                <span className="font-serif text-4xl text-ink">{formatPrice(offer.promotionalPriceCents)}</span>
              </p>
            </div>
            <div className="mt-6 max-w-md">
              <Cta offer={offer} product={product} storeSlug={store.slug} disabled={unavailable} className={ctaClass} />
              <p className="mt-3 text-xs text-muted">Pagamento seguro pelo checkout da Kiwify.</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-parchment-deep">
            <CoverImage src={heroImage} alt={product.name} priority sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      {product.contents.length > 0 ? (
        <section className="border-y border-line bg-cream px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl text-ink">O que você vai receber</h2>
            <ul className="mt-6 grid gap-3">
              {product.contents.map((item) => (
                <li key={item} className="border border-line bg-parchment px-4 py-3 text-sm text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {product.benefits.length > 0 ? (
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl text-ink">Por que este material foi criado?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.benefits.map((item) => (
                <article key={item} className="border border-line bg-cream p-5">
                  <p className="text-sm leading-relaxed text-ink-soft">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {product.audiencePoints.length > 0 || product.notFor.length > 0 ? (
        <section className="border-y border-line bg-cream px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {product.audiencePoints.length > 0 ? (
              <div>
                <h2 className="font-serif text-3xl text-ink">Este material é para você se...</h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                  {product.audiencePoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {product.notFor.length > 0 ? (
              <div>
                <h2 className="font-serif text-3xl text-ink">Talvez não seja para você se...</h2>
                <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                  {product.notFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl text-ink">Veja por dentro</h2>
          {embed ? (
            <div className="mt-6 aspect-video overflow-hidden bg-ink">
              <iframe
                src={embed}
                title={`Prévia de ${product.name}`}
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {uniqueGallery.map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-parchment-deep">
                <CoverImage src={src} alt="" sizes="(min-width: 640px) 30vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-forest px-4 py-12 text-cream sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-bronze">{offer.badge}</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{offer.headline}</h2>
          <p className="mt-4 text-sm text-cream/75">{offer.subheadline}</p>
          {product.contents.length > 0 ? (
            <ul className="mt-6 space-y-2 text-left text-sm text-cream/80">
              {product.contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <p className="mt-6 text-sm text-cream/55 line-through">{formatPrice(offer.originalPriceCents)}</p>
          <p className="font-serif text-5xl">{formatPrice(offer.promotionalPriceCents)}</p>
          {discount > 0 ? <p className="mt-2 text-xs uppercase tracking-[0.16em] text-bronze">{discount}% off</p> : null}
          <div className="mt-6">
            <Cta
              offer={offer}
              product={product}
              storeSlug={store.slug}
              disabled={unavailable}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-cream px-6 text-sm font-semibold text-forest"
            />
          </div>
          {offer.guaranteeEnabled && offer.guaranteeText ? (
            <p className="mt-5 text-sm text-cream/75">
              {offer.guaranteeDays ? `${offer.guaranteeDays} dias de garantia. ` : null}
              {offer.guaranteeText}
            </p>
          ) : null}
        </div>
      </section>

      {faq.length > 0 ? (
        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl text-ink">Perguntas frequentes</h2>
            <div className="mt-6">
              <FaqList items={faq} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line px-4 py-12 text-center sm:px-6">
        <div className="mx-auto max-w-md">
          <h2 className="font-serif text-3xl text-ink">Pronto para acessar?</h2>
          <p className="mt-3 text-sm text-ink-soft">{formatPrice(offer.promotionalPriceCents)} · checkout na Kiwify</p>
          <div className="mt-6">
            <Cta offer={offer} product={product} storeSlug={store.slug} disabled={unavailable} className={ctaClass} />
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-line px-4 py-6 text-center text-xs text-muted">
        <p>
          {store.name} · Pagamentos processados pela Kiwify.
        </p>
        <p className="mt-2">
          <Link href={storeHref(store.slug, "/termos")} className="hover:text-ink">
            Termos
          </Link>
          <span className="px-2">·</span>
          <Link href={storeHref(store.slug, "/privacidade")} className="hover:text-ink">
            Privacidade
          </Link>
        </p>
      </footer>

      {sticky ? (
        <OfferStickyCta
          priceCents={offer.promotionalPriceCents}
          checkoutUrl={product.kiwifyCheckoutUrl}
          productId={product.id}
          offerId={offer.id}
          productName={product.name}
        />
      ) : null}
    </div>
  );
}
