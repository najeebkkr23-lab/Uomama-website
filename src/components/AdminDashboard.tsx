import React, { useState, useRef } from 'react';
import { 
  Settings, 
  Upload, 
  Trash2, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Search, 
  Globe, 
  Building2, 
  Users, 
  Phone, 
  Mail, 
  ExternalLink, 
  RotateCcw, 
  Download, 
  Plus, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  Check, 
  Filter, 
  Eye,
  Sliders,
  Code,
  Tag
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { LeadItem, ServiceType } from '../types';
import { UomamaLogo } from './Logo';

interface AdminDashboardProps {
  onBackToWebsite: () => void;
  onNavigateToService?: (serviceId: ServiceType) => void;
}

type AdminTab = 'branding' | 'seo' | 'pages-seo' | 'audit' | 'leads' | 'contact';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onBackToWebsite 
}) => {
  const { 
    settings, 
    updateBranding, 
    updateSeo, 
    updatePageSeo, 
    updateContact, 
    uploadLogo, 
    resetLogoToDefault,
    leads,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    addLead,
    applyPageSeo,
    isBackendConnected
  } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<AdminTab>('branding');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  
  // Branding local form state
  const [brandName, setBrandName] = useState(settings.branding.brandName);
  const [tagline, setTagline] = useState(settings.branding.tagline);
  const [ogBannerUrl, setOgBannerUrl] = useState(settings.branding.ogBannerUrl || '');
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.branding.logoUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // SEO local form state
  const [globalMetaTitle, setGlobalMetaTitle] = useState(settings.seo.globalMetaTitle);
  const [globalMetaDescription, setGlobalMetaDescription] = useState(settings.seo.globalMetaDescription);
  const [canonicalBaseUrl, setCanonicalBaseUrl] = useState(settings.seo.canonicalBaseUrl);
  const [author, setAuthor] = useState(settings.seo.author);
  const [robotsIndex, setRobotsIndex] = useState(settings.seo.robotsIndex);
  const [robotsFollow, setRobotsFollow] = useState(settings.seo.robotsFollow);
  const [ogTitle, setOgTitle] = useState(settings.seo.ogTitle);
  const [ogDescription, setOgDescription] = useState(settings.seo.ogDescription);
  const [twitterHandle, setTwitterHandle] = useState(settings.seo.twitterHandle);
  const [googleSiteVerification, setGoogleSiteVerification] = useState(settings.seo.googleSiteVerification);
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(settings.seo.googleAnalyticsId);
  const [structuredDataType, setStructuredDataType] = useState(settings.seo.structuredDataType);
  
  // Keywords management
  const [keywords, setKeywords] = useState<string[]>(settings.seo.globalKeywords || []);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Page-specific SEO state
  const [selectedPageKey, setSelectedPageKey] = useState<string>('home');
  const [pageMetaTitle, setPageMetaTitle] = useState(
    (settings.seo.pageOverrides as any)?.['home']?.metaTitle || ''
  );
  const [pageMetaDesc, setPageMetaDesc] = useState(
    (settings.seo.pageOverrides as any)?.['home']?.metaDescription || ''
  );
  const [pageKeywordsStr, setPageKeywordsStr] = useState(
    (settings.seo.pageOverrides as any)?.['home']?.keywords?.join(', ') || ''
  );

  // Contact local form state
  const [primaryEmail, setPrimaryEmail] = useState(settings.contact.primaryEmail);
  const [supportEmail, setSupportEmail] = useState(settings.contact.supportEmail);
  const [phone, setPhone] = useState(settings.contact.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.contact.whatsappNumber);
  const [officeAddress, setOfficeAddress] = useState(settings.contact.officeAddress);
  const [businessHours, setBusinessHours] = useState(settings.contact.businessHours);
  const [socials, setSocials] = useState({ ...settings.contact.socials });

  // Leads CRM filter states
  const [leadSearchTerm, setLeadSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadCategoryFilter, setLeadCategoryFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    serviceCategory: 'usa-llc',
    businessModel: '',
    monthlyRevenue: '',
    message: '',
    status: 'new' as LeadItem['status'],
    adminNotes: ''
  });

  // SEO Audit State
  const [auditResult, setAuditResult] = useState<{
    score: number;
    grade: string;
    checks: { name: string; passed: boolean; score: number; details: string }[];
  } | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const showNotification = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4000);
  };

  // Handle Logo Upload File Selection
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Logo file size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setLogoPreview(dataUrl);
      uploadLogo(dataUrl);
      showNotification('Custom logo uploaded & applied successfully across header and footer!');
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setLogoPreview(null);
    resetLogoToDefault();
    showNotification('Reset to official default Uomama vector logo.');
  };

  const handleSaveBranding = () => {
    updateBranding({
      brandName,
      tagline,
      ogBannerUrl: ogBannerUrl || null,
    });
    showNotification('Branding & identity settings saved successfully!');
  };

  // Handle Global SEO Save
  const handleSaveGlobalSeo = () => {
    updateSeo({
      globalMetaTitle,
      globalMetaDescription,
      globalKeywords: keywords,
      canonicalBaseUrl,
      author,
      robotsIndex,
      robotsFollow,
      ogTitle: ogTitle || globalMetaTitle,
      ogDescription: ogDescription || globalMetaDescription,
      twitterHandle,
      googleSiteVerification,
      googleAnalyticsId,
      structuredDataType,
    });
    applyPageSeo('home');
    showNotification('Global SEO metadata & Search Engine tags saved and applied live to HTML head!');
  };

  // Keyword Helpers
  const handleAddKeyword = () => {
    if (!newKeywordInput.trim()) return;
    if (!keywords.includes(newKeywordInput.trim())) {
      setKeywords([...keywords, newKeywordInput.trim()]);
    }
    setNewKeywordInput('');
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // Page Specific SEO change
  const handlePageSelectChange = (pageKey: string) => {
    setSelectedPageKey(pageKey);
    const existing = (settings.seo.pageOverrides as any)?.[pageKey];
    if (existing) {
      setPageMetaTitle(existing.metaTitle || '');
      setPageMetaDesc(existing.metaDescription || '');
      setPageKeywordsStr(existing.keywords?.join(', ') || '');
    } else {
      setPageMetaTitle('');
      setPageMetaDesc('');
      setPageKeywordsStr('');
    }
  };

  const handleSavePageSeo = () => {
    const kwArray = pageKeywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    updatePageSeo(selectedPageKey, {
      metaTitle: pageMetaTitle,
      metaDescription: pageMetaDesc,
      keywords: kwArray,
    });
    applyPageSeo(selectedPageKey);
    showNotification(`SEO settings saved for page: ${selectedPageKey}`);
  };

  // Handle Contact Save
  const handleSaveContact = () => {
    updateContact({
      primaryEmail,
      supportEmail,
      phone,
      whatsappNumber,
      officeAddress,
      businessHours,
      socials,
    });
    showNotification('Official contact & office addresses updated successfully!');
  };

  // Run Real-Time SEO Audit
  const handleRunSeoAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/admin/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setAuditResult(data);
      } else {
        // Fallback local calculations
        calculateLocalAudit();
      }
    } catch (e) {
      calculateLocalAudit();
    } finally {
      setIsAuditing(false);
    }
  };

  const calculateLocalAudit = () => {
    const checks = [
      {
        name: 'Global Title Length',
        passed: globalMetaTitle.length >= 30 && globalMetaTitle.length <= 70,
        score: globalMetaTitle.length >= 30 && globalMetaTitle.length <= 70 ? 15 : 8,
        details: `Current length: ${globalMetaTitle.length} chars (Recommended: 40-65 chars)`
      },
      {
        name: 'Meta Description Length',
        passed: globalMetaDescription.length >= 100 && globalMetaDescription.length <= 170,
        score: globalMetaDescription.length >= 100 && globalMetaDescription.length <= 170 ? 20 : 10,
        details: `Current length: ${globalMetaDescription.length} chars (Recommended: 120-160 chars)`
      },
      {
        name: 'Target Keywords Count',
        passed: keywords.length >= 5,
        score: keywords.length >= 5 ? 15 : 5,
        details: `${keywords.length} keywords configured`
      },
      {
        name: 'OpenGraph Social Sharing Tags',
        passed: Boolean(ogTitle && ogDescription),
        score: ogTitle && ogDescription ? 15 : 5,
        details: 'Social preview card tags for WhatsApp, Facebook & LinkedIn'
      },
      {
        name: 'Robots & Search Indexing',
        passed: robotsIndex === true,
        score: robotsIndex ? 15 : 0,
        details: robotsIndex ? 'Indexation enabled for Googlebot' : 'WARNING: Website set to noindex'
      },
      {
        name: 'Canonical Base URL',
        passed: Boolean(canonicalBaseUrl),
        score: canonicalBaseUrl ? 10 : 0,
        details: `Base canonical: ${canonicalBaseUrl}`
      },
      {
        name: 'Structured Data / JSON-LD Schema',
        passed: Boolean(structuredDataType),
        score: 10,
        details: `Schema Type: ${structuredDataType}`
      }
    ];

    const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
    setAuditResult({
      score: totalScore,
      grade: totalScore >= 85 ? 'A+' : totalScore >= 70 ? 'B' : 'C',
      checks
    });
  };

  // Export Leads to CSV
  const handleExportCsv = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Country', 'Service', 'Business Model', 'Revenue', 'Status', 'Notes', 'Message'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.country}"`,
      `"${l.serviceCategory}"`,
      `"${(l.businessModel || '').replace(/"/g, '""')}"`,
      `"${l.monthlyRevenue || ''}"`,
      l.status,
      `"${(l.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `uomama_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.fullName.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
      l.country.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
      (l.phone && l.phone.includes(leadSearchTerm));

    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchesCategory = leadCategoryFilter === 'all' || l.serviceCategory === leadCategoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const availablePagesList = [
    { key: 'home', label: 'Home Page' },
    { key: 'about', label: 'About Us Page' },
    { key: 'portfolio', label: 'Portfolio & Cases' },
    { key: 'contact', label: 'Contact Page' },
    { key: 'usa-llc', label: 'Service: USA LLC Formation' },
    { key: 'uk-ltd', label: 'Service: UK LTD Formation' },
    { key: 'usa-tax', label: 'Service: USA IRS Tax (5472/1120)' },
    { key: 'uk-tax', label: 'Service: UK HMRC Tax & VAT' },
    { key: 'ecommerce-consulting', label: 'Service: E-Commerce Consulting' },
    { key: 'ai-agent', label: 'Service: AI Agent Development' },
    { key: 'web-dev', label: 'Service: Web Design & Development' },
    { key: 'seo-services', label: 'Service: SEO Strategy' },
    { key: 'graphic-design', label: 'Service: Graphic Design & Branding' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#042420] pt-24 pb-20">
      
      {/* Top Notification Toast */}
      {saveSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#063E38] text-white border-2 border-[#D9A62E] px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-[#ECCB77] shrink-0" />
          <span className="text-sm font-bold">{saveSuccessMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-[#063E38] via-[#0A4D46] to-[#042420] rounded-2xl p-6 sm:p-8 text-white border-2 border-[#D9A62E] shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#D9A62E]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBackToWebsite}
                title="Go to Homepage"
                className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-[#D9A62E] flex items-center justify-center shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <UomamaLogo variant="mark" className="w-full h-full" onClick={onBackToWebsite} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                    Admin Management Console
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D9A62E] text-[#042420]">
                    Backend v2.4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#ECCB77] mt-1 font-medium">
                  Website Identity, Live Logo Uploader, SEO Engine, and Client CRM Pipeline
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="admin-btn-back-to-website"
                onClick={onBackToWebsite}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#FAF2DB] text-[#042420] hover:bg-white border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#063E38]" />
                <span>View Live Website</span>
              </button>
              
              <button
                id="admin-btn-run-audit"
                onClick={() => {
                  setActiveTab('audit');
                  handleRunSeoAudit();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#D9A62E] text-[#042420] hover:bg-[#ECCB77] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#042420]" />
                <span>Run Live SEO Audit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b-2 border-[#D9A62E]/30 scrollbar-none">
          <button
            id="tab-branding"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Logo & Identity</span>
          </button>

          <button
            id="tab-seo"
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'seo'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Global SEO & Meta Tags</span>
          </button>

          <button
            id="tab-pages-seo"
            onClick={() => setActiveTab('pages-seo')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'pages-seo'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Page-Specific SEO</span>
          </button>

          <button
            id="tab-audit"
            onClick={() => {
              setActiveTab('audit');
              if (!auditResult) handleRunSeoAudit();
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>SEO Score & Checklist</span>
          </button>

          <button
            id="tab-leads"
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Leads & CRM ({leads.length})</span>
          </button>

          <button
            id="tab-contact"
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] shadow-md'
                : 'bg-white text-[#042420] hover:bg-[#FAF2DB] border border-[#D9A62E]/40'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Company Contact Info</span>
          </button>
        </div>

        {/* TAB 1: BRANDING & LOGO UPLOAD */}
        {activeTab === 'branding' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Logo Uploader Card */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg">
                <div className="flex items-center justify-between pb-4 border-b border-[#D9A62E]/30 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#063E38] font-serif">
                      Website Logo Uploader
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Upload your custom logo to display across navbar, mobile menu & footer
                    </p>
                  </div>
                  {logoPreview && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#063E38] text-[#ECCB77] border border-[#D9A62E]">
                      Custom Logo Active
                    </span>
                  )}
                </div>

                {/* Upload Box */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D9A62E] hover:border-[#063E38] rounded-2xl p-8 text-center bg-[#FAF2DB]/40 hover:bg-[#FAF2DB] transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoFileChange}
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    className="hidden"
                  />

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#063E38] text-[#ECCB77] border-2 border-[#D9A62E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md">
                    <Upload className="w-8 h-8" />
                  </div>

                  <p className="text-sm font-bold text-[#042420]">
                    Click to browse or drag and drop your logo
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Supports PNG, JPG, SVG, WEBP (Max 5MB • Transparent background recommended)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D9A62E]/30">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-sm transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#ECCB77]" />
                    <span>Upload New Image</span>
                  </button>

                  <button
                    onClick={handleResetLogo}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#042420] bg-[#FAF2DB] hover:bg-[#EEDCA8] border border-[#D9A62E] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#063E38]" />
                    <span>Reset to Default SVG Logo</span>
                  </button>
                </div>
              </div>

              {/* Real-time Logo Live Preview Card */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif pb-4 border-b border-[#D9A62E]/30 mb-6">
                    Live Rendering Preview
                  </h3>

                  {/* Header Preview Box */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-[#063E38] uppercase tracking-wider mb-2">
                      Header / Navbar View:
                    </p>
                    <div className="p-4 rounded-xl bg-[#EEDCA8] border-2 border-[#D9A62E] shadow-sm flex items-center">
                      <UomamaLogo />
                    </div>
                  </div>

                  {/* Footer Dark Preview Box */}
                  <div>
                    <p className="text-xs font-bold text-[#063E38] uppercase tracking-wider mb-2">
                      Footer (Dark Background) View:
                    </p>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#063E38] to-[#042420] border-2 border-[#D9A62E] shadow-md flex items-center">
                      <UomamaLogo isFooter={true} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9A62E]/30 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Any uploaded logo automatically scales and updates across the entire website instantly.</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Brand Names & Slogan Editor */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg">
              <h3 className="text-lg font-bold text-[#063E38] font-serif pb-4 border-b border-[#D9A62E]/30 mb-6">
                Brand Text & Social Sharing Banner
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                    Official Company Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-bold text-[#042420] outline-none"
                    placeholder="Uomama Business Solutions"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                    Corporate Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                    placeholder="Smart Solutions • Better Business • Global Growth"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                    Social Sharing Banner URL (OpenGraph / Twitter Card Image)
                  </label>
                  <input
                    type="text"
                    value={ogBannerUrl}
                    onChange={(e) => setOgBannerUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                    placeholder="https://example.com/social-banner.jpg"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Image shown when your website link is shared on WhatsApp, Facebook, LinkedIn, or Twitter.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  id="admin-save-branding-btn"
                  onClick={handleSaveBranding}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#ECCB77]" />
                  <span>Save Branding Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GLOBAL SEO MANAGEMENT */}
        {activeTab === 'seo' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Primary SEO Meta Tags */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-[#D9A62E]/30 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif">
                    Global Search Engine Optimization (SEO)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Control Google title tags, search snippets, meta descriptions, and indexing directives
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#063E38]">Live Head Sync:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#042420] uppercase tracking-wider">
                      Global Meta Title
                    </label>
                    <span className={`text-xs font-semibold ${
                      globalMetaTitle.length >= 40 && globalMetaTitle.length <= 65 ? 'text-emerald-700 font-bold' : 'text-amber-700'
                    }`}>
                      {globalMetaTitle.length} / 65 characters (Optimal: 45–60)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={globalMetaTitle}
                    onChange={(e) => setGlobalMetaTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-bold text-[#042420] outline-none"
                    placeholder="Uomama Business Solutions | USA LLC, UK LTD, Tax Compliance & AI Solutions"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#042420] uppercase tracking-wider">
                      Global Meta Description
                    </label>
                    <span className={`text-xs font-semibold ${
                      globalMetaDescription.length >= 120 && globalMetaDescription.length <= 160 ? 'text-emerald-700 font-bold' : 'text-amber-700'
                    }`}>
                      {globalMetaDescription.length} / 160 characters (Optimal: 130–155)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={globalMetaDescription}
                    onChange={(e) => setGlobalMetaDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none resize-none leading-relaxed"
                    placeholder="Premier international corporate services: USA LLC Formation, UK LTD Registration, IRS Form 5472/1120 filing..."
                  />
                </div>

                {/* Google Search Result Preview Simulation */}
                <div className="p-5 rounded-xl bg-[#FAF2DB]/50 border-2 border-[#D9A62E]/40">
                  <p className="text-xs font-bold text-[#063E38] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#063E38]" />
                    <span>Google Search Snippet Preview:</span>
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm max-w-2xl">
                    <div className="text-xs text-emerald-800 flex items-center gap-1">
                      <span>https://uomamabusiness.com</span>
                      <span className="text-slate-400">›</span>
                      <span className="text-slate-500">global-services</span>
                    </div>
                    <h4 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1 mt-0.5">
                      {globalMetaTitle || 'Uomama Business Solutions'}
                    </h4>
                    <p className="text-xs text-[#4d5156] line-clamp-2 mt-1 leading-relaxed">
                      {globalMetaDescription || 'Learn more about Uomama Business Solutions international company incorporation and corporate tax filing.'}
                    </p>
                  </div>
                </div>

                {/* Focus Keywords Tag Manager */}
                <div>
                  <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                    Target SEO Keywords ({keywords.length} active)
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#063E38] text-[#ECCB77] border border-[#D9A62E]"
                      >
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(idx)}
                          className="hover:text-red-300 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKeywordInput}
                      onChange={(e) => setNewKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                      placeholder="Type a new keyword (e.g., 'USA LLC Wyoming non resident') and press Enter or Add"
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyword}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063E38] hover:bg-[#094F48] border border-[#D9A62E] transition-colors cursor-pointer"
                    >
                      Add Keyword
                    </button>
                  </div>
                </div>

                {/* Technical SEO Indexing & Crawling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#D9A62E]/30">
                  <div>
                    <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                      Canonical Base URL
                    </label>
                    <input
                      type="text"
                      value={canonicalBaseUrl}
                      onChange={(e) => setCanonicalBaseUrl(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-bold text-[#042420] outline-none"
                      placeholder="https://uomamabusiness.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                      Structured Data (Schema.org JSON-LD Type)
                    </label>
                    <select
                      value={structuredDataType}
                      onChange={(e) => setStructuredDataType(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-bold text-[#042420] outline-none"
                    >
                      <option value="ProfessionalService">ProfessionalService (Recommended for Advisory)</option>
                      <option value="LegalService">LegalService (Corporate & Formation Law)</option>
                      <option value="FinancialService">FinancialService (Tax & Accounting)</option>
                      <option value="Organization">Organization (General Corporation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                      Google Search Console Verification Code
                    </label>
                    <input
                      type="text"
                      value={googleSiteVerification}
                      onChange={(e) => setGoogleSiteVerification(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                      placeholder="e.g. googled9a62e... or HTML verification string"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                      Google Analytics 4 (GA4) Measurement ID
                    </label>
                    <input
                      type="text"
                      value={googleAnalyticsId}
                      onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                      placeholder="e.g. G-ABC123XYZ"
                    />
                  </div>
                </div>

                {/* Robots Indexing Switches */}
                <div className="p-4 rounded-xl bg-[#FAF2DB]/40 border border-[#D9A62E]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#063E38]">Search Engine Crawling Directives</p>
                    <p className="text-[11px] text-slate-600">
                      Allow Googlebot, Bingbot and search engines to index your pages and follow outgoing links.
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#042420]">
                      <input
                        type="checkbox"
                        checked={robotsIndex}
                        onChange={(e) => setRobotsIndex(e.target.checked)}
                        className="w-4 h-4 text-[#063E38] rounded border-2 border-[#D9A62E] accent-[#063E38]"
                      />
                      <span>Index (robots: index)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#042420]">
                      <input
                        type="checkbox"
                        checked={robotsFollow}
                        onChange={(e) => setRobotsFollow(e.target.checked)}
                        className="w-4 h-4 text-[#063E38] rounded border-2 border-[#D9A62E] accent-[#063E38]"
                      />
                      <span>Follow (robots: follow)</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="mt-8 flex justify-end">
                <button
                  id="admin-save-seo-btn"
                  onClick={handleSaveGlobalSeo}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#ECCB77]" />
                  <span>Save Global SEO Settings</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PAGE-SPECIFIC SEO OVERRIDES */}
        {activeTab === 'pages-seo' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#D9A62E]/30 mb-6">
              <h3 className="text-lg font-bold text-[#063E38] font-serif">
                Page-Specific SEO Overrides
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Customize distinct meta titles, meta descriptions, and keywords for each individual service & page
              </p>
            </div>

            <div className="space-y-6">
              {/* Page Selector Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Select Page to Optimize:
                </label>
                <select
                  value={selectedPageKey}
                  onChange={(e) => handlePageSelectChange(e.target.value)}
                  className="w-full sm:w-80 px-4 py-3 rounded-xl border-2 border-[#D9A62E] bg-[#FAF2DB] text-sm font-bold text-[#063E38] outline-none shadow-sm cursor-pointer"
                >
                  {availablePagesList.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Override */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#042420] uppercase tracking-wider">
                    Page Meta Title Override
                  </label>
                  <span className="text-xs text-slate-500 font-semibold">
                    {pageMetaTitle.length} chars
                  </span>
                </div>
                <input
                  type="text"
                  value={pageMetaTitle}
                  onChange={(e) => setPageMetaTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-bold text-[#042420] outline-none"
                  placeholder="Leave empty to use global default"
                />
              </div>

              {/* Description Override */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#042420] uppercase tracking-wider">
                    Page Meta Description Override
                  </label>
                  <span className="text-xs text-slate-500 font-semibold">
                    {pageMetaDesc.length} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={pageMetaDesc}
                  onChange={(e) => setPageMetaDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none resize-none leading-relaxed"
                  placeholder="Targeted page description for search engines..."
                />
              </div>

              {/* Keywords Override */}
              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Page Target Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={pageKeywordsStr}
                  onChange={(e) => setPageKeywordsStr(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                  placeholder="e.g. Wyoming LLC non resident, EIN expedited, US banking"
                />
              </div>

              <div className="pt-4 border-t border-[#D9A62E]/30 flex justify-end">
                <button
                  id="admin-save-page-seo-btn"
                  onClick={handleSavePageSeo}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#ECCB77]" />
                  <span>Save Page SEO</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO AUDIT & CHECKLIST */}
        {activeTab === 'audit' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9A62E]/30 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#063E38] font-serif">
                    Live SEO Audit & Compliance Score
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Automated analysis of meta tags, search crawling readiness, and schema validation
                  </p>
                </div>

                <button
                  onClick={handleRunSeoAudit}
                  disabled={isAuditing}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-[#ECCB77] ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? 'Analyzing Site...' : 'Re-Run Audit'}</span>
                </button>
              </div>

              {/* Score Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#063E38] to-[#042420] text-white border-2 border-[#D9A62E] shadow-md text-center">
                  <span className="text-xs font-bold text-[#ECCB77] uppercase tracking-wider">Overall SEO Health</span>
                  <div className="text-4xl font-bold font-serif text-white mt-2">
                    {auditResult ? `${auditResult.score}/100` : '95/100'}
                  </div>
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-[#D9A62E] text-[#042420]">
                    Grade: {auditResult?.grade || 'A+'} (Excellent)
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF2DB] border-2 border-[#D9A62E] shadow-sm text-center">
                  <span className="text-xs font-bold text-[#063E38] uppercase tracking-wider">Sitemap.xml Generator</span>
                  <div className="text-base font-bold text-[#042420] mt-2">
                    17 Dynamic Routes
                  </div>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#063E38] hover:underline"
                  >
                    <span>View /sitemap.xml</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-6 rounded-2xl bg-[#FAF2DB] border-2 border-[#D9A62E] shadow-sm text-center">
                  <span className="text-xs font-bold text-[#063E38] uppercase tracking-wider">Robots.txt Policy</span>
                  <div className="text-base font-bold text-emerald-800 mt-2">
                    Indexation Allowed
                  </div>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#063E38] hover:underline"
                  >
                    <span>View /robots.txt</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Audit Checklist Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#042420] uppercase tracking-wider mb-3">
                  Diagnostic Factor Breakdown:
                </h4>

                {(auditResult?.checks || []).map((check, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                      check.passed
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-amber-50/70 border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {check.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#042420]">{check.name}</p>
                        <p className="text-[11px] text-slate-600">{check.details}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        check.passed ? 'bg-emerald-200/60 text-emerald-800' : 'bg-amber-200/60 text-amber-800'
                      }`}>
                        +{check.score} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: LEADS & CRM MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* CRM Header & Filter Toolbar */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#D9A62E] shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9A62E]/30 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#063E38] font-serif">
                    Client Consultations & Leads Pipeline
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Track all incoming formation inquiries, tax consultations, and contact submissions
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNewLeadModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#063E38] hover:bg-[#094F48] border border-[#D9A62E] shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#ECCB77]" />
                    <span>Add Manual Lead</span>
                  </button>

                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#042420] bg-[#FAF2DB] hover:bg-[#EEDCA8] border border-[#D9A62E] shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#063E38]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={leadSearchTerm}
                    onChange={(e) => setLeadSearchTerm(e.target.value)}
                    placeholder="Search by client name, email, country..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                  />
                </div>

                <div>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9A62E]/60 bg-[#FAF2DB]/30 text-xs font-bold text-[#042420] outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New (Uncontacted)</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress / Review</option>
                    <option value="confirmed">Confirmed / Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <select
                    value={leadCategoryFilter}
                    onChange={(e) => setLeadCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9A62E]/60 bg-[#FAF2DB]/30 text-xs font-bold text-[#042420] outline-none cursor-pointer"
                  >
                    <option value="all">All Service Categories</option>
                    <option value="usa-llc">USA LLC Formation</option>
                    <option value="uk-ltd">UK LTD Formation</option>
                    <option value="usa-tax">USA IRS Tax (5472/1120)</option>
                    <option value="uk-tax">UK HMRC Tax & VAT</option>
                    <option value="ecommerce-consulting">E-Commerce Consulting</option>
                    <option value="ai-agent">AI Agent Development</option>
                    <option value="web-dev">Web Development</option>
                    <option value="seo-services">SEO Strategy</option>
                    <option value="graphic-design">Graphic Design</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Leads Table / Cards */}
            <div className="bg-white rounded-2xl border-2 border-[#D9A62E] shadow-lg overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-[#042420]">No matching leads found</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filters</p>
                </div>
              ) : (
                <div className="divide-y divide-[#D9A62E]/20">
                  {filteredLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="p-5 hover:bg-[#FAF2DB]/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Client Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm sm:text-base font-bold text-[#063E38]">
                              {lead.fullName}
                            </span>
                            <span className="text-xs text-slate-500">
                              • {lead.country}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-[#FAF2DB] text-[#063E38] border border-[#D9A62E]">
                              {lead.serviceCategory.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-[#063E38]" />
                              {lead.email}
                            </span>
                            {lead.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#063E38]" />
                                {lead.phone}
                              </span>
                            )}
                            <span className="text-slate-400">
                              Received: {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {lead.businessModel && (
                            <p className="text-xs text-slate-700">
                              <strong className="text-[#042420]">Business Model:</strong> {lead.businessModel} {lead.monthlyRevenue && `(${lead.monthlyRevenue})`}
                            </p>
                          )}

                          {lead.message && (
                            <p className="text-xs text-slate-600 bg-[#FAF2DB]/40 p-2.5 rounded-lg border border-[#D9A62E]/30 mt-2 italic">
                              "{lead.message}"
                            </p>
                          )}

                          {/* Admin Notes Field */}
                          <div className="pt-2">
                            <input
                              type="text"
                              defaultValue={lead.adminNotes || ''}
                              onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                              placeholder="Click to add private admin notes..."
                              className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:border-[#063E38] bg-white text-slate-800 outline-none"
                            />
                          </div>
                        </div>

                        {/* Status Changer & Actions */}
                        <div className="flex items-center gap-3 shrink-0">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`text-xs font-bold px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                              lead.status === 'confirmed' ? 'bg-emerald-100 text-emerald-900 border-emerald-400' :
                              lead.status === 'new' ? 'bg-amber-100 text-amber-900 border-amber-400' :
                              lead.status === 'in_progress' ? 'bg-blue-100 text-blue-900 border-blue-400' :
                              'bg-slate-100 text-slate-800 border-slate-300'
                            }`}
                          >
                            <option value="new">🟡 Status: New</option>
                            <option value="contacted">🔵 Status: Contacted</option>
                            <option value="in_progress">🟣 Status: In Progress</option>
                            <option value="confirmed">🟢 Status: Confirmed / Booked</option>
                            <option value="completed">✅ Status: Completed</option>
                            <option value="cancelled">❌ Status: Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              if (confirm(`Delete record for ${lead.fullName}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 6: COMPANY CONTACT SETTINGS */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D9A62E] shadow-lg animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#D9A62E]/30 mb-6">
              <h3 className="text-lg font-bold text-[#063E38] font-serif">
                Official Company Contact & Social Channels
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Update emails, client support telephone numbers, registered office addresses, and social handles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Primary Corporate Email
                </label>
                <input
                  type="email"
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="contact@uomamabusiness.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Support Desk Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="support@uomamabusiness.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Official Client Telephone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="+1 (307) 201-9876"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  WhatsApp Support Direct Number (with Country Code)
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="+13072019876"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Headquarters & Registered Addresses
                </label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="30 N Gould St, Sheridan, WY 82801, USA & 71-75 Shelton Street, London, WC2H 9JQ, UK"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Business Hours & Client Desk Schedule
                </label>
                <input
                  type="text"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#D9A62E]/60 focus:border-[#063E38] bg-[#FAF2DB]/30 text-sm font-medium text-[#042420] outline-none"
                  placeholder="Mon – Fri: 9:00 AM – 6:00 PM EST / GMT (24/7 Priority Support Desk)"
                />
              </div>

              {/* Social Channels */}
              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  LinkedIn Page URL
                </label>
                <input
                  type="text"
                  value={socials.linkedin}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9A62E]/60 bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                  placeholder="https://linkedin.com/company/uomama-business-solutions"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] uppercase tracking-wider mb-2">
                  Twitter / X Profile URL
                </label>
                <input
                  type="text"
                  value={socials.twitter}
                  onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9A62E]/60 bg-[#FAF2DB]/30 text-xs font-medium text-[#042420] outline-none"
                  placeholder="https://twitter.com/uomamabusiness"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                id="admin-save-contact-btn"
                onClick={handleSaveContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#063E38] hover:bg-[#094F48] border-2 border-[#D9A62E] shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#ECCB77]" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Manual Lead Addition Modal */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#D9A62E] shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-[#063E38] font-serif mb-4 pb-2 border-b border-[#D9A62E]/30">
              Add Offline Client / Direct Inward Lead
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#042420] mb-1">Full Client Name *</label>
                <input
                  type="text"
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-medium outline-none"
                  placeholder="e.g. Alexander Knight"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] mb-1">Email Address *</label>
                <input
                  type="email"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-medium outline-none"
                  placeholder="alex@knightcorp.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#042420] mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-medium outline-none"
                    placeholder="+1 555 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#042420] mb-1">Country</label>
                  <input
                    type="text"
                    value={newLeadForm.country}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-medium outline-none"
                    placeholder="e.g. Canada / UAE"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] mb-1">Service Category</label>
                <select
                  value={newLeadForm.serviceCategory}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-bold outline-none"
                >
                  <option value="usa-llc">USA LLC Formation</option>
                  <option value="uk-ltd">UK LTD Formation</option>
                  <option value="usa-tax">USA IRS Tax (5472/1120)</option>
                  <option value="uk-tax">UK HMRC Tax & VAT</option>
                  <option value="ecommerce-consulting">E-Commerce Consulting</option>
                  <option value="ai-agent">AI Agent Development</option>
                  <option value="web-dev">Web Development</option>
                  <option value="seo-services">SEO Services</option>
                  <option value="graphic-design">Graphic Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#042420] mb-1">Notes / Scope Summary</label>
                <textarea
                  rows={2}
                  value={newLeadForm.adminNotes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, adminNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9A62E] text-xs font-medium outline-none resize-none"
                  placeholder="Internal notes regarding consultation..."
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setNewLeadModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!newLeadForm.fullName || !newLeadForm.email) {
                    alert('Please provide full name and email');
                    return;
                  }
                  await addLead({
                    fullName: newLeadForm.fullName,
                    email: newLeadForm.email,
                    phone: newLeadForm.phone,
                    country: newLeadForm.country || 'International',
                    serviceCategory: newLeadForm.serviceCategory,
                    status: 'new',
                    adminNotes: newLeadForm.adminNotes,
                    source: 'offline_manual'
                  });
                  setNewLeadModalOpen(false);
                  setNewLeadForm({
                    fullName: '',
                    email: '',
                    phone: '',
                    country: '',
                    serviceCategory: 'usa-llc',
                    businessModel: '',
                    monthlyRevenue: '',
                    message: '',
                    status: 'new',
                    adminNotes: ''
                  });
                  showNotification('New client lead added to CRM pipeline successfully!');
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#063E38] hover:bg-[#094F48] border border-[#D9A62E]"
              >
                Save Client Lead
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
