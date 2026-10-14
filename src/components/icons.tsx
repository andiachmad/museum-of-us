export function LockIcon({ className = '', size = 15 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.3 6.6V4.9a2.7 2.7 0 0 1 5.4 0v1.7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2.6" y="6.6" width="10.8" height="7.4" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7.4" y="9.2" width="1.2" height="2.2" rx=".4" fill="currentColor" />
    </svg>
  );
}

export function BearIcon({ size = 33, surprised = false }: { size?: number; surprised?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="6.6" cy="7.4" r="3.6" fill="#f9b8bb" />
      <circle cx="21.4" cy="7.4" r="3.6" fill="#f9b8bb" />
      <ellipse cx="14" cy="15.6" rx="11.6" ry="10.2" fill="#f9b8bb" />
      <ellipse cx="7.4" cy="17.2" rx="2.6" ry="1.7" fill="#f6a8ab" />
      <ellipse cx="20.6" cy="17.2" rx="2.6" ry="1.7" fill="#f6a8ab" />
      <ellipse cx="9.2" cy="13.8" rx=".95" ry="1.35" fill="#724a4a" />
      <ellipse cx="18.8" cy="13.8" rx=".95" ry="1.35" fill="#724a4a" />
      {surprised ? (
        <ellipse cx="14" cy="18.4" rx="1.1" ry="1.7" fill="#724a4a" />
      ) : (
        <path d="M11.4 17.6c.6 1.5 4.6 1.5 5.2 0" stroke="#724a4a" strokeWidth="1" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}

export function ImageIcon() {
  return (
    <svg width="14" height="19" viewBox="0 0 14 19" aria-hidden="true">
      <rect width="14" height="19" rx="2" fill="#c56a6a" />
      <path d="M2.6 13.6 5 9.4l1.7 2.6 1.4-3 3.3 4.6z" fill="#fbe9e0" />
    </svg>
  );
}

export function MatchedIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x=".6" y=".6" width="10.8" height="10.8" rx="2" stroke="#ff9d92" strokeWidth="1.2" />
      <rect x="3" y="5.4" width="6" height="1.2" rx=".6" fill="#ff9d92" />
    </svg>
  );
}
