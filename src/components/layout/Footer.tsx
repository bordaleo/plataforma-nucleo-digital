import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { storeHref, storeNavLinks, type StoreProfile } from "@/lib/store";

export function Footer({ store }: { store: StoreProfile }) {
  const links = storeNavLinks(store.slug);
  const legal = [
    { href: storeHref(store.slug, "/termos"), label: "Termos de uso" },
    { href: storeHref(store.slug, "/privacidade"), label: "Privacidade" },
  ];

  return (
    <footer className="mt-auto bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo store={store} inverted />
          <p className="mt-5 text-sm leading-relaxed text-cream/75">{store.tagline || store.description}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Navegar</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Casa</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            {legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
            {store.instagram ? (
              <li>
                <a href={store.instagram} className="hover:text-cream">
                  Instagram
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {store.name}. Todos os direitos reservados.</p>
          <p>Pagamentos processados pela Kiwify.</p>
        </div>
      </div>
    </footer>
  );
}
