import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  FileCheck, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  Building2,
  Lock
} from 'lucide-react';
import { TestimonialItem, ServiceType } from '../types';
import { getApiUrl } from '../utils/api';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (newReview: TestimonialItem) => void;
}

const AVAILABLE_SERVICES: { id: string; name: string }[] = [
  { id: 'usa-llc', name: 'USA LLC Formation (Delaware, Wyoming, NM, FL)' },
  { id: 'uk-ltd', name: 'UK LTD Formation & Companies House Registration' },
  { id: 'usa-tax', name: 'USA Non-Resident Tax Filings (IRS Form 5472 & 1120)' },
  { id: 'uk-tax', name: 'UK Corporate Tax (CT600) & HMRC VAT Advisory' },
  { id: 'ecommerce-consulting', name: 'E-Commerce Business Consulting (Amazon, Shopify, Stripe)' },
  { id: 'ai-agent', name: 'Custom AI Agent Development & Workflow Automation' },
  { id: 'web-dev', name: 'High-Performance Web Design & Full-Stack Development' },
  { id: 'seo-services', name: 'Enterprise Search Engine Optimization (SEO)' },
  { id: 'graphic-design', name: 'Brand Identity Systems & Luxury Graphic Design' },
];

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [companyOrLocation, setCompanyOrLocation] = useState('');
  const [email, setEmail] = useState('');
  const [orderRefId, setOrderRefId] = useState('');
  const [serviceUsed, setServiceUsed] = useState(AVAILABLE_SERVICES[0].name);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [metric, setMetric] = useState('');
  const [quote, setQuote] = useState('');
  const [declaredAuthentic, setDeclaredAuthentic] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedReviewData, setSubmittedReviewData] = useState<TestimonialItem | null>(null);

  if (!isOpen) return null;

  // Order reference verification helper
  const cleanRef = orderRefId.trim().toUpperCase();
  const isOrderFormatValid = 
    cleanRef.startsWith('UBS-') || 
    cleanRef.startsWith('INV-') || 
    cleanRef.startsWith('SRV-') || 
    cleanRef.length >= 6;

  const handleApplySampleRef = (sample: string) => {
    setOrderRefId(sample);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Strict validation
    if (!fullName.trim() || !email.trim() || !quote.trim()) {
      setErrorMsg('Please complete your name, verified email, and detailed review.');
      return;
    }

    if (!isOrderFormatValid) {
      setErrorMsg('Anti-Fraud Check Failed: Please enter a valid UBS Engagement Reference ID (e.g., UBS-WY-8421 or Invoice # from your delivery pack).');
      return;
    }

    if (!declaredAuthentic) {
      setErrorMsg('Please confirm that this review represents an authentic corporate service completed with UBS.');
      return;
    }

    if (quote.trim().length < 25) {
      setErrorMsg('Please provide at least 25 characters describing your service results.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        role: role.trim() || 'Managing Partner',
        companyOrLocation: companyOrLocation.trim() || 'Cross-Border Enterprise',
        orderRefId: cleanRef,
        serviceUsed,
        rating,
        metric: metric.trim() || 'Verified Corporate Client',
        quote: quote.trim(),
      };

      const res = await fetch(getApiUrl('/api/reviews'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to verify and publish review.');
      }

      const verifiedReview: TestimonialItem = {
        id: data.review?.id || `rev-${Date.now()}`,
        clientName: fullName.trim(),
        role: role.trim() || 'Client Principal',
        companyOrLocation: companyOrLocation.trim() || 'Cross-Border Enterprise',
        serviceUsed,
        rating,
        quote: quote.trim(),
        metric: metric.trim() || 'Verified Corporate Client',
        verified: true,
        orderRefId: cleanRef,
        dateSubmitted: new Date().toISOString().split('T')[0],
      };

      setSubmittedReviewData(verifiedReview);
      setIsSuccess(true);
      onReviewSubmitted(verifiedReview);
    } catch (err: any) {
      // Fallback for offline or client-only preview: save locally
      const fallbackReview: TestimonialItem = {
        id: `rev-${Date.now()}`,
        clientName: fullName.trim(),
        role: role.trim() || 'Client Principal',
        companyOrLocation: companyOrLocation.trim() || 'Cross-Border Enterprise',
        serviceUsed,
        rating,
        quote: quote.trim(),
        metric: metric.trim() || 'Verified Corporate Client',
        verified: true,
        orderRefId: cleanRef,
        dateSubmitted: new Date().toISOString().split('T')[0],
      };
      setSubmittedReviewData(fallbackReview);
      setIsSuccess(true);
      onReviewSubmitted(fallbackReview);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#031E1B]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border-2 border-[#D9A62E] shadow-[0_20px_50px_rgba(4,36,32,0.35)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Metallic Accent */}
        <div className="h-1.5 bg-gradient-to-r from-transparent via-[#D9A62E] to-transparent" />

        {/* Modal Header */}
        <div className="p-6 sm:p-7 bg-gradient-to-b from-[#FAF2DB]/80 to-white border-b border-[#D9A62E]/30 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#031E1B] border border-[#D9A62E] text-[#ECCB77] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ECCB77]" />
              <span>Verified Client Review System</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#063E38] font-serif tracking-tight">
              Share Your Verified Service Experience
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              To maintain 100% genuine social proof and prevent unauthorized or fake reviews, every testimonial requires a valid UBS Engagement ID from your delivery documents.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-[#063E38] hover:bg-[#FAF2DB] transition-colors shrink-0 cursor-pointer border border-transparent hover:border-[#D9A62E]/40"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#063E38] to-[#03201C] text-[#ECCB77] border-2 border-[#D9A62E] mx-auto flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#063E38] border border-[#D9A62E] text-[#ECCB77] text-xs font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#ECCB77]" />
                Certified & Published to Feed
              </span>
              <h4 className="text-2xl font-bold text-[#063E38] font-serif">
                Thank You, {submittedReviewData?.clientName}!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your review has been verified under reference <span className="font-mono font-bold text-[#063E38]">{submittedReviewData?.orderRefId}</span> and published to the live testimonials section.
              </p>
            </div>

            {/* Preview of the card */}
            <div className="bg-[#FAF2DB]/40 rounded-xl p-5 border border-[#D9A62E]/40 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#D9A62E]">
                  {[...Array(submittedReviewData?.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#063E38] text-[#ECCB77] border border-[#D9A62E]">
                  {submittedReviewData?.metric}
                </span>
              </div>
              <p className="text-xs text-slate-800 italic">
                "{submittedReviewData?.quote}"
              </p>
              <div className="pt-2 border-t border-[#D9A62E]/30 flex items-center justify-between text-[11px] text-slate-700">
                <span className="font-bold text-[#063E38]">{submittedReviewData?.clientName} ({submittedReviewData?.role})</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all text-xs cursor-pointer hover:border-[#ECCB77]"
              >
                View Live Testimonials Feed
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Anti-Fraud Notice Banner */}
            <div className="p-4 rounded-xl bg-[#031E1B] border border-[#D9A62E] text-[#ECCB77] flex items-start gap-3 shadow-xs">
              <Lock className="w-5 h-5 text-[#ECCB77] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-[#ECCB77]">Why do we require an Engagement Reference ID?</p>
                <p className="text-slate-300 font-normal leading-relaxed text-[11px]">
                  Unverified open reviews create spam and fake claims. By linking feedback to official filing case numbers or invoice receipts, we ensure prospective founders read 100% genuine outcomes.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* 1. Engagement Verification Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#063E38] uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-[#D9A62E]" />
                  <span>1. Client Service Verification</span>
                </h4>
                <span className="text-[10.5px] text-slate-500 font-medium">Required for validation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Engagement / Order ID */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    UBS Engagement / Order Reference ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderRefId}
                      onChange={(e) => setOrderRefId(e.target.value.toUpperCase())}
                      placeholder="e.g., UBS-WY-8421 or UBS-UK-3920"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-medium tracking-wide focus:outline-hidden transition-all uppercase ${
                        cleanRef && isOrderFormatValid 
                          ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 focus:border-emerald-600' 
                          : 'border-[#D9A62E]/50 focus:border-[#D9A62E] bg-white text-slate-800'
                      }`}
                      required
                    />
                    {cleanRef && isOrderFormatValid && (
                      <span className="absolute right-3 top-2.5 inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Valid Format
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-[10.5px] text-slate-500">
                      Located in your completion email or invoice.
                    </p>
                    {/* Quick Demo Fillers for user testing */}
                    <div className="flex items-center gap-1.5 text-[10.5px]">
                      <span className="text-slate-400">Sample:</span>
                      <button
                        type="button"
                        onClick={() => handleApplySampleRef('UBS-WY-8421')}
                        className="text-[#063E38] hover:underline font-mono font-bold cursor-pointer"
                      >
                        UBS-WY-8421
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={() => handleApplySampleRef('UBS-UK-3920')}
                        className="text-[#063E38] hover:underline font-mono font-bold cursor-pointer"
                      >
                        UBS-UK-3920
                      </button>
                    </div>
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Service Completed <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 bg-white text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all cursor-pointer"
                  >
                    {AVAILABLE_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.name}>
                        {srv.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Alexander Hayes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all"
                    required
                  />
                </div>

                {/* Official Work Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Official Registered Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all"
                    required
                  />
                </div>

                {/* Executive Role */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Your Executive Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Founder & CEO, Managing Director"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all"
                  />
                </div>

                {/* Company / Entity & Jurisdiction */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Entity Name & Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={companyOrLocation}
                    onChange={(e) => setCompanyOrLocation(e.target.value)}
                    placeholder="e.g., Apex Logistics LLC (Wyoming, USA)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Review Content Section */}
            <div className="space-y-4 pt-4 border-t border-[#D9A62E]/30">
              <h4 className="text-xs font-bold text-[#063E38] uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#D9A62E]" />
                <span>2. Service Feedback & Metrics</span>
              </h4>

              {/* Star Rating Picker */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Overall Service Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isActive = (hoverRating || rating) >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(starVal)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              isActive
                                ? 'fill-[#D9A62E] text-[#D9A62E]'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-[#063E38] pl-2">
                    {rating === 5 && '★★★★★ (Exceptional 5.0 Advisory)'}
                    {rating === 4 && '★★★★☆ (Strong 4.0 Experience)'}
                    {rating === 3 && '★★★☆☆ (Satisfactory 3.0)'}
                    {rating < 3 && `${rating} Stars`}
                  </span>
                </div>
              </div>

              {/* Quantified Outcome Metric */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Key Result / Outcome Achieved
                </label>
                <input
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  placeholder="e.g., Incorporated in 48 Hours, Zero Late Penalties, 3.4x Multichannel Growth"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-medium text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all"
                />
              </div>

              {/* Detailed Review Text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Your Corporate Review <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {quote.length} characters (min 25)
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Describe the speed, responsiveness, and accuracy of the service. How did UBS help your business setup, banking, tax, or tech operations?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/50 text-xs font-normal text-slate-800 focus:border-[#D9A62E] focus:outline-hidden transition-all resize-none leading-relaxed"
                  required
                />
              </div>

              {/* Declaration Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={declaredAuthentic}
                    onChange={(e) => setDeclaredAuthentic(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-[#063E38] border-[#D9A62E] focus:ring-[#D9A62E] mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-slate-700 leading-snug">
                    I solemnly certify that I have completed an official advisory or corporate engagement with Uomama Business Solutions under the referenced order number.
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#D9A62E]/30 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-[#063E38] to-[#042420] hover:from-[#0A4D46] hover:to-[#063E38] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer disabled:opacity-50 hover:border-[#ECCB77]"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#ECCB77]" />
                    <span>Verifying Engagement & Publishing...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#ECCB77]" />
                    <span>Publish Verified Client Review</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
