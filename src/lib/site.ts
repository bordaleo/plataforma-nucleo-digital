export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Semeia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Materiais cristãos para cultivar a fé no cotidiano.",
  description:
    "Loja digital de devocionais, estudos bíblicos, e-books e materiais para famílias. Conteúdo cristão com qualidade, simplicidade e profundidade.",
  email: "ola@semeia.com.br",
  instagram: "https://instagram.com/semeia",
} as const;

export const navLinks = [
  { href: "/produtos", label: "Materiais" },
  { href: "/categorias", label: "Categorias" },
  { href: "/sobre", label: "Sobre" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
] as const;
