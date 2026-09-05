import React from 'react';
import { Mail, Clock, Shield, ArrowRight, Phone, MapPin, Sparkles, Lock } from 'lucide-react';
import { ServiceType } from '../types';
import { UomamaLogo } from './Logo';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectService: (serviceId: ServiceType) => void;
  onOpenConsultation: (serviceId?: ServiceType) => void;
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectService,
  onOpenConsultation,
  onOpenPolicy
}) => {
  const { settings } = useSiteSettings();

  return (
    <footer id="main-footer" className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-slate-200 border-t-2 border-[#D9A62E] shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              id="footer-brand-logo-btn"
              onClick={() => onNavigate('hero')}
              className="flex items-center text-left group focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
              aria-label="Uomama Business Solutions - Go to Homepage"
            >
              <UomamaLogo isFooter={true} onClick={() => onNavigate('hero')} />
            </button>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Professional corporate formations, statutory tax compliance, e-commerce consulting, modern web engineering, SEO strategies, brand identity design, and custom AI agent automation.
            </p>

            <div className="pt-2">
              <button
                id="footer-book-consultation-btn"
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border-2 border-[#D9A62E] transition-colors shadow-md cursor-pointer"
              >
                <span>Book Strategy Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#042420]" />
              </button>
            </div>
          </div>

          {/* Col 2: Category 1 & 2 - Setup & Tax (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider border-b border-[#D9A62E]/40 pb-1 text-[#ECCB77]">
                Setup & Formation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    id="footer-service-usa-llc"
                    onClick={() => onSelectService('usa-llc')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    USA LLC Formation
                  </button>
                </li>
                <li>
                  <button
                    id="footer-service-uk-ltd"
                    onClick={() => onSelectService('uk-ltd')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    UK LTD Formation
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider border-b border-[#D9A62E]/40 pb-1 text-[#ECCB77]">
                Filings & Compliance
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    id="footer-service-usa-tax"
                    onClick={() => onSelectService('usa-tax')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    USA Taxation & IRS Form 5472/1120
                  </button>
                </li>
                <li>
                  <button
                    id="footer-service-uk-tax"
                    onClick={() => onSelectService('uk-tax')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    UK Taxation & HMRC CT600 / VAT
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Category 3 & 4 - Digital, AI & E-commerce (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider border-b border-[#D9A62E]/40 pb-1 text-[#ECCB77]">
                Digital & AI Solutions
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    id="footer-service-ai-agent"
                    onClick={() => onSelectService('ai-agent')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    AI Agent Development
                  </button>
                </li>
                <li>
                  <button
                    id="footer-service-web-dev"
                    onClick={() => onSelectService('web-dev')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    Website Design & Development
                  </button>
                </li>
                <li>
                  <button
                    id="footer-service-seo"
                    onClick={() => onSelectService('seo-services')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    SEO Services & Organic Strategy
                  </button>
                </li>
                <li>
                  <button
                    id="footer-service-graphic-design"
                    onClick={() => onSelectService('graphic-design')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    Graphic Design & Brand Systems
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider border-b border-[#D9A62E]/40 pb-1 text-[#ECCB77]">
                E-Commerce
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    id="footer-service-ecommerce"
                    onClick={() => onSelectService('ecommerce-consulting')}
                    className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                  >
                    E-Commerce Business Consulting
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Quick Links & Contact Placeholders (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider border-b border-[#D9A62E]/40 pb-1 text-[#ECCB77]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('hero')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-link-portfolio"
                  onClick={() => onNavigate('portfolio')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  Portfolio & Cases
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  id="footer-link-why-us"
                  onClick={() => onNavigate('why-us')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  id="footer-link-how-it-works"
                  onClick={() => onNavigate('how-it-works')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate('contact')}
                  className="text-slate-200 hover:text-[#ECCB77] transition-colors text-left cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>

            {/* Official Contact Info */}
            <div className="pt-3 border-t border-[#D9A62E]/30 space-y-2 text-[11px] text-slate-200">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ECCB77] shrink-0 mt-0.5" />
                <span>contact@uomamabusiness.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ECCB77] shrink-0 mt-0.5" />
                <span>Global Client Support Desk</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#ECCB77] shrink-0 mt-0.5" />
                <span>Mon–Fri: 9:00 AM – 6:00 PM EST/GMT</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ECCB77] shrink-0 mt-0.5" />
                <span>USA & UK Global Services</span>
              </div>
            </div>
          </div>

        </div>

        {/* Professional Disclaimer Note */}
        <div className="mt-12 pt-8 border-t border-[#D9A62E]/30 text-xs text-slate-300 leading-relaxed">
          <p>
            Information provided through this website is for general informational purposes and does not constitute legal, tax, accounting or financial advice. Services and requirements may vary depending on individual circumstances and jurisdiction. Clients should seek advice from appropriately qualified professionals where required.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-[#D9A62E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p id="footer-copyright">
            © 2025 Uomama Business Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              id="footer-privacy-link"
              onClick={() => onOpenPolicy('privacy')}
              className="text-slate-200 hover:text-[#ECCB77] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              id="footer-terms-link"
              onClick={() => onOpenPolicy('terms')}
              className="text-slate-200 hover:text-[#ECCB77] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
