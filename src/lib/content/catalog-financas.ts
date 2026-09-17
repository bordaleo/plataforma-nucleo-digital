import type { CatalogProduct } from "@/lib/content/catalog";

export const financasCategories = [
  {
    name: "Organização Financeira",
    slug: "organizacao-financeira",
    description: "Materiais para registrar, revisar e acompanhar o dinheiro do mês.",
    image: "/covers/fin-cat-organizacao.svg",
  },
  {
    name: "Planejamento",
    slug: "planejamento",
    description: "Modelos para pensar o mês e o trimestre com mais ordem.",
    image: "/covers/fin-cat-planejamento.svg",
  },
  {
    name: "Orçamento",
    slug: "orcamento",
    description: "Planilhas e guias para montar um orçamento simples.",
    image: "/covers/fin-cat-orcamento.svg",
  },
  {
    name: "Investimentos",
    slug: "investimentos",
    description: "Conteúdo introdutório e demonstrativo sobre conceitos básicos.",
    image: "/covers/fin-cat-investimentos.svg",
  },
  {
    name: "E-books",
    slug: "e-books",
    description: "Leituras curtas para organizar a vida financeira.",
    image: "/covers/fin-cat-ebooks.svg",
  },
];

export const financasProducts: CatalogProduct[] = [
  {
    categorySlug: "planejamento",
    name: "Planner Financeiro",
    slug: "planner-financeiro",
    shortDescription: "Modelo digital para acompanhar entradas, saídas e prioridades do mês.",
    description:
      "Material de demonstração da plataforma. Um planner em PDF para registrar o essencial do mês: receitas, gastos recorrentes e anotações.\n\nNão é consultoria financeira e não promete resultado. Serve para organizar informações no seu ritmo.",
    priceCents: 3900,
    coverImage: "/covers/fin-planner.svg",
    tags: ["planner", "demonstração", "organização"],
    details: "PDF · material de demonstração · uso pessoal",
    benefits: [
      "Páginas mensais para registrar o essencial",
      "Espaço para anotações semanal",
      "Formato simples, sem planilha avançada",
    ],
    contents: ["Planner em PDF", "Capa e índice", "Páginas mensais e notas"],
    audience: "Quem quer um modelo simples para anotar o mês. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Isso é consultoria financeira?",
        answer: "Não. É um material digital de organização, em caráter de demonstração.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "orcamento",
    name: "Planilha de Orçamento Mensal",
    slug: "planilha-orcamento-mensal",
    shortDescription: "Modelo para listar categorias de gasto e acompanhar o mês.",
    description:
      "Material de demonstração da plataforma. Uma planilha-modelo para registrar categorias de orçamento e totais do mês.\n\nNão calcula investimentos nem recomenda produtos financeiros.",
    priceCents: 2900,
    coverImage: "/covers/fin-planilha.svg",
    tags: ["orçamento", "planilha", "demonstração"],
    details: "Arquivo digital · material de demonstração",
    benefits: [
      "Categorias editáveis",
      "Visão mensal objetiva",
      "Uso pessoal, sem automação bancária",
    ],
    contents: ["Arquivo-modelo", "Guia curto de preenchimento"],
    audience: "Quem prefere um modelo pronto para preencher. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Conecta com banco?",
        answer: "Não. É um arquivo para preenchimento manual.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "organizacao-financeira",
    name: "Guia de Organização Financeira",
    slug: "guia-organizacao-financeira",
    shortDescription: "Roteiro introdutório para reunir contas, prazos e registros.",
    description:
      "Material de demonstração da plataforma. Um guia curto com passos para reunir documentos, listar contas e criar um registro simples.\n\nNão inclui recomendações de investimento nem projeções de ganho.",
    priceCents: 2700,
    coverImage: "/covers/fin-guia.svg",
    tags: ["guia", "organização", "demonstração"],
    details: "PDF · leitura curta · material de demonstração",
    benefits: [
      "Checklist para reunir informações",
      "Linguagem direta",
      "Sem jargão de mercado",
    ],
    contents: ["Guia em PDF", "Checklist de organização"],
    audience: "Quem está começando a reunir as informações do mês. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Serve como aconselhamento?",
        answer: "Não. É um material educativo e demonstrativo.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "e-books",
    name: "E-book: Primeiros Passos para Organizar suas Finanças",
    slug: "ebook-primeiros-passos-financas",
    shortDescription: "Leitura curta sobre hábitos de registro e revisão mensal.",
    description:
      "Material de demonstração da plataforma. Um e-book introdutório sobre como registrar gastos, revisar o mês e manter um arquivo simples.\n\nNão promete independência financeira, rentabilidade ou resultado.",
    priceCents: 1900,
    coverImage: "/covers/fin-ebook.svg",
    tags: ["e-book", "iniciante", "demonstração"],
    details: "E-book PDF · material de demonstração",
    benefits: [
      "Texto curto e objetivo",
      "Foco em registro e revisão",
      "Sem recomendações de produtos financeiros",
    ],
    contents: ["E-book em PDF"],
    audience: "Leitura inicial, em caráter de demonstração.",
    faq: [
      {
        question: "Tem dicas de investimento?",
        answer: "Não. O texto trata só de organização e registro.",
      },
    ],
    featured: true,
  },
];
