import React, { useState, useEffect } from 'react';
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
  // Detect if running on Railway or in dedicated Admin mode
  const isDedicatedAdminMode = typeof window !== 'undefined' && (
    window.location.hostname.includes('railway.app') ||
    window.location.hostname.includes('railway') ||
    import.meta.env.VITE_APP_MODE === 'admin' ||
    window.location.pathname === '/admin' ||
    window.location.pathname.startsWith('/admin/') ||
    window.location.hash === '#admin'
  );

  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.hostname.includes('railway.app') ||
        window.location.hostname.includes('railway') ||
        import.meta.env.VITE_APP_MODE === 'admin' ||
        window.location.pathname === '/admin' ||
        window.location.pathname.startsWith('/admin/') ||
        window.location.hash === '#admin'
      ) {
        return 'admin';
      }
    }
    return 'home';
  });

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
      // If deployed on Railway or in Admin mode, lock view strictly to Admin Dashboard
      if (
        window.location.hostname.includes('railway.app') ||
        window.location.hostname.includes('railway') ||
        import.meta.env.VITE_APP_MODE === 'admin'
      ) {
        setCurrentView('admin');
        return;
      }

      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.toLowerCase();
      
      if (
        hash === 'admin' || 
        hash === 'dashboard' || 
        path === '/admin' || 
        path.startsWith('/admin')
      ) {
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

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
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

  // Dedicated Standalone Admin Console View (For Railway Deployment)
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F7F3EB] text-[#042420] antialiased">
        <AdminDashboard
          onBackToWebsite={() => {
            const savedUrl = (typeof window !== 'undefined' && localStorage.getItem('uomama_website_url')) || import.meta.env.VITE_FRONTEND_URL || 'https://uomamabusiness.com';
            window.open(savedUrl, '_blank');
          }}
          onNavigateToService={handleSelectService}
        />
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
    </div>
  );
}
