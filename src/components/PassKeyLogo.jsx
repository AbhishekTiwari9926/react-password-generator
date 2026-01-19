import React from 'react';

export const PassKeyLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { width: 24, height: 24, iconSize: 12 },
    md: { width: 40, height: 40, iconSize: 20 },
    lg: { width: 48, height: 48, iconSize: 24 },
    xl: { width: 64, height: 64, iconSize: 32 },
  };

  const { width, height, iconSize } = sizes[size] || sizes.md;

  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="passKeyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="passKeyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Shield background */}
      <path
        d="M 32 8 L 48 16 L 48 32 C 48 44 32 56 32 56 C 32 56 16 44 16 32 L 16 16 Z"
        fill="url(#passKeyGradient1)"
        opacity="0.9"
      />

      {/* Shield border */}
      <path
        d="M 32 8 L 48 16 L 48 32 C 48 44 32 56 32 56 C 32 56 16 44 16 32 L 16 16 Z"
        fill="none"
        stroke="url(#passKeyGradient2)"
        strokeWidth="2"
      />

      {/* Key shape inside shield */}
      <g transform="translate(32, 32)">
        {/* Key shaft - horizontal line */}
        <rect x="-12" y="-3" width="16" height="6" rx="3" fill="white" />

        {/* Key head - circle */}
        <circle cx="-12" cy="0" r="6" fill="white" />

        {/* Key teeth - rectangles */}
        <rect x="5" y="-2" width="3" height="4" fill="white" />
        <rect x="10" y="-2" width="3" height="4" fill="white" />

        {/* Shine effect */}
        <circle cx="-12" cy="-2" r="2" fill="url(#passKeyGradient2)" opacity="0.6" />
      </g>

      {/* Accent dot */}
      <circle cx="52" cy="24" r="3" fill="url(#passKeyGradient2)" opacity="0.8" />
    </svg>
  );
};

export const PassKeyLogoText = ({ size = 'md', showText = true, className = '' }) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size] || 'text-2xl';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PassKeyLogo size={size} />
      {showText && (
        <span className={`${textSizes} font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
          Pass Key
        </span>
      )}
    </div>
  );
};
