import { FaqView } from "@/components/store/views/FaqView";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandFaqPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const store = await requirePublicStore((await params).storeSlug);
  return <FaqView store={store} />;
}
