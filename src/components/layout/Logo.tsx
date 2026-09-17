import Link from "next/link";
import { semeiaStoreDefaults, storeHref, type StoreProfile } from "@/lib/store";

export function Logo({
  store = semeiaStoreDefaults,
  inverted = false,
}: {
  store?: StoreProfile;
  inverted?: boolean;
}) {
  return (
    <Link href={storeHref(store.slug, "/")} className="inline-flex items-center gap-2.5">
      {store.logo && store.logo !== "/logo.svg" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={store.logo} alt="" className="h-8 w-8 object-contain" />
      ) : (
        <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${inverted ? "border-parchment/40" : "border-bronze/50"}`}>
          <span className={`block h-3 w-3 rounded-full ${inverted ? "bg-parchment" : "bg-forest"}`} />
        </span>
      )}
      <span className={`font-serif text-2xl tracking-tight ${inverted ? "text-cream" : "text-ink"}`}>{store.name}</span>
    </Link>
  );
}
