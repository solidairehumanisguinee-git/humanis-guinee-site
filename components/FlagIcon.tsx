export function FlagFR({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-label="France" role="img">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#FFFFFF" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}

export function FlagGN({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-label="Guinée" role="img">
      <rect width="1" height="2" x="0" fill="#CE1126" />
      <rect width="1" height="2" x="1" fill="#FCD116" />
      <rect width="1" height="2" x="2" fill="#009460" />
    </svg>
  );
}
