import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Landmark,
  Building2,
  FileCheck,
  ShieldCheck,
  CreditCard,
  ShoppingCart,
  ShieldAlert,
  Search,
  Receipt,
  Sparkles,
  Award
} from 'lucide-react';
import { ServiceType } from '../types';

interface PortfolioPageProps {
  onNavigateHome: () => void;
  onSelectService: (serviceId: ServiceType) => void;
  onOpenConsultation: () => void;
  onNavigateContact: () => void;
}

interface PortfolioCardItem {
  num: string;
  title: string;
  desc: string;
  serviceKey: ServiceType;
  icon: React.ElementType;
}

const clientPortfolioItems: PortfolioCardItem[] = [
  {
    num: '01',
    title: 'USA LLC Formation & Business Setup',
    desc: 'LLC formation, EIN related support, registered agent setup, seller permits, resale certificates and business documentation.',
    serviceKey: 'usa-llc',
    icon: Landmark
  },
  {
    num: '02',
    title: 'UK LTD Formation & Companies House',
    desc: 'UK LTD formation, Companies House registration, identity verification guidance and company documentation.',
    serviceKey: 'uk-ltd',
    icon: Building2
  },
  {
    num: '03',
    title: 'Seller Permit & Resale Certificate',
    desc: 'Seller permit applications, resale certificate guidance, sales tax registration support and state-specific documentation.',
    serviceKey: 'usa-llc',
    icon: FileCheck
  },
  {
    num: '04',
    title: 'Registered Agent Services',
    desc: 'Registered agent setup and change, business correspondence coordination and ongoing LLC maintenance guidance.',
    serviceKey: 'usa-llc',
    icon: ShieldCheck
  },
  {
    num: '05',
    title: 'Virtual Business Banking Setup',
    desc: 'Virtual business account setup, application guidance, verification and documentation support.',
    serviceKey: 'usa-llc',
    icon: CreditCard
  },
  {
    num: '06',
    title: 'E-Commerce Marketplace Setup',
    desc: 'Account setup, verification, deactivation support, reactivation guidance, identity verification and marketplace related compliance.',
    serviceKey: 'ecommerce-consulting',
    icon: ShoppingCart
  },
  {
    num: '07',
    title: 'Seller Central Compliance',
    desc: 'Compliance guidance, documentation requirements, authenticity and supply chain documentation, and verification case support.',
    serviceKey: 'ecommerce-consulting',
    icon: ShieldAlert
  },
  {
    num: '08',
    title: 'Product Research & Analysis',
    desc: 'Keepa and Seller Amp analysis, sales estimation, competition analysis, profitability analysis and product shortlisting.',
    serviceKey: 'ecommerce-consulting',
    icon: Search
  },
  {
    num: '09',
    title: 'Business Compliance & Documentation',
    desc: 'US and UK filings, VAT-related support, compliance documentation and application preparation, coordinated with relevant professionals where specialist advice is required.',
    serviceKey: 'usa-tax',
    icon: Receipt
  }
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigateHome,
  onSelectService,
  onOpenConsultation,
  onNavigateContact
}) => {
  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] min-h-screen text-[#042420]">
      
      {/* Hero Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 text-center overflow-hidden border-b-4 border-[#042420]">
        
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#042420_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="flex items-center justify-between">
            <button 
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#ECCB77] hover:text-white transition-colors group px-4 py-2 rounded-xl bg-[#031E1B] border-2 border-[#D9A62E] cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-[#ECCB77] transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#031E1B] text-[#ECCB77] border border-[#D9A62E] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>Verified Portfolio</span>
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#ECCB77] bg-[#031E1B] px-4 py-1.5 rounded-full border border-[#D9A62E] shadow-xs">
                UBS Portfolio
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#042420] font-serif leading-[1.15] max-w-3xl mx-auto">
              Business setup, compliance, and eCommerce support for the USA and UK
            </h1>

            <p className="text-base sm:text-lg text-[#042420] leading-relaxed max-w-2xl mx-auto font-medium">
              Practical guidance across company formation, banking, Seller Central, and product research — for entrepreneurs building across borders.
            </p>

            {/* Signature Rule */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="w-12 h-0.5 bg-[#042420]" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#042420]">
                Smart Solutions · Better Business · Global Growth
              </p>
              <span className="w-12 h-0.5 bg-[#042420]" />
            </div>
          </div>

        </div>
      </section>

      {/* Main Portfolio 9-Card Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#042420]">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] font-serif">
            What we handle, end to end
          </h2>
          <div className="w-16 h-1 bg-[#042420] mx-auto mt-3 rounded-full" />
        </div>

        {/* Arc Background Track (Echoing Gold & Navy Brand Sweep) */}
        <div className="absolute top-48 left-0 w-full h-[800px] pointer-events-none z-0 hidden lg:block opacity-40">
          <svg viewBox="0 0 1180 800" className="w-full h-full" fill="none">
            <path 
              d="M -50,120 C 300,20 500,260 620,340 C 780,450 900,220 1230,160"
              stroke="#042420" 
              strokeWidth="2" 
              strokeDasharray="4 8"
            />
            <path 
              d="M -50,560 C 250,700 520,460 620,520 C 760,600 950,780 1230,660"
              stroke="#042420" 
              strokeWidth="2" 
              strokeDasharray="4 8"
            />
          </svg>
        </div>

        {/* 9 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {clientPortfolioItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.num} className="relative">
                {/* 3D Back Depth Silhouette (Saya Shape) */}
                <div className="absolute -bottom-3 left-4 right-4 h-6 bg-black/80 rounded-full blur-md pointer-events-none -z-10" />
                <div className="absolute inset-0 bg-[#021512] rounded-2xl translate-x-1.5 translate-y-2 -z-20 opacity-80 border border-[#042420]" />

                <div
                  id={`portfolio-card-${item.num}`}
                  onClick={() => onSelectService(item.serviceKey)}
                  className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-7 relative border-2 border-[#D9A62E] shadow-[0_18px_35px_-5px_rgba(0,0,0,0.7),0_8px_16px_-6px_rgba(0,0,0,0.5),inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between overflow-hidden select-none"
                >
                  {/* Top 3D Metallic Edge Reflection */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/50 to-transparent opacity-80 pointer-events-none" />

                  {/* Gold Dot Accent Mark */}
                  <div className="absolute top-6 right-6 w-3.5 h-3.5 rounded-full bg-[#ECCB77] shadow-[0_0_10px_rgba(236,203,119,0.9),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-[#FFF3D1]" />

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E] flex items-center justify-center text-[#ECCB77] shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] shrink-0">
                        <IconComponent className="w-5 h-5 text-[#ECCB77] shrink-0 drop-shadow-sm" />
                      </div>
                      <span className="font-serif font-bold text-sm tracking-wider text-[#ECCB77]">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-serif leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-100 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#D9A62E]/30 flex items-center justify-between text-xs bg-[#021512]/40 -mx-3 px-3 py-2 rounded-xl border border-[#D9A62E]/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                    <span className="font-semibold text-slate-300">Full Execution</span>
                    <span className="font-bold text-[#ECCB77] flex items-center gap-1">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border-4 border-[#D9A62E]">
          
          {/* Subtle gold radial glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#D9A62E]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#D9A62E]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
              Have a business requirement?
            </h2>
            
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#ECCB77]">
              Let's find the right solution
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D9A62E] hover:bg-[#ECCB77] text-[#042420] font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                <span>Get in touch / Book Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#042420]" />
              </button>

              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#031E1B] hover:bg-[#06332E] text-white font-bold text-sm border-2 border-[#D9A62E] transition-all cursor-pointer"
              >
                <span>Contact Details</span>
              </button>
            </div>

            <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#ECCB77]" />
                Direct Senior Advisory
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#ECCB77]" />
                100% Confidential
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

