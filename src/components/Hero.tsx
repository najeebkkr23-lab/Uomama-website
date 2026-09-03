import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2,
  Award
} from 'lucide-react';
import { ServiceType } from '../types';
import { BoomerangVideoBg } from './BoomerangVideoBg';

interface HeroProps {
  onOpenConsultation: (service?: ServiceType) => void;
  onExploreServices: () => void;
  onSelectService?: (service: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onExploreServices
}) => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 lg:pb-14 overflow-hidden bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27]">
      {/* Crystal-clear, static corporate skyline backdrop with enhanced rich colors */}
      <BoomerangVideoBg 
        overlayClassName="bg-gradient-to-b from-[#DFAD36]/50 via-[#ECCB77]/35 to-[#D59E27]/60"
      />

      {/* Background rich luxury gold geometric accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-1">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#D9A62E]/60 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#D9A62E]/50 blur-3xl" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#042420_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#042420] tracking-tight leading-[1.12] font-serif">
            Global Company Formations, <span className="text-[#042420] underline decoration-[#063E38] decoration-4">Tax Advisory</span>, E-Commerce & <span className="text-[#042420] underline decoration-[#063E38] decoration-4">AI Solutions</span>
          </h1>

          {/* Subtitle / Narrative */}
          <p className="text-base sm:text-xl text-[#042420] leading-relaxed max-w-3xl mx-auto font-medium">
            <strong className="text-[#042420] font-extrabold">UBS</strong> empowers international founders, cross-border merchants, and expanding enterprises. We deliver end-to-end execution across USA & UK company formations, IRS & HMRC tax compliance, e-commerce scale, modern web engineering, and custom AI agents.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-4">
            <button
              id="hero-primary-cta"
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-xl hover:shadow-2xl transition-all duration-200 group cursor-pointer text-sm"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#ECCB77] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onExploreServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[#042420] bg-[#FAF2DB] hover:bg-white border-2 border-[#063E38] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
            >
              <span>Explore All 9 Services</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3D Realistic Embossed Divider Bar */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none">
        {/* Top Gold Metallic Bevel Highlight */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#ECCB77] via-[#FFF3D1] to-[#ECCB77] shadow-[0_1px_2px_rgba(255,255,255,0.6)]" />
        
        {/* Main 3D Dark Emerald Beveled Bar with Inset Highlights */}
        <div className="h-[8px] w-full bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] border-y border-[#D9A62E]/60 shadow-[0_6px_14px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]" />
        
        {/* Deep Bottom Drop Shadow Edge */}
        <div className="h-[3px] w-full bg-gradient-to-b from-[#000000]/60 to-transparent" />
      </div>
    </section>
  );
};
