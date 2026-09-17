import { benefits, testimonials } from "@/lib/content/home";
import { storeFaq, storeFaqFor } from "@/lib/content/faq";
import type { StoreProfile } from "@/lib/store";

const genericBenefits = [
  {
    title: "Conteúdo objetivo",
    text: "Cada material é produzido para uso real: claro, direto e sem excesso visual.",
  },
  {
    title: "Compra simples e segura",
    text: "O checkout acontece na Kiwify. Você paga com proteção de um processador conhecido e recebe o acesso por e-mail.",
  },
  {
    title: "Acesso imediato",
    text: "Após a confirmação do pagamento, o material digital fica disponível para download.",
  },
  {
    title: "Uma loja, um propósito",
    text: "O catálogo é organizado por nicho para você encontrar o que precisa sem ruído.",
  },
] as const;

const financasBenefits = [
  {
    title: "Modelos para o mês",
    text: "Planners e guias pensados para registro e revisão — sem jargão de mercado.",
  },
  {
    title: "Compra na Kiwify",
    text: "Cada produto tem o próprio checkout. O pagamento e o acesso acontecem lá.",
  },
  {
    title: "Materiais digitais",
    text: "PDFs e arquivos para preencher no seu ritmo. Sem conexão com banco.",
  },
  {
    title: "Conteúdo demonstrativo",
    text: "O catálogo inicial existe para apresentar a loja. Não é consultoria financeira.",
  },
] as const;

const fitnessBenefits = [
  {
    title: "Registro, não prescrição",
    text: "Os materiais organizam a sua rotina. Não vêm com treino pronto nem dieta.",
  },
  {
    title: "Compra na Kiwify",
    text: "Você escolhe o material aqui e conclui o pagamento no checkout correspondente.",
  },
  {
    title: "Uso no dia a dia",
    text: "Planners e diários para anotar o que você já faz — movimento, descanso, hábitos.",
  },
  {
    title: "Sem promessas de resultado",
    text: "O catálogo é demonstrativo. Não há alegações médicas nem metas impostas.",
  },
] as const;

