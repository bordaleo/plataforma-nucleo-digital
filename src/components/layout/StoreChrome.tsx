"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { StoreProfile } from "@/lib/store";

export function StoreChrome({ store, children }: { store: StoreProfile; children: ReactNode }) {
  const pathname = usePathname();
  const isOffer = pathname.includes("/oferta/");

  if (isOffer) return <>{children}</>;

  return (
    <>
      <Header store={store} />
      <main className="flex-1">{children}</main>
      <Footer store={store} />
    </>
  );
}
