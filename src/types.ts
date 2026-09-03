export type ServiceType = 
  | 'usa-tax'
  | 'uk-tax'
  | 'usa-llc'
  | 'uk-ltd'
  | 'ecommerce-consulting'
  | 'ai-agent'
  | 'web-dev'
  | 'seo-services'
  | 'graphic-design';

export type ServiceCategory = 
  | 'Business Setup & Formation'
  | 'Filings & Compliance'
  | 'Digital & AI Solutions'
  | 'E-Commerce';

export interface ServiceOfferingCard {
  title: string;
  description: string;
  iconName?: string;
}

export interface ServiceProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: ServiceType;
  title: string;
  heroHeadline: string;
  heroSupportingText: string;
  shortDescription: string;
  detailedDescription: string;
  category: ServiceCategory;
  jurisdiction: 'USA' | 'UK' | 'Global';
  keyHighlights: string[];
  scopePoints: string[];
  deliverables: string[];
  offerings?: ServiceOfferingCard[];
  processSteps?: ServiceProcessStep[];
  focusAreas?: string[];
  digitalChannels?: string[];
  relatedServiceIds: ServiceType[];
}

export interface FaqItem {
  id: string;
  category: 'all' | 'usa-tax' | 'uk-tax' | 'usa-llc' | 'uk-ltd' | 'ecommerce' | 'digital-ai';
  question: string;
  answer: string;
}

export type AppView = 
  | 'home'
  | 'about'
  | 'contact'
  | 'portfolio'
  | 'admin'
  | ServiceType;

export interface PageSeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface SeoConfig {
  globalMetaTitle: string;
  globalMetaDescription: string;
  globalKeywords: string[];
  canonicalBaseUrl: string;
  author: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  ogType: string;
  twitterCard: 'summary' | 'summary_large_image';
  twitterHandle: string;
  googleSiteVerification: string;
  googleAnalyticsId: string;
  bingSiteVerification: string;
  structuredDataType: 'Organization' | 'LegalService' | 'ProfessionalService' | 'FinancialService';
  pageOverrides: {
    home?: PageSeoConfig;
    about?: PageSeoConfig;
    portfolio?: PageSeoConfig;
    contact?: PageSeoConfig;
    'usa-llc'?: PageSeoConfig;
    'uk-ltd'?: PageSeoConfig;
    'usa-tax'?: PageSeoConfig;
    'uk-tax'?: PageSeoConfig;
    'ecommerce-consulting'?: PageSeoConfig;
    'ai-agent'?: PageSeoConfig;
    'web-dev'?: PageSeoConfig;
    'seo-services'?: PageSeoConfig;
    'graphic-design'?: PageSeoConfig;
  };
}

export interface BrandingConfig {
  brandName: string;
  tagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  ogBannerUrl: string | null;
  primaryColor: string;
  goldAccentColor: string;
  establishedYear: string;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

export interface ContactConfig {
  primaryEmail: string;
  supportEmail: string;
  phone: string;
  whatsappNumber: string;
  officeAddress: string;
  businessHours: string;
  googleMapsUrl: string;
  socials: SocialLinks;
}

export interface LeadItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  serviceCategory: string;
  businessModel?: string;
  monthlyRevenue?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  selectedState?: string;
  addOns?: string[];
  adminNotes?: string;
  source?: 'website_modal' | 'contact_page' | 'consultation_hero' | 'offline_manual';
}

export interface SiteSettings {
  branding: BrandingConfig;
  seo: SeoConfig;
  contact: ContactConfig;
  servicesConfig?: Record<string, { enabled: boolean; customPrice?: string; turnaroundTime?: string }>;
}


export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  businessType?: string;
  serviceRequired: ServiceType | 'general-consultation';
  message: string;
  agreeToContact: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web & App' | 'Branding & Design' | 'E-Commerce' | 'AI & Strategy';
  clientLocation: string;
  overview: string;
  deliverables: string[];
  keyOutcome: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  companyOrLocation: string;
  serviceUsed: string;
  rating: number;
  quote: string;
  metric?: string;
}


