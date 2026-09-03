import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Globe2, 
  Landmark, 
  Layers, 
  Bot, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  FileText, 
  Receipt, 
  Building2, 
  ShoppingCart, 
  Code2, 
  Search, 
  Palette, 
  Users, 
  Compass, 
  ShieldCheck, 
  Workflow, 
  Cpu, 
  Store, 
  Rocket, 
  Briefcase, 
  Scale, 
  Calendar
} from 'lucide-react';
import { ServiceType } from '../types';

interface AboutPageProps {
  onNavigateHome: () => void;
  onSelectService: (serviceId: ServiceType) => void;
  onOpenConsultation: (serviceId?: ServiceType) => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onSelectService,
  onOpenConsultation,
  onNavigateContact
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="about-us-page" className="pt-24 pb-20 bg-gradient-to-b from-[#E5CB87] via-[#ECD8A5] to-[#E5CB87] min-h-screen">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FAF2DB] border-b-2 border-[#D9A62E] sticky top-16 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            id="about-breadcrumb-back-btn"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#092B4C] hover:text-[#D9A62E] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#F2DEAF] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9A62E]" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#092B4C]/80">
            <span className="cursor-pointer hover:text-[#092B4C]" onClick={onNavigateHome}>Home</span>
            <span>/</span>
            <span className="text-[#092B4C] font-extrabold">About Us</span>
          </div>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] overflow-hidden border-b-2 border-[#D9A62E] shadow-[0_10px_30px_-5px_rgba(3,30,27,0.5)]">
        {/* Background Image with Dark Emerald Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/corporate-female-banner.jpg" 
            alt="Corporate Advisory Office" 
            className="w-full h-full object-cover object-center scale-105 opacity-15"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D554D]/90 via-[#073630]/95 to-[#031E1B]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#021815]/50" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wider font-serif uppercase drop-shadow-md">
            ABOUT <span className="text-[#D9A62E]">US</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-xs">
            Professional support across taxation, company formation, e-commerce, websites, SEO, graphic design and AI-powered business solutions.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#042420] bg-gradient-to-b from-[#ECCB77] via-[#D9A62E] to-[#B8871E] hover:from-[#FFF0C2] hover:to-[#D9A62E] border-2 border-[#FFF0C2]/80 transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <span>Book Strategy Consultation</span>
              <Calendar className="w-4 h-4 text-[#042420]" />
            </button>
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#ECCB77] bg-[#021714] border-2 border-[#D9A62E] hover:bg-[#073630] transition-all cursor-pointer shadow-md"
            >
              <span>Contact Our Team</span>
              <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Page Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* 2. OUR APPROACH (4 Pillars) */}
        <section id="about-approach" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
              <Compass className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>How We Operate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042420] font-serif">
              Our Approach
            </h2>
            <p className="text-sm sm:text-base text-[#042420]/90 font-normal">
              We structure every client engagement around four core principles designed to deliver clarity, reliability, and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            
            {/* Principle 1: Clear Communication */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E]/70 text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-xs">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">
                    Clear Communication
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    Transparent updates, straightforward explanations without confusing jargon, and accessible advisory support at every stage of your project.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9A62E]/30 text-[11px] font-bold text-[#ECCB77]">
                  Pillar 01
                </div>
              </div>
            </div>

            {/* Principle 2: Practical Solutions */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E]/70 text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-xs">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">
                    Practical Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    Actionable, pragmatic guidance tailored to real-world commercial requirements, statutory frameworks, and operational feasibility.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9A62E]/30 text-[11px] font-bold text-[#ECCB77]">
                  Pillar 02
                </div>
              </div>
            </div>

            {/* Principle 3: Organized Processes */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E]/70 text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">
                    Organized Processes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    Structured milestone tracking, procedural compliance checklists, and disciplined timelines to keep every deliverable on schedule.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9A62E]/30 text-[11px] font-bold text-[#ECCB77]">
                  Pillar 03
                </div>
              </div>
            </div>

            {/* Principle 4: Client-Focused Guidance */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E]/70 text-[#ECCB77] flex items-center justify-center font-bold text-sm shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">
                    Client-Focused Guidance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                    Dedicated consulting aligned directly with your unique commercial objectives, growth stage, and jurisdictional footprint.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9A62E]/30 text-[11px] font-bold text-[#ECCB77]">
                  Pillar 04
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. OUR SOLUTIONS (4 Categorized Columns linking to all 9 dedicated service pages) */}
        <section id="about-solutions" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
              <Layers className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>Full Practice Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042420] font-serif">
              Our Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#042420]/90 font-normal">
              Four integrated practice categories covering all stages of business setup, compliance, digital growth, and operational automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            
            {/* Category 1: Setup & Formation */}
            <div className="relative group transition-all duration-300">
              <div className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60">
                      Pillar 1
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Setup & Formation
                    </h3>
                    <p className="text-xs text-[#ECCB77]/90 mt-0.5">
                      USA LLC & UK LTD corporate establishment.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D9A62E]/30 space-y-1.5">
                    <button
                      onClick={() => onSelectService('usa-llc')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#ECCB77]">USA LLC Formation</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectService('uk-ltd')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#ECCB77]">UK LTD Formation</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Filings & Compliance */}
            <div className="relative group transition-all duration-300">
              <div className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60">
                      Pillar 2
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Tax & Compliance
                    </h3>
                    <p className="text-xs text-[#ECCB77]/90 mt-0.5">
                      IRS & HMRC statutory reporting.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D9A62E]/30 space-y-1.5">
                    <button
                      onClick={() => onSelectService('usa-tax')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#ECCB77]">USA Taxation</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectService('uk-tax')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#ECCB77]">UK Taxation</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Digital & AI Solutions */}
            <div className="relative group transition-all duration-300">
              <div className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60">
                      Pillar 3
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Digital & AI Solutions
                    </h3>
                    <p className="text-xs text-[#ECCB77]/90 mt-0.5">
                      AI agents, websites, SEO & design.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D9A62E]/30 space-y-1.5">
                    <button
                      onClick={() => onSelectService('ai-agent')}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-[11px] font-bold text-white group-hover:text-[#ECCB77]">AI Agent Development</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectService('web-dev')}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-[11px] font-bold text-white group-hover:text-[#ECCB77]">Website Design & Dev</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectService('seo-services')}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-[11px] font-bold text-white group-hover:text-[#ECCB77]">SEO Services</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => onSelectService('graphic-design')}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-[11px] font-bold text-white group-hover:text-[#ECCB77]">Graphic Design Services</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 4: E-commerce */}
            <div className="relative group transition-all duration-300">
              <div className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 flex flex-col justify-between space-y-4 h-full relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60">
                      Pillar 4
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-serif">
                      E-Commerce Scale
                    </h3>
                    <p className="text-xs text-[#ECCB77]/90 mt-0.5">
                      Marketplace & multichannel consulting.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D9A62E]/30 space-y-1.5">
                    <button
                      onClick={() => onSelectService('ecommerce-consulting')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#021512]/50 border border-[#D9A62E]/40 hover:bg-[#073630] text-left transition-colors group cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span className="text-xs font-bold text-white group-hover:text-[#ECCB77]">E-commerce Consulting</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. WHO WE SERVE (6 Target Groups) */}
        <section id="about-who-we-serve" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
              <Users className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>Target Audience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042420] font-serif">
              Who We Serve
            </h2>
            <p className="text-sm sm:text-base text-[#042420]/90 font-normal">
              Our multidisciplinary capabilities are structured to support businesses at different stages of growth, scale, and international reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            
            {/* 1. Entrepreneurs */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">Entrepreneurs</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Founders launching their first commercial ventures, establishing structured legal entities, setting up compliant banking pathways, and building an initial brand presence.
                </p>
              </div>
            </div>

            {/* 2. Startups */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">Startups</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Fast-moving companies requiring rapid corporate formation, clean responsive web infrastructure, search engine discoverability, and foundational business compliance.
                </p>
              </div>
            </div>

            {/* 3. Small Businesses */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">Small Businesses</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Established enterprises seeking dependable ongoing tax filings, modern website enhancements, marketing graphic assets, or automated workflows to reduce overhead.
                </p>
              </div>
            </div>

            {/* 4. E-commerce Sellers */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">E-commerce Sellers</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Merchants selling across global marketplaces, Shopify, TikTok Shop, or multi-channel storefronts needing cross-border sales compliance, product visuals, and storefront optimization.
                </p>
              </div>
            </div>

            {/* 5. Online Businesses */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">Online Businesses</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Digital creators, SaaS companies, and service agencies requiring cohesive visual identities, high-conversion landing pages, and AI-assisted customer engagement systems.
                </p>
              </div>
            </div>

            {/* 6. International Business Owners */}
            <div className="relative group transition-all duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold shadow-xs">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-serif">International Business Owners</h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Non-resident founders navigating US LLC or UK LTD statutory obligations, registered agent requirements, foreign tax reporting, and cross-border commercial compliance.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 5. WHY WORK WITH US (4 Value Propositions) */}
        <section id="about-why-work-with-us" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>Core Strengths</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042420] font-serif">
              Why Work With UBS
            </h2>
            <p className="text-sm sm:text-base text-[#042420]/90 font-normal">
              Clear advantages rooted in breadth of expertise, disciplined execution, and dependable collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            
            <div className="relative group transition-all duration-300">
              <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold text-sm shadow-xs">
                  1
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  One Place for Multiple Business Needs
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Eliminate the friction of managing disconnected service providers. Access corporate registrations, tax compliance, web development, SEO, graphic design, and AI automation under one unified, coordinated advisory relationship.
                </p>
              </div>
            </div>

            <div className="relative group transition-all duration-300">
              <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold text-sm shadow-xs">
                  2
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  Cross-Border Business Perspective
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Benefit from structured insights into both United States and United Kingdom business ecosystems, ensuring cross-border operations, tax filing schedules, and international payment gateways are aligned without friction.
                </p>
              </div>
            </div>

            <div className="relative group transition-all duration-300">
              <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold text-sm shadow-xs">
                  3
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  Technology & Digital Expertise
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  Combine traditional corporate compliance with modern digital capabilities. We deploy modern web frameworks, search engine optimization best practices, polished brand visuals, and practical AI automation architectures.
                </p>
              </div>
            </div>

            <div className="relative group transition-all duration-300">
              <div className="p-7 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 space-y-3 relative overflow-hidden h-full">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E]/70 flex items-center justify-center font-bold text-sm shadow-xs">
                  4
                </div>
                <h3 className="text-lg font-bold text-white font-serif">
                  Clear and Structured Processes
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                  We operate through clear scopes of work, transparent milestone deliverables, and defined operational steps so you always understand timelines, requirements, and next actions.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 6. PROFESSIONAL DISCLAIMER */}
        <section id="about-disclaimer" className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] text-white flex items-start gap-4 shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
            <Scale className="w-6 h-6 text-[#ECCB77] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-[#ECCB77] uppercase tracking-wider text-[11px]">
                Professional Disclaimer
              </p>
              <p className="text-slate-100 font-normal">
                Information provided through this website is for general informational purposes and does not constitute legal, tax, accounting or financial advice. Services and requirements may vary depending on individual circumstances and jurisdiction. Clients should seek advice from appropriately qualified professionals where required.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Action CTA Section */}
        <section className="rounded-3xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] text-white p-8 sm:p-12 text-center relative overflow-hidden border-2 border-[#D9A62E] shadow-[0_12px_28px_-5px_rgba(3,30,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-6">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Ready to Discuss Your <span className="text-[#ECCB77]">Business Goals?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Connect directly with our advisory team to map out corporate formation, tax compliance, digital growth, or AI automation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenConsultation()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[#042420] bg-gradient-to-b from-[#ECCB77] via-[#D9A62E] to-[#B8871E] hover:from-[#FFF0C2] hover:to-[#D9A62E] border-2 border-[#FFF0C2]/80 transition-all shadow-md cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <Calendar className="w-4 h-4 text-[#042420]" />
            </button>
            <button
              onClick={onNavigateContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#ECCB77] bg-[#021714] hover:bg-[#073630] border-2 border-[#D9A62E]/70 transition-colors cursor-pointer shadow-md"
            >
              <span>Send Direct Inquiry</span>
              <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
