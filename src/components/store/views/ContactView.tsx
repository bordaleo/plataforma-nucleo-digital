import { ContactForm } from "@/components/store/ContactForm";
import { Container } from "@/components/ui/Container";
import type { StoreProfile } from "@/lib/store";

export function ContactView({ store }: { store: StoreProfile }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Contato</p>
          <h1 className="mt-3 font-serif text-5xl text-ink">Escreva para a casa.</h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Dúvidas sobre acesso, uso dos materiais ou parcerias com a {store.name}. Responderemos no e-mail informado.
          </p>
          {store.email ? <p className="mt-8 text-sm text-muted">{store.email}</p> : null}
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
