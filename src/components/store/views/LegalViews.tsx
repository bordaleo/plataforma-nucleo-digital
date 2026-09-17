import { Container } from "@/components/ui/Container";
import type { StoreProfile } from "@/lib/store";

export function TermsView({ store }: { store: StoreProfile }) {
  const nicheLabel = store.slug === "semeia" ? "conteúdo cristão" : `materiais digitais de ${store.niche.toLowerCase()}`;

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-5xl text-ink">Termos de uso</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
          <p>
            Ao acessar a {store.name}, você concorda com estes termos. A loja oferece {nicheLabel} e
            redireciona o pagamento para a Kiwify.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Produtos digitais</h2>
          <p>
            Os materiais são entregues em formato digital após a confirmação do pagamento. Não há envio físico,
            salvo indicação explícita em um produto futuro.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Pagamento</h2>
          <p>
            O processamento financeiro é de responsabilidade da Kiwify. A {store.name} não recebe, armazena ou
            processa dados de cartão.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Licença de uso</h2>
          <p>
            Salvo menção em contrário na página do produto, a licença é pessoal e intransferível. Reprodução
            comercial, redistribuição ou uso institucional amplo exige autorização.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Alterações</h2>
          <p>Estes termos podem ser atualizados. A versão vigente estará sempre publicada nesta página.</p>
        </div>
      </Container>
    </section>
  );
}

export function PrivacyView({ store }: { store: StoreProfile }) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-5xl text-ink">Política de privacidade</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
          <p>
            Levamos a sério a confiança de quem visita a {store.name}. Coletamos o mínimo necessário para operar o
            catálogo, o contato e o registro de pedidos recebidos por webhook.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Dados que podemos tratar</h2>
          <p>
            Nome e e-mail enviados no formulário de contato; dados de cliente e pedido enviados pela Kiwify
            via webhook, quando a integração estiver ativa. Não solicitamos nem armazenamos dados de cartão.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Pagamentos</h2>
          <p>
            O checkout ocorre na Kiwify. A política de privacidade do processador se aplica à etapa de
            pagamento.
          </p>
          <h2 className="pt-4 font-serif text-2xl text-ink">Contato</h2>
          <p>
            Para exercer direitos previstos na LGPD, use a página de contato
            {store.email ? ` ou o e-mail ${store.email}` : ""}.
          </p>
        </div>
      </Container>
    </section>
  );
}
