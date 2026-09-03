import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Globe2,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ServiceType } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ContactPageProps {
  onNavigateHome: () => void;
  onSelectService: (serviceId: ServiceType) => void;
  initialService?: ServiceType | 'general-consultation';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onSelectService,
  initialService = 'general-consultation'
}) => {
  const { addLead } = useSiteSettings();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [businessType, setBusinessType] = useState('E-commerce Seller');
  const [serviceRequired, setServiceRequired] = useState<string>(initialService);
  const [message, setMessage] = useState('');
  const [agreeToContact, setAgreeToContact] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Sync initialService if prop changes
  useEffect(() => {
    if (initialService) {
      setServiceRequired(initialService);
    }
  }, [initialService]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Full Name Validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    // Email Validation
    if (!email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // Country Validation
    if (!country.trim()) {
      newErrors.country = 'Please select your country.';
    }

    // Service Required Validation
    if (!serviceRequired) {
      newErrors.serviceRequired = 'Please select a service.';
    }

    // Message Validation
    if (!message.trim()) {
      newErrors.message = 'Please enter your message or project details.';
    }

    // Consent Checkbox Validation
    if (!agreeToContact) {
      newErrors.agreeToContact = 'Please confirm that you agree to be contacted.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

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
          source: 'dedicated_contact_page'
        });
      } catch (err) {
        console.warn('Backend lead sync note:', err);
      }
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setHasAttemptedSubmit(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setCountry('');
    setBusinessType('E-commerce Seller');
    setServiceRequired('general-consultation');
    setMessage('');
    setAgreeToContact(false);
    setErrors({});
  };

  return (
    <div id="contact-page" className="pt-24 pb-20 bg-gradient-to-b from-[#E5CB87] via-[#ECD8A5] to-[#E5CB87] min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#FAF2DB] border-b-2 border-[#D9A62E] sticky top-16 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            id="contact-breadcrumb-back-btn"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#092B4C] hover:text-[#D9A62E] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#ECD8A5]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D9A62E]" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#092B4C]/80">
            <span className="cursor-pointer hover:text-[#092B4C]" onClick={onNavigateHome}>Home</span>
            <span>/</span>
            <span className="text-[#092B4C] font-bold">Contact</span>
          </div>
        </div>
      </div>

      {/* Corporate Hero Banner with Female Business Professional Background */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] overflow-hidden border-b-2 border-[#D9A62E]">
        {/* Background Image with Dark Corporate Emerald Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/corporate-female-banner.jpg" 
            alt="Corporate Advisory Office" 
            className="w-full h-full object-cover object-center scale-105 opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A4740]/95 via-[#073630]/90 to-[#042420]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#042420]/60" />
        </div>

        {/* Banner Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
            <Mail className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>Direct Inquiry & Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wider font-serif uppercase drop-shadow-md">
            CONTACT <span className="text-[#ECCB77]">US</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-xs">
            Connect with UBS for USA & UK company formations, tax compliance, e-commerce, websites, SEO, and AI agents.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Information Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white rounded-2xl p-7 sm:p-8 border-2 border-[#D9A62E]/70 shadow-[0_16px_36px_rgba(4,36,32,0.65),inset_0_1px_0_rgba(255,255,255,0.1)] space-y-6">
              <div className="space-y-2 border-b border-[#D9A62E]/30 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">Official Communication</span>
                <h2 className="text-xl font-bold text-white font-serif">
                  Uomama Business Solutions
                </h2>
                <p className="text-xs text-slate-200">
                  Connect with our international advisory and operational support desk.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5">
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#031E1B] text-[#ECCB77] flex items-center justify-center shrink-0 shadow-sm border border-[#D9A62E]/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Email</p>
                    <p className="text-sm font-semibold text-white mt-0.5 tracking-wide">
                      contact@uomamabusiness.com
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Primary intake for project inquiries</p>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#031E1B] text-[#ECCB77] flex items-center justify-center shrink-0 shadow-sm border border-[#D9A62E]/50">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Phone / WhatsApp</p>
                    <p className="text-sm font-semibold text-white mt-0.5 tracking-wide">
                      Global Client Support
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Direct client advisory line</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#031E1B] text-[#ECCB77] flex items-center justify-center shrink-0 shadow-sm border border-[#D9A62E]/50">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Business Hours</p>
                    <p className="text-sm font-semibold text-white mt-0.5 tracking-wide">
                      Mon – Fri: 9:00 AM – 6:00 PM EST / GMT
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Standard operational schedule</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#031E1B] text-[#ECCB77] flex items-center justify-center shrink-0 shadow-sm border border-[#D9A62E]/50">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Location</p>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      USA & UK Business Services
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">Serving domestic and international clients worldwide</p>
                  </div>
                </div>

              </div>

              {/* Advisory note */}
              <div className="pt-4 border-t border-[#D9A62E]/30">
                <div className="p-4 rounded-xl bg-[#031E1B] border border-[#D9A62E]/40 text-xs text-slate-200 space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-[#ECCB77]" />
                    <span>Advisory Intake Process</span>
                  </div>
                  <p className="leading-relaxed">
                    All inquiries are evaluated by specialists in corporate formation, taxation, e-commerce, or digital development to match you with appropriate solutions.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: CONSULTATION INQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl p-7 sm:p-9 border-2 border-[#D9A62E]/70 shadow-[0_16px_36px_rgba(4,36,32,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
              
              {/* SUCCESS STATE */}
              {isSubmitted ? (
                <div id="contact-success-state" className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#031E1B] text-[#ECCB77] border-2 border-[#D9A62E] mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                      Thank You
                    </h2>
                    <p className="text-base text-slate-200 max-w-md mx-auto leading-relaxed font-medium">
                      Your inquiry has been received. We will review your request and get back to you.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#031E1B] border border-[#D9A62E]/40 text-left text-xs text-slate-200 space-y-2 max-w-md mx-auto shadow-inner">
                    <p className="font-bold text-[#ECCB77]">Submitted Summary:</p>
                    <p>• <span className="font-semibold text-white">Client Name:</span> {fullName}</p>
                    <p>• <span className="font-semibold text-white">Email Address:</span> {email}</p>
                    <p>• <span className="font-semibold text-white">Service Area:</span> {getServiceLabel(serviceRequired)}</p>
                    <p>• <span className="font-semibold text-white">Country:</span> {country}</p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      id="contact-success-home-btn"
                      onClick={onNavigateHome}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-sm text-xs cursor-pointer"
                    >
                      Back to Home
                    </button>
                    <button
                      id="contact-success-another-btn"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-slate-200 bg-[#031E1B] border border-[#D9A62E]/50 hover:bg-[#06332E] transition-colors text-xs cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* INQUIRY FORM */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-[#D9A62E]/30 pb-3">
                    <h2 className="text-xl font-bold text-white font-serif">
                      Consultation Inquiry Form
                    </h2>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Please complete all required fields (*).
                    </p>
                  </div>

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-full-name" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Full Name <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-full-name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors({ ...errors, fullName: '' });
                          }
                        }}
                        placeholder="Jane Smith"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                          errors.fullName 
                            ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-[#D9A62E]/40 focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30'
                        } outline-none`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email-address" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Email Address <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email-address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors({ ...errors, email: '' });
                          }
                        }}
                        placeholder="jane@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                          errors.email 
                            ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-[#D9A62E]/40 focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30'
                        } outline-none`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone / WhatsApp & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone-number" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Phone / WhatsApp <span className="text-slate-300 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone-number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 bg-[#031E1B] text-sm text-white focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30 outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-country-select" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Country / Jurisdiction <span className="text-[#ECCB77]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-country-select"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) {
                            setErrors({ ...errors, country: '' });
                          }
                        }}
                        placeholder="e.g., United States, UK, Canada, Germany"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                          errors.country 
                            ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-[#D9A62E]/40 focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30'
                        } outline-none`}
                      />
                      {errors.country && (
                        <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.country}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Business Type & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-business-type" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Business Type
                      </label>
                      <select
                        id="contact-business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9A62E]/40 bg-[#031E1B] text-sm text-white focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30 outline-none"
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
                      <label htmlFor="contact-service-required" className="block text-xs font-bold text-slate-100 mb-1.5">
                        Service Required <span className="text-[#ECCB77]">*</span>
                      </label>
                      <select
                        id="contact-service-required"
                        value={serviceRequired}
                        onChange={(e) => {
                          setServiceRequired(e.target.value);
                          if (errors.serviceRequired) {
                            setErrors({ ...errors, serviceRequired: '' });
                          }
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] transition-colors ${
                          errors.serviceRequired 
                            ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-[#D9A62E]/40 focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30'
                        } outline-none`}
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
                        <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.serviceRequired}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label htmlFor="contact-message-input" className="block text-xs font-bold text-slate-100 mb-1.5">
                      Message <span className="text-[#ECCB77]">*</span>
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                            setErrors({ ...errors, message: '' });
                        }
                      }}
                      placeholder="Please describe your current business setup, specific requirements, questions, or target timelines..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-white bg-[#031E1B] resize-none transition-colors ${
                        errors.message 
                          ? 'border-red-400 bg-red-950/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                          : 'border-[#D9A62E]/40 focus:border-[#D9A62E] focus:bg-[#052A26] focus:ring-2 focus:ring-[#D9A62E]/30'
                      } outline-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="contact-consent-checkbox"
                        checked={agreeToContact}
                        onChange={(e) => {
                          setAgreeToContact(e.target.checked);
                          if (errors.agreeToContact) {
                            setErrors({ ...errors, agreeToContact: '' });
                          }
                        }}
                        className="mt-1 w-4 h-4 rounded border-[#D9A62E]/40 text-[#D9A62E] focus:ring-[#D9A62E] bg-[#031E1B]"
                      />
                      <span className="text-xs text-slate-200 leading-normal font-medium">
                        I agree to be contacted regarding my inquiry. <span className="text-[#ECCB77]">*</span>
                      </span>
                    </label>
                    {errors.agreeToContact && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.agreeToContact}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      id="contact-submit-inquiry-btn"
                      className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#D9A62E]/20 outline-none cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#042420]" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-slate-400 font-medium">
                    We respect your privacy. Inquiries are handled with professional discretion.
                  </p>
                </form>
              )}

            </div>
          </div>

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
    default: return 'General Consultation';
  }
}
