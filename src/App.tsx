import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { EcommerceSection } from './components/EcommerceSection';
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
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceType | 'general-consultation'>('usa-tax');
  const [selectedServiceDetailModal, setSelectedServiceDetailModal] = useState<ServiceItem | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | null>(null);
  const { applyPageSeo } = useSiteSettings();

  // Apply real-time SEO to document head whenever view changes
  useEffect(() => {
    applyPageSeo(currentView);
  }, [currentView, applyPageSeo]);

  // Synchronize with URL hash for clean client navigation and bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'admin' || hash === 'dashboard' || hash === 'backend') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (hash.startsWith('service-')) {
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
        setCurrentView('home');
        return;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

            {/* E-Commerce Consulting Section */}
            <EcommerceSection
              onOpenConsultation={handleOpenConsultation}
              onSelectService={handleSelectService}
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

        {currentView === 'admin' && (
          <AdminDashboard
            onBackToWebsite={() => handleNavigate('home')}
            onNavigateToService={handleSelectService}
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

      {/* Persistent Floating Side-Access Button for Admin / Backend Dashboard */}
      {currentView !== 'admin' && (
        <aside 
          id="floating-backend-side-dock"
          className="fixed right-3 bottom-6 sm:bottom-8 sm:right-6 z-40 animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto"
          aria-label="Admin Backend Quick Access"
        >
          <button
            id="floating-backend-dashboard-btn"
            onClick={() => handleNavigate('admin')}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-b from-[#0D554D] via-[#073630] to-[#031E1B] text-[#ECCB77] hover:text-white border-2 border-[#D9A62E] hover:border-[#FFF0C2] shadow-[0_8px_25px_rgba(3,30,27,0.5),0_0_15px_rgba(217,166,46,0.35)] hover:shadow-[0_12px_30px_rgba(3,30,27,0.7),0_0_25px_rgba(217,166,46,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
            title="Open Admin Dashboard & SEO Backend"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border border-[#D9A62E] flex items-center justify-center text-[#ECCB77] group-hover:rotate-90 transition-transform duration-500 shadow-xs">
              <Settings className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ECCB77] leading-none">UBS Portal</span>
              <span className="text-xs font-bold text-white whitespace-nowrap leading-tight mt-0.5">Admin / Backend</span>
            </div>
          </button>
        </aside>
      )}

    </div>
  );
}
