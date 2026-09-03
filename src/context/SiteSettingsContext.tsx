import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteSettings, LeadItem, ServiceType } from '../types';

const DEFAULT_SETTINGS: SiteSettings = {
  branding: {
    brandName: 'Uomama Business Solutions',
    tagline: 'Smart Solutions • Better Business • Global Growth',
    logoUrl: null, // null means use default SVG logo
    faviconUrl: null,
    ogBannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#063E38',
    goldAccentColor: '#D9A62E',
    establishedYear: '2025',
  },
  seo: {
    globalMetaTitle: 'Uomama Business Solutions | USA LLC, UK LTD, Tax Compliance & AI Solutions',
    globalMetaDescription: 'Premier international corporate services: USA LLC Formation, UK LTD Registration, IRS Form 5472/1120 filing, HMRC Tax Compliance, E-Commerce Advisory, Web Development & AI Agents.',
    globalKeywords: [
      'Uomama Business Solutions',
      'USA LLC Formation Non-Resident',
      'UK LTD Registration Non-Resident',
      'IRS Form 5472 and 1120',
      'HMRC CT600 VAT Filing',
      'US Business Bank Account Mercury Relay',
      'Amazon FBA Tax Consulting',
      'E-Commerce Corporate Advisory',
      'AI Agent Automation Solutions',
      'Web Design and SEO Services'
    ],
    canonicalBaseUrl: 'https://uomamabusiness.com',
    author: 'Uomama Business Solutions Advisory Team',
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: 'Uomama Business Solutions — Global Tax & Corporate Advisory',
    ogDescription: 'Form US & UK entities with zero hassle. Bank accounts, EIN, VAT, IRS compliance, and custom AI systems for global entrepreneurs.',
    ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterHandle: '@uomamabusiness',
    googleSiteVerification: '',
    googleAnalyticsId: '',
    bingSiteVerification: '',
    structuredDataType: 'ProfessionalService',
    pageOverrides: {
      home: {
        metaTitle: 'Uomama Business Solutions | Global Formations, Tax Advisory & AI Tech',
        metaDescription: 'Scale your cross-border business with USA LLC, UK LTD formation, IRS/HMRC tax compliance, and modern AI automation.',
        keywords: ['USA LLC', 'UK LTD', 'International Tax', 'E-Commerce Setup', 'AI Automation']
      },
      'usa-llc': {
        metaTitle: 'USA LLC Formation for Non-Residents | Wyoming, Delaware, New Mexico | Uomama',
        metaDescription: 'Fast US LLC formation with official state filing, registered agent, EIN without SSN, and Mercury/Relay business bank account assistance.',
        keywords: ['Wyoming LLC non resident', 'Delaware LLC', 'US EIN non resident', 'US business bank account']
      },
      'uk-ltd': {
        metaTitle: 'UK LTD Formation & Companies House Registration | Uomama Business Solutions',
        metaDescription: 'Incorporate your UK Limited company with Companies House, London registered office, Wise banking, and VAT registration.',
        keywords: ['UK company incorporation non resident', 'UK LTD setup', 'HMRC VAT', 'London registered office']
      },
      'usa-tax': {
        metaTitle: 'USA Non-Resident Tax Filings | IRS Form 5472 & Form 1120 | Uomama Advisory',
        metaDescription: 'Avoid $25,000 IRS penalties. Complete foreign-owned US LLC compliance, Form 5472, pro-forma 1120, state franchise tax and BOI reporting.',
        keywords: ['Form 5472 non resident', 'Form 1120 pro forma', 'IRS 6038A compliance', 'Foreign owned LLC tax']
      },
      'uk-tax': {
        metaTitle: 'UK Corporate Tax & VAT Compliance | HMRC CT600 & Accounts | Uomama',
        metaDescription: 'Comprehensive UK accountancy: Corporation Tax (CT600), Annual Accounts to Companies House, Confirmation Statement (CS01), and VAT returns.',
        keywords: ['UK CT600 tax return', 'HMRC VAT return', 'Companies House CS01', 'UK bookkeeping non resident']
      },
      'ecommerce-consulting': {
        metaTitle: 'E-Commerce Business Consulting | Amazon FBA, Shopify & TikTok Shop | Uomama',
        metaDescription: 'Full-spectrum e-commerce strategy: Multi-jurisdiction store setup, payment gateway integration, supply chain structuring, and marketplace compliance.',
        keywords: ['Amazon FBA consulting', 'Shopify cross border setup', 'TikTok Shop UK US', 'Stripe payment gateway']
      },
      'ai-agent': {
        metaTitle: 'AI Agent Development & Workflow Automation | Uomama Business Solutions',
        metaDescription: 'Custom autonomous AI agents, LLM integrations, client support bots, and internal workflow automations built for high-growth enterprises.',
        keywords: ['AI agent development', 'Autonomous AI workflows', 'Enterprise LLM bots', 'Business automation']
      },
      about: {
        metaTitle: 'About Uomama Business Solutions | Global Corporate Advisory & Digital Leaders',
        metaDescription: 'Learn about our team of certified cross-border legal, tax, engineering, and e-commerce specialists serving founders in 40+ countries.',
        keywords: ['About Uomama', 'Cross-border tax team', 'Corporate formation specialists']
      },
      portfolio: {
        metaTitle: 'Client Portfolio & Case Studies | Uomama Business Solutions',
        metaDescription: 'Explore our track record of successfully established US LLCs, UK LTDs, tax filings, e-commerce stores, and high-impact digital solutions.',
        keywords: ['Uomama case studies', 'Client success stories', 'Cross border portfolio']
      },
      contact: {
        metaTitle: 'Contact Uomama Business Solutions | Book Global Advisory Strategy Call',
        metaDescription: 'Get in touch with our senior corporate specialists. Schedule a 1-on-1 strategy call or send an inquiry for instant assessment.',
        keywords: ['Contact Uomama', 'Book tax consultation', 'Company setup inquiry']
      }
    }
  },
  contact: {
    primaryEmail: 'contact@uomamabusiness.com',
    supportEmail: 'support@uomamabusiness.com',
    phone: '+1 (307) 201-9876',
    whatsappNumber: '+13072019876',
    officeAddress: '30 N Gould St, Sheridan, WY 82801, USA & 71-75 Shelton Street, London, WC2H 9JQ, UK',
    businessHours: 'Mon – Fri: 9:00 AM – 6:00 PM EST / GMT (24/7 Priority Desk)',
    googleMapsUrl: 'https://maps.google.com/?q=30+N+Gould+St+Sheridan+WY+82801',
    socials: {
      linkedin: 'https://linkedin.com/company/uomama-business-solutions',
      twitter: 'https://twitter.com/uomamabusiness',
      facebook: 'https://facebook.com/uomamabusiness',
      instagram: 'https://instagram.com/uomamabusiness',
      youtube: 'https://youtube.com/@uomamabusiness',
      whatsapp: 'https://wa.me/13072019876'
    }
  }
};

