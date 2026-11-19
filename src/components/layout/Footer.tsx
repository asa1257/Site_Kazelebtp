import Link from "next/link";
import { company, footer } from "@/content/home";
import { POLE_LIST } from "@/lib/poles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ManageCookiesButton } from "./CookieBanner";

/** Bloc 10 — pied de page. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-24 sm:pb-0">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="full" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">{footer.tagline}</p>
          <Button href={footer.cta.href} size="md" className="mt-6">
            {footer.cta.label}
          </Button>
        </div>

        <FooterColumn title={footer.columns.expertises}>
          {POLE_LIST.map((p) => (
            <li key={p.id}>
              <Link href={p.href} className="hover:text-ink">{p.label}</Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={footer.columns.company}>
          {footer.companyLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-ink">{l.label}</Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={footer.columns.contact}>
          <li>{company.address}</li>
          <li><a href={company.phoneHref} className="hover:text-ink">{company.phoneDisplay}</a></li>
          <li><a href={`mailto:${company.email}`} className="hover:text-ink">{company.email}</a></li>
          <li className="flex gap-4 pt-2">
            <a href={company.social.linkedin} className="hover:text-ink">LinkedIn</a>
            <a href={company.social.facebook} className="hover:text-ink">Facebook</a>
            <a href={company.whatsappHref} className="hover:text-ink" rel="noopener noreferrer" target="_blank">WhatsApp</a>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {footer.copyrightYear} {company.name} {company.legalForm} · RCCM {company.rccm} · NCC {company.ncc}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">{l.label}</Link>
              </li>
            ))}
            <li>
              <ManageCookiesButton label={footer.manageCookies} />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-ink-muted">{children}</ul>
    </div>
  );
}
