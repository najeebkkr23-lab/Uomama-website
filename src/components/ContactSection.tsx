import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ServiceType } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ContactSectionProps {
  onServiceSelect?: (service: ServiceType) => void;
  onNavigateHome?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigateHome }) => {
  const { addLead } = useSiteSettings();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('E-commerce Seller');
  const [serviceRequired, setServiceRequired] = useState('general-consultation');
  const [message, setMessage] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    if (!serviceRequired) {
      newErrors.serviceRequired = 'Please select a service.';
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
          serviceCategory: serviceRequired,
          businessModel: businessType,
          message: message.trim(),
          status: 'new',
          source: 'homepage_contact'
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
    setBusinessType('E-commerce Seller');
    setServiceRequired('general-consultation');
    setMessage('');
    setAgreeToContact(false);
    setErrors({});
    if (onNavigateHome) onNavigateHome();
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <Mail className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            Let's Discuss Your Business
          </h2>
          <p className="text-base text-[#042420]/90 leading-relaxed font-normal">
            Tell us what you need help with and we'll help you identify the appropriate next step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white rounded-2xl p-7 border-2 border-[#D9A62E]/70 shadow-[0_20px_45px_rgba(4,36,32,0.65),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-6">
              <div className="space-y-1 border-b border-[#D9A62E]/30 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ECCB77]">International Advisory Desk</span>
                <h3 className="text-xl font-bold text-white font-serif">
                  UBS
                </h3>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 flex items-center justify-center text-[#ECCB77] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Email Inquiry</p>
                    <p className="text-sm font-semibold text-white mt-0.5">contact@uomamabusiness.com</p>
                    <p className="text-xs text-slate-300">24-hour response protocol</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 flex items-center justify-center text-[#ECCB77] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Direct Consultation Line</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Global Client Support Available</p>
                    <p className="text-xs text-slate-300">USA & UK Business Hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 flex items-center justify-center text-[#ECCB77] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Business Schedule</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Monday – Friday: 9:00 AM – 6:00 PM EST / GMT</p>
                    <p className="text-xs text-slate-300">Cross-timezone appointment booking</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#031E1B] border border-[#D9A62E]/50 flex items-center justify-center text-[#ECCB77] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Operational Scope</p>
                    <p className="text-sm font-semibold text-white mt-0.5">USA & UK Corporate Jurisdictions</p>
                    <p className="text-xs text-slate-300">Global clients & remote founders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-7 sm:p-8 border-2 border-[#D9A62E]/70 shadow-[0_20px_45px_rgba(4,36,32,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
              {isSubmitted ? (
                <div id="home-contact-success" className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#031E1B] text-[#ECCB77] border-2 border-[#D9A62E] mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-serif">Thank You</h3>
                  <p className="text-sm text-slate-200 max-w-md mx-auto">
                    Your inquiry has been received. Our advisory team will review your corporate parameters and get in touch.
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-6 py-2.5 rounded-xl text-xs font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-sm cursor-pointer"
                  >
                    Back to Home
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="border-b border-[#D9A62E]/30 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-white font-serif">Consultation Intake Form</h3>
                    <p className="text-xs text-slate-200">Provide your requirements for a dedicated advisory evaluation.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="home-contact-name" className="block text-xs font-bold text-slate-100 mb-1">
                        Full Name <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="text"
                        id="home-contact-name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="Jane Smith"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] outline-none transition-colors ${
                          errors.fullName ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                        } focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="home-contact-email" className="block text-xs font-bold text-slate-100 mb-1">
                        Email Address <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="email"
                        id="home-contact-email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="jane@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] outline-none transition-colors ${
                          errors.email ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                        } focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="home-contact-phone" className="block text-xs font-bold text-slate-100 mb-1">
                        Phone / WhatsApp <span className="text-slate-300 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="home-contact-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 text-sm text-white bg-[#031E1B] focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="home-contact-country" className="block text-xs font-bold text-slate-100 mb-1">
                        Country / Jurisdiction <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="text"
                        id="home-contact-country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors({ ...errors, country: '' });
                        }}
                        placeholder="e.g., United States, UK, Canada"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] outline-none transition-colors ${
                          errors.country ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                        } focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30`}
                      />
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.country}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="home-contact-business-type" className="block text-xs font-bold text-slate-100 mb-1">
                        Business Type
                      </label>
                      <select
                        id="home-contact-business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 text-sm text-white bg-[#031E1B] focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30 outline-none"
                      >
                        <option value="E-commerce Seller">E-commerce Seller</option>
                        <option value="Startup / New Venture">Startup / New Venture</option>
                        <option value="Small Business / Established">Small Business / Established</option>
                        <option value="Solo Entrepreneur / Freelancer">Solo Entrepreneur / Freelancer</option>
                        <option value="International Business Owner">International Business Owner</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="home-contact-service" className="block text-xs font-bold text-slate-100 mb-1">
                        Service Required <span className="text-[#ECCB77]">*</span>
                      </label>
                      <select
                        id="home-contact-service"
                        value={serviceRequired}
                        onChange={(e) => {
                          setServiceRequired(e.target.value);
                          if (errors.serviceRequired) setErrors({ ...errors, serviceRequired: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] outline-none transition-colors ${
                          errors.serviceRequired ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                        } focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30`}
                      >
                        <option value="usa-tax">USA Taxation</option>
                        <option value="uk-tax">UK Taxation</option>
                        <option value="usa-llc">USA LLC Formation</option>
                        <option value="uk-ltd">UK LTD Formation</option>
                        <option value="ecommerce-consulting">E-commerce Business Consulting</option>
                        <option value="ai-agent">AI Agent Development</option>
                        <option value="web-dev">Website Design & Development</option>
                        <option value="seo-services">SEO Services</option>
                        <option value="graphic-design">Graphic Design Services</option>
                        <option value="general-consultation">General Consultation</option>
                      </select>
                      {errors.serviceRequired && (
                        <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.serviceRequired}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="home-contact-message" className="block text-xs font-bold text-slate-100 mb-1">
                      Message <span className="text-[#ECCB77]">*</span>
                    </label>
                    <textarea
                      id="home-contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Please describe your current business setup, questions, or timeline..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] outline-none resize-none transition-colors ${
                        errors.message ? 'border-red-400 bg-red-950/40' : 'border-[#D9A62E]/40'
                      } focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreeToContact}
                        onChange={(e) => {
                          setAgreeToContact(e.target.checked);
                          if (errors.agreeToContact) setErrors({ ...errors, agreeToContact: '' });
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-[#D9A62E]/40 text-[#D9A62E] focus:ring-[#D9A62E] bg-[#031E1B]"
                      />
                      <span className="text-xs text-slate-200 font-medium">
                        I agree to be contacted regarding my inquiry. <span className="text-[#ECCB77]">*</span>
                      </span>
                    </label>
                    {errors.agreeToContact && (
                      <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.agreeToContact}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-md cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4 text-[#042420]" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
