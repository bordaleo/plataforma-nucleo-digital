import { cookies } from "next/headers";
import { getDefaultStore, getStoreById } from "@/lib/queries";
import { ADMIN_STORE_COOKIE, type StoreProfile } from "@/lib/store";

export async function getSelectedAdminStore(): Promise<StoreProfile> {
  const store = await cookies();
  const selectedId = store.get(ADMIN_STORE_COOKIE)?.value;
  if (selectedId) {
    const found = await getStoreById(selectedId);
    if (found) return found;
  }
  return getDefaultStore();
}
