/**
 * Visuel du Hero en SVG inline (≈ 4 Ko) : bâtiment en fil de fer relié à des flux de données,
 * réseau de données (bleu), réseau d'eau (cyan), points clés (orange).
 * Il remplace provisoirement le rendu 3D : il ne retarde pas l'affichage (LCP = le titre).
 * Plus tard : image AVIF du rendu 3D + boucle vidéo chargée après coup, même emplacement.
 */
export function HeroVisual({ label }: { label: string }) {
  const floors = [140, 180, 220, 260, 300, 340, 380];
  const cols = [190, 240, 290, 340];
  return (
    <svg viewBox="0 0 520 520" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <radialGradient id="hv-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--color-electric)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-navy)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-navy-deep)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <circle cx="260" cy="240" r="250" fill="url(#hv-glow)" />

      {/* Sol + réseau d'eau enterré */}
      <path d="M40 430 H480" stroke="var(--color-line)" strokeWidth="1" />
      <path
        d="M60 462 H200 V430 M200 462 H330 V430 M330 462 H470"
        fill="none"
        stroke="var(--color-pole-hydraulique)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="10 14"
        className="animate-dash"
      />

      {/* Bâtiment : façade + perspective */}
      <path d="M170 100 L370 100 L370 430 L170 430 Z" fill="url(#hv-facade)" stroke="var(--color-electric-soft)" strokeOpacity="0.7" />
      <path d="M370 100 L420 130 L420 430 L370 430" fill="var(--color-navy-deep)" fillOpacity="0.6" stroke="var(--color-electric-soft)" strokeOpacity="0.45" />
      <path d="M170 100 L220 70 L420 70 L420 130 M220 70 L370 100" fill="none" stroke="var(--color-electric-soft)" strokeOpacity="0.35" />

      {/* Étages et trames */}
      {floors.map((y) => (
        <g key={y}>
          <path d={`M170 ${y} H370`} stroke="var(--color-electric-soft)" strokeOpacity="0.18" />
          {/* Même étage sur la face latérale (perspective : 30 px de décalage en haut, 0 en bas) */}
          <path d={`M370 ${y} L420 ${y + (30 * (430 - y)) / 330}`} stroke="var(--color-electric-soft)" strokeOpacity="0.12" />
        </g>
      ))}
      {cols.map((x) => (
        <path key={x} d={`M${x} 100 V430`} stroke="var(--color-electric-soft)" strokeOpacity="0.12" />
      ))}

      {/* Colonne montante réseau (données) */}
      <path
        d="M290 430 V120 M190 220 H340 M240 300 H370"
        fill="none"
        stroke="var(--color-electric)"
        strokeWidth="2"
        strokeDasharray="6 10"
        className="animate-dash"
      />

      {/* Liaison vers le cloud */}
      <path d="M290 120 C 290 60, 400 40, 450 60" fill="none" stroke="var(--color-electric)" strokeWidth="1.5" strokeDasharray="4 8" className="animate-dash" />
      <g transform="translate(450 60)">
        <circle r="22" fill="var(--color-surface)" stroke="var(--color-electric)" strokeOpacity="0.8" />
        <path d="M-10 4 a7 7 0 0 1 3 -12 a9 9 0 0 1 16 2 a6 6 0 0 1 1 11 z" fill="none" stroke="var(--color-electric-soft)" strokeWidth="1.5" />
      </g>

      {/* Nœuds (capteurs / points d'accès) */}
      {[
        [190, 220],
        [340, 220],
        [240, 300],
        [370, 300],
        [290, 180],
        [290, 380],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="var(--color-electric)" fillOpacity="0.15" />
          <circle cx={x} cy={y} r="4" fill="var(--color-electric-soft)" className="animate-pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}

      {/* Points clés orange : raccordements eau / bâtiment */}
      {[200, 330].map((x) => (
        <circle key={x} cx={x} cy="430" r="5" fill="var(--color-orange)" />
      ))}

      {/* Engrenage maintenance */}
      <g transform="translate(110 380)" stroke="var(--color-pole-maintenance)" fill="none" strokeWidth="1.5" opacity="0.85">
        <circle r="14" />
        <circle r="5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M0 -14 V-20" transform={`rotate(${a})`} strokeLinecap="round" />
        ))}
      </g>
      <path d="M124 380 H170" stroke="var(--color-pole-maintenance)" strokeOpacity="0.5" strokeDasharray="3 6" />
    </svg>
  );
}
