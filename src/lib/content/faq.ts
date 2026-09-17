export function storeFaqFor(storeName: string) {
  return [
    {
      question: "Como recebo o material após a compra?",
      answer:
        "O pagamento é processado pela Kiwify. Assim que a compra for confirmada, você recebe o acesso ao material digital no e-mail informado no checkout.",
    },
    {
      question: "Os produtos são digitais?",
      answer: `Sim. A ${storeName} vende apenas materiais digitais para download. Não há envio físico.`,
    },
    {
      question: "Posso imprimir os materiais?",
      answer:
        "A maior parte dos PDFs pode ser usada em casa. Cada página de produto indica o que está incluído e a forma recomendada de uso.",
    },
    {
      question: "Vocês emitem nota fiscal?",
      answer:
        "A emissão fiscal da venda é feita pela Kiwify, conforme os dados preenchidos no checkout. Em caso de dúvida, fale conosco pelo formulário de contato.",
    },
    {
      question: "E se eu tiver problema com o acesso?",
      answer:
        "Escreva para nós em Contato com o e-mail usado na compra. Vamos orientar o reenvio do acesso sem pedir dados de cartão.",
    },
  ] as const;
}

export const storeFaq = storeFaqFor("Semeia");
