import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  FileCheck, 
  Globe2, 
  Sparkles,
  Search,
  Palette,
  Bot,
  Code2,
  Building2,
  Landmark,
  FileText,
  Receipt,
  ShoppingCart,
  Monitor,
  Smartphone,
  Layout,
  PieChart,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { ServiceItem, ServiceType } from '../types';
import { servicesData } from '../data/services';

interface DedicatedServicePageProps {
  serviceId: ServiceType;
  onNavigateHome: () => void;
  onSelectService: (serviceId: ServiceType) => void;
  onOpenConsultation: (serviceId?: ServiceType) => void;
}

export const DedicatedServicePage: React.FC<DedicatedServicePageProps> = ({
  serviceId,
  onNavigateHome,
  onSelectService,
  onOpenConsultation
}) => {
  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  const getServiceIcon = (id: ServiceType) => {
    switch (id) {
      case 'usa-tax': return FileText;
      case 'uk-tax': return Receipt;
      case 'usa-llc': return Landmark;
      case 'uk-ltd': return Building2;
      case 'ecommerce-consulting': return ShoppingCart;
      case 'ai-agent': return Bot;
      case 'web-dev': return Code2;
      case 'seo-services': return Search;
      case 'graphic-design': return Palette;
      default: return Sparkles;
    }
  };

  const ServiceIcon = getServiceIcon(service.id);
  const relatedServices = servicesData.filter((s) => service.relatedServiceIds?.includes(s.id));

  return (
    <div id={`dedicated-service-page-${service.id}`} className="pt-24 pb-20 bg-gradient-to-b from-[#E5CB87] via-[#ECD8A5] to-[#E5CB87] min-h-screen">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#FAF2DB] border-b-2 border-[#D9A62E] sticky top-16 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <button
            id="breadcrumb-back-home-btn"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#042420] hover:text-[#042420] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#ECD8A5]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9A62E]" />
            <span>Back to All Services</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#ECD8A5] border border-[#D9A62E] text-[#042420] text-xs font-bold">
              {service.category}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#031E1B] border border-[#D9A62E] text-[#ECCB77] text-xs font-bold">
              {service.jurisdiction}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-22 bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] overflow-hidden border-b-2 border-[#D9A62E]">
        {/* Background Image with Dark Emerald Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/corporate-female-banner.jpg" 
            alt="Corporate Advisory Office" 
            className="w-full h-full object-cover object-center scale-105 opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4740]/95 via-[#073630]/90 to-[#042420]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#042420]/60" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#031E1B] border border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
            <ServiceIcon className="w-4 h-4 text-[#ECCB77]" />
            <span>{service.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif max-w-4xl mx-auto leading-tight drop-shadow-md">
            {service.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-xs">
            {service.heroSupportingText}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="service-page-hero-book-btn"
              onClick={() => onOpenConsultation(service.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border-2 border-[#D9A62E] shadow-lg transition-all group cursor-pointer"
            >
              <span>Book Strategy Consultation</span>
              <Calendar className="w-4 h-4 text-[#042420] group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('service-detailed-offerings');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-[#D9A62E]/40 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <span>View Service Offerings</span>
              <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section A: Comprehensive Service Offerings / Cards */}
        {service.offerings && service.offerings.length > 0 && (
          <section id="service-detailed-offerings" className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#031E1B] border border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Layers className="w-3.5 h-3.5 text-[#ECCB77]" />
                <span>Service Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042420] font-serif">
                {service.title} <span className="text-[#042420]">Offerings</span>
              </h2>
              <p className="text-sm sm:text-base text-[#042420]/80">
                Tailored solutions engineered with precision, transparent standards, and complete operational alignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.offerings.map((offering, idx) => (
                <div
                  key={idx}
                  id={`offering-card-${service.id}-${idx}`}
                  className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_12px_28px_rgba(4,36,32,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col justify-between select-none"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] border-2 border-[#D9A62E] flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] shrink-0">
                        <ServiceIcon className="w-5 h-5 text-[#ECCB77] drop-shadow-sm shrink-0" />
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-serif">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                      {offering.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#D9A62E]/30 flex items-center text-xs font-bold text-[#ECCB77]">
                    <span>Professional Scope</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section B for Graphic Design: Digital Channels */}
        {service.digitalChannels && service.digitalChannels.length > 0 && (
          <section className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-8 sm:p-10 border-2 border-[#D9A62E]/70 shadow-[0_12px_30px_rgba(4,36,32,0.45)] space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">Versatile Creative Application</span>
              <h2 className="text-2xl font-bold text-white font-serif">
                Design for Digital Business
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                We craft modern, cohesive graphic assets tailored to your brand's digital presence across every key channel:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
              {service.digitalChannels.map((channel, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 text-center hover:bg-[#06332E] hover:border-[#D9A62E] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-[#ECCB77] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">{channel}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Structured Process */}
        {service.processSteps && service.processSteps.length > 0 && (
          <section className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-8 sm:p-12 border-2 border-[#D9A62E]/70 shadow-[0_12px_30px_rgba(4,36,32,0.45)] space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">Structured Roadmap</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                Our {service.processSteps.length}-Step Execution Process
              </h2>
              <p className="text-sm text-slate-200 font-medium">
                A disciplined, milestone-driven framework designed to ensure quality, accuracy, and clear communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.processSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-6 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 relative space-y-3 shadow-[0_6px_18px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(4,36,32,0.5)] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A4740] text-[#ECCB77] text-xs font-bold border border-[#D9A62E]/50">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ECCB77]/80">
                      Phase {step.stepNumber}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section C: What We Focus On & Detailed Scope */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: What We Focus On */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-8 border-2 border-[#D9A62E]/70 shadow-[0_12px_30px_rgba(4,36,32,0.45)] space-y-6">
            <div className="space-y-2 border-b border-[#D9A62E]/30 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">Execution Discipline</span>
              <h3 className="text-xl font-bold text-white font-serif">
                What We Focus On
              </h3>
              <p className="text-xs text-slate-200 font-medium">
                Our standards are grounded in measurable quality, technical integrity, and reliable business outcomes.
              </p>
            </div>

            <div className="space-y-3">
              {(service.focusAreas || service.keyHighlights).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 text-xs sm:text-sm text-slate-100 font-semibold shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ECCB77]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Scope Deliverables */}
            <div className="pt-4 border-t border-[#D9A62E]/30 space-y-3">
              <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Key Deliverables:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#031E1B] border border-[#D9A62E]/50 text-center shadow-xs">
                    <FileCheck className="w-4 h-4 text-[#ECCB77] mx-auto mb-1" />
                    <p className="text-[11px] font-bold text-white line-clamp-2">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detailed Scope Breakdown */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-8 border-2 border-[#D9A62E]/70 shadow-[0_12px_30px_rgba(4,36,32,0.45)] space-y-6">
            <div className="space-y-2 border-b border-[#D9A62E]/30 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">Detailed Scope</span>
              <h3 className="text-xl font-bold text-white font-serif">
                Advisory & Execution Coverage
              </h3>
              <p className="text-xs text-slate-200 font-medium">
                Transparent scope boundaries to ensure full alignment and reliable project delivery.
              </p>
            </div>

            <div className="space-y-3">
              {service.scopePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 text-xs sm:text-sm text-slate-100 leading-relaxed font-medium shadow-xs">
                  <Check className="w-4 h-4 text-[#ECCB77] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#031E1B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-[#D9A62E] shadow-md">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Ready to Get Started?</p>
                <p className="text-xs text-slate-300">Schedule a direct strategy consultation.</p>
              </div>
              <button
                id="service-scope-consult-btn"
                onClick={() => onOpenConsultation(service.id)}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] transition-colors shrink-0 shadow-sm cursor-pointer border border-[#D9A62E]"
              >
                Book Consultation
              </button>
            </div>
          </div>

        </section>

        {/* Section: Related Services Cross-Linking (Mandatory Requirement) */}
        {relatedServices.length > 0 && (
          <section id="service-related-services" className="pt-10 border-t-2 border-[#D9A62E] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-[#042420] font-serif">
                  Related Services
                </h3>
                <p className="text-xs text-[#042420]/80 font-medium">
                  Complementary solutions to further strengthen your business and digital presence.
                </p>
              </div>
              <span className="text-xs font-bold text-[#042420]">
                Integrated Business Ecosystem
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel) => {
                const RelIcon = getServiceIcon(rel.id);
                return (
                  <button
                    key={rel.id}
                    id={`related-service-card-${rel.id}`}
                    onClick={() => onSelectService(rel.id)}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_12px_28px_rgba(4,36,32,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] text-left flex flex-col justify-between cursor-pointer select-none"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E] text-[#ECCB77] flex items-center justify-center shadow-xs shrink-0">
                          <RelIcon className="w-5 h-5 text-[#ECCB77] drop-shadow-sm shrink-0" />
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#021815] border border-[#D9A62E]/60 text-[#ECCB77]">
                          {rel.jurisdiction}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white font-serif">
                        {rel.title}
                      </h4>

                      <p className="text-xs text-slate-100 line-clamp-2 font-normal">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#D9A62E]/30 flex items-center justify-between text-xs font-bold text-[#ECCB77]">
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-2xl bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white p-8 sm:p-12 text-center relative overflow-hidden border-2 border-[#D9A62E] shadow-2xl space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Speak With an Advisor Regarding <span className="text-[#ECCB77]">{service.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              We provide clear, step-by-step guidance tailored to your corporate structure, timelines, and operational requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenConsultation(service.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E]/40 transition-colors shadow-lg cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <Calendar className="w-4 h-4 text-[#042420]" />
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#031E1B] hover:bg-[#06332E] border border-[#D9A62E] transition-colors cursor-pointer"
            >
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
