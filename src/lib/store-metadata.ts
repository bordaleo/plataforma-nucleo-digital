import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { StoreProfile } from "@/lib/store";

export function buildStoreMetadata(store: StoreProfile): Metadata {
  return {
    title: {
      default: store.tagline ? `${store.name} — ${store.tagline}` : store.name,
      template: `%s · ${store.name}`,
    },
    description: store.description,
    icons: store.favicon ? { icon: store.favicon } : undefined,
    openGraph: {
      title: store.name,
      description: store.description,
      url: store.domain ? `https://${store.domain.replace(/^https?:\/\//, "")}` : site.url,
      siteName: store.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}
