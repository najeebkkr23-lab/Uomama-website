import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  FileText, 
  Receipt, 
  ShoppingCart, 
  ArrowRight, 
  Check, 
  Calendar,
  Sparkles,
  Bot,
  Code2,
  Search,
  Palette
} from 'lucide-react';
import { ServiceItem, ServiceType, ServiceCategory } from '../types';
import { servicesData } from '../data/services';

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceType) => void;
  onOpenConsultation: (serviceId?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenConsultation
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | ServiceCategory>('All');

  const getIcon = (id: ServiceType) => {
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

  const filteredServices = selectedFilter === 'All'
    ? servicesData
    : servicesData.filter((s) => s.category === selectedFilter);

  const filterOptions: ('All' | ServiceCategory)[] = [
    'All',
    'Business Setup & Formation',
    'Filings & Compliance',
    'Digital & AI Solutions',
    'E-Commerce'
  ];

  return (
    <section id="services" className="pt-12 pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>UBS Advisory & Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            9 Specialized Practice Areas
          </h2>
          <p className="text-base sm:text-lg text-[#042420]/90 leading-relaxed font-normal">
            Integrated support spanning USA/UK corporate formations, statutory tax compliance, global e-commerce consulting, high-performance web development, search engine strategy, brand design, and AI automation.
          </p>
        </div>

        {/* 4 Pillars Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              id={`service-filter-${filter.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#063E38] text-[#ECCB77] shadow-md border-2 border-[#D9A62E]'
                  : 'bg-[#FAF2DB] text-[#063E38] border-2 border-[#D9A62E]/60 hover:bg-[#F2DEAF] hover:border-[#D9A62E]'
              }`}
            >
              {filter === 'All' ? 'All 9 Practice Areas' : filter}
            </button>
          ))}
        </div>

        {/* 9 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.id);

            return (
              <div key={service.id} className="relative">
                <div
                  id={`service-card-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="flex flex-col justify-between rounded-2xl p-7 bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden cursor-pointer h-full select-none"
                >
                  {/* Top 3D Metallic Edge Reflection */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />

                  <div>
                    {/* Category & Jurisdiction Badge (3D mini cards) */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] flex items-center justify-center shadow-[0_3px_8px_rgba(3,30,27,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] border-2 border-[#D9A62E] shrink-0">
                        <Icon className="w-6 h-6 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#021815] text-[#ECCB77] border border-[#D9A62E]/60 shadow-xs">
                          {service.category}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#063E38] border border-[#ECCB77] text-[#ECCB77] shadow-xs">
                          {service.jurisdiction}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-xl font-bold text-white font-serif">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-100 leading-relaxed font-normal">
                        {service.shortDescription}
                      </p>

                      {/* Key Highlights (Clean embossed container) */}
                      <div className="pt-3 border-t border-[#D9A62E]/30 space-y-2 bg-[#021512]/30 -mx-3 px-3 py-2.5 rounded-xl border border-[#D9A62E]/20">
                        <p className="text-[11px] font-bold text-[#ECCB77] uppercase tracking-wider">Key Focus Areas:</p>
                        <ul className="space-y-1.5">
                          {service.keyHighlights.slice(0, 3).map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-100 font-medium">
                              <Check className="w-3.5 h-3.5 text-[#ECCB77] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions (3D Buttons) */}
                  <div className="pt-4 border-t border-[#D9A62E]/30 flex items-center gap-3">
                    <button
                      id={`service-learn-more-${service.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.id);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-[#ECCB77] bg-gradient-to-b from-[#063E38] to-[#021815] border-2 border-[#D9A62E] shadow-[0_3px_8px_rgba(3,30,27,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer"
                    >
                      <span>Service Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77]" />
                    </button>

                    <button
                      id={`service-book-btn-${service.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation(service.id);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold text-[#042420] bg-gradient-to-b from-[#ECCB77] via-[#D9A62E] to-[#B8871E] border-2 border-[#FFF0C2]/80 shadow-[0_3px_8px_rgba(3,30,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] cursor-pointer"
                    >
                      <span>Consult</span>
                      <Calendar className="w-3.5 h-3.5 text-[#042420]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Service Banner with clean 3D shadow & depth */}
        <div className="mt-16">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0D554D] via-[#073630] to-[#031E1B] text-white border-2 border-[#D9A62E] shadow-[0_12px_28px_-6px_rgba(3,30,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold font-serif text-[#ECCB77]">
                Looking for a Multi-Service Solution?
              </h3>
              <p className="text-xs sm:text-sm text-slate-100 max-w-xl font-normal">
                We frequently bundle company formation, tax compliance, web development, SEO, and AI automation for fast-growing global businesses.
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation()}
              className="px-6 py-3 rounded-xl font-bold text-[#042420] bg-gradient-to-b from-[#ECCB77] via-[#D9A62E] to-[#B8871E] hover:from-[#FFF0C2] hover:to-[#D9A62E] transition-all text-xs shrink-0 shadow-[0_6px_15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center gap-2 border-2 border-[#FFF0C2]/80 cursor-pointer"
            >
              <span>Speak With an Advisor</span>
              <ArrowRight className="w-4 h-4 text-[#042420]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
