import type { Metadata } from "next";
import { ContactView } from "@/components/store/views/ContactView";
import { getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a equipe da Semeia sobre materiais, acesso e parcerias.",
};

export default async function ContactPage() {
  const store = await getDefaultStore();
  return <ContactView store={store} />;
}
