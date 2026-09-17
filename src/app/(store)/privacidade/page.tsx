import type { Metadata } from "next";
import { PrivacyView } from "@/components/store/views/LegalViews";
import { getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Semeia trata dados pessoais na loja e no contato.",
};

export default async function PrivacyPage() {
  const store = await getDefaultStore();
  return <PrivacyView store={store} />;
}
