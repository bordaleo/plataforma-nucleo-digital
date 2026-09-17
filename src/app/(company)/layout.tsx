import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CompanyShell } from "@/components/company/CompanyShell";
import { getCompany } from "@/lib/queries";
import { companyDefaults } from "@/lib/company";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const company = (await getCompany()) ?? companyDefaults;
  return {
    title: {
      default: company.tagline ? `${company.name} — ${company.tagline}` : company.name,
      template: `%s · ${company.name}`,
    },
    description: company.description,
    icons: company.favicon ? { icon: company.favicon } : undefined,
    openGraph: {
      title: company.name,
      description: company.description,
      url: site.url,
      siteName: company.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function CompanyLayout({ children }: { children: ReactNode }) {
  const company = (await getCompany()) ?? companyDefaults;
  return <CompanyShell company={company}>{children}</CompanyShell>;
}
