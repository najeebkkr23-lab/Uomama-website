import React from 'react';
import { Star, Quote, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E] text-[#092B4C] relative overflow-hidden">
      {/* Background subtle gold ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D9A62E]/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FAF2DB]/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4 text-[#ECCB77]" />
            <span>Trusted Global Partnership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            What Founders & Businesses Say About <span className="text-[#042420]">UBS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#042420]/90 leading-relaxed font-normal">
            Real feedback from international entrepreneurs, e-commerce brand owners, and expanding businesses who rely on our corporate and digital services.
          </p>
        </div>

        {/* Testimonials Grid (Compact & Sleek Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonialsData.map((item) => (
            <div key={item.id} className="relative">
              <div
                className="bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] rounded-xl p-4 sm:p-5 border-2 border-[#D9A62E] shadow-[0_8px_20px_-4px_rgba(3,30,27,0.35),0_3px_8px_-2px_rgba(3,30,27,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between relative overflow-hidden h-full select-none"
              >
                {/* Top 3D Metallic Edge Reflection */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFF4D4]/40 to-transparent opacity-80 pointer-events-none" />

                <div className="space-y-2.5">
                  
                  {/* Rating & Service Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-[#ECCB77]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current drop-shadow-xs" />
                      ))}
                    </div>
                    {item.metric && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#021815] border border-[#D9A62E]/70 text-[#ECCB77] shadow-xs">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs text-slate-100 leading-relaxed italic relative font-normal line-clamp-4">
                    "{item.quote}"
                  </p>

                  {/* Service Tag */}
                  <div className="pt-1.5 border-t border-[#D9A62E]/25">
                    <span className="text-[10px] font-bold text-[#ECCB77] uppercase tracking-wide truncate block">
                      {item.serviceUsed}
                    </span>
                  </div>

                </div>

                {/* Author Info (Compact footer) */}
                <div className="pt-2.5 mt-2.5 border-t border-[#D9A62E]/30 flex items-center gap-2.5 bg-[#021512]/30 -mx-2 px-2.5 py-1.5 rounded-lg border border-[#D9A62E]/20">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] flex items-center justify-center font-bold text-xs shadow-xs shrink-0 border border-[#D9A62E]">
                    {item.clientName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white leading-tight truncate">
                      {item.clientName}
                    </h4>
                    <p className="text-[10.5px] text-[#ECCB77] font-medium truncate">
                      {item.role}
                    </p>
                    <p className="text-[9.5px] text-slate-300 truncate">
                      {item.companyOrLocation}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Footer Bar with clean 3D Depth */}
        <div className="mt-14">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0D554D] via-[#073630] to-[#031E1B] border-2 border-[#D9A62E] text-white flex flex-wrap items-center justify-between gap-6 shadow-[0_12px_28px_-6px_rgba(3,30,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] text-[#ECCB77] shadow-[0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] border-2 border-[#D9A62E]/70">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Confidential, Compliant & Secure Operations</p>
                <p className="text-xs text-slate-200">All corporate filings and business inquiries handled under strict data privacy protocols.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-100 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ECCB77]" />
                Verified Secretary of State Registered Filings
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ECCB77]" />
                Companies House Direct Integration
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
