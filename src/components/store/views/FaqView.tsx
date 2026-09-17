import { FaqList } from "@/components/store/FaqList";
import { Container } from "@/components/ui/Container";
import { getStorefrontCopy } from "@/lib/content/storefront";
import type { StoreProfile } from "@/lib/store";

export function FaqView({ store }: { store: StoreProfile }) {
  const copy = getStorefrontCopy(store);

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Ajuda</p>
        <h1 className="mt-3 font-serif text-5xl text-ink">Perguntas frequentes</h1>
        <p className="mt-4 text-ink-soft">
          Se a sua dúvida não estiver aqui, escreva pela página de contato. Nunca pediremos dados de cartão.
        </p>
        <div className="mt-10">
          <FaqList items={copy.faq} />
        </div>
      </Container>
    </section>
  );
}
