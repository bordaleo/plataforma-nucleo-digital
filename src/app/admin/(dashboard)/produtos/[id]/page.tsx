import { notFound } from "next/navigation";
import { ProductActions } from "@/components/admin/ProductActions";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminCategories, getAdminProduct } from "@/lib/queries";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();
  const categories = await getAdminCategories(product.storeId);

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink">Editar produto</h1>
          <p className="mt-3 text-ink-soft">{product.name}</p>
        </div>
        <ProductActions id={product.id} status={product.status} />
      </div>
      <div className="mt-8">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
