import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { getSelectedAdminStore } from "@/lib/admin-store";
import { getAdminSession } from "@/lib/auth";
import { getCompany, getStores } from "@/lib/queries";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const [company, stores, selectedStore] = await Promise.all([
    getCompany(),
    getStores(),
    getSelectedAdminStore(),
  ]);

  return (
    <div className="min-h-screen bg-parchment lg:flex">
      <AdminNav company={company} stores={stores} selectedStore={selectedStore} />
      <div className="flex-1 px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}
