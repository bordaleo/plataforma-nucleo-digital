import { TermsView } from "@/components/store/views/LegalViews";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandTermsPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const store = await requirePublicStore((await params).storeSlug);
  return <TermsView store={store} />;
}
