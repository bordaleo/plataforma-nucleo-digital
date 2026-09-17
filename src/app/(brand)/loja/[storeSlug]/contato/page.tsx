import { ContactView } from "@/components/store/views/ContactView";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandContactPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const store = await requirePublicStore((await params).storeSlug);
  return <ContactView store={store} />;
}
