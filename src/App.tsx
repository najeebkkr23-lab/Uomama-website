import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PortfolioPage } from './components/PortfolioPage';
import { DedicatedServicePage } from './components/DedicatedServicePage';
import { ConsultationModal } from './components/ConsultationModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ServiceType, ServiceItem, AppView } from './types';
import { servicesData } from './data/services';
import { useSiteSettings } from './context/SiteSettingsContext';

export default function App() {
  // Detect if deployed on Railway or running in Admin mode
  const isRailway = typeof window !== 'undefined' && (
    window.location.hostname.includes('railway.app') ||
    window.location.hostname.includes('railway')
  );

  const getInitialView = (): AppView => {
    if (typeof window === 'undefined') return 'home';

    const hash = window.location.hash.replace('#', '').toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();

    // Explicit request to view website
    if (hash === 'website' || hash === 'site' || hash === 'home') {
      return 'home';
    }

    // Explicit admin triggers (hash, path, query param, or env)
    if (
      hash === 'admin' ||
      hash === 'dashboard' ||
      path === '/admin' ||
      path.startsWith('/admin') ||
      path === '/dashboard' ||
      path.startsWith('/dashboard') ||
      search.includes('view=admin') ||
      search.includes('admin=true') ||
      search.includes('dashboard=true') ||
      import.meta.env.VITE_APP_MODE === 'admin' ||
      import.meta.env.VITE_DEFAULT_VIEW === 'admin'
    ) {
      return 'admin';
    }

    // When deployed on Railway, automatically launch Admin Dashboard from start!
    if (isRailway) {
      return 'admin';
    }

    return 'home';
  };

  const [currentView, setCurrentView] = useState<AppView>(getInitialView);

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceType | 'general-consultation'>('usa-tax');
  const [selectedServiceDetailModal, setSelectedServiceDetailModal] = useState<ServiceItem | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const { applyPageSeo } = useSiteSettings();

  // Apply real-time SEO to document head whenever view changes
  useEffect(() => {
    applyPageSeo(currentView);
  }, [currentView, applyPageSeo]);

  // Synchronize with URL hash or path for clean client navigation and bookmarking
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      // If user specifically wants to preview the public website
      if (hash === 'website' || hash === 'site') {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Explicit admin triggers
      if (
        hash === 'admin' || 
        hash === 'dashboard' || 
        path === '/admin' || 
        path.startsWith('/admin') ||
        path === '/dashboard' ||
        path.startsWith('/dashboard') ||
        search.includes('view=admin') ||
        search.includes('admin=true') ||
        search.includes('dashboard=true') ||
        import.meta.env.VITE_APP_MODE === 'admin'
      ) {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // On Railway: if no hash is provided, default to Admin Dashboard
      if (isRailway && !hash) {
        setCurrentView('admin');
        return;
      }

      if (hash.startsWith('service-')) {
        const serviceId = hash.replace('service-', '') as ServiceType;
        const exists = servicesData.some((s) => s.id === serviceId);
        if (exists) {
          setCurrentView(serviceId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash === 'portfolio' || hash === 'case-studies') {
        setCurrentView('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (hash === 'about' || hash === 'about-us') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (hash === 'contact' || hash === 'contact-us') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (hash === 'home' || hash === '' || hash === 'hero') {
        if (!isRailway) {
          setCurrentView('home');
        }
        return;
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isRailway]);

  const handleNavigate = (target: string) => {
    if (target === 'admin' || target === 'dashboard' || target === 'backend') {
      setCurrentView('admin');
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'portfolio' || target === 'case-studies') {
      setCurrentView('portfolio');
      window.location.hash = 'portfolio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'about' || target === 'about-us') {
      setCurrentView('about');
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'contact' || target === 'contact-us') {
      setCurrentView('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Homepage section routing
    setCurrentView('home');
    window.location.hash = target || 'home';

    setTimeout(() => {
      if (target && target !== 'hero' && target !== 'home') {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSelectService = (serviceId: ServiceType) => {
    setCurrentView(serviceId);
    window.location.hash = `service-${serviceId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceId?: ServiceType | 'general-consultation') => {
    if (serviceId) {
      setSelectedServiceForModal(serviceId);
    } else if (currentView !== 'home' && currentView !== 'about' && currentView !== 'contact' && currentView !== 'portfolio') {
      setSelectedServiceForModal(currentView);
    } else {
      setSelectedServiceForModal('general-consultation');
    }
    setIsConsultationModalOpen(true);
  };

  // Dedicated Standalone Admin Console View (For Railway Deployment)
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F7F3EB] text-[#042420] antialiased flex flex-col">
        {/* Railway Status & Seamless Website Switcher Header */}
        <header className="bg-[#031E1B] text-[#ECCB77] border-b-2 border-[#D9A62E] px-4 py-2.5 flex items-center justify-between text-xs font-bold shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-2 ring-emerald-400/30" />
            <span className="tracking-wide">
              {isRailway ? "Railway Deployment: Admin Dashboard Active" : "Uomama Business Solutions • Management Console"}
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded-sm bg-[#063E38] text-[10px] text-slate-300 border border-[#D9A62E]/40 font-mono">
              Live Leads & SEO Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-preview-website-btn"
              onClick={() => {
                setCurrentView('home');
                window.location.hash = 'website';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#063E38] hover:bg-[#0A4D46] text-[#ECCB77] border border-[#D9A62E] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm text-xs font-bold"
            >
              <span>Preview Public Website</span>
              <span className="text-[#D9A62E]">→</span>
            </button>
          </div>
        </header>

        <div className="flex-1">
          <AdminDashboard
            onBackToWebsite={() => {
              setCurrentView('home');
              window.location.hash = 'website';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToService={handleSelectService}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECD8A5] text-[#092B4C] font-sans selection:bg-[#D9A62E]/40 selection:text-[#092B4C] antialiased">
      
      {/* Navigation Header */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onSelectService={handleSelectService}
        onNavigate={handleNavigate}
        isHomeView={currentView === 'home'}
      />

      {/* Main Content Area */}
      <main>
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onOpenConsultation={handleOpenConsultation}
              onExploreServices={() => handleNavigate('services')}
              onSelectService={handleSelectService}
            />

            {/* 9 Practice Areas Services Grid */}
            <ServicesSection
              onSelectService={handleSelectService}
              onOpenConsultation={handleOpenConsultation}
            />

            {/* Testimonials & Client Reviews */}
            <TestimonialsSection />

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* How It Works Section */}
            <HowItWorks
              onOpenConsultation={handleOpenConsultation}
            />

            {/* About Us Summary Section */}
            <AboutSection
              onOpenConsultation={handleOpenConsultation}
              onSelectService={handleSelectService}
            />

            {/* FAQ Section */}
            <FaqSection />

            {/* Contact Section */}
            <ContactSection onNavigateHome={() => handleNavigate('home')} />

            {/* Bottom Action CTA */}
            <CtaSection
              onOpenConsultation={handleOpenConsultation}
              onNavigateContact={() => handleNavigate('contact')}
            />
          </>
        )}

        {currentView === 'portfolio' && (
          <PortfolioPage
            onNavigateHome={() => handleNavigate('home')}
            onSelectService={handleSelectService}
            onOpenConsultation={handleOpenConsultation}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onNavigateHome={() => handleNavigate('home')}
            onSelectService={handleSelectService}
            onOpenConsultation={handleOpenConsultation}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onNavigateHome={() => handleNavigate('home')}
            onSelectService={handleSelectService}
            initialService={selectedServiceForModal}
          />
        )}

        {currentView !== 'home' && currentView !== 'about' && currentView !== 'contact' && currentView !== 'portfolio' && currentView !== 'admin' && (
          <DedicatedServicePage
            serviceId={currentView}
            onNavigateHome={() => handleNavigate('services')}
            onSelectService={handleSelectService}
            onOpenConsultation={handleOpenConsultation}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectService={handleSelectService}
        onOpenConsultation={handleOpenConsultation}
        onOpenPolicy={setActivePolicyModal}
      />

      {/* Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialService={selectedServiceForModal}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceDetailModal}
        onClose={() => setSelectedServiceDetailModal(null)}
        onBookConsultation={(serviceId) => {
          setSelectedServiceDetailModal(null);
          handleOpenConsultation(serviceId);
        }}
      />

      {/* Privacy Policy & Terms Modal */}
      <PolicyModal
        type={activePolicyModal}
        onClose={() => setActivePolicyModal(null)}
      />

      {/* Quick Admin Dashboard Switcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          id="floating-admin-dashboard-btn"
          onClick={() => {
            setCurrentView('admin');
            window.location.hash = 'admin';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-gradient-to-b from-[#063E38] to-[#031E1B] border-2 border-[#D9A62E] shadow-2xl hover:scale-105 transition-all cursor-pointer hover:border-[#ECCB77] group"
          title="Open Admin Dashboard"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin Dashboard</span>
        </button>
      </div>
    </div>
  );
}
