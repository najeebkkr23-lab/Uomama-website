import React, { useEffect, useRef, useState } from 'react';

interface BoomerangVideoBgProps {
  videoUrl?: string;
  overlayClassName?: string;
}

const DEFAULT_VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4";

export const BoomerangVideoBg: React.FC<BoomerangVideoBgProps> = ({
  videoUrl = DEFAULT_VIDEO_URL,
  overlayClassName = "bg-gradient-to-b from-[#DFAD36]/45 via-[#ECCB77]/35 to-[#D59E27]/55"
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load and pause at a crystal-clear, sharp frame of the corporate skyline
    const handleLoadedMetadata = () => {
      // Seek to a pristine, detailed frame with maximum skyline visibility
      video.currentTime = 1.2;
      video.pause();
      setIsLoaded(true);
    };

    const handleSeeked = () => {
      video.pause();
      setIsLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Still, high-clarity corporate buildings background with enhanced colors */}
      <div className="w-full h-full scale-105 origin-center overflow-hidden relative">
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-center filter saturate-140 contrast-125 brightness-105"
        />

        {/* Fallback architectural backdrop if video takes a moment to load */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 filter saturate-130 contrast-120 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=85')`
          }}
        />
      </div>

      {/* Vibrant Luxury Amber & Gold Tone Enhancer - Buildings are clearly visible */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`} />
      
      {/* Light gradient bottom fade to blend with hero content seamlessly */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#D59E27]/90 via-[#D59E27]/40 to-transparent z-10" />
    </div>
  );
};
