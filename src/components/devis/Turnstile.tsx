"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/config/site";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Clé de site : celle de src/config/site.ts, ou NEXT_PUBLIC_TURNSTILE_SITE_KEY pour les tests en local.
const SITE_KEY = TURNSTILE_SITE_KEY || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Widget anti-robot Cloudflare Turnstile (sans casse-tête visuel, sans cookie publicitaire).
 * Chargé uniquement à la dernière étape du formulaire, pour ne rien coûter au reste du site.
 * Sans NEXT_PUBLIC_TURNSTILE_SITE_KEY (développement), rien n'est affiché.
 */
export function Turnstile({ onToken }: { onToken: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const render = useCallback(() => {
    if (!SITE_KEY || !ref.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(ref.current, {
      sitekey: SITE_KEY,
      theme: "dark",
      language: "fr",
      callback: (token: string) => onToken(token),
      "expired-callback": () => onToken(null),
      "error-callback": () => onToken(null),
    });
  }, [onToken]);

  // Si le script est déjà chargé (retour sur l'étape), on rend directement.
  useEffect(() => {
    render();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [render]);

  if (!SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}