const INITIAL_DEMO_LEADS: LeadItem[] = [
  {
    id: 'lead-101',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@solardrive.io',
    phone: '+44 7700 900123',
    country: 'United Kingdom',
    serviceCategory: 'usa-llc',
    businessModel: 'Amazon FBA (US Marketplace) & Shopify DTC',
    monthlyRevenue: '$25,000 - $50,000',
    message: 'Need a Wyoming LLC with EIN, US business bank account setup for Mercury/Relay, and annual IRS Form 5472/1120 compliance.',
    preferredDate: '2026-08-20',
    preferredTime: '14:00 GMT',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    selectedState: 'Wyoming',
    addOns: ['EIN Expedited', 'Registered Agent 1-Yr', 'Mercury Bank Assistance'],
    adminNotes: 'Spoke with Marcus on Google Meet. Verified passport documents. Wyoming filing submitted.',
    source: 'consultation_hero'
  },
  {
    id: 'lead-102',
    fullName: 'Elena Rostova',
    email: 'elena@nordicgoods.co',
    phone: '+49 151 23456789',
    country: 'Germany',
    serviceCategory: 'uk-ltd',
    businessModel: 'SaaS & TikTok Shop UK',
    monthlyRevenue: '$10,000 - $25,000',
    message: 'Require UK LTD formation with London address, VAT registration and Wise Business gateway setup.',
    preferredDate: '2026-08-22',
    preferredTime: '10:00 CET',
    status: 'new',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    selectedState: 'London, UK',
    addOns: ['London Registered Office', 'HMRC VAT Registration', 'Confirmation Statement CS01'],
    adminNotes: 'Awaiting client KYC proof of address.',
    source: 'website_modal'
  },
  {
    id: 'lead-103',
    fullName: 'Tariq Al-Mansoor',
    email: 'tariq@gulfdigital.ae',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    serviceCategory: 'ai-agent',
    businessModel: 'B2B Real Estate Tech & Lead Automation',
    monthlyRevenue: '$50,000+',
    message: 'Looking for a custom multi-channel AI receptionist and qualification agent integrated into WhatsApp & CRM.',
    preferredDate: '2026-08-25',
    preferredTime: '16:00 GST',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    addOns: ['WhatsApp API Integration', 'CRM Webhook Automation', 'Custom Voice Module'],
    adminNotes: 'Scope of work document sent for review. Follow up on Monday.',
    source: 'contact_page'
  }
];

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateBranding: (branding: Partial<SiteSettings['branding']>) => void;
  updateSeo: (seo: Partial<SiteSettings['seo']>) => void;
  updatePageSeo: (pageKey: string, pageSeo: { metaTitle: string; metaDescription: string; keywords: string[] }) => void;
  updateContact: (contact: Partial<SiteSettings['contact']>) => void;
  uploadLogo: (logoDataUrl: string) => void;
  resetLogoToDefault: () => void;
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => Promise<LeadItem>;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  refreshLeads: () => Promise<void>;
  applyPageSeo: (pageKey: string) => void;
  isBackendConnected: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

