import { redirect } from "next/navigation";

export default async function BrandProductAliasPage({
  params,
}: {
  params: Promise<{ storeSlug: string; productSlug: string }>;
}) {
  const { storeSlug, productSlug } = await params;
  redirect(`/loja/${storeSlug}/produtos/${productSlug}`);
}
