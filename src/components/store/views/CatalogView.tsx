import { ProductCard } from "@/components/store/ProductCard";
import { Container } from "@/components/ui/Container";
import { storeHref, type StoreProfile } from "@/lib/store";
import type { Category, Product } from "@prisma/client";

type ProductRow = Product & { category: Category };
type CategoryRow = { id: string; name: string; slug: string };

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-2 text-sm ${active ? "bg-forest text-cream" : "border border-line text-ink-soft"}`}
    >
      {label}
    </a>
  );
}

export function CatalogView({
  store,
  products,
  categories,
  selectedCategory,
}: {
  store: StoreProfile;
  products: ProductRow[];
  categories: CategoryRow[];
  selectedCategory?: string;
}) {
  const filtered = selectedCategory
    ? products.filter((product) => product.category.slug === selectedCategory)
    : products;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Catálogo</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Materiais</h1>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Todos os produtos são digitais. Ao clicar em comprar, você é levado ao checkout da Kiwify correspondente.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <FilterChip href={storeHref(store.slug, "/produtos")} active={!selectedCategory} label="Todos" />
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              href={`${storeHref(store.slug, "/produtos")}?categoria=${category.slug}`}
              active={selectedCategory === category.slug}
              label={category.name}
            />
          ))}
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} storeSlug={store.slug} />
          ))}
        </div>
        {filtered.length === 0 ? <p className="mt-10 text-ink-soft">Nenhum material nesta seleção.</p> : null}
      </Container>
    </section>
  );
}
