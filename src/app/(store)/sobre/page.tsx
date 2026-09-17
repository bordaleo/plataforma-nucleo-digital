import type { Metadata } from "next";
import { AboutView } from "@/components/store/views/AboutView";
import { getDefaultStore } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Semeia, uma livraria digital de materiais cristãos feitos com cuidado editorial.",
};

export default async function AboutPage() {
  const store = await getDefaultStore();
  return <AboutView store={store} />;
}
