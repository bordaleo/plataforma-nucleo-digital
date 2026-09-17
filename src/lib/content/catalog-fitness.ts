import type { CatalogProduct } from "@/lib/content/catalog";

export const fitnessCategories = [
  {
    name: "Treinos",
    slug: "treinos",
    description: "Modelos para registrar sessões e acompanhar a semana.",
    image: "/covers/fit-cat-treinos.svg",
  },
  {
    name: "Planejamento",
    slug: "planejamento",
    description: "Materiais para organizar a rotina de movimento.",
    image: "/covers/fit-cat-planejamento.svg",
  },
  {
    name: "Hábitos",
    slug: "habitos",
    description: "Diários e checklists para acompanhar consistência.",
    image: "/covers/fit-cat-habitos.svg",
  },
  {
    name: "Alimentação",
    slug: "alimentacao",
    description: "Páginas para anotar refeições e preferências — sem dietas prescritas.",
    image: "/covers/fit-cat-alimentacao.svg",
  },
  {
    name: "E-books",
    slug: "e-books",
    description: "Leituras curtas sobre organização da rotina ativa.",
    image: "/covers/fit-cat-ebooks.svg",
  },
];

export const fitnessProducts: CatalogProduct[] = [
  {
    categorySlug: "treinos",
    name: "Planner de Treinos",
    slug: "planner-de-treinos",
    shortDescription: "Páginas para registrar treinos da semana, sem prescrever exercícios.",
    description:
      "Material de demonstração da plataforma. Um planner para anotar o que você já faz: dia, duração e percepção de esforço.\n\nNão é plano de treino, não substitui orientação profissional e não promete resultado físico.",
    priceCents: 3900,
    coverImage: "/covers/fit-planner-treinos.svg",
    tags: ["planner", "treinos", "demonstração"],
    details: "PDF · material de demonstração · uso pessoal",
    benefits: [
      "Grade semanal para anotações",
      "Espaço para duração e notas",
      "Sem lista de exercícios prescritos",
    ],
    contents: ["Planner em PDF", "Páginas semanais"],
    audience: "Quem quer registrar a própria rotina. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Vem com treino pronto?",
        answer: "Não. O material só organiza o registro das sessões.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "habitos",
    name: "Diário de Hábitos",
    slug: "diario-de-habitos",
    shortDescription: "Diário para marcar hábitos do dia, sem metas impostas.",
    description:
      "Material de demonstração da plataforma. Um diário simples para marcar hábitos que você mesma define.\n\nNão é programa de emagrecimento e não avalia saúde.",
    priceCents: 2700,
    coverImage: "/covers/fit-diario.svg",
    tags: ["hábitos", "diário", "demonstração"],
    details: "PDF · material de demonstração",
    benefits: [
      "Grade diária em branco",
      "Espaço para notas da semana",
      "Você escolhe o que acompanhar",
    ],
    contents: ["Diário em PDF"],
    audience: "Quem prefere um registro visual simples. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Define metas por mim?",
        answer: "Não. As linhas ficam em branco para o seu uso.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "planejamento",
    name: "Planner Fitness",
    slug: "planner-fitness",
    shortDescription: "Visão mensal para encaixar movimento, descanso e notas da rotina.",
    description:
      "Material de demonstração da plataforma. Um planner mensal para organizar a semana: movimento, descanso e observações.\n\nNão prescreve treino, dieta ou resultado.",
    priceCents: 4200,
    coverImage: "/covers/fit-planner.svg",
    tags: ["planner", "rotina", "demonstração"],
    details: "PDF · material de demonstração",
    benefits: [
      "Calendário mensal para anotações",
      "Espaço para descanso e notas",
      "Layout limpo, sem métricas clínicas",
    ],
    contents: ["Planner mensal em PDF"],
    audience: "Quem quer um quadro mensal da rotina. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Serve como orientação profissional?",
        answer: "Não. É só um material de organização.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "alimentacao",
    name: "Guia de Organização da Rotina",
    slug: "guia-organizacao-rotina",
    shortDescription: "Roteiro para montar uma semana mais clara, sem promessas de resultado.",
    description:
      "Material de demonstração da plataforma. Um guia curto para listar horários, blocos de movimento e pausas.\n\nNão é plano alimentar, não é protocolo de emagrecimento e não oferece aconselhamento médico.",
    priceCents: 2400,
    coverImage: "/covers/fit-guia.svg",
    tags: ["guia", "rotina", "demonstração"],
    details: "PDF · leitura curta · material de demonstração",
    benefits: [
      "Checklist de organização semanal",
      "Linguagem direta",
      "Sem prescrição de exercícios ou dieta",
    ],
    contents: ["Guia em PDF", "Checklist da semana"],
    audience: "Quem quer um roteiro de organização. Conteúdo demonstrativo.",
    faq: [
      {
        question: "Tem plano alimentar?",
        answer: "Não. Há só espaço para anotações, se você quiser usar.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "e-books",
    name: "E-book de Planejamento de Treinos",
    slug: "ebook-planejamento-treinos",
    shortDescription: "Leitura sobre como registrar e revisar a própria rotina de treino.",
    description:
      "Material de demonstração da plataforma. Um e-book curto sobre planejamento pessoal: como anotar sessões, revisar a semana e ajustar o calendário.\n\nNão ensina exercícios, não promete hipertrofia, emagrecimento ou desempenho.",
    priceCents: 1900,
    coverImage: "/covers/fit-ebook.svg",
    tags: ["e-book", "planejamento", "demonstração"],
    details: "E-book PDF · material de demonstração",
    benefits: [
      "Texto curto sobre organização",
      "Foco em registro e revisão",
      "Sem treinos prontos",
    ],
    contents: ["E-book em PDF"],
    audience: "Leitura inicial, em caráter de demonstração.",
    faq: [
      {
        question: "Substitui um profissional?",
        answer: "Não. É um material de organização, não orientação física ou médica.",
      },
    ],
    featured: false,
  },
];
