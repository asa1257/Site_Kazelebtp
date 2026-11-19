import { Mail, MapPin, Phone, Siren } from "lucide-react";
import { company, nav } from "@/content/home";
import { Container } from "@/components/ui/Container";

/** Bloc 0 — barre utilitaire (desktop uniquement). */
export function UtilityBar() {
  return (
    <div className="hidden border-b border-line/60 bg-base text-xs text-ink-muted lg:block">
      <Container className="flex h-9 items-center justify-between">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" className="text-electric-soft" />
            {company.city}
          </li>
          <li>
            <a href={company.phoneHref} className="flex items-center gap-1.5 hover:text-ink">
              <Phone size={14} aria-hidden="true" className="text-electric-soft" />
              {company.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-ink">
              <Mail size={14} aria-hidden="true" className="text-electric-soft" />
              {company.email}
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-5">
          <a href={company.emergencyPhoneHref} className="flex items-center gap-1.5 font-semibold text-orange hover:text-orange-hover">
            <Siren size={14} aria-hidden="true" />
            {nav.emergency.label}
          </a>
          <span aria-label="Langue">
            <span className="font-semibold text-ink" aria-current="true">FR</span>
            <span aria-hidden="true"> · </span>
            {/* Version anglaise : à activer quand /en existe */}
            <span title="Version anglaise bientôt disponible">EN</span>
          </span>
        </div>
      </Container>
    </div>
  );
}
