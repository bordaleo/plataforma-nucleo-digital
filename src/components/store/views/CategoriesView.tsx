import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { Category } from "@prisma/client";

type CategoryRow = Category & { _count: { products: number } };

export function CategoriesView({ store, categories }: { store: StoreProfile; categories: CategoryRow[] }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Explorar</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Categorias</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Cada loja organiza o próprio catálogo. Aqui estão apenas as categorias de {store.name}.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={storeHref(store.slug, `/categorias/${category.slug}`)} className="group block">
              <div className="relative aspect-[5/4] overflow-hidden bg-parchment-deep">
                <CoverImage src={category.image ?? "/covers/cat-devocionais.svg"} alt={category.name} />
              </div>
              <h2 className="mt-4 font-serif text-2xl text-ink group-hover:text-forest">{category.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{category.description}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">{category._count.products} materiais</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
