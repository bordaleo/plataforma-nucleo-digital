import { AboutView } from "@/components/store/views/AboutView";
import { requirePublicStore } from "@/lib/public-store";

export default async function BrandAboutPage({ params }: { params: Promise<{ storeSlug: string }> }) {
  const store = await requirePublicStore((await params).storeSlug);
  return <AboutView store={store} />;
}
