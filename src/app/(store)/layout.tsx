import type { ReactNode } from "react";
import { StoreShell } from "@/components/layout/StoreShell";
import { getDefaultStore } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const store = await getDefaultStore();
  return <StoreShell store={store}>{children}</StoreShell>;
}
