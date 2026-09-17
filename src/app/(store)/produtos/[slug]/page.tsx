import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/store/views/ProductDetailView";
import { getDefaultStore, getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getDefaultStore();
  const product = await getProductBySlug(store.id, slug);
  if (!product) return { title: "Material não encontrado" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${site.url}/produtos/${product.slug}`,
      type: "website",
      images: [{ url: product.coverImage }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const store = await getDefaultStore();
  const product = await getProductBySlug(store.id, slug);
  if (!product) notFound();

  const related = await getRelatedProducts(store.id, product.id, product.categoryId);
  return <ProductDetailView store={store} product={product} related={related} />;
}
