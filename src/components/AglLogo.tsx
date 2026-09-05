import React from 'react';

interface AglLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const AglLogo: React.FC<AglLogoProps> = ({
  className = 'h-10',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';
  const navyColor = isLight ? '#FFFFFF' : '#0A1930';
  const subtextColor = isLight ? '#E2E8F0' : '#12295A';
  const lineDividerColor = isLight ? '#2F6FED' : '#2F6FED';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-12 overflow-visible"
        aria-label="AGL Creatives Logo"
      >
        <defs>
          {/* Main Blue Glow Gradient */}
          <linearGradient id="aglBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12295A" />
            <stop offset="45%" stopColor="#1E4CB0" />
            <stop offset="85%" stopColor="#2F6FED" />
            <stop offset="100%" stopColor="#4D8AFF" />
          </linearGradient>

          {/* Electric Blue Cross Gradient */}
          <linearGradient id="aglElectricGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#102550" />
            <stop offset="60%" stopColor="#2F6FED" />
            <stop offset="100%" stopColor="#5CA0FF" />
          </linearGradient>

          {/* Saffron Accent subtle touch */}
          <linearGradient id="saffronGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#FFB35C" />
          </linearGradient>

          {/* Filter for subtle logo sheen */}
          <filter id="subtleSheen" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity={isLight ? "0.3" : "0.08"} floodColor="#000" />
          </filter>
        </defs>

        {/* LOGO GLYPHS GROUP */}
        <g filter="url(#subtleSheen)">
          {/* 'A' Left Stem */}
          <path
            d="M52 14L8 92H24L38 65H68L78 84C74 86 69 88 64 90L60 92H82L52 14Z"
            fill={navyColor}
          />
          
          {/* 'A' Crossbar & Loop connector in Electric Blue */}
          <path
            d="M38 65L52 38L66 65H38Z"
            fill={isLight ? "#0A1930" : "#FAF7F2"}
          />
          <path
            d="M34 67C46 67 60 67 74 67C92 73 112 84 135 84C162 84 186 66 186 46C186 28 170 14 145 14C122 14 100 28 92 48L106 53C112 39 126 28 144 28C161 28 171 37 171 47C171 59 154 71 134 71C108 71 85 57 48 57L34 67Z"
            fill="url(#aglBlueGrad)"
          />

          {/* 'G' Large Bold Outer Arc */}
          <path
            d="M142 14C190 14 220 44 220 72C220 90 206 94 190 94H160V66H206C204 54 188 28 142 28C108 28 88 56 88 74C88 88 98 94 116 94C128 94 140 91 150 86V72H134V59H164V94C148 99 130 102 114 102C82 102 70 82 70 64C70 34 100 14 142 14Z"
            fill={navyColor}
          />

          {/* 'G' Inner Shelf Accent Blue Sweep */}
          <path
            d="M158 60H198L192 74H158V60Z"
            fill="url(#aglElectricGrad)"
          />

          {/* 'L' Vertical Stem */}
          <path
            d="M206 18H220V78H264L256 92H206V18Z"
            fill={navyColor}
          />

          {/* 'L' Base Highlight Bar */}
          <path
            d="M214 80H260C256 86 250 90 242 92H214V80Z"
            fill="url(#aglElectricGrad)"
          />
        </g>

        {/* SUBTITLE: AGL CREATIVES with tracking & sleek divider */}
        {showSubtitle && (
          <g>
            <text
              x="160"
              y="110"
              textAnchor="middle"
              fill={subtextColor}
              fontSize="12"
              fontWeight="600"
              letterSpacing="7"
              fontFamily="'Satoshi', sans-serif"
            >
              AGL CREATIVES
            </text>

            {/* Micro decorative divider line with center node */}
            <path
              d="M60 118H142M178 118H260"
              stroke={lineDividerColor}
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity={isLight ? "0.8" : "0.5"}
            />
            <circle
              cx="160"
              cy="118"
              r="2"
              fill="#2F6FED"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
