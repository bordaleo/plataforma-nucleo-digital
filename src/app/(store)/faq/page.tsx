import type { Metadata } from "next";
import { FaqView } from "@/components/store/views/FaqView";
import { getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Dúvidas sobre acesso, pagamento pela Kiwify e uso dos materiais digitais da Semeia.",
};

export default async function FaqPage() {
  const store = await getDefaultStore();
  return <FaqView store={store} />;
}
