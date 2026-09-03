import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Send, AlertCircle, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceType | 'general-consultation';
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'usa-tax'
}) => {
  const { addLead } = useSiteSettings();
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [stage, setStage] = useState('Pre-formation / Planning');
  const [message, setMessage] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!country.trim()) {
      newErrors.country = 'Please select your country.';
    }

    if (!selectedService) {
      newErrors.selectedService = 'Please select a service.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please enter your message or project details.';
    }

    if (!agreeToContact) {
      newErrors.agreeToContact = 'Please confirm that you agree to be contacted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addLead({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          country: country.trim(),
          serviceCategory: selectedService,
          message: message.trim(),
          status: 'new',
          source: 'consultation_modal'
        });
      } catch (err) {
        console.warn('Backend lead sync note:', err);
      }
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setMessage('');
    setAgreeToContact(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        id="consultation-modal"
        className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(217,166,46,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] border-2 border-[#D9A62E] relative animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#06332E]/95 backdrop-blur-md px-6 py-4 border-b border-[#D9A62E]/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#031E1B] text-[#ECCB77] flex items-center justify-center border border-[#D9A62E]/50">
              <Calendar className="w-4 h-4 text-[#ECCB77]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Book a Strategy Consultation
              </h3>
              <p className="text-xs text-[#ECCB77]/80">UBS Advisory Desk</p>
            </div>
          </div>

          <button
            id="close-consultation-modal-btn"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-300 hover:text-[#ECCB77] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div id="consultation-modal-success" className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#031E1B] text-[#ECCB77] border-2 border-[#D9A62E] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white font-serif">
                Thank You
              </h4>
              <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                Your inquiry has been received. Our advisory team will review your request and reach out promptly.
              </p>
              
              <div className="p-4 rounded-xl bg-[#031E1B] border border-[#D9A62E]/40 text-left text-xs text-slate-200 space-y-1.5 max-w-md mx-auto shadow-sm">
                <p className="font-semibold text-[#ECCB77]">Inquiry Details:</p>
                <p>• <span className="text-slate-300">Client:</span> {fullName}</p>
                <p>• <span className="text-slate-300">Service:</span> {getServiceLabel(selectedService)}</p>
                <p>• <span className="text-slate-300">Country:</span> {country}</p>
              </div>

              <div className="pt-4">
                <button
                  id="consultation-modal-done-btn"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-sm text-xs cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Service Selection (All 9 Services + General Consultation) */}
              <div>
                <label htmlFor="consultation-service-select" className="block text-xs font-bold text-slate-100 mb-1.5">
                  Service Required <span className="text-[#ECCB77]">*</span>
                </label>
                <select
                  id="consultation-service-select"
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    if (errors.selectedService) {
                      setErrors({ ...errors, selectedService: '' });
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                    errors.selectedService ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                  } focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none`}
                >
                  <optgroup label="Business & Tax">
                    <option value="usa-tax">USA Taxation</option>
                    <option value="uk-tax">UK Taxation</option>
                    <option value="usa-llc">USA LLC Formation</option>
                    <option value="uk-ltd">UK LTD Formation</option>
                  </optgroup>
                  <optgroup label="Digital & Creative">
                    <option value="ecommerce-consulting">E-commerce Business Consulting</option>
                    <option value="web-dev">Website Design & Development</option>
                    <option value="seo-services">SEO Services</option>
                    <option value="graphic-design">Graphic Design Services</option>
                  </optgroup>
                  <optgroup label="AI & Automation">
                    <option value="ai-agent">AI Agent Development</option>
                  </optgroup>
                  <optgroup label="General">
                    <option value="general-consultation">General Consultation</option>
                  </optgroup>
                </select>
                {errors.selectedService && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.selectedService}</span>
                  </p>
                )}
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consultation-name-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                    Full Name <span className="text-[#ECCB77]">*</span>
                  </label>
                  <input
                    type="text"
                    id="consultation-name-input"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) {
                        setErrors({ ...errors, fullName: '' });
                      }
                    }}
                    placeholder="Jane Smith"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                      errors.fullName ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                    } focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="consultation-email-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                    Email Address <span className="text-[#ECCB77]">*</span>
                  </label>
                  <input
                    type="email"
                    id="consultation-email-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: '' });
                      }
                    }}
                    placeholder="jane@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                      errors.email ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                    } focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Phone (Optional) & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consultation-phone-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                    Phone / WhatsApp <span className="text-slate-300 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="consultation-phone-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 bg-[#031E1B] text-sm text-white focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="consultation-country-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                    Country <span className="text-[#ECCB77]">*</span>
                  </label>
                  <input
                    type="text"
                    id="consultation-country-input"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (errors.country) {
                        setErrors({ ...errors, country: '' });
                      }
                    }}
                    placeholder="e.g., United States, UK, Canada"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                      errors.country ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                    } focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none`}
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.country}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Business Stage */}
              <div>
                <label htmlFor="consultation-stage-select" className="block text-xs font-bold text-slate-100 mb-1.5">
                  Business Stage
                </label>
                <select
                  id="consultation-stage-select"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 text-sm text-white focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] bg-[#031E1B] outline-none"
                >
                  <option value="Pre-formation / Planning">Pre-formation / Planning</option>
                  <option value="Newly Formed (< 1 year)">Newly Formed (&lt; 1 year)</option>
                  <option value="Active Established Business">Active Established Business</option>
                  <option value="E-commerce Expansion">E-commerce Expansion</option>
                  <option value="Digital / Tech Re-architecture">Digital / Tech Re-architecture</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="consultation-message-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                  Message <span className="text-[#ECCB77]">*</span>
                </label>
                <textarea
                  id="consultation-message-input"
                  rows={3}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) {
                      setErrors({ ...errors, message: '' });
                    }
                  }}
                  placeholder="Share details on your target market, statutory questions, web/SEO goals, or AI automation ideas..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] resize-none transition-colors ${
                    errors.message ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                  } focus:ring-2 focus:ring-[#D9A62E]/30 focus:border-[#D9A62E] focus:bg-[#052A26] outline-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="consultation-consent-checkbox"
                    checked={agreeToContact}
                    onChange={(e) => {
                      setAgreeToContact(e.target.checked);
                      if (errors.agreeToContact) {
                        setErrors({ ...errors, agreeToContact: '' });
                      }
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-[#D9A62E]/40 text-[#D9A62E] focus:ring-[#D9A62E] bg-[#031E1B]"
                  />
                  <span className="text-xs text-slate-200 font-medium leading-normal">
                    I agree to be contacted regarding my inquiry. <span className="text-[#ECCB77]">*</span>
                  </span>
                </label>
                {errors.agreeToContact && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.agreeToContact}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="consultation-submit-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-md hover:shadow-lg outline-none cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#042420]" />
                  <span>Submit Inquiry</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-300">
                Direct advisory intake with an international specialist.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

function getServiceLabel(id: string): string {
  switch (id) {
    case 'usa-tax': return 'USA Taxation';
    case 'uk-tax': return 'UK Taxation';
    case 'usa-llc': return 'USA LLC Formation';
    case 'uk-ltd': return 'UK LTD Formation';
    case 'ecommerce-consulting': return 'E-commerce Business Consulting';
    case 'ai-agent': return 'AI Agent Development';
    case 'web-dev': return 'Website Design & Development';
    case 'seo-services': return 'SEO Services';
    case 'graphic-design': return 'Graphic Design Services';
    case 'general-consultation': return 'General Consultation';
    default: return 'Business Consulting';
  }
}
