import type { MetadataRoute } from "next";
import { getActiveCategories, getActiveProducts, getActiveStores } from "@/lib/queries";
import { site } from "@/lib/site";
import { DEFAULT_STORE_SLUG, storeHref } from "@/lib/store";

const institutional = ["/sobre", "/faq", "/contato", "/termos", "/privacidade"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await getActiveStores();
  const entries: MetadataRoute.Sitemap = [{ url: site.url, lastModified: new Date() }];

  for (const store of stores) {
    const [products, categories] = await Promise.all([
      getActiveProducts(store.id),
      getActiveCategories(store.id),
    ]);

    entries.push({
      url: `${site.url}/loja/${store.slug}`,
      lastModified: store.updatedAt,
    });

    const pages = ["/produtos", "/categorias", ...institutional];
    for (const path of pages) {
      entries.push({
        url: `${site.url}${storeHref(store.slug, path)}`,
        lastModified: store.updatedAt,
      });
    }

    if (store.slug === DEFAULT_STORE_SLUG) {
      for (const path of pages) {
        entries.push({
          url: `${site.url}${path}`,
          lastModified: store.updatedAt,
        });
      }
    }

    for (const category of categories) {
      entries.push({
        url: `${site.url}${storeHref(store.slug, `/categorias/${category.slug}`)}`,
        lastModified: category.updatedAt,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${site.url}${storeHref(store.slug, `/produtos/${product.slug}`)}`,
        lastModified: product.updatedAt,
      });
    }
  }

  return entries;
}
