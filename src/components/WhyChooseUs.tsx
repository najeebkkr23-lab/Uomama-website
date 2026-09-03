import React from 'react';
import { 
  Compass, 
  Globe2, 
  FileCheck2, 
  Briefcase,
  CheckCircle2,
  Award
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      id: 'benefit-1',
      title: 'Professional Guidance',
      icon: Compass,
      description: 'Structured, direct advisory designed to navigate international corporate laws, tax rules, and cross-border obligations without guesswork.',
      points: [
        'Detailed statutory obligation reviews',
        'Direct consultation with knowledgeable advisors',
        'Customized roadmap for your jurisdiction'
      ]
    },
    {
      id: 'benefit-2',
      title: 'USA & UK Business Support',
      icon: Globe2,
      description: 'Specialized insight across both major international commerce hubs, helping founders align corporate entities and tax compliance seamlessly.',
      points: [
        'US State & IRS regulatory frameworks',
        'UK Companies House & HMRC compliance',
        'Cross-border corporate structure alignment'
      ]
    },
    {
      id: 'benefit-3',
      title: 'Clear & Transparent Process',
      icon: FileCheck2,
      description: 'Transparent workflows with clear milestones, statutory filing requirements, and realistic timelines so you remain fully informed.',
      points: [
        'Upfront scope and milestone clarity',
        'No hidden requirements or surprise obligations',
        'Comprehensive documentation handovers'
      ]
    },
    {
      id: 'benefit-4',
      title: 'Business-Focused Solutions',
      icon: Briefcase,
      description: 'Practical, operationally ready solutions structured to facilitate corporate banking, merchant processing, and global marketplace onboarding.',
      points: [
        'Merchant account & gateway readiness',
        'E-commerce platform compliance alignment',
        'Scalable operational foundation'
      ]
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E] text-[#092B4C] relative overflow-hidden">
      {/* Background subtle gold and navy accents */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D9A62E]/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#FAF2DB]/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4 text-[#ECCB77]" />
            <span>Why Work With UBS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            A Structured, Reliable <span className="text-[#042420]">Advisory Partner</span>
          </h2>
          <p className="text-base sm:text-lg text-[#042420]/90 leading-relaxed font-normal">
            We focus on precision, transparency, and practical corporate execution so you can launch, operate, and scale international businesses with complete confidence.
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.id} className="relative">
                <div
                  id={`why-us-${benefit.id}`}
                  className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-2xl p-8 border-2 border-[#D9A62E] shadow-[0_10px_25px_-5px_rgba(3,30,27,0.35),0_4px_10px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between relative overflow-hidden h-full select-none"
                >
                  {/* Top 3D Metallic Edge Reflection */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />

                  <div>
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] flex items-center justify-center mb-6 shadow-[0_3px_8px_rgba(3,30,27,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] border-2 border-[#D9A62E] shrink-0">
                      <Icon className="w-6 h-6 text-[#ECCB77] shrink-0 drop-shadow-xs" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-serif">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-100 leading-relaxed mb-6 font-normal">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D9A62E]/30 space-y-2.5 bg-[#021512]/30 -mx-3 px-4 py-3 rounded-xl border border-[#D9A62E]/20">
                    {benefit.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#ECCB77] shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
