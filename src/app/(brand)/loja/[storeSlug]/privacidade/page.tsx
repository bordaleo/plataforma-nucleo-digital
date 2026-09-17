import { PrivacyView } from "@/components/store/views/LegalViews";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandPrivacyPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const store = await requirePublicStore((await params).storeSlug);
  return <PrivacyView store={store} />;
}
