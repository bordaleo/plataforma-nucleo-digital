import { notFound } from "next/navigation";
import { getStoreBySlug } from "@/lib/queries";

export async function requirePublicStore(slug: string) {
  const store = await getStoreBySlug(slug);
  if (!store || !store.active) notFound();
  return store;
}
