import { formatPrice } from "@/lib/format";

export function ProductPrice({
  priceCents,
  promotionalPriceCents,
  size = "md",
}: {
  priceCents: number;
  promotionalPriceCents?: number | null;
  size?: "sm" | "md" | "lg";
}) {
  const current = promotionalPriceCents ?? priceCents;
  const hasPromo = promotionalPriceCents != null && promotionalPriceCents < priceCents;
  const currentClass = size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";
  const oldClass = size === "lg" ? "text-base" : "text-sm";

  return (
    <p className="flex flex-wrap items-baseline gap-2 font-medium text-ink">
      <span className={`${currentClass} tracking-tight`}>{formatPrice(current)}</span>
      {hasPromo ? (
        <span className={`${oldClass} text-muted line-through`}>{formatPrice(priceCents)}</span>
      ) : null}
    </p>
  );
}
