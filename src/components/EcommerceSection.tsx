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

            {/* Strategic Pillars (3D Cards) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(3,30,27,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] select-none">
                <Store className="w-5 h-5 text-[#ECCB77] mt-0.5 shrink-0 drop-shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Marketplace Verification & Compliance</h4>
                  <p className="text-xs text-slate-100 font-normal">Ensure your company documents meet the exact verification standards of major commerce platforms.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(3,30,27,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] select-none">
                <CreditCard className="w-5 h-5 text-[#ECCB77] mt-0.5 shrink-0 drop-shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Payment Gateway Infrastructure</h4>
                  <p className="text-xs text-slate-100 font-normal">Guidance on securing compliant access to Stripe, PayPal, and international merchant banking.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(3,30,27,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] select-none">
                <Globe2 className="w-5 h-5 text-[#ECCB77] mt-0.5 shrink-0 drop-shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">Sales Tax & VAT Guidance</h4>
                  <p className="text-xs text-slate-100 font-normal">Overview of US state sales tax nexus and UK/EU VAT obligations for physical and digital goods.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="ecommerce-consultation-btn"
                onClick={() => onOpenConsultation('ecommerce-consulting')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#042420] bg-gradient-to-b from-[#ECCB77] via-[#D9A62E] to-[#B8871E] hover:from-[#FFF0C2] hover:to-[#D9A62E] border-2 border-[#FFF0C2]/80 shadow-[0_4px_12px_rgba(3,30,27,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all text-xs cursor-pointer"
              >
                <span>Book E-commerce Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#042420]" />
              </button>

              <button
                id="ecommerce-details-btn"
                onClick={() => onSelectService('ecommerce-consulting')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[#ECCB77] bg-[#03201C] hover:bg-[#073630] hover:text-[#ECCB77] border-2 border-[#D9A62E]/70 hover:border-[#ECCB77] transition-all shadow-sm text-xs cursor-pointer"
              >
                <span>View Full Scope</span>
              </button>
            </div>
          </div>

          {/* Right Column: Platform Cards with clean 3D shadow & depth */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] text-white rounded-2xl p-6 sm:p-7 shadow-[0_12px_28px_-5px_rgba(3,30,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-[#D9A62E] relative overflow-hidden">
              {/* Top 3D Metallic Edge Reflection */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />

              <div className="flex items-center justify-between border-b border-[#D9A62E]/30 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-[#ECCB77]" />
                  <span className="text-sm font-bold uppercase tracking-wider text-[#ECCB77]">Supported Platforms</span>
                </div>
                <span className="text-xs text-[#ECCB77] font-bold bg-[#021815] border border-[#D9A62E]/70 px-2.5 py-0.5 rounded shadow-xs">Cross-Border Scope</span>
              </div>

              <div className="space-y-4">
                {platforms.map((platform, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-[#073630] to-[#021714] rounded-xl p-4 border-2 border-[#D9A62E]/50 shadow-[0_3px_8px_rgba(3,30,27,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2 select-none">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-serif">{platform.name}</h4>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#021815] text-[#ECCB77] font-bold border border-[#D9A62E]/60">
                        {platform.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-100 leading-relaxed font-normal">
                      {platform.description}
                    </p>
                    <div className="pt-2 border-t border-[#D9A62E]/20 flex flex-wrap gap-x-4 gap-y-1">
                      {platform.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-100 font-medium">
                          <Check className="w-3 h-3 text-[#ECCB77]" />
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
