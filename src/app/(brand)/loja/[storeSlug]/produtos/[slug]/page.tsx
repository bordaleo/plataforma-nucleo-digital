import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/store/views/ProductDetailView";
import { getProductBySlug, getRelatedProducts, getStoreBySlug } from "@/lib/queries";
import { requirePublicStore } from "@/lib/public-store";
import { site } from "@/lib/site";
import { storeHref } from "@/lib/store";

type PageProps = {
  params: Promise<{ storeSlug: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storeSlug, slug } = await params;
  const store = await getStoreBySlug(storeSlug);
  if (!store) return { title: "Material não encontrado" };
  const product = await getProductBySlug(store.id, slug);
  if (!product) return { title: "Material não encontrado" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${site.url}${storeHref(store.slug, `/produtos/${product.slug}`)}`,
      type: "website",
      images: [{ url: product.coverImage }],
    },
  };
}

export default async function BrandProductPage({ params }: PageProps) {
  const { storeSlug, slug } = await params;
  const store = await requirePublicStore(storeSlug);
  const product = await getProductBySlug(store.id, slug);
  if (!product) notFound();
  const related = await getRelatedProducts(store.id, product.id, product.categoryId);
  return <ProductDetailView store={store} product={product} related={related} />;
}
