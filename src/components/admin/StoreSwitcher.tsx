"use client";

import type { Store } from "@prisma/client";
import { selectStoreAction } from "@/lib/actions/store";

export function StoreSwitcher({
  stores,
  selectedId,
}: {
  stores: Pick<Store, "id" | "name" | "slug" | "active">[];
  selectedId: string;
}) {
  return (
    <form action={selectStoreAction}>
      <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">Loja atual</label>
      <select
        name="storeId"
        defaultValue={selectedId}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="mt-2 h-10 w-full border border-line bg-cream px-3 text-sm text-ink"
      >
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
            {store.active ? "" : " (inativa)"}
          </option>
        ))}
      </select>
    </form>
  );
}
