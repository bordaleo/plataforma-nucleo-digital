"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { storeHref, storeNavLinks, type StoreProfile } from "@/lib/store";

export function Header({ store }: { store: StoreProfile }) {
  const [open, setOpen] = useState(false);
  const links = storeNavLinks(store.slug);
  const catalogHref = storeHref(store.slug, "/produtos");

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-parchment/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <Logo store={store} />
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            href={catalogHref}
            className="inline-flex h-10 items-center rounded-full bg-forest px-5 text-sm text-cream transition hover:bg-ink"
          >
            Ver materiais
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`block h-px bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-cream px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-base">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-ink">
                {link.label}
              </Link>
            ))}
            <Link
              href={catalogHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-forest text-cream"
            >
              Ver materiais
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
