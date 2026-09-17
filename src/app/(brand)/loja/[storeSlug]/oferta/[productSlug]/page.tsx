import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferLanding } from "@/components/offer/OfferLanding";
import { getOfferLanding, getStoreBySlug } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";
import { site } from "@/lib/site";
import { offerHref } from "@/lib/offer";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ storeSlug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storeSlug, productSlug } = await params;
  const store = await getStoreBySlug(storeSlug);
  if (!store) return { title: "Oferta não encontrada" };
  const data = await getOfferLanding(store.id, productSlug);
  if (!data?.offer) return { title: "Oferta não encontrada" };

  return {
    title: data.offer.headline,
    description: data.offer.subheadline,
    openGraph: {
      title: data.product.name,
      description: data.offer.subheadline,
      url: `${site.url}${offerHref(store.slug, data.product.slug)}`,
      type: "website",
      images: [{ url: data.product.coverImage }],
    },
  };
}

export default async function OfferPage({ params }: PageProps) {
  const { storeSlug, productSlug } = await params;
  const store = await requirePublicStore(storeSlug);
  const data = await getOfferLanding(store.id, productSlug);
  if (!data?.offer) notFound();
  return <OfferLanding store={store} product={data.product} offer={data.offer} />;
}