export function getStorefrontCopy(store: StoreProfile) {
  if (store.slug === "semeia") {
    return {
      eyebrow: "Livraria digital cristã",
      headline: "Cultive a fé no ritmo da vida real.",
      description: store.description,
      primaryCta: "Explorar materiais",
      secondaryCta: `Conhecer a ${store.name}`,
      quote: "A semente é a palavra de Deus.",
      quoteRef: "Lucas 8:11",
      proposalTitle: "Materiais para serem usados, não apenas admirados.",
      proposal: [
        `A ${store.name} reúne devocionais, estudos, planos e artes feitos com cuidado editorial. Sem pressa, sem espetáculo, sem a estética de campanha.`,
        "A compra acontece na Kiwify. Aqui você escolhe o material; o pagamento e o acesso digital são processados com segurança no checkout correspondente.",
      ],
      featuredTitle: "Escolhas da casa",
      categoriesTitle: "Encontre o que a casa precisa agora.",
      benefitsTitle: "Confiança, clareza e acesso imediato.",
      benefits,
      showTestimonials: true,
      testimonials,
      ctaTitle: "Comece por um material. O restante encontra o tempo.",
      ctaText: "Escolha um devocional, um plano ou um estudo e receba o acesso assim que a Kiwify confirmar o pagamento.",
      faq: storeFaq,
      aboutTitle: "Uma casa pequena para materiais duradouros.",
      about: [
        `A ${store.name} nasceu da convicção de que a fé também se cultiva no ordinário: no café antes do trabalho, na mesa com crianças, no silêncio de um domingo sem agenda.`,
        "Não somos uma fábrica de conteúdo. Selecionamos e produzimos materiais digitais — devocionais, estudos, planos, imprimíveis e artes — com linguagem clara, teologia responsável e uma estética que prefere o essencial.",
        `A venda é simples de propósito. Você escolhe o material nesta loja e conclui o pagamento no checkout da Kiwify. Não armazenamos dados de cartão e não intermediamos o pagamento.`,
      ],
    };
  }

  if (store.slug === "financas") {
    return {
      eyebrow: "Materiais digitais de organização",
      headline: store.tagline || "Clareza para o dinheiro do mês.",
      description: store.description,
      primaryCta: "Ver materiais",
      secondaryCta: `Sobre a ${store.name}`,
      quote: null,
      quoteRef: null,
      proposalTitle: "Organizar primeiro. Decidir depois.",
      proposal: [
        "A Finanças reúne planners, planilhas e guias para registrar o essencial: contas, categorias e o ritmo do mês.",
        "O catálogo atual é demonstrativo. Não há consultoria, recomendação de investimento nem promessa de resultado. A compra acontece na Kiwify.",
      ],
      featuredTitle: "Modelos da loja",
      categoriesTitle: "Escolha o tipo de material.",
      benefitsTitle: "Simples de preencher. Sem ruído.",
      benefits: financasBenefits,
      showTestimonials: false,
      testimonials: [],
      ctaTitle: "Comece por um modelo de organização.",
      ctaText: "Os arquivos são digitais. O acesso chega por e-mail quando a Kiwify confirma o pagamento.",
      faq: storeFaqFor(store.name),
      aboutTitle: "Uma loja para pôr o mês no papel.",
      about: [
        "A Finanças é uma marca de materiais digitais de organização financeira. O foco é registro, orçamento e revisão — não aconselhamento.",
        "Os produtos iniciais são demonstrativos: servem para apresentar a loja e a experiência de compra.",
        "O pagamento é processado pela Kiwify. Não armazenamos dados de cartão.",
      ],
    };
  }

  if (store.slug === "fitness") {
    return {
      eyebrow: "Materiais digitais de rotina",
      headline: store.tagline || "Movimento com método, no seu ritmo.",
      description: store.description,
      primaryCta: "Ver materiais",
      secondaryCta: `Sobre a ${store.name}`,
      quote: null,
      quoteRef: null,
      proposalTitle: "Organizar o movimento. Sem protocolo.",
      proposal: [
        "A Fitness oferece planners e diários para acompanhar treinos, hábitos e o desenho da semana.",
        "Não há treino prescrito, dieta ou promessa de resultado. O catálogo é demonstrativo. A compra acontece na Kiwify.",
      ],
      featuredTitle: "Materiais para a rotina",
      categoriesTitle: "Navegue pelo tipo de registro.",
      benefitsTitle: "Ferramentas de organização, não de desempenho.",
      benefits: fitnessBenefits,
      showTestimonials: false,
      testimonials: [],
      ctaTitle: "Escolha um material e organize a semana.",
      ctaText: "O acesso digital é liberado quando a Kiwify confirma o pagamento.",
      faq: storeFaqFor(store.name),
      aboutTitle: "Uma marca para acompanhar a rotina ativa.",
      about: [
        "A Fitness é uma loja de materiais digitais para registrar movimento, hábitos e o ritmo da semana.",
        "Nada aqui substitui orientação profissional. Os produtos de demonstração não fazem alegações médicas nem prometem emagrecimento.",
        "O checkout de cada oferta acontece na Kiwify.",
      ],
    };
  }

  return {
    eyebrow: store.niche,
    headline: store.tagline || store.name,
    description: store.description,
    primaryCta: "Explorar materiais",
    secondaryCta: `Sobre a ${store.name}`,
    quote: null,
    quoteRef: null,
    proposalTitle: `${store.name}: materiais digitais do nicho ${store.niche.toLowerCase()}.`,
    proposal: [
      store.description,
      "A compra acontece na Kiwify. Cada produto tem o próprio checkout; o pagamento e o acesso digital são processados com segurança.",
    ],
    featuredTitle: "Em destaque",
    categoriesTitle: "Navegue pelas categorias desta loja.",
    benefitsTitle: "Compra simples, acesso imediato.",
    benefits: genericBenefits,
    showTestimonials: false,
    testimonials: [],
    ctaTitle: "Escolha um material e comece agora.",
    ctaText: "O acesso é liberado assim que a Kiwify confirmar o pagamento.",
    faq: storeFaqFor(store.name),
    aboutTitle: `Sobre a ${store.name}`,
    about: [
      store.description,
      `Esta loja oferece materiais digitais no nicho ${store.niche.toLowerCase()}. O pagamento é processado pela Kiwify.`,
    ],
  };
}
