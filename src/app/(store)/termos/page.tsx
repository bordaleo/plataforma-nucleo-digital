import type { Metadata } from "next";
import { TermsView } from "@/components/store/views/LegalViews";
import { getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso da loja digital Semeia.",
};

export default async function TermsPage() {
  const store = await getDefaultStore();
  return <TermsView store={store} />;
}
