import React from 'react';

interface BoomerangVideoBgProps {
  overlayClassName?: string;
  imageUrl?: string;
}

// Single high-resolution, crystal-clear corporate glass skyscraper & skyline backdrop
const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2160&q=85";

export const BoomerangVideoBg: React.FC<BoomerangVideoBgProps> = ({
  imageUrl = DEFAULT_HERO_BG,
  overlayClassName = "bg-gradient-to-b from-[#DFAD36]/45 via-[#ECCB77]/35 to-[#D59E27]/55"
}) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Crystal-clear, stable corporate architecture backdrop - Single image, zero flicker */}
      <div className="w-full h-full scale-105 origin-center overflow-hidden relative">
        <img
          src={imageUrl}
          alt="Corporate Business Architecture"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center filter saturate-130 contrast-120 brightness-105"
        />
      </div>

      {/* Vibrant Luxury Amber & Gold Tone Enhancer */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`} />
      
      {/* Light gradient bottom fade to blend with hero content seamlessly */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#D59E27]/90 via-[#D59E27]/40 to-transparent z-10" />
    </div>
  );
};

