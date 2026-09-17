import type { ReactNode } from "react";
import { StoreChrome } from "@/components/layout/StoreChrome";
import { storeThemeClass, storeThemeStyle, type StoreProfile } from "@/lib/store";

export function StoreShell({ store, children }: { store: StoreProfile; children: ReactNode }) {
  return (
    <div className={`flex min-h-full flex-col ${storeThemeClass(store)}`} style={storeThemeStyle(store)}>
      <StoreChrome store={store}>{children}</StoreChrome>
    </div>
  );
}
