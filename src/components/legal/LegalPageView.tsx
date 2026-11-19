import type { LegalPage } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { ManageCookiesButton } from "@/components/layout/CookieBanner";

/** Mise en page commune des pages légales : lisible, sobre, avec un sommaire cliquable. */
export function LegalPageView({ page, withCookieSettings = false }: { page: LegalPage; withCookieSettings?: boolean }) {
  const id = (i: number) => `${page.slug}-${i}`;
  return (
    <article aria-labelledby="legal-title" className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1 id="legal-title" className="text-4xl font-bold sm:text-5xl">{page.title}</h1>
        <p className="mt-3 text-sm text-ink-muted">Dernière mise à jour : {page.updated}</p>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">{page.intro}</p>

        <nav aria-label="Sommaire" className="glass mt-10 rounded-2xl p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-soft">Sommaire</p>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {page.blocks.map((b, i) => (
              <li key={b.h}>
                <a href={`#${id(i)}`} className="text-ink-muted hover:text-ink">{i + 1}. {b.h}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-10">
          {page.blocks.map((b, i) => (
            <section key={b.h} aria-labelledby={id(i)}>
              <h2 id={id(i)} className="text-xl font-semibold sm:text-2xl">{i + 1}. {b.h}</h2>
              {b.p?.slice(0, b.list ? 1 : undefined).map((t) => <p key={t} className="mt-3 leading-relaxed text-ink-muted">{t}</p>)}
              {b.list && (
                <ul className="mt-3 space-y-2">
                  {b.list.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {b.list && b.p?.slice(1).map((t) => <p key={t} className="mt-3 leading-relaxed text-ink-muted">{t}</p>)}
            </section>
          ))}
        </div>

        {withCookieSettings && (
          <div className="glass mt-12 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-muted">Modifier vos choix maintenant :</p>
            <ManageCookiesButton
              label="Gérer mes cookies"
              className="inline-flex min-h-11 items-center rounded-full border border-electric/60 px-5 text-sm font-semibold hover:bg-electric/10"
            />
          </div>
        )}
      </Container>
    </article>
  );
}
