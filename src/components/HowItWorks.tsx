import React from 'react';
import { 
  CheckSquare, 
  PhoneCall, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ServiceType } from '../types';

interface HowItWorksProps {
  onOpenConsultation: (service?: ServiceType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenConsultation }) => {
  const steps = [
    {
      step: '01',
      title: 'Step 1 — Choose Your Service',
      subtitle: 'Identify Your Corporate Needs',
      description: 'Select from our 9 specialized services across business setup, statutory tax compliance, e-commerce consulting, web engineering, SEO, and AI automation.',
      icon: CheckSquare
    },
    {
      step: '02',
      title: 'Step 2 — Speak With an Advisor',
      subtitle: 'Personalized Strategy Session',
      description: 'Schedule a direct consultation to discuss your entity structure, residency parameters, statutory deadlines, marketplace requirements, and target timeline.',
      icon: PhoneCall
    },
    {
      step: '03',
      title: 'Step 3 — Professional Execution',
      subtitle: 'Structured Implementation',
      description: 'Receive tailored execution plans, statutory compliance documentation, filings coordination, and clear next steps to operate your company compliantly.',
      icon: Award
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#042420]/90 leading-relaxed font-normal">
            A straightforward, transparent engagement model designed to deliver clarity, efficiency, and full compliance from day one.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative group">
                <div 
                  id={`how-it-works-step-${index + 1}`}
                  className="relative bg-white rounded-2xl p-8 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14),0_4px_10px_-2px_rgba(4,36,32,0.08)] hover:shadow-[0_20px_36px_-6px_rgba(4,36,32,0.22)] transition-all duration-300 flex flex-col justify-between overflow-hidden h-full select-none hover:-translate-y-1"
                >
                  {/* Top 3D Metallic Edge Reflection */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold text-[#D9A62E] font-serif drop-shadow-xs">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center shadow-md border-2 border-[#D9A62E]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#063E38] mb-1 font-serif group-hover:text-[#0A564E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D9A62E] mb-4">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#D9A62E]/30 flex items-center justify-between text-xs font-bold text-[#063E38]">
                    <span className="inline-flex items-center gap-1.5 text-[#063E38]">
                      <Sparkles className="w-3.5 h-3.5 text-[#D9A62E]" />
                      Clear Milestones & Reporting
                    </span>
                    <span className="text-[11px] font-bold text-[#D9A62E] uppercase tracking-wider">Phase {index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Callout CTA */}
        <div className="mt-12 text-center">
          <button
            id="how-it-works-cta-btn"
            onClick={() => onOpenConsultation()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Start With Step 1 — Book Your Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#ECCB77]" />
          </button>
        </div>

      </div>
    </section>
  );
};
