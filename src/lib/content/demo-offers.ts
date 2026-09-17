export type DemoOfferSeed = {
  productSlug: string;
  name: string;
  headline: string;
  subheadline: string;
  badge: string;
  barText: string;
  audiencePoints: string[];
  notFor: string[];
};

export const DEMO_OFFER_WINDOW = {
  startsAt: new Date("2026-09-01T00:00:00.000Z"),
  endsAt: new Date("2026-12-31T23:59:59.000Z"),
};

export const demoOfferSeeds: Record<string, DemoOfferSeed> = {
  "ainda-assim-espero": {
    productSlug: "ainda-assim-espero",
    name: "Oferta demonstrativa — Ainda assim, espero",
    headline: "Um devocional de 40 dias para tempos de espera.",
    subheadline: "Leitura breve, texto bíblico e uma pergunta para o dia. Dados de exemplo da plataforma.",
    badge: "Demonstração",
    barText: "Contador e preços de exemplo. Não é uma promoção real.",
    audiencePoints: [
      "Você atravessa uma estação de espera, luto ou recomeço",
      "Prefere leitura curta, ligada à Escritura",
      "Quer um material digital para o ritmo da casa",
    ],
    notFor: [
      "Quem busca frases de autoajuda no lugar de texto bíblico",
      "Quem precisa de acompanhamento pastoral presencial",
    ],
  },
  "planner-financeiro": {
    productSlug: "planner-financeiro",
    name: "Oferta demonstrativa — Planner Financeiro",
    headline: "Um modelo para registrar o essencial do mês.",
    subheadline: "Páginas para entradas, saídas e anotações. Material de demonstração — não é consultoria.",
    badge: "Demonstração",
    barText: "Contador e preços de exemplo. Não é uma promoção real.",
    audiencePoints: [
      "Você quer um modelo simples para anotar o mês",
      "Prefere PDF para preencher no seu ritmo",
      "Não busca indicação de investimento",
    ],
    notFor: [
      "Quem busca consultoria financeira",
      "Quem espera projeção de ganho ou produto de investimento",
    ],
  },
  "planner-de-treinos": {
    productSlug: "planner-de-treinos",
    name: "Oferta demonstrativa — Planner de Treinos",
    headline: "Páginas para registrar a semana de treinos.",
    subheadline: "Você anota o que já faz. Sem lista de exercícios prescritos. Material de demonstração.",
    badge: "Demonstração",
    barText: "Contador e preços de exemplo. Não é uma promoção real.",
    audiencePoints: [
      "Você quer registrar sessões de treino",
      "Prefere um planner digital simples",
      "Não busca protocolo ou resultado garantido",
    ],
    notFor: [
      "Quem busca treino prescrito ou acompanhamento profissional",
      "Quem espera dieta, emagrecimento ou desempenho garantido",
    ],
  },
};
