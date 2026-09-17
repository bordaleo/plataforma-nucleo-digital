import Link from "next/link";
import { notFound } from "next/navigation";
import { OfferForm, SalesContentForm } from "@/components/admin/OfferForm";
import { getAdminProduct } from "@/lib/queries";
import { offerHref } from "@/lib/offer";

export default async function AdminOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();
  const offer = product.offers.find((item) => item.active) ?? product.offers[0];

  return (
    <div className="max-w-2xl">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Produto → Oferta</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{product.name}</h1>
      <p className="mt-3 text-ink-soft">Landing de conversão em {offerHref(product.store.slug, product.slug)}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href={`/admin/produtos/${product.id}`} className="text-ink-soft hover:text-ink">
          Voltar ao produto
        </Link>
        <Link href={offerHref(product.store.slug, product.slug)} className="text-bronze hover:text-bronze-deep" target="_blank">
          Ver landing
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">Oferta</h2>
        <p className="mt-2 text-sm text-ink-soft">O preço-base do produto no catálogo não muda. Só a landing de oferta usa estes valores.</p>
        <div className="mt-6">
          <OfferForm product={product} offer={offer} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-ink">Conteúdo da venda</h2>
        <p className="mt-2 text-sm text-ink-soft">Seções só aparecem na landing se tiverem conteúdo cadastrado.</p>
        <div className="mt-6">
          <SalesContentForm product={product} />
        </div>
      </section>
    </div>
  );
}
