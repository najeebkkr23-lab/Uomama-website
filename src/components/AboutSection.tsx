import React from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  Target, 
  Users, 
  ArrowRight,
  Landmark,
  Layers,
  Bot,
  Sparkles,
  CheckCircle2,
  FileText,
  ShoppingCart
} from 'lucide-react';
import { ServiceType } from '../types';

interface AboutSectionProps {
  onOpenConsultation: (service?: ServiceType) => void;
  onSelectService?: (serviceId: ServiceType) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenConsultation,
  onSelectService 
}) => {
  return (
    <section id="about-us" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Globe2 className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>About UBS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            Smart Solutions. Better Business. Global Growth.
          </h2>

          <p className="text-base text-[#042420]/90 leading-relaxed font-normal">
            We are an international business and digital consultancy providing structured guidance across four strategic pillars: corporate setup, statutory tax compliance, digital growth & AI automation, and global e-commerce.
          </p>
        </div>

        {/* 4 Solution Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-16">
          
          {/* PILLAR 1 — BUSINESS SETUP & FORMATION */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14),0_4px_10px_-2px_rgba(4,36,32,0.08)] hover:shadow-[0_20px_36px_-6px_rgba(4,36,32,0.22)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full select-none hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold border-2 border-[#D9A62E] shadow-sm shrink-0">
                    <Landmark className="w-5 h-5 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF2DB] text-[#063E38] border border-[#D9A62E] shadow-xs">
                    Pillar 1
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif group-hover:text-[#0A564E] transition-colors">
                    Setup & Formation
                  </h3>
                  <p className="text-xs text-[#D9A62E] mt-0.5 font-bold">
                    USA LLC & UK LTD corporate establishment.
                  </p>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Strategic state selection, commercial registered agents, Articles of Organization, and Companies House registration.
                </p>

                <div className="pt-3 border-t border-[#D9A62E]/30 space-y-1.5 text-xs text-slate-800 font-medium bg-[#FAF2DB]/80 -mx-3 px-3 py-2 rounded-xl border border-[#D9A62E]/40">
                  <div className="flex items-center justify-between">
                    <span>USA LLC Formation</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('usa-llc')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>UK LTD Formation</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('uk-ltd')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 2 — FILINGS & COMPLIANCE */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14),0_4px_10px_-2px_rgba(4,36,32,0.08)] hover:shadow-[0_20px_36px_-6px_rgba(4,36,32,0.22)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full select-none hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold border-2 border-[#D9A62E] shadow-sm shrink-0">
                    <FileText className="w-5 h-5 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF2DB] text-[#063E38] border border-[#D9A62E] shadow-xs">
                    Pillar 2
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif group-hover:text-[#0A564E] transition-colors">
                    Tax & Compliance
                  </h3>
                  <p className="text-xs text-[#D9A62E] mt-0.5 font-bold">
                    IRS & HMRC statutory reporting.
                  </p>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Annual federal Form 5472/1120, state franchise filings, HMRC Corporation Tax CT600, and VAT advisory.
                </p>

                <div className="pt-3 border-t border-[#D9A62E]/30 space-y-1.5 text-xs text-slate-800 font-medium bg-[#FAF2DB]/80 -mx-3 px-3 py-2 rounded-xl border border-[#D9A62E]/40">
                  <div className="flex items-center justify-between">
                    <span>USA Taxation</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('usa-tax')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>UK Taxation</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('uk-tax')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 3 — DIGITAL & AI SOLUTIONS */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14),0_4px_10px_-2px_rgba(4,36,32,0.08)] hover:shadow-[0_20px_36px_-6px_rgba(4,36,32,0.22)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full select-none hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold border-2 border-[#D9A62E] shadow-sm shrink-0">
                    <Bot className="w-5 h-5 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF2DB] text-[#063E38] border border-[#D9A62E] shadow-xs">
                    Pillar 3
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif group-hover:text-[#0A564E] transition-colors">
                    Digital & AI
                  </h3>
                  <p className="text-xs text-[#D9A62E] mt-0.5 font-bold">
                    Web, SEO, Branding & AI Agents.
                  </p>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Modern responsive web engineering, technical organic search, memorable brand systems, and custom AI agents.
                </p>

                <div className="pt-3 border-t border-[#D9A62E]/30 space-y-1.5 text-xs text-slate-800 font-medium bg-[#FAF2DB]/80 -mx-3 px-3 py-2 rounded-xl border border-[#D9A62E]/40">
                  <div className="flex items-center justify-between">
                    <span>AI Agents</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('ai-agent')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Web & SEO</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('web-dev')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 4 — E-COMMERCE */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14),0_4px_10px_-2px_rgba(4,36,32,0.08)] hover:shadow-[0_20px_36px_-6px_rgba(4,36,32,0.22)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full select-none hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold border-2 border-[#D9A62E] shadow-sm shrink-0">
                    <ShoppingCart className="w-5 h-5 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF2DB] text-[#063E38] border border-[#D9A62E] shadow-xs">
                    Pillar 4
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif group-hover:text-[#0A564E] transition-colors">
                    E-Commerce Scale
                  </h3>
                  <p className="text-xs text-[#D9A62E] mt-0.5 font-bold">
                    Marketplaces, Shopify & TikTok Shop.
                  </p>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Marketplace verification, Brand Registry, payment routing, and international tax nexus synchronization.
                </p>

                <div className="pt-3 border-t border-[#D9A62E]/30 space-y-1.5 text-xs text-slate-800 font-medium bg-[#FAF2DB]/80 -mx-3 px-3 py-2 rounded-xl border border-[#D9A62E]/40">
                  <div className="flex items-center justify-between">
                    <span>E-Commerce Consulting</span>
                    {onSelectService && (
                      <button onClick={() => onSelectService('ecommerce-consulting')} className="text-[#063E38] hover:underline font-bold text-[11px] cursor-pointer">View →</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Practice Principles and Standards */}
        <div>
          <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-[#D9A62E] shadow-[0_12px_28px_-5px_rgba(4,36,32,0.15)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-sm border-2 border-[#D9A62E]">
                  1
                </div>
                <h4 className="text-base font-bold text-[#063E38] font-serif">Jurisdictional Precision</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Deep familiarity with IRS, UK Companies House, HMRC regulations, and US state compliance schedules.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-sm border-2 border-[#D9A62E]">
                  2
                </div>
                <h4 className="text-base font-bold text-[#063E38] font-serif">Modern Digital Standards</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Clean web engineering, white-hat search engine optimization, and brand assets designed for high-resolution clarity.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-sm border-2 border-[#D9A62E]">
                  3
                </div>
                <h4 className="text-base font-bold text-[#063E38] font-serif">Transparent Collaboration</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Clear deliverables, milestone tracking, direct communication, and realistic, honest project roadmaps.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#D9A62E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-700 font-semibold">
                Ready to explore tailored solutions for your business? Speak with a UBS advisor today.
              </p>
              <button
                id="about-consultation-btn"
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all text-xs cursor-pointer"
              >
                <span>Schedule Strategy Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
