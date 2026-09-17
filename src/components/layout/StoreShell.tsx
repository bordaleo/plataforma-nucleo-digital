import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { storeThemeClass, storeThemeStyle, type StoreProfile } from "@/lib/store";

export function StoreShell({ store, children }: { store: StoreProfile; children: ReactNode }) {
  return (
    <div className={`flex min-h-full flex-col ${storeThemeClass(store)}`} style={storeThemeStyle(store)}>
      <Header store={store} />
      <main className="flex-1">{children}</main>
      <Footer store={store} />
    </div>
  );
}
