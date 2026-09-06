import React from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  Target, 
  Users, 
  ArrowRight,
  Landmark,
  Layers,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Scale,
  Award,
  Building2
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
            <span>Corporate Profile & Governance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            Architecting Global Enterprise & Compliance
          </h2>

          <p className="text-base text-[#042420]/90 leading-relaxed font-normal">
            Uomama Business Solutions (UBS) is a premier cross-border corporate advisory firm. We bridge the gap between regulatory requirements and modern commercial growth across the United States and the United Kingdom.
          </p>
        </div>

        {/* Editorial Executive Presentation (2 Columns - No Card Clutter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Prestigious Corporate Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E] to-transparent opacity-90 pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D9A62E] uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-[#063E38]" />
                <span>The UBS Standard</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-[#063E38] font-serif leading-tight">
                Institutional Precision for Modern Global Founders
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed mt-4">
                Operating an international company demands rigorous statutory governance, unwavering tax accuracy, and modern commercial readiness. Unlike automated generic platforms, UBS combines deep jurisdictional knowledge with dedicated senior advisory.
              </p>

              <div className="mt-6 pt-6 border-t border-[#D9A62E]/30 space-y-3.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#063E38] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#063E38] uppercase">Cross-Border Dual Hub</h4>
                    <p className="text-xs text-slate-600">Dedicated jurisdictional execution for USA (DE, WY, NM, FL) and UK Companies House.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#063E38] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#063E38] uppercase">Bank & Gateway Readiness</h4>
                    <p className="text-xs text-slate-600">Structuring corporate documentation for instant approval with Stripe, Mercury, Relay, and Wise.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#063E38] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#063E38] uppercase">100% On-Time Statutory Filings</h4>
                    <p className="text-xs text-slate-600">Zero penalty record across IRS Form 5472/1120, Annual Reports, and HMRC CT600 & VAT.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Strategic Institutional Commitments */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_8px_20px_-4px_rgba(4,36,32,0.1)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border-2 border-[#D9A62E] shadow-sm">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#063E38] font-serif">Absolute Statutory Precision</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Every filing undergoes thorough dual-tier legal and accounting review before submission to state departments or revenue authorities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_8px_20px_-4px_rgba(4,36,32,0.1)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border-2 border-[#D9A62E] shadow-sm">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#063E38] font-serif">Transparent Milestones & Deliverables</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  You receive clear timelines, official government confirmation documents, and upfront guidance with zero hidden fees.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_8px_20px_-4px_rgba(4,36,32,0.1)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border-2 border-[#D9A62E] shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#063E38] font-serif">Direct Senior Advisory Access</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Never interact with generic call centers. Work directly with experienced corporate specialists who understand your exact business model.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-[0_8px_20px_-4px_rgba(4,36,32,0.1)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border-2 border-[#D9A62E] shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#063E38] font-serif">Complete Client Confidentiality</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Strict non-disclosure agreements, encrypted document handling, and registered agent privacy protection.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Executive Metrics Strip (High-Trust Authority) */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border-2 border-[#D9A62E] shadow-[0_12px_28px_-5px_rgba(4,36,32,0.15)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E] to-transparent opacity-90 pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#D9A62E]/30">
            <div className="space-y-1 pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#063E38] font-serif">500+</p>
              <p className="text-xs font-bold text-[#D9A62E] uppercase tracking-wider">Entities Formed</p>
              <p className="text-[11px] text-slate-600">Across USA & UK Jurisdictions</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#063E38] font-serif">100%</p>
              <p className="text-xs font-bold text-[#D9A62E] uppercase tracking-wider">Compliance Record</p>
              <p className="text-[11px] text-slate-600">Zero Statutory Late Penalties</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#063E38] font-serif">2 Hubs</p>
              <p className="text-xs font-bold text-[#D9A62E] uppercase tracking-wider">USA & UK Operations</p>
              <p className="text-[11px] text-slate-600">Direct Local Registered Presence</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#063E38] font-serif">&lt; 24h</p>
              <p className="text-xs font-bold text-[#D9A62E] uppercase tracking-wider">Advisory Response</p>
              <p className="text-[11px] text-slate-600">Dedicated Direct Client Support</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#D9A62E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-700 font-semibold text-center sm:text-left">
              Speak directly with a senior corporate advisor to review your cross-border roadmap.
            </p>
            <button
              id="about-consultation-btn"
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all text-xs cursor-pointer hover:border-[#ECCB77]"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
