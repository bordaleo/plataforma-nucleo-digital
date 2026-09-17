import Link from "next/link";
import type { Category, Product } from "@prisma/client";
import { CoverImage } from "@/components/ui/CoverImage";
import { ProductPrice } from "@/components/store/ProductPrice";
import { storeHref } from "@/lib/store";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({
  product,
  storeSlug,
}: {
  product: ProductWithCategory;
  storeSlug: string;
}) {
  const href = storeHref(storeSlug, `/produtos/${product.slug}`);

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-parchment-deep">
          <CoverImage src={product.coverImage} alt={product.name} className="transition duration-500 group-hover:scale-[1.03]" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 pt-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">{product.category.name}</p>
        <h3 className="font-serif text-2xl leading-tight text-ink">
          <Link href={href} className="hover:text-forest">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>
        <div className="mt-auto pt-2">
          <ProductPrice priceCents={product.priceCents} promotionalPriceCents={product.promotionalPriceCents} size="sm" />
        </div>
      </div>
    </article>
  );
}
