import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getStorefrontCopy } from "@/lib/content/storefront";
import { storeHref, type StoreProfile } from "@/lib/store";

export function AboutView({ store }: { store: StoreProfile }) {
  const copy = getStorefrontCopy(store);

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Sobre</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">{copy.aboutTitle}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
          {copy.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link
          href={storeHref(store.slug, "/produtos")}
          className="mt-10 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm text-cream"
        >
          Ver os materiais
        </Link>
      </Container>
    </section>
  );
}
