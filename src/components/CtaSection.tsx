import React from 'react';
import { ArrowRight, ShieldCheck, Calendar, PhoneCall } from 'lucide-react';
import { ServiceType } from '../types';

interface CtaSectionProps {
  onOpenConsultation: (service?: ServiceType) => void;
  onNavigateContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenConsultation,
  onNavigateContact
}) => {
  return (
    <section id="cta-section" className="py-20 lg:py-24 bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white relative overflow-hidden border-t-2 border-b-2 border-[#D9A62E] shadow-2xl">
      {/* Subtle brand ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A62E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#031E1B]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
          <ShieldCheck className="w-4 h-4 text-[#ECCB77]" />
          <span>Professional Cross-Border Advisory</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white max-w-3xl mx-auto leading-tight">
          Ready to Establish and Grow Your <span className="text-[#ECCB77] underline decoration-[#D9A62E] decoration-4">US or UK Business?</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
          Schedule a personalized strategy consultation to review your entity structure, statutory filing timelines, and global digital presence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            id="bottom-cta-book-btn"
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border-2 border-[#D9A62E] shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-[#042420]" />
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#042420]" />
          </button>

          <button
            id="bottom-cta-contact-btn"
            onClick={onNavigateContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white bg-[#031E1B] hover:bg-[#06332E] border-2 border-[#D9A62E] transition-colors shadow-md cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#ECCB77]" />
            <span>Send an Inquiry</span>
          </button>
        </div>

        <div className="pt-6 border-t border-[#D9A62E]/30 text-xs font-bold text-slate-200 flex flex-wrap justify-center items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="text-[#ECCB77] font-bold">✓</span> Direct 1-on-1 Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#ECCB77] font-bold">✓</span> Customized Strategy Plan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#ECCB77] font-bold">✓</span> USA & UK Cross-Border Scope
          </span>
        </div>

      </div>
    </section>
  );
};
