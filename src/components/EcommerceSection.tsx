import React from 'react';
import { 
  ShoppingCart, 
  Store, 
  Layers, 
  CreditCard, 
  ArrowRight, 
  Check, 
  Globe2,
  TrendingUp
} from 'lucide-react';
import { ServiceType } from '../types';

interface EcommerceSectionProps {
  onOpenConsultation: (service?: ServiceType) => void;
  onSelectService: (service: ServiceType) => void;
}

export const EcommerceSection: React.FC<EcommerceSectionProps> = ({
  onOpenConsultation,
  onSelectService
}) => {
  const platforms = [
    {
      name: 'Global Marketplaces (US & Europe)',
      category: 'Marketplace Operations',
      description: 'Consulting on US and European marketplace seller verification, business entity alignment, and cross-border fulfillment compliance.',
      features: [
        'Entity structure for Marketplace verification',
        'W-8BEN / US Tax ID coordination',
        'European VAT & EORI alignment'
      ]
    },
    {
      name: 'Shopify & Direct-To-Consumer',
      category: 'Storefront & Gateways',
      description: 'Strategic setup for independent e-commerce stores, connecting US/UK corporate entities to international payment gateways.',
      features: [
        'Shopify Payments & Stripe integration',
        'Multi-currency processing readiness',
        'Cross-border checkout tax configuration'
      ]
    },
    {
      name: 'TikTok Shop (US & UK)',
      category: 'Social Commerce',
      description: 'Guidance on merchant onboarding for TikTok Shop in the United States and United Kingdom with compliant company documentation.',
      features: [
        'Business verification requirements',
        'US LLC & UK LTD documentation',
        'Tax information and payout compliance'
      ]
    }
  ];

  return (
    <section id="ecommerce" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Detailed Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
              <ShoppingCart className="w-4 h-4 text-[#ECCB77]" />
              <span>Practice Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
              E-Commerce Business Consulting
            </h2>

            <p className="text-base text-[#042420]/90 leading-relaxed font-normal">
              Selling across international borders requires synchronizing corporate formations, sales tax and VAT compliance, payment processing, and marketplace rules.
            </p>

            <p className="text-sm text-[#042420]/85 leading-relaxed font-normal">
              We guide digital merchants through the end-to-end framework required to launch, verify, and operate stores on leading e-commerce platforms including Shopify, TikTok Shop, and global marketplaces.
            </p>

            {/* Strategic Pillars (Pearl White Cards) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(4,36,32,0.08)] select-none">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border border-[#D9A62E]">
                  <Store className="w-5 h-5 text-[#ECCB77]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#063E38] font-serif">Marketplace Verification & Compliance</h4>
                  <p className="text-xs text-slate-700 font-normal">Ensure your company documents meet the exact verification standards of major commerce platforms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(4,36,32,0.08)] select-none">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border border-[#D9A62E]">
                  <CreditCard className="w-5 h-5 text-[#ECCB77]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#063E38] font-serif">Payment Gateway Infrastructure</h4>
                  <p className="text-xs text-slate-700 font-normal">Guidance on securing compliant access to Stripe, PayPal, and international merchant banking.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(4,36,32,0.08)] select-none">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shrink-0 border border-[#D9A62E]">
                  <Globe2 className="w-5 h-5 text-[#ECCB77]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#063E38] font-serif">Sales Tax & VAT Guidance</h4>
                  <p className="text-xs text-slate-700 font-normal">Overview of US state sales tax nexus and UK/EU VAT obligations for physical and digital goods.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="ecommerce-consultation-btn"
                onClick={() => onOpenConsultation('ecommerce-consulting')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all text-xs cursor-pointer"
              >
                <span>Book E-commerce Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
              </button>

              <button
                id="ecommerce-details-btn"
                onClick={() => onSelectService('ecommerce-consulting')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[#063E38] bg-[#FAF2DB] hover:bg-[#F2DEAF] border-2 border-[#D9A62E] transition-all shadow-xs text-xs cursor-pointer"
              >
                <span>View Full Scope</span>
              </button>
            </div>
          </div>

          {/* Right Column: Platform Cards with clean Pearl White & Gold */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_28px_-5px_rgba(4,36,32,0.15)] border-2 border-[#D9A62E] relative overflow-hidden">
              {/* Top 3D Metallic Edge Reflection */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#D9A62E]/30 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-[#063E38]" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#063E38]">Supported Platforms</span>
                </div>
                <span className="text-xs text-[#063E38] font-bold bg-[#FAF2DB] border border-[#D9A62E] px-2.5 py-0.5 rounded shadow-xs">Cross-Border Scope</span>
              </div>

              <div className="space-y-4">
                {platforms.map((platform, idx) => (
                  <div key={idx} className="bg-[#FAF2DB]/70 rounded-xl p-4 border-2 border-[#D9A62E]/40 shadow-xs space-y-2 select-none hover:bg-[#FAF2DB] transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#063E38] font-serif">{platform.name}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-white text-[#063E38] font-bold border border-[#D9A62E]">
                        {platform.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {platform.description}
                    </p>
                    <div className="pt-2 border-t border-[#D9A62E]/30 flex flex-wrap gap-x-4 gap-y-1">
                      {platform.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-800 font-medium">
                          <Check className="w-3 h-3 text-[#063E38]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
