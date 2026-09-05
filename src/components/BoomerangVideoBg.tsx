import React from 'react';

interface BoomerangVideoBgProps {
  overlayClassName?: string;
  imageUrl?: string;
}

// The exact high-definition corporate skyline visual that previously loaded afterwards, now served instantly with zero flicker
const DEFAULT_HERO_BG = "/hero-bg.webp";

export const BoomerangVideoBg: React.FC<BoomerangVideoBgProps> = ({
  imageUrl = DEFAULT_HERO_BG,
  overlayClassName = "bg-gradient-to-b from-[#DFAD36]/45 via-[#ECCB77]/35 to-[#D59E27]/55"
}) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Crystal-clear, exact corporate skyline architecture backdrop - Zero delay, zero flicker */}
      <div className="w-full h-full scale-105 origin-center overflow-hidden relative">
        <picture>
          <source srcSet={imageUrl} type="image/webp" />
          <img
            src="/hero-bg.jpg"
            alt="Corporate Skyline Architecture"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center filter saturate-135 contrast-120 brightness-105"
          />
        </picture>
      </div>

      {/* Vibrant Luxury Amber & Gold Tone Enhancer */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`} />
      
      {/* Light gradient bottom fade to blend with hero content seamlessly */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#D59E27]/90 via-[#D59E27]/40 to-transparent z-10" />
    </div>
  );
};


