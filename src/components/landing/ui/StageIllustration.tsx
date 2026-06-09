export function StageIllustration() {
  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      className="h-full w-full max-w-[420px]"
      aria-hidden
    >
      <rect x="60" y="200" width="300" height="10" rx="3" fill="#1a1a1a" opacity="0.12" />
      <rect x="90" y="50" width="240" height="130" rx="10" fill="white" opacity="0.2" />
      <rect x="110" y="65" width="200" height="90" rx="6" fill="#2d2d2d" opacity="0.7" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={125 + i * 24}
          y={95}
          width="8"
          height={30 + (i % 3) * 12}
          rx="2"
          fill="#f5b942"
          opacity="0.8"
        />
      ))}
      <rect x="70" y="160" width="28" height="45" rx="4" fill="#2d2d2d" />
      <circle cx="84" cy="172" r="10" fill="#4a4a4a" />
      <rect x="322" y="160" width="28" height="45" rx="4" fill="#2d2d2d" />
      <circle cx="336" cy="172" r="10" fill="#4a4a4a" />
      <ellipse cx="210" cy="175" rx="35" ry="18" fill="#f05a45" opacity="0.5" />
      <rect x="195" y="168" width="30" height="14" rx="3" fill="#f5b942" opacity="0.6" />
      <circle cx="130" cy="215" r="12" fill="#f05a45" opacity="0.7" />
      <rect x="122" y="200" width="16" height="22" rx="3" fill="#2d2d2d" />
      <circle cx="210" cy="218" r="12" fill="#f0783a" opacity="0.7" />
      <rect x="202" y="203" width="16" height="22" rx="3" fill="#2d2d2d" />
      <circle cx="290" cy="215" r="12" fill="#f5b942" opacity="0.7" />
      <rect x="282" y="200" width="16" height="22" rx="3" fill="#2d2d2d" />
      <rect x="155" y="30" width="6" height="40" fill="#2d2d2d" />
      <rect x="140" y="28" width="36" height="8" rx="2" fill="#2d2d2d" />
      <circle cx="158" cy="32" r="12" fill="white" opacity="0.4" />
      <rect x="259" y="30" width="6" height="40" fill="#2d2d2d" />
      <rect x="244" y="28" width="36" height="8" rx="2" fill="#2d2d2d" />
      <circle cx="262" cy="32" r="12" fill="white" opacity="0.4" />
    </svg>
  );
}
