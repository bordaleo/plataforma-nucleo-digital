import { mixHex, readableInk } from "@/lib/color";
import type { StoreProfile } from "@/lib/store";

export type BrandMotif = "botanical" | "ledger" | "motion" | "abstract";

export type BrandVisual = {
  motif: BrandMotif;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  panel: string;
};

const presets: Record<string, BrandVisual> = {
  semeia: {
    motif: "botanical",
    surface: "#1e3a32",
    ink: "#f3eee4",
    muted: "#c8b89a",
    accent: "#9a7848",
    panel: "#f3eee4",
  },
  financas: {
    motif: "ledger",
    surface: "#10233d",
    ink: "#eef2f5",
    muted: "#b7c2cf",
    accent: "#b0893e",
    panel: "#e8eef4",
  },
  fitness: {
    motif: "motion",
    surface: "#161616",
    ink: "#f4f1ec",
    muted: "#c9bdb2",
    accent: "#d85a2b",
    panel: "#ece7e0",
  },
};

export function getBrandVisual(store: Pick<StoreProfile, "slug" | "primaryColor" | "secondaryColor" | "backgroundColor" | "themeStyle">): BrandVisual {
  const known = presets[store.slug];
  if (known) return known;

  const motif: BrandMotif =
    store.themeStyle === "energy" ? "motion" : store.themeStyle === "modern" ? "ledger" : "abstract";

  return {
    motif,
    surface: store.primaryColor,
    ink: readableInk(store.primaryColor),
    muted: mixHex(store.primaryColor, "#f4f1ec", 0.55),
    accent: store.secondaryColor,
    panel: store.backgroundColor || "#f3eee4",
  };
}
