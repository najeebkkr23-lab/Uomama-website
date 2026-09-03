import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Landmark, 
  FileText, 
  Receipt, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Bot,
  Code2,
  Search,
  Palette,
  Briefcase,
  Layers,
  Sparkles,
  Settings
} from 'lucide-react';
import { ServiceType } from '../types';
import { UomamaLogo } from './Logo';

interface NavbarProps {
  onOpenConsultation: (service?: ServiceType) => void;
  onSelectService: (serviceId: ServiceType) => void;
  onNavigate: (sectionId: string) => void;
  isHomeView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onSelectService,
  onNavigate,
  isHomeView = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    onNavigate(sectionId);
  };

  const handleServiceClick = (serviceId: ServiceType) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    onSelectService(serviceId);
  };

  // All 9 Services ordered cleanly in a vertical dropdown matching reference
  const allServicesList: { id: ServiceType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'ecommerce-consulting', label: 'Business Consultation (E-Commerce)', icon: ShoppingCart },
    { id: 'usa-llc', label: 'Company Registration (USA LLC Formation)', icon: Landmark },
    { id: 'uk-ltd', label: 'UK LTD Formation & Companies House', icon: Building2 },
    { id: 'usa-tax', label: 'TAX Planning & Advisory (USA IRS)', icon: FileText },
    { id: 'uk-tax', label: 'All Accountancy Services & VAT (UK HMRC)', icon: Receipt },
    { id: 'ai-agent', label: 'AI Agent Development & Automation', icon: Bot },
    { id: 'web-dev', label: 'WEB Designing & Development', icon: Code2 },
    { id: 'seo-services', label: 'SEO Services & Search Optimization', icon: Search },
    { id: 'graphic-design', label: 'Graphic Design & Brand Identity', icon: Palette }
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#EEDCA8]/95 backdrop-blur-md shadow-md border-b-2 border-[#D9A62E] py-2 sm:py-2.5' 
          : 'bg-[#EEDCA8]/90 backdrop-blur-sm border-b-2 border-[#D9A62E]/70 py-2.5 sm:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Official Dynamic Uomama Business Solutions Logo - Clickable to Home */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left focus:outline-none cursor-pointer"
            aria-label="Uomama Business Solutions - Go to Homepage"
          >
            <UomamaLogo onClick={() => handleNavClick('hero')} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button 
              id="nav-home"
              onClick={() => handleNavClick('hero')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              Home
            </button>

            {/* Comprehensive Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button 
                id="nav-services-dropdown"
                onClick={() => {
                  if (isHomeView) {
                    handleNavClick('services');
                  } else {
                    handleNavClick('hero');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180 text-[#063E38]' : 'text-[#042420]/80'}`} />
              </button>

              {isServicesDropdownOpen && (
                <div 
                  id="services-dropdown-menu"
                  className="absolute top-full left-0 w-80 pt-2 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <div className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-xl shadow-2xl border-2 border-[#D9A62E] py-2.5 overflow-hidden divide-y divide-[#D9A62E]/30 text-white">
                    <div className="py-1">
                      {allServicesList.map((service) => {
                        const Icon = service.icon;
                        return (
                          <button
                            key={service.id}
                            id={`nav-service-item-${service.id}`}
                            onClick={() => handleServiceClick(service.id)}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-md bg-[#031E1B] text-[#ECCB77] shrink-0 border border-[#D9A62E]/40">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-white">
                                {service.label}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77]" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Dropdown Footer */}
                    <div className="px-4 py-2.5 bg-[#031E1B] flex items-center justify-between border-t border-[#D9A62E]/30">
                      <span className="text-[11px] font-bold text-slate-200">Need advisory?</span>
                      <button
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          onOpenConsultation();
                        }}
                        className="text-[11px] font-bold text-[#ECCB77] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Book Strategy Call</span>
                        <ArrowRight className="w-3 h-3 text-[#ECCB77]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              id="nav-portfolio"
              onClick={() => handleNavClick('portfolio')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              Portfolio
            </button>

            <button 
              id="nav-why-us"
              onClick={() => handleNavClick('why-us')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              Why Choose Us
            </button>

            <button 
              id="nav-how-it-works"
              onClick={() => handleNavClick('how-it-works')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              How It Works
            </button>

            <button 
              id="nav-about"
              onClick={() => handleNavClick('about-us')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              About Us
            </button>

            <button 
              id="nav-faqs"
              onClick={() => handleNavClick('faqs')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              FAQs
            </button>

            <button 
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className="px-3 py-2 text-sm font-bold text-[#042420] rounded-lg cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right CTA Area: Consultation */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="nav-book-consultation-btn"
              onClick={() => onOpenConsultation()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-b from-[#0B5C54] to-[#042420] border-2 border-[#D9A62E] shadow-sm cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#D9A62E]" />
            </button>
          </div>

          {/* Mobile / Tablet controls */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#042420] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] text-white border-b-2 border-[#D9A62E] px-4 pt-3 pb-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2">
          <div className="space-y-3">
            <button
              onClick={() => handleNavClick('hero')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-white rounded-md hover:bg-[#031E1B] hover:text-[#ECCB77]"
            >
              Home
            </button>
            
            {/* Mobile Services List */}
            <div className="py-2 border-t border-[#D9A62E]/40">
              <p className="px-3 text-xs font-bold text-[#ECCB77] uppercase tracking-wider mb-1.5">Practice Areas & Services</p>
              <div className="grid grid-cols-1 gap-1">
                {allServicesList.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-[#ECCB77]" />
                        <span>{service.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ECCB77]/60" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9A62E]/40 space-y-1">
              <button
                onClick={() => handleNavClick('portfolio')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                Portfolio & Case Studies
              </button>
              <button
                onClick={() => handleNavClick('why-us')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('about-us')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick('faqs')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                FAQs
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-100 hover:text-[#ECCB77] hover:bg-[#031E1B] rounded-md"
              >
                Contact & Inquiries
              </button>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border-2 border-[#D9A62E] shadow-sm"
              >
                <span>Book a Strategy Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#042420]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
