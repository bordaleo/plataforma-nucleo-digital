"use client";

import { deleteStoreAction, toggleStoreStatusAction } from "@/lib/actions/store";

export function StoreActions({
  id,
  active,
  canDelete,
}: {
  id: string;
  active: boolean;
  canDelete: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <form action={toggleStoreStatusAction.bind(null, id, !active)}>
        <button type="submit" className="text-sm text-ink-soft hover:text-ink">
          {active ? "Desativar" : "Ativar"}
        </button>
      </form>
      <form
        action={deleteStoreAction.bind(null, id)}
        onSubmit={(event) => {
          if (!canDelete) {
            event.preventDefault();
            alert("Esta loja ainda tem categorias, produtos ou vendas. Remova as dependências antes de excluir.");
            return;
          }
          if (!confirm("Excluir esta loja?")) event.preventDefault();
        }}
      >
        <button type="submit" className="text-sm text-bronze-deep hover:text-ink">
          Excluir
        </button>
      </form>
    </div>
  );
}
