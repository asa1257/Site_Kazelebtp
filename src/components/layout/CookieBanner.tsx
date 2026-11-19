"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { cookieBanner as t } from "@/content/home";
import { Button } from "@/components/ui/Button";

/**
 * Bloc 11 — bannière de consentement.
 * Règles : non bloquante, « Tout refuser » aussi visible que « Tout accepter »,
 * rien de non essentiel chargé avant le choix, choix modifiable à tout moment depuis le footer.
 * La preuve de consentement (date + choix) est gardée localement ; à doubler côté serveur si besoin.
 */

const STORAGE_KEY = "kazele-consent-v1";
const OPEN_EVENT = "kazele:open-cookie-settings";

export type Consent = { necessary: true; analytics: boolean; date: string };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null; // stockage indisponible (navigation privée stricte, etc.)
  }
}

function saveConsent(analytics: boolean) {
  const consent: Consent = { necessary: true, analytics, date: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* le choix vaut pour la session en cours */
  }
  window.dispatchEvent(new CustomEvent("kazele:consent", { detail: consent }));
}

// Côté serveur on ne sait rien : la bannière n'est rendue qu'après hydratation (pas de saut de mise en page).
const subscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(subscribe, () => true, () => false);

export function CookieBanner() {
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setForcedOpen(true);
      setDismissed(false);
      setCustomize(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  if (!isClient || dismissed) return null;
  if (!forcedOpen && readConsent()) return null;

  const decide = (value: boolean) => {
    saveConsent(value);
    setDismissed(true);
    setForcedOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed bottom-24 border border-line bg-surface left-3 right-3 z-[60] max-w-md rounded-2xl p-5 shadow-2xl sm:bottom-5 sm:left-5 sm:right-auto"
    >
      <div className="flex items-start gap-3">
        <Cookie size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-electric-soft" />
        <div>
          <h2 id="cookie-title" className="font-display text-base font-semibold text-ink">{t.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {t.text}{" "}
            <Link href={t.learnMore.href} className="text-electric-soft underline underline-offset-2">
              {t.learnMore.label}
            </Link>
          </p>
        </div>
      </div>

      {customize && (
        <fieldset className="mt-4 space-y-3 border-t border-line pt-4">
          <legend className="sr-only">{t.customize}</legend>
          {t.categories.map((c) => (
            <label key={c.id} className="flex items-start justify-between gap-4 text-sm">
              <span>
                <span className="font-medium text-ink">{c.label}</span>
                <span className="block text-ink-muted">{c.text}</span>
              </span>
              {c.locked ? (
                <span className="shrink-0 text-xs text-ink-muted">{t.alwaysOn}</span>
              ) : (
                <input
                  type="checkbox"
                  className="mt-1 size-5 shrink-0 accent-[var(--color-electric)]"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
              )}
            </label>
          ))}
        </fieldset>
      )}

      {/* Trois boutons de même poids visuel : refuser doit être aussi simple qu'accepter */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {customize ? (
          <Button variant="secondary" className="col-span-3" onClick={() => decide(analytics)}>
            {t.save}
          </Button>
        ) : (
          <>
            <Button variant="secondary" className="px-2 text-xs sm:text-sm" onClick={() => decide(false)}>{t.rejectAll}</Button>
            <Button variant="secondary" className="px-2 text-xs sm:text-sm" onClick={() => setCustomize(true)}>{t.customize}</Button>
            <Button variant="secondary" className="px-2 text-xs sm:text-sm" onClick={() => decide(true)}>{t.acceptAll}</Button>
          </>
        )}
      </div>
    </div>
  );
}

/** Lien « Gérer mes cookies » du footer : rouvre le panneau de réglages. */
export function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button type="button" className="hover:text-ink" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
