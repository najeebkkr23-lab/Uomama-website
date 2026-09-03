import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'full' | 'mark' | 'horizontal';
  isFooter?: boolean;
  onClick?: () => void;
}

export const UomamaLogo: React.FC<LogoProps> = ({ 
  className = "", 
  showTagline = true,
  variant = 'full',
  isFooter = false,
  onClick
}) => {
  const { settings } = useSiteSettings();
  const customLogoUrl = settings?.branding?.logoUrl;
  const brandName = settings?.branding?.brandName || 'Uomama Business Solutions';
  const tagline = settings?.branding?.tagline || 'Smart Solutions • Better Business • Global Growth';

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  if (variant === 'mark') {
    return (
      <div 
        onClick={handleClick}
        className={`relative flex items-center justify-center shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className || 'h-13 w-13 sm:h-16 sm:w-16 md:h-20 md:w-20'}`}
      >
        {customLogoUrl ? (
          <div className="w-full h-full p-1 bg-white rounded-xl sm:rounded-2xl border-2 border-[#D9A62E] flex items-center justify-center overflow-hidden shadow-xs">
            <img 
              src={customLogoUrl} 
              alt={brandName}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <svg viewBox="0 0 500 450" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="markEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B5C54" />
                <stop offset="50%" stopColor="#063E38" />
                <stop offset="100%" stopColor="#032622" />
              </linearGradient>
              <linearGradient id="markGold" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B37D14" />
                <stop offset="40%" stopColor="#F5D061" />
                <stop offset="80%" stopColor="#ECCB77" />
                <stop offset="100%" stopColor="#FFF3C4" />
              </linearGradient>
            </defs>
            <path d="M 120 40 L 215 40 C 225 90 225 170 225 220 C 225 300 255 340 320 340 C 270 375 190 370 150 320 C 115 270 110 160 120 40 Z" fill="url(#markEmerald)" />
            <path d="M 370 40 L 465 40 C 465 160 455 270 420 320 C 380 370 300 375 250 340 C 315 340 345 300 345 220 C 345 170 345 90 370 40 Z" fill="url(#markEmerald)" />
            <circle cx="195" cy="220" r="55" fill="url(#markGold)" stroke="#063E38" strokeWidth="2" />
            <path d="M 170 200 Q 185 190 200 205 Q 215 220 205 235 Q 185 245 175 225 Z M 210 190 Q 225 200 220 215 Q 205 210 210 190 Z" fill="#063E38" />
            <rect x="270" y="220" width="16" height="45" rx="3" fill="#0B5C54" />
            <rect x="295" y="185" width="16" height="80" rx="3" fill="#0B5C54" />
            <rect x="320" y="145" width="16" height="120" rx="3" fill="url(#markGold)" />
            <rect x="345" y="100" width="16" height="165" rx="3" fill="url(#markGold)" />
            <path d="M 125 230 C 125 300 200 330 280 300 C 360 270 410 190 495 80 L 490 130 L 515 60 L 445 75 L 485 90 C 405 190 350 250 275 275 C 210 295 155 275 150 225 Z" fill="url(#markGold)" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))" />
          </svg>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className={`inline-flex items-center gap-2 sm:gap-3 md:gap-4 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Prominent Logo Icon Badge - Enlarged for crystal-clear readability on Mobile, Tablet & Laptop */}
      <div className={`h-[52px] w-[52px] sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 ${customLogoUrl ? 'w-auto min-w-[3.25rem] max-w-[8rem] sm:max-w-[10rem] md:max-w-[13rem] lg:max-w-[15rem] px-2' : ''} rounded-xl sm:rounded-2xl ${isFooter || customLogoUrl ? 'bg-white' : 'bg-[#FAF2DB]'} p-1.5 sm:p-2 border-2 border-[#D9A62E] shadow-sm flex items-center justify-center shrink-0 overflow-hidden`}>
        {customLogoUrl ? (
          <img 
            src={customLogoUrl} 
            alt={brandName}
            className="h-full w-auto max-w-full object-contain block mx-auto"
            referrerPolicy="no-referrer"
          />
        ) : (
          <svg viewBox="0 0 520 450" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="logoUColor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B5C54" />
                <stop offset="60%" stopColor="#063E38" />
                <stop offset="100%" stopColor="#032622" />
              </linearGradient>
              <linearGradient id="logoGoldColor" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B37D14" />
                <stop offset="40%" stopColor="#F5D061" />
                <stop offset="80%" stopColor="#ECCB77" />
                <stop offset="100%" stopColor="#FFF3C4" />
              </linearGradient>
            </defs>
            <path d="M 120 40 L 215 40 C 225 90 225 170 225 220 C 225 300 255 340 320 340 C 270 375 190 370 150 320 C 115 270 110 160 120 40 Z" fill="url(#logoUColor)" />
            <path d="M 370 40 L 465 40 C 465 160 455 270 420 320 C 380 370 300 375 250 340 C 315 340 345 300 345 220 C 345 170 345 90 370 40 Z" fill="url(#logoUColor)" />
            <circle cx="195" cy="220" r="55" fill="url(#logoGoldColor)" stroke="#063E38" strokeWidth="2" />
            <path d="M 170 200 Q 185 190 200 205 Q 215 220 205 235 Q 185 245 175 225 Z M 210 190 Q 225 200 220 215 Q 205 210 210 190 Z" fill="#063E38" />
            <rect x="270" y="220" width="16" height="45" rx="3" fill="#0B5C54" />
            <rect x="295" y="185" width="16" height="80" rx="3" fill="#0B5C54" />
            <rect x="320" y="145" width="16" height="120" rx="3" fill="url(#logoGoldColor)" />
            <rect x="345" y="100" width="16" height="165" rx="3" fill="url(#logoGoldColor)" />
            <path d="M 125 230 C 125 300 200 330 280 300 C 360 270 410 190 495 80 L 490 130 L 515 60 L 445 75 L 485 90 C 405 190 350 250 275 275 C 210 295 155 275 150 225 Z" fill="url(#logoGoldColor)" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))" />
          </svg>
        )}
      </div>
      
      {/* Brand Name & Tagline Box (Clickable to Home) - Prominent Typography */}
      <div className="flex flex-col text-left select-none">
        <div className={`inline-flex items-center px-2.5 sm:px-4 md:px-5 py-1 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl md:rounded-2xl ${isFooter ? 'bg-[#063E38]/95 text-white' : 'bg-[#063E38] text-[#ECCB77]'} border border-[#D9A62E] sm:border-2 shadow-xs`}>
          <span 
            id="brand-name-text"
            className={`text-xs sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight font-serif whitespace-nowrap ${isFooter ? 'text-white' : 'text-[#ECCB77]'}`}
          >
            {brandName}
          </span>
        </div>
        {showTagline && (
          <span 
            id="brand-tagline-text"
            className={`block text-[9px] sm:text-xs md:text-sm font-bold ${isFooter ? 'text-[#ECCB77]' : 'text-[#063E38]'} tracking-tight mt-0.5 sm:mt-1 select-none`}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};

