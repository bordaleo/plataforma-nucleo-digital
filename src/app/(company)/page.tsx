import { CompanyHome } from "@/components/company/CompanyHome";
import { companyDefaults } from "@/lib/company";
import { getActiveStores, getCompany } from "@/lib/queries";

export default async function CompanyHomePage() {
  const [company, stores] = await Promise.all([getCompany(), getActiveStores()]);

  return <CompanyHome company={company ?? companyDefaults} stores={stores} />;
}
