export function catalogCheckoutUrl(slug: string) {
  return `https://pay.kiwify.com.br/PLACEHOLDER_${slug}`;
}

export const catalogCategories = [
  {
    name: "Devocionais",
    slug: "devocionais",
    description: "Leituras breves para acompanhar a Palavra no dia a dia.",
    image: "/covers/cat-devocionais.svg",
  },
  {
    name: "Estudos bíblicos",
    slug: "estudos-biblicos",
    description: "Guias para grupos, liderança e estudo pessoal com profundidade.",
    image: "/covers/cat-estudos.svg",
  },
  {
    name: "E-books",
    slug: "e-books",
    description: "Livros digitais sobre fé, silêncio, vocação e vida cristã.",
    image: "/covers/cat-ebooks.svg",
  },
  {
    name: "Planos de leitura",
    slug: "planos-de-leitura",
    description: "Percursos para ler a Bíblia com ritmo sustentável.",
    image: "/covers/cat-leitura.svg",
  },
  {
    name: "Planos de oração",
    slug: "planos-de-oracao",
    description: "Roteiros de intercessão e presença diante de Deus.",
    image: "/covers/cat-oracao.svg",
  },
  {
    name: "Família",
    slug: "familia",
    description: "Recursos para cultivar fé em casa, sem forçar o momento.",
    image: "/covers/cat-familia.svg",
  },
  {
    name: "Infantil",
    slug: "infantil",
    description: "Materiais para crianças conhecerem as Escrituras com beleza.",
    image: "/covers/cat-infantil.svg",
  },
  {
    name: "Imprimíveis",
    slug: "imprimiveis",
    description: "PDFs para imprimir, recortar e usar no cotidiano.",
    image: "/covers/cat-imprimiveis.svg",
  },
  {
    name: "Artes e wallpapers",
    slug: "artes-e-wallpapers",
    description: "Peças visuais discretas para telefone, computador e casa.",
    image: "/covers/cat-artes.svg",
  },
];

export type CatalogProduct = {
  categorySlug: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  promotionalPriceCents?: number;
  coverImage: string;
  tags: string[];
  details: string;
  benefits: string[];
  contents: string[];
  audience: string;
  faq: { question: string; answer: string }[];
  featured?: boolean;
};

