import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { StoreShell } from "@/components/layout/StoreShell";
import { getStoreBySlug } from "@/lib/queries";
import { buildStoreMetadata } from "@/lib/store-metadata";

export const dynamic = "force-dynamic";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ storeSlug: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { storeSlug } = await params;
  const store = await getStoreBySlug(storeSlug);
  if (!store || !store.active) return { title: "Loja não encontrada" };
  return buildStoreMetadata(store);
}

export default async function BrandStoreLayout({ children, params }: LayoutProps) {
  const { storeSlug } = await params;
  const store = await getStoreBySlug(storeSlug);
  if (!store || !store.active) notFound();
  return <StoreShell store={store}>{children}</StoreShell>;
}
