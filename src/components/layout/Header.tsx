"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, LockKeyhole, Menu, X } from "lucide-react";
import { nav } from "@/content/home";
import { POLE_LIST } from "@/lib/poles";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PoleIcon } from "@/components/ui/PoleIcon";

/** Bloc 1 — header collant : logo, menu avec méga-menu Expertises, CTA devis, menu mobile plein écran. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaId = useId();
  const mobileId = useId();
  const megaRef = useRef<HTMLLIElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);

  // Header rétracté au défilement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap ferme les menus ; clic à l'extérieur ferme le méga-menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        megaButtonRef.current?.focus();
      }
      setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (megaOpen && megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "glass sticky top-0 z-50 border-x-0 border-t-0 transition-[height] duration-300",
          scrolled ? "shadow-[0_8px_32px_-16px_rgb(0_0_0/0.8)]" : "",
        )}
      >
        <Container className={cn("flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-16" : "h-20")}>
          <Logo priority />

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.items.map((item) =>
                item.megaMenu ? (
                  <li key={item.href} className="relative" ref={megaRef}>
                    <button
                      ref={megaButtonRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      onClick={() => setMegaOpen((v) => !v)}
                      className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink"
                    >
                      {item.label}
                      <ChevronDown size={16} aria-hidden="true" className={cn("transition-transform", megaOpen && "rotate-180")} />
                    </button>
                    <MegaMenu id={megaId} open={megaOpen} onNavigate={() => setMegaOpen(false)} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Enveloppe pour masquer en mobile : la barre CTA du bas prend le relais */}
            <span className="hidden sm:block">
              <Button href={nav.cta.href} icon={<LockKeyhole size={16} />} title={nav.ctaTooltip}>
                <span className="hidden xl:inline">{nav.cta.label}</span>
                <span className="xl:hidden">{nav.cta.shortLabel}</span>
              </Button>
            </span>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-white/5 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id={mobileId}
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-base px-5 pb-28 pt-6 lg:hidden"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-electric-soft">Nos expertises</p>
        <ul className="grid grid-cols-2 gap-3">
          {POLE_LIST.map((pole) => (
            <li key={pole.id}>
              <Link
                href={pole.href}
                onClick={() => setMobileOpen(false)}
                className="glass flex flex-col items-start gap-3 rounded-2xl p-4"
              >
                <PoleIcon pole={pole.id} size="sm" />
                <span className="font-display font-semibold">{pole.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <nav aria-label="Navigation mobile" className="mt-8">
          <ul className="divide-y divide-line">
            {nav.items
              .filter((i) => !i.megaMenu)
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-4 text-lg">
                    {item.label}
                    <ArrowRight size={18} aria-hidden="true" className="text-ink-muted" />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Barre CTA fixe en bas d'écran (mobile) */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 border-x-0 border-b-0 p-3 sm:hidden">
        <Button href={nav.cta.href} icon={<LockKeyhole size={16} />} className="w-full">
          {nav.cta.label}
        </Button>
      </div>
    </>
  );
}

function MegaMenu({ id, open, onNavigate }: { id: string; open: boolean; onNavigate: () => void }) {
  return (
    <div
      id={id}
      hidden={!open}
      className="absolute left-1/2 top-full mt-3 w-[min(880px,90vw)] -translate-x-1/2 rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.9)]"
    >
      <ul className="grid grid-cols-4 gap-4">
        {POLE_LIST.map((pole) => (
          <li key={pole.id}>
            <Link
              href={pole.href}
              onClick={onNavigate}
              className="group flex h-full flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
            >
              <PoleIcon pole={pole.id} />
              <span className="font-display font-semibold text-ink">{pole.label}</span>
              <span className="text-sm leading-snug text-ink-muted">{nav.megaMenu[pole.id]}</span>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-electric-soft">
                {nav.megaMenu.linkLabel}
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