export const catalogProducts: CatalogProduct[] = [
  {
    categorySlug: "devocionais",
    name: "Ainda assim, espero",
    slug: "ainda-assim-espero",
    shortDescription: "Um devocional de 40 dias para tempos de espera, luto e recomeço.",
    description:
      "Escrito para quem atravessa uma estação sem respostas fáceis. Cada dia reúne um texto bíblico, uma meditação curta e uma pergunta que cabe no café da manhã.\n\nO tom é pastoral, sem pressa e sem frases de efeito. A proposta é acompanhar a espera — não resolvê-la.",
    priceCents: 4700,
    promotionalPriceCents: 3700,
    coverImage: "/covers/ainda-assim-espero.svg",
    tags: ["devocional", "espera", "40 dias"],
    details: "Formato PDF · 40 dias · leitura de 8 a 12 minutos",
    benefits: [
      "Leitura diária breve, sem carga de desempenho",
      "Textos que voltam à Escritura, não a slogans",
      "Espaço para anotações ao final de cada semana",
    ],
    contents: [
      "Guia de 40 dias em PDF",
      "Páginas de anotação semanal",
      "Lista de textos bíblicos em ordem",
    ],
    audience:
      "Para quem atravessa espera, luto, transição ou cansaço espiritual e deseja um acompanhamento sereno.",
    faq: [
      {
        question: "Preciso começar num domingo?",
        answer: "Não. O material foi pensado para começar em qualquer dia.",
      },
      {
        question: "Serve para grupo?",
        answer: "Foi escrito para uso pessoal, mas um casal ou discipulado pode lê-lo em conjunto.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "estudos-biblicos",
    name: "O Sermão do Monte",
    slug: "o-sermao-do-monte",
    shortDescription: "Um guia de 8 semanas sobre Mateus 5–7 para grupos e estudo pessoal.",
    description:
      "Um percurso lento pelo Sermão do Monte. Cada semana abre o texto, propõe perguntas honestas e sugere uma prática concreta — sem transformar o discurso de Jesus em lista de autoajuda.",
    priceCents: 5900,
    coverImage: "/covers/sermao-do-monte.svg",
    tags: ["estudo", "mateus", "grupo"],
    details: "8 semanas · PDF + guia do facilitador",
    benefits: [
      "Perguntas que abrem conversa, não interrogatório",
      "Notas de contexto histórico só onde ajudam",
      "Práticas semanais aplicáveis à vida comum",
    ],
    contents: [
      "Guia do participante (PDF)",
      "Guia do facilitador",
      "Plano de leitura complementar",
    ],
    audience: "Grupos pequenos, lideranças leigas e quem deseja estudar Mateus 5–7 com calma.",
    faq: [
      {
        question: "Serve para iniciantes?",
        answer: "Sim. O texto explica o necessário sem pressupor formação teológica.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "e-books",
    name: "O silêncio que cura",
    slug: "o-silencio-que-cura",
    shortDescription: "Um ensaio sobre quietude, oração e o barulho que herdamos.",
    description:
      "Um e-book curto sobre a disciplina do silêncio — não como técnica de bem-estar, mas como espaço para ouvir. Traz relatos, textos bíblicos e convites práticos para quem vive cidade, tela e pressa.",
    priceCents: 2900,
    coverImage: "/covers/silencio-que-cura.svg",
    tags: ["e-book", "oração", "silêncio"],
    details: "E-book PDF · cerca de 80 páginas",
    benefits: [
      "Leitura de um fim de semana",
      "Exercícios de 10 minutos, sem jargão",
      "Linguagem literária e acessível",
    ],
    contents: ["E-book em PDF", "Marcadores de citação para anotar"],
    audience: "Leitores que buscam profundidade sem academicismo, especialmente em estações de ruído interior.",
    faq: [
      {
        question: "É um livro de autoajuda?",
        answer: "Não. É um ensaio cristão sobre silêncio, com Escritura e prática.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "planos-de-leitura",
    name: "Bíblia em 90 dias",
    slug: "biblia-em-90-dias",
    shortDescription: "Um plano realista para percorrer as Escrituras em três meses.",
    description:
      "Um plano de leitura que cabe numa rotina exigente. Em vez de prometer heroísmo, organiza porções diárias, dias de folga e chaves de leitura para não se perder nos livros longos.",
    priceCents: 2400,
    coverImage: "/covers/biblia-90-dias.svg",
    tags: ["plano", "leitura bíblica", "90 dias"],
    details: "PDF + checklist imprimível",
    benefits: [
      "Ritmo sustentável, com folgas previstas",
      "Notas de orientação nos livros mais densos",
      "Checklist para marcar o progresso",
    ],
    contents: ["Plano diário em PDF", "Checklist imprimível", "Guia de recomeço se atrasar"],
    audience: "Quem já tentou ler a Bíblia linearmente e desistiu no meio de Levítico.",
    faq: [
      {
        question: "E se eu atrasar?",
        answer: "O material inclui um guia de recomeço. Atraso não encerra o plano.",
      },
    ],
    featured: true,
  },
  {
    categorySlug: "planos-de-oracao",
    name: "30 dias de intercessão",
    slug: "30-dias-de-intercessao",
    shortDescription: "Um mês de oração pela casa, a igreja e a cidade.",
    description:
      "Um plano de 30 dias que alarga a oração para além dos pedidos pessoais. Cada dia traz um eixo — família, líderes, enfermos, cidade, nações — com um texto e um espaço em branco.",
    priceCents: 1900,
    coverImage: "/covers/30-dias-intercessao.svg",
    tags: ["oração", "intercessão", "30 dias"],
    details: "PDF · 30 dias · páginas para anotar nomes",
    benefits: [
      "Estrutura sem virar fórmula",
      "Espaço para nomes e respostas",
      "Pode ser usado sozinho ou em vigília",
    ],
    contents: ["Plano de 30 dias", "Lista de intercessão", "Página de ações de graças"],
    audience: "Pessoas e grupos que desejam orar com regularidade pela casa e pelo entorno.",
    faq: [
      {
        question: "Preciso orar uma hora por dia?",
        answer: "Não. O plano funciona em 10 a 20 minutos.",
      },
    ],
  },
  {
    categorySlug: "familia",
    name: "Altar em casa",
    slug: "altar-em-casa",
    shortDescription: "Um guia gentil para momentos de fé em família ao longo da semana.",
    description:
      "Não é um programa rígido. São convites curtos para a mesa, o caminho da escola e o domingo à noite — com textos, perguntas e silêncios possíveis mesmo com crianças pequenas.",
    priceCents: 3900,
    coverImage: "/covers/altar-em-casa.svg",
    tags: ["família", "mesa", "rotina"],
    details: "PDF · 12 semanas · adaptações por idade",
    benefits: [
      "Momentos de 7 a 15 minutos",
      "Variações para idade pré-escolar e pré-adolescente",
      "Sem exigência de performance parental",
    ],
    contents: ["Guia de 12 semanas", "Cartões de bênção para a mesa", "Calendário semanal"],
    audience: "Famílias que querem um ritmo espiritual em casa sem teatralizar a fé.",
    faq: [
      {
        question: "Funciona com filhos pequenos?",
        answer: "Sim. Há versões mais curtas e visuais para essa fase.",
      },
    ],
  },
  {
    categorySlug: "infantil",
    name: "Pequenos discípulos",
    slug: "pequenos-discipulos",
    shortDescription: "Histórias, perguntas e desenhos para crianças de 4 a 8 anos.",
    description:
      "Um material ilustrado que apresenta narrativas bíblicas sem simplificar demais o mistério. Cada encontro tem história, uma pergunta e um gesto simples — acender uma vela, plantar, desenhar.",
    priceCents: 3400,
    coverImage: "/covers/pequenos-discipulos.svg",
    tags: ["infantil", "histórias", "4-8 anos"],
    details: "PDF ilustrado · 16 encontros",
    benefits: [
      "Linguagem respeitosa com a criança",
      "Atividades que não dependem de impressora colorida",
      "Pode ser usado em casa ou na igreja",
    ],
    contents: ["16 encontros em PDF", "Páginas para colorir", "Guia para o adulto"],
    audience: "Pais, tios e professores de crianças entre 4 e 8 anos.",
    faq: [
      {
        question: "Precisa de muitos materiais?",
        answer: "Não. Lápis, papel e o PDF bastam para a maior parte dos encontros.",
      },
    ],
  },
  {
    categorySlug: "imprimiveis",
    name: "Calendário da Palavra",
    slug: "calendario-da-palavra",
    shortDescription: "Um calendário anual com textos curtos e espaço para gratidão.",
    description:
      "Doze meses em páginas A4, com um versículo discreto, campo para anotações e uma tipografia feita para imprimir em casa sem perder elegância.",
    priceCents: 1700,
    coverImage: "/covers/calendario-palavra.svg",
    tags: ["imprimível", "calendário", "A4"],
    details: "PDF A4 · 12 páginas + capa",
    benefits: [
      "Impressão caseira em preto e branco ou cor",
      "Espaço mensal de gratidão",
      "Design limpo para a parede ou o caderno",
    ],
    contents: ["12 páginas mensais", "Capa", "Versão encadernável"],
    audience: "Quem gosta de papel, parede e um lembrete silencioso da Palavra.",
    faq: [
      {
        question: "Qual o tamanho?",
        answer: "A4. Há uma marca de corte se quiser encadernar.",
      },
    ],
  },
  {
    categorySlug: "artes-e-wallpapers",
    name: "Coleção Oliveiras",
    slug: "colecao-oliveiras",
    shortDescription: "Oito wallpapers serenos com tipografia e ramagem, sem excesso.",
    description:
      "Uma coleção visual para telefone e computador. Fundos em tons de pergaminho e floresta, com versos curtos e desenhos de oliveira. Feita para não competir com o conteúdo da tela.",
    priceCents: 1500,
    coverImage: "/covers/colecao-oliveiras.svg",
    tags: ["wallpaper", "arte", "oliveira"],
    details: "8 artes · 4K desktop e 1290×2796 celular",
    benefits: [
      "Estética discreta, sem recorte de redes sociais",
      "Dois formatos por arte",
      "Uso pessoal ilimitado",
    ],
    contents: ["8 artes para celular", "8 artes para desktop", "Guia de instalação"],
    audience: "Quem deseja um lembrete visual cotidiano, sem poluição gráfica.",
    faq: [
      {
        question: "Posso usar na igreja?",
        answer: "O licenciamento é para uso pessoal. Para projeção, fale conosco.",
      },
    ],
  },
];
