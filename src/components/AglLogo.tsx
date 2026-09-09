import React from 'react';
import darkThemeMainLogo from '../../assets/darkTheme-mainLogo.png';
import darkThemeShortLogo from '../../assets/darkTheme-shortLogo.png';
import mainLogo from '../../assets/mainLogo.png';
import shortLogo from '../../assets/shortlogo.png';

interface AglLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  compact?: boolean;
}

export const AglLogo: React.FC<AglLogoProps> = ({
  className = 'h-10',
  variant = 'dark',
  showSubtitle = true,
  compact = false,
}) => {
  const isOnDarkBackground = variant === 'light';
  const logoSrc = compact
    ? isOnDarkBackground
      ? darkThemeShortLogo
      : shortLogo
    : isOnDarkBackground
      ? darkThemeMainLogo
      : mainLogo;
  const altText = compact ? 'AGL' : 'AGL Creatives - Design, Print, Pack';

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      style={{ aspectRatio: compact ? '2.57 / 1' : '4.2 / 1' }}
      data-logo-variant={variant}
      data-logo-subtitle={showSubtitle}
    >
      <img
        src={logoSrc}
        alt={altText}
        className="h-full w-full object-contain"
        decoding="async"
      />
    </span>
  );
};
