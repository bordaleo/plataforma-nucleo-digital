import Link from "next/link";
import { ProductCard } from "@/components/store/ProductCard";
import { Container } from "@/components/ui/Container";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { Category, Product } from "@prisma/client";

type ProductRow = Product & { category: Category };
type CategoryRow = Category & { products: ProductRow[] };

export function CategoryDetailView({ store, category }: { store: StoreProfile; category: CategoryRow }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-sm text-muted">
          <Link href={storeHref(store.slug, "/categorias")} className="hover:text-ink">
            Categorias
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-5xl text-ink">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">{category.description}</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} storeSlug={store.slug} />
          ))}
        </div>
        {category.products.length === 0 ? (
          <p className="mt-8 text-ink-soft">Ainda não há materiais ativos nesta categoria.</p>
        ) : null}
      </Container>
    </section>
  );
}
