import { notFound } from "next/navigation";
import { StoreActions } from "@/components/admin/StoreActions";
import { StoreForm } from "@/components/admin/StoreForm";
import { prisma } from "@/lib/prisma";

export default async function EditStorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      company: true,
      _count: { select: { products: true, categories: true, orders: true } },
    },
  });
  if (!store) notFound();

  const canDelete = store._count.products + store._count.categories + store._count.orders === 0;

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Editar loja</h1>
          <p className="mt-3 text-ink-soft">{store.name}</p>
        </div>
        <StoreActions id={store.id} active={store.active} canDelete={canDelete} />
      </div>
      <div className="mt-8">
        <StoreForm store={store} companyName={store.company.name} />
      </div>
    </div>
  );
}
