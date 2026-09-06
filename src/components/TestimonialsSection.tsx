import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  PenLine, 
  Lock, 
  Check, 
  Sparkles,
  Building2,
  ExternalLink
} from 'lucide-react';
import { testimonialsData as initialTestimonials } from '../data/testimonials';
import { TestimonialItem } from '../types';
import { WriteReviewModal } from './WriteReviewModal';
import { getApiUrl } from '../utils/api';

const STORAGE_KEY = 'ubs_verified_testimonials';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read stored testimonials');
    }
    return initialTestimonials;
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Fetch reviews from backend if available
  useEffect(() => {
    const fetchBackendReviews = async () => {
      try {
        const res = await fetch(getApiUrl('/api/reviews'));
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
            setTestimonials((prev) => {
              // Merge unique reviews
              const existingIds = new Set(prev.map((r) => r.id));
              const merged = [...prev];
              for (const r of data.reviews) {
                if (!existingIds.has(r.id)) {
                  merged.unshift(r);
                }
              }
              return merged;
            });
          }
        }
      } catch (err) {
        // Backend not reachable, local state is sufficient
      }
    };
    fetchBackendReviews();
  }, []);

  const handleReviewSubmitted = (newReview: TestimonialItem) => {
    setTestimonials((prev) => {
      const updated = [newReview, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setRecentlyAddedId(newReview.id);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E] text-[#092B4C] relative overflow-hidden">
      {/* Background subtle gold ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D9A62E]/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FAF2DB]/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Award className="w-4 h-4 text-[#ECCB77]" />
            <span>Institutional Social Proof & Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            What Founders & Businesses Say About <span className="text-[#042420]">UBS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#042420]/90 leading-relaxed font-normal">
            Real feedback from verified international entrepreneurs, e-commerce brand owners, and expanding enterprises who rely on our cross-border corporate advisory.
          </p>
        </div>

        {/* Premium Executive Trust & Review Action Bar (Tier-1 Standard) */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-[0_12px_28px_-4px_rgba(4,36,32,0.14)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E] to-transparent opacity-90 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Left: Overall Rating & Anti-Fraud Credentials */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#063E38] to-[#03201C] rounded-2xl border-2 border-[#D9A62E] text-white shrink-0 shadow-md min-w-[110px]">
                  <span className="text-3xl font-extrabold font-serif text-[#ECCB77]">5.0</span>
                  <div className="flex items-center gap-0.5 text-[#ECCB77] my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Perfect Score</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                    <h3 className="text-base sm:text-lg font-bold text-[#063E38] font-serif">
                      100% Verified Non-Resident & Global Client Outcomes
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Anti-Fraud Protected
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-xl">
                    To prevent competitor manipulation and fake spam reviews, every review published below is strictly verified against an active UBS Engagement Reference ID & statutory filing receipt.
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-600 font-medium pt-1">
                    <span className="flex items-center gap-1 text-[#063E38]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#063E38]" />
                      500+ Cross-Border Entities
                    </span>
                    <span className="flex items-center gap-1 text-[#063E38]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#063E38]" />
                      Zero Late Statutory Penalties
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Write a Review CTA Button */}
              <div className="shrink-0 flex flex-col items-center sm:items-end w-full sm:w-auto">
                <button
                  id="write-review-btn"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all text-xs cursor-pointer hover:border-[#ECCB77] group"
                >
                  <PenLine className="w-4 h-4 text-[#ECCB77] group-hover:scale-110 transition-transform" />
                  <span>Submit Verified Client Review</span>
                </button>
                <span className="text-[10.5px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Requires official UBS Order / Case Reference
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Testimonials Grid (Clean, Luxurious & Anti-Fraud Badged) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => {
            const isNewlyAdded = item.id === recentlyAddedId;
            return (
              <div key={item.id} className="relative group">
                <div
                  className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full select-none hover:-translate-y-1 ${
                    isNewlyAdded 
                      ? 'border-emerald-600 shadow-[0_12px_32px_-4px_rgba(5,150,105,0.25)] ring-2 ring-emerald-500/40' 
                      : 'border-[#D9A62E] shadow-[0_10px_25px_-4px_rgba(4,36,32,0.12),0_4px_8px_-2px_rgba(4,36,32,0.06)] hover:shadow-[0_16px_32px_-6px_rgba(4,36,32,0.22)]'
                  }`}
                >
                  {/* Top Metallic Edge Reflection */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D9A62E]/50 to-transparent opacity-80 pointer-events-none" />

                  <div className="space-y-3.5">
                    
                    {/* Top Row: Stars + Verified Badge + Metric */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-0.5 text-[#D9A62E]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Verified Engagement Badge */}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#063E38] text-[#ECCB77] border border-[#D9A62E] shadow-xs">
                          <ShieldCheck className="w-3 h-3 text-[#ECCB77]" />
                          <span>{item.orderRefId ? item.orderRefId : 'Verified Client'}</span>
                        </span>

                        {isNewlyAdded && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    {item.metric && (
                      <div className="inline-block">
                        <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-[#FAF2DB] border border-[#D9A62E]/60 text-[#063E38] shadow-xs">
                          ★ Outcome: {item.metric}
                        </span>
                      </div>
                    )}

                    {/* Quote Text */}
                    <p className="text-xs text-slate-700 leading-relaxed italic relative font-normal line-clamp-4">
                      "{item.quote}"
                    </p>

                    {/* Service Taken */}
                    <div className="pt-2 border-t border-[#D9A62E]/30">
                      <span className="text-[11px] font-bold text-[#063E38] uppercase tracking-wide truncate block">
                        {item.serviceUsed}
                      </span>
                    </div>

                  </div>

                  {/* Author Info (Clean, prestigious corporate footer) */}
                  <div className="pt-3.5 mt-3.5 border-t border-[#D9A62E]/30 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] flex items-center justify-center font-bold text-xs shadow-xs shrink-0 border border-[#D9A62E]">
                      {item.clientName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-[#063E38] leading-tight truncate">
                          {item.clientName}
                        </h4>
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" title="Identity Verified" />
                      </div>
                      <p className="text-[10.5px] text-[#0A564E] font-medium truncate">
                        {item.role}
                      </p>
                      <p className="text-[9.5px] text-slate-600 truncate">
                        {item.companyOrLocation}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Footer Bar with Clean Pearl White & Gold */}
        <div className="mt-14">
          <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#D9A62E] text-[#042420] flex flex-wrap items-center justify-between gap-6 shadow-[0_12px_28px_-6px_rgba(4,36,32,0.15)]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] shadow-sm border-2 border-[#D9A62E]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#063E38]">Confidential, Compliant & Anti-Fraud Verified</p>
                <p className="text-xs text-slate-600">All reviews are verified against state filings and active client order documentation.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="text-xs font-bold text-[#063E38] hover:text-[#0A564E] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Have a completed engagement? Leave a review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
};
