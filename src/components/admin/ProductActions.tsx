"use client";

import { ProductStatus } from "@prisma/client";
import { deleteProductAction, toggleProductStatusAction } from "@/lib/actions/product";

export function ProductActions({ id, status }: { id: string; status: ProductStatus }) {
  const nextStatus = status === ProductStatus.ACTIVE ? ProductStatus.INACTIVE : ProductStatus.ACTIVE;

  return (
    <div className="flex flex-wrap gap-3">
      <form action={toggleProductStatusAction.bind(null, id, nextStatus)}>
        <button type="submit" className="text-sm text-ink-soft hover:text-ink">
          {status === ProductStatus.ACTIVE ? "Desativar" : "Ativar"}
        </button>
      </form>
      <form
        action={deleteProductAction.bind(null, id)}
        onSubmit={(event) => {
          if (!confirm("Excluir este produto? Se houver vendas vinculadas, ele será apenas desativado.")) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit" className="text-sm text-bronze-deep hover:text-ink">
          Excluir
        </button>
      </form>
    </div>
  );
}