const STORAGE_SETTINGS_KEY = 'uomama_site_settings_v1';
const STORAGE_LEADS_KEY = 'uomama_site_leads_v1';

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          branding: { ...DEFAULT_SETTINGS.branding, ...(parsed.branding || {}) },
          seo: { ...DEFAULT_SETTINGS.seo, ...(parsed.seo || {}) },
          contact: { ...DEFAULT_SETTINGS.contact, ...(parsed.contact || {}) },
        };
      }
    } catch (e) {
      console.warn('Could not load settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LEADS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load leads from localStorage', e);
    }
    return INITIAL_DEMO_LEADS;
  });

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync with Backend on initial load
  useEffect(() => {
    const fetchBackendSettingsAndLeads = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings((prev) => ({
              ...prev,
              ...data.settings,
              branding: { ...prev.branding, ...(data.settings.branding || {}) },
              seo: { ...prev.seo, ...(data.settings.seo || {}) },
              contact: { ...prev.contact, ...(data.settings.contact || {}) },
            }));
            setIsBackendConnected(true);
          }
        }
      } catch (err) {
        console.log('Backend sync offline/fallback mode active');
      }

      try {
        const resLeads = await fetch('/api/consultations');
        if (resLeads.ok) {
          const dataLeads = await resLeads.json();
          if (Array.isArray(dataLeads.leads) && dataLeads.leads.length > 0) {
            setLeads(dataLeads.leads);
          }
        }
      } catch (err) {
        // Fallback local state is already loaded
      }
    };

    fetchBackendSettingsAndLeads();
  }, []);

  // Persist settings locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Persist leads locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage', e);
    }
  }, [leads]);

  // Dynamic Head SEO Tag Injection
  const applyPageSeo = (pageKey: string) => {
    try {
      const pageOverride = (settings.seo.pageOverrides as any)?.[pageKey];
      const title = pageOverride?.metaTitle || settings.seo.globalMetaTitle;
      const description = pageOverride?.metaDescription || settings.seo.globalMetaDescription;
      const keywords = (pageOverride?.keywords && pageOverride.keywords.length > 0) 
        ? pageOverride.keywords.join(', ') 
        : settings.seo.globalKeywords.join(', ');

      document.title = title;

      // Update Meta Description
      let metaDescEl = document.querySelector('meta[name="description"]');
      if (!metaDescEl) {
        metaDescEl = document.createElement('meta');
        metaDescEl.setAttribute('name', 'description');
        document.head.appendChild(metaDescEl);
      }
      metaDescEl.setAttribute('content', description);

      // Update Meta Keywords
      let metaKeywordsEl = document.querySelector('meta[name="keywords"]');
      if (!metaKeywordsEl) {
        metaKeywordsEl = document.createElement('meta');
        metaKeywordsEl.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywordsEl);
      }
      metaKeywordsEl.setAttribute('content', keywords);

      // Update OpenGraph Title & Description
      let ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute('content', title);
      let ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute('content', description);

      // Update Robots
      let metaRobotsEl = document.querySelector('meta[name="robots"]');
      if (!metaRobotsEl) {
        metaRobotsEl = document.createElement('meta');
        metaRobotsEl.setAttribute('name', 'robots');
        document.head.appendChild(metaRobotsEl);
      }
      metaRobotsEl.setAttribute(
        'content', 
        `${settings.seo.robotsIndex ? 'index' : 'noindex'}, ${settings.seo.robotsFollow ? 'follow' : 'nofollow'}`
      );

      // Update Google Verification if present
      if (settings.seo.googleSiteVerification) {
        let gVerifyEl = document.querySelector('meta[name="google-site-verification"]');
        if (!gVerifyEl) {
          gVerifyEl = document.createElement('meta');
          gVerifyEl.setAttribute('name', 'google-site-verification');
          document.head.appendChild(gVerifyEl);
        }
        gVerifyEl.setAttribute('content', settings.seo.googleSiteVerification);
      }

      // Update Structured Data JSON-LD
      let schemaScript = document.getElementById('uomama-schema-ld');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('id', 'uomama-schema-ld');
        document.head.appendChild(schemaScript);
      }
      const schemaData = {
        "@context": "https://schema.org",
        "@type": settings.seo.structuredDataType || "ProfessionalService",
        "name": settings.branding.brandName,
        "description": description,
        "url": settings.seo.canonicalBaseUrl,
        "telephone": settings.contact.phone,
        "email": settings.contact.primaryEmail,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.contact.officeAddress
        },
        "sameAs": Object.values(settings.contact.socials).filter(Boolean)
      };
      schemaScript.textContent = JSON.stringify(schemaData);

    } catch (err) {
      console.warn('Could not inject head SEO tags:', err);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = {
      ...settings,
      ...newSettings,
      branding: { ...settings.branding, ...(newSettings.branding || {}) },
      seo: { ...settings.seo, ...(newSettings.seo || {}) },
      contact: { ...settings.contact, ...(newSettings.contact || {}) },
    };
    setSettings(updated);

    // Push to backend
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: updated }),
      });
      setIsBackendConnected(true);
    } catch (e) {
      console.log('Saved to local storage.');
    }
  };

  const updateBranding = (branding: Partial<SiteSettings['branding']>) => {
    updateSettings({ branding: { ...settings.branding, ...branding } });
  };

  const updateSeo = (seo: Partial<SiteSettings['seo']>) => {
    updateSettings({ seo: { ...settings.seo, ...seo } });
  };

  const updatePageSeo = (pageKey: string, pageSeo: { metaTitle: string; metaDescription: string; keywords: string[] }) => {
    const newPageOverrides = {
      ...(settings.seo.pageOverrides || {}),
      [pageKey]: pageSeo
    };
    updateSettings({
      seo: {
        ...settings.seo,
        pageOverrides: newPageOverrides
      }
    });
  };

  const updateContact = (contact: Partial<SiteSettings['contact']>) => {
    updateSettings({ contact: { ...settings.contact, ...contact } });
  };

  const uploadLogo = (logoDataUrl: string) => {
    updateBranding({ logoUrl: logoDataUrl });
    // Also try to push to backend endpoint
    fetch('/api/admin/upload-logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logoDataUrl }),
    }).catch(() => {});
  };

  const resetLogoToDefault = () => {
    updateBranding({ logoUrl: null });
  };

  const addLead = async (leadData: Omit<LeadItem, 'id' | 'createdAt'>): Promise<LeadItem> => {
    const newLead: LeadItem = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: leadData.status || 'new',
    };

    setLeads((prev) => [newLead, ...prev]);

    // Send to backend
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.lead) {
          setIsBackendConnected(true);
        }
      }
    } catch (e) {
      console.log('Saved lead to local CRM state.');
    }

    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );

    fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  };

  const updateLeadNotes = (id: string, adminNotes: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, adminNotes } : lead))
    );

    fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminNotes }),
    }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));

    fetch(`/api/admin/leads/${id}`, {
      method: 'DELETE',
    }).catch(() => {});
  };

  const refreshLeads = async () => {
    try {
      const res = await fetch('/api/consultations');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }
    } catch (e) {
      console.warn('Could not refresh from server');
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateBranding,
        updateSeo,
        updatePageSeo,
        updateContact,
        uploadLogo,
        resetLogoToDefault,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        refreshLeads,
        applyPageSeo,
        isBackendConnected,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
