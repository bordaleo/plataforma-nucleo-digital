import type { BrandMotif } from "@/lib/brand-visual";

export function BrandMotif({ motif, accent, ink }: { motif: BrandMotif; accent: string; ink: string }) {
  if (motif === "botanical") {
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
        <path d="M160 28c42 18 72 54 72 98 0 56-34 86-72 116-38-30-72-60-72-116 0-44 30-80 72-98Z" fill={ink} fillOpacity="0.08" />
        <path d="M160 46c28 14 48 40 48 72 0 42-24 66-48 88-24-22-48-46-48-88 0-32 20-58 48-72Z" fill="none" stroke={accent} strokeOpacity="0.7" />
        <circle cx="160" cy="40" r="4" fill={accent} />
        <path d="M92 168c22-18 38-18 60 0M168 168c22-18 38-18 60 0" fill="none" stroke={ink} strokeOpacity="0.18" />
      </svg>
    );
  }

  if (motif === "ledger") {
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
        {Array.from({ length: 6 }, (_, index) => (
          <line key={index} x1="28" x2="292" y1={48 + index * 24} y2={48 + index * 24} stroke={ink} strokeOpacity="0.12" />
        ))}
        <rect x="28" y="36" width="86" height="10" fill={accent} fillOpacity="0.85" />
        <rect x="28" y="84" width="54" height="8" fill={ink} fillOpacity="0.2" />
        <rect x="200" y="132" width="92" height="28" fill="none" stroke={accent} strokeOpacity="0.8" />
        <text x="212" y="151" fill={accent} fontSize="11" letterSpacing="2">
          MÊS
        </text>
      </svg>
    );
  }

  if (motif === "motion") {
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
        <path d="M20 180 120 40" stroke={accent} strokeWidth="10" />
        <path d="M80 190 210 46" stroke={ink} strokeOpacity="0.16" strokeWidth="10" />
        <path d="M150 196 300 70" stroke={accent} strokeOpacity="0.45" strokeWidth="10" />
        <circle cx="248" cy="58" r="18" fill="none" stroke={ink} strokeOpacity="0.28" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden>
      <rect x="36" y="40" width="110" height="140" fill={ink} fillOpacity="0.08" />
      <rect x="160" y="64" width="120" height="92" fill="none" stroke={accent} />
      <circle cx="220" cy="110" r="22" fill={accent} fillOpacity="0.7" />
    </svg>
  );
}
