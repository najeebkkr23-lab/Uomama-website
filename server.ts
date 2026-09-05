import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// In-memory consultation requests and lead submissions
interface ConsultationLead {
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
  status: "new" | "contacted" | "in_progress" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  selectedState?: string;
  addOns?: string[];
  adminNotes?: string;
  source?: string;
}

const leadStore: ConsultationLead[] = [
  {
    id: "lead-101",
    fullName: "Marcus Vance",
    email: "marcus.vance@solardrive.io",
    phone: "+44 7700 900123",
    country: "United Kingdom",
    serviceCategory: "usa-llc",
    businessModel: "Amazon FBA (US Marketplace) & Shopify DTC",
    monthlyRevenue: "$25,000 - $50,000",
    message: "Need a Wyoming LLC with EIN, US business bank account setup for Mercury/Relay, and annual IRS Form 5472/1120 compliance.",
    preferredDate: "2026-08-20",
    preferredTime: "14:00 GMT",
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    selectedState: "Wyoming",
    addOns: ["EIN Expedited", "Registered Agent 1-Yr", "Mercury Bank Assistance"],
    adminNotes: "Spoke with client on Google Meet. Verified passport. State filing submitted."
  },
  {
    id: "lead-102",
    fullName: "Elena Rostova",
    email: "elena@nordicgoods.co",
    phone: "+49 151 23456789",
    country: "Germany",
    serviceCategory: "uk-ltd",
    businessModel: "SaaS & TikTok Shop UK",
    monthlyRevenue: "$10,000 - $25,000",
    message: "Require UK LTD formation with London address, VAT registration and Wise Business gateway setup.",
    preferredDate: "2026-08-22",
    preferredTime: "10:00 CET",
    status: "new",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    selectedState: "London, UK",
    addOns: ["London Registered Office", "HMRC VAT Registration", "Confirmation Statement CS01"],
    adminNotes: "Pending proof of address KYC."
  }
];

// Backend Site Settings Store (SEO, Branding, Contact)
let backendSiteSettings = {
  branding: {
    brandName: "Uomama Business Solutions",
    tagline: "Smart Solutions • Better Business • Global Growth",
    logoUrl: null as string | null,
    faviconUrl: null as string | null,
    ogBannerUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    primaryColor: "#063E38",
    goldAccentColor: "#D9A62E",
    establishedYear: "2025"
  },
  seo: {
    globalMetaTitle: "Uomama Business Solutions | USA LLC, UK LTD, Tax Compliance & AI Solutions",
    globalMetaDescription: "Premier international corporate services: USA LLC Formation, UK LTD Registration, IRS Form 5472/1120 filing, HMRC Tax Compliance, E-Commerce Advisory, Web Development & AI Agents.",
    globalKeywords: [
      "Uomama Business Solutions",
      "USA LLC Formation Non-Resident",
      "UK LTD Registration Non-Resident",
      "IRS Form 5472 and 1120",
      "HMRC CT600 VAT Filing",
      "US Business Bank Account Mercury Relay",
      "Amazon FBA Tax Consulting",
      "E-Commerce Corporate Advisory",
      "AI Agent Automation Solutions",
      "Web Design and SEO Services"
    ],
    canonicalBaseUrl: "https://uomamabusiness.com",
    author: "Uomama Business Solutions Advisory Team",
    robotsIndex: true,
    robotsFollow: true,
    ogTitle: "Uomama Business Solutions — Global Tax & Corporate Advisory",
    ogDescription: "Form US & UK entities with zero hassle. Bank accounts, EIN, VAT, IRS compliance, and custom AI systems for global entrepreneurs.",
    ogImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterHandle: "@uomamabusiness",
    googleSiteVerification: "",
    googleAnalyticsId: "",
    bingSiteVerification: "",
    structuredDataType: "ProfessionalService",
    pageOverrides: {} as Record<string, any>
  },
  contact: {
    primaryEmail: "contact@uomamabusiness.com",
    supportEmail: "support@uomamabusiness.com",
    phone: "+1 (307) 201-9876",
    whatsappNumber: "+13072019876",
    officeAddress: "30 N Gould St, Sheridan, WY 82801, USA & 71-75 Shelton Street, London, WC2H 9JQ, UK",
    businessHours: "Mon – Fri: 9:00 AM – 6:00 PM EST / GMT (24/7 Priority Desk)",
    googleMapsUrl: "https://maps.google.com/?q=30+N+Gould+St+Sheridan+WY+82801",
    socials: {
      linkedin: "https://linkedin.com/company/uomama-business-solutions",
      twitter: "https://twitter.com/uomamabusiness",
      facebook: "https://facebook.com/uomamabusiness",
      instagram: "https://instagram.com/uomamabusiness",
      youtube: "https://youtube.com/@uomamabusiness",
      whatsapp: "https://wa.me/13072019876"
    }
  }
};

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Admin Site Settings Endpoints
app.get("/api/admin/settings", (req, res) => {
  res.json({
    success: true,
    settings: backendSiteSettings,
  });
});

app.post("/api/admin/settings", (req, res) => {
  try {
    const { settings } = req.body;
    if (settings) {
      backendSiteSettings = {
        ...backendSiteSettings,
        ...settings,
        branding: { ...backendSiteSettings.branding, ...(settings.branding || {}) },
        seo: { ...backendSiteSettings.seo, ...(settings.seo || {}) },
        contact: { ...backendSiteSettings.contact, ...(settings.contact || {}) },
      };
    }
    res.json({
      success: true,
      message: "Site settings updated successfully on backend.",
      settings: backendSiteSettings,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Logo Upload Endpoint
app.post("/api/admin/upload-logo", (req, res) => {
  try {
    const { logoDataUrl } = req.body;
    if (!logoDataUrl) {
      return res.status(400).json({ success: false, error: "Logo data URL is required." });
    }
    backendSiteSettings.branding.logoUrl = logoDataUrl;
    res.json({
      success: true,
      message: "Logo uploaded and stored successfully.",
      logoUrl: logoDataUrl,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Lead Status and Note Updates
app.patch("/api/admin/leads/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const lead = leadStore.find((l) => l.id === id);
    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found" });
    }
    if (status) lead.status = status;
    if (adminNotes !== undefined) lead.adminNotes = adminNotes;

    res.json({ success: true, lead });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/admin/leads/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = leadStore.findIndex((l) => l.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Lead not found" });
    }
    leadStore.splice(index, 1);
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Automated SEO Audit Endpoint
app.post("/api/admin/seo-audit", (req, res) => {
  const seo = backendSiteSettings.seo;
  const checks = [
    {
      name: "Global Title Length",
      passed: seo.globalMetaTitle.length >= 30 && seo.globalMetaTitle.length <= 70,
      score: seo.globalMetaTitle.length >= 30 && seo.globalMetaTitle.length <= 70 ? 15 : 8,
      details: `Current length: ${seo.globalMetaTitle.length} chars (Recommended: 40-65 chars)`
    },
    {
      name: "Meta Description Length",
      passed: seo.globalMetaDescription.length >= 100 && seo.globalMetaDescription.length <= 170,
      score: seo.globalMetaDescription.length >= 100 && seo.globalMetaDescription.length <= 170 ? 20 : 10,
      details: `Current length: ${seo.globalMetaDescription.length} chars (Recommended: 120-160 chars)`
    },
    {
      name: "Target Keywords Count",
      passed: seo.globalKeywords && seo.globalKeywords.length >= 5,
      score: (seo.globalKeywords && seo.globalKeywords.length >= 5) ? 15 : 5,
      details: `${seo.globalKeywords?.length || 0} keywords configured`
    },
    {
      name: "OpenGraph Social Sharing Tags",
      passed: Boolean(seo.ogTitle && seo.ogDescription && seo.ogImageUrl),
      score: (seo.ogTitle && seo.ogDescription && seo.ogImageUrl) ? 15 : 5,
      details: "Social preview card tags for WhatsApp, Facebook & LinkedIn"
    },
    {
      name: "Robots & Search Indexing",
      passed: seo.robotsIndex === true,
      score: seo.robotsIndex ? 15 : 0,
      details: seo.robotsIndex ? "Indexation enabled for Googlebot" : "WARNING: Website set to noindex"
    },
    {
      name: "Canonical URL",
      passed: Boolean(seo.canonicalBaseUrl),
      score: seo.canonicalBaseUrl ? 10 : 0,
      details: `Base canonical: ${seo.canonicalBaseUrl}`
    },
    {
      name: "Structured Data / JSON-LD Schema",
      passed: Boolean(seo.structuredDataType),
      score: 10,
      details: `Schema Type: ${seo.structuredDataType}`
    }
  ];

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);

  res.json({
    success: true,
    score: totalScore,
    grade: totalScore >= 85 ? "A+" : totalScore >= 70 ? "B" : "C",
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Dynamic Robots.txt
app.get("/robots.txt", (req, res) => {
  const isIndexed = backendSiteSettings.seo.robotsIndex;
  const baseUrl = backendSiteSettings.seo.canonicalBaseUrl || "https://uomamabusiness.com";

  let robotsContent = "";
  if (isIndexed) {
    robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# AI Scrapers Policy
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  } else {
    robotsContent = `User-agent: *
Disallow: /
`;
  }

  res.header("Content-Type", "text/plain");
  res.send(robotsContent);
});

// Dynamic Sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = backendSiteSettings.seo.canonicalBaseUrl || "https://uomamabusiness.com";
  const today = new Date().toISOString().split("T")[0];

  const routes = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "#about", priority: "0.8", changefreq: "monthly" },
    { path: "#services", priority: "0.9", changefreq: "weekly" },
    { path: "#portfolio", priority: "0.8", changefreq: "weekly" },
    { path: "#why-us", priority: "0.7", changefreq: "monthly" },
    { path: "#how-it-works", priority: "0.7", changefreq: "monthly" },
    { path: "#faqs", priority: "0.7", changefreq: "monthly" },
    { path: "#contact", priority: "0.9", changefreq: "weekly" },
    { path: "#service-usa-llc", priority: "0.9", changefreq: "weekly" },
    { path: "#service-uk-ltd", priority: "0.9", changefreq: "weekly" },
    { path: "#service-usa-tax", priority: "0.9", changefreq: "weekly" },
    { path: "#service-uk-tax", priority: "0.9", changefreq: "weekly" },
    { path: "#service-ecommerce-consulting", priority: "0.9", changefreq: "weekly" },
    { path: "#service-ai-agent", priority: "0.9", changefreq: "weekly" },
    { path: "#service-web-dev", priority: "0.8", changefreq: "weekly" },
    { path: "#service-seo-services", priority: "0.8", changefreq: "weekly" },
    { path: "#service-graphic-design", priority: "0.8", changefreq: "weekly" },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}/${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemapXml);
});

// Consultation Inquiries & Bookings
app.get("/api/consultations", (req, res) => {
  res.json({
    success: true,
    leads: leadStore,
  });
});

app.post("/api/consultations", (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      country,
      serviceCategory,
      businessModel,
      monthlyRevenue,
      message,
      preferredDate,
      preferredTime,
      selectedState,
      addOns,
    } = req.body;

    if (!fullName || !email || !serviceCategory) {
      return res.status(400).json({
        success: false,
        error: "Full name, email, and service category are required.",
      });
    }

    const newLead: ConsultationLead = {
      id: `lead-${Date.now()}`,
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : undefined,
      country: country ? String(country).trim() : "Global / Non-Resident",
      serviceCategory: String(serviceCategory),
      businessModel: businessModel ? String(businessModel) : "E-Commerce / Cross-Border",
      monthlyRevenue: monthlyRevenue || "Not Specified",
      message: message ? String(message).trim() : "",
      preferredDate: preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      preferredTime: preferredTime || "11:00 AM EST",
      status: "new",
      createdAt: new Date().toISOString(),
      selectedState: selectedState || "Standard",
      addOns: Array.isArray(addOns) ? addOns : [],
    };

    leadStore.unshift(newLead);

    res.status(201).json({
      success: true,
      message: "Consultation booked successfully. Our senior tax specialist will contact you shortly.",
      lead: newLead,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || "Failed to submit consultation request.",
    });
  }
});

// AI Tax & Corporate Formation Advisor
app.post("/api/ai/advisor", async (req, res) => {
  try {
    const {
      userQuery,
      residency,
      targetMarket,
      businessType,
      monthlyRevenue,
      hasBankRequirement,
      selectedEntity,
      conversationHistory,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback expert rule-based response if API key is not yet set
      const recommendation = getRuleBasedConsultation({
        residency,
        targetMarket,
        businessType,
        monthlyRevenue,
        hasBankRequirement,
        selectedEntity,
      });

      return res.json({
        success: true,
        isFallback: true,
        text: recommendation,
        keyNotice: "Gemini API key not configured yet. Providing certified expert rule-based evaluation.",
      });
    }

    const systemPrompt = `You are the Lead International Tax Attorney and Cross-Border Corporate Formation Specialist for "ApexGlobal Compliance & Tax Advisory".
You have over 15 years of specialized expertise in:
1. USA Corporate Law & Taxation:
   - Foreign-owned Single-Member LLCs (Form 5472 & Form 1120 pro-forma requirement under IRC 6038A).
   - Multi-member LLCs (Form 1065 + Schedule K-1s).
   - Non-resident withholding taxes (FDAP vs ECI - Effectively Connected Income).
   - US State Selection: Wyoming (privacy, $60 annual report, zero state tax), Delaware (VC, tech, holding), New Mexico (cost-effective, zero annual report fee), Florida/Texas (physical presence).
   - Federal EIN (Form SS-4 without SSN/ITIN) and FinCEN BOI (Beneficial Ownership Information) reporting compliance.
   - Sales Tax Economic Nexus (South Dakota v. Wayfair) & Amazon Marketplace Facilitator laws.
2. UK Corporate Law & Taxation:
   - UK Limited Company (LTD) formation via Companies House, Articles of Association, Registered Office Address.
   - HMRC Corporation Tax (CT600) (19% small profits rate, up to 25% main rate), Annual Accounts to Companies House.
   - UK VAT registration (mandatory at £90,000 threshold or voluntary/non-established taxable person NETP where threshold is £0 for non-UK sellers).
   - EORI numbers for GB customs and import clearance.
   - Confirmation Statement (CS01) and PSC (Persons with Significant Control) register.
3. E-Commerce & Cross-Border Payment Infrastructure:
   - Setting up US & UK Amazon Seller Central, Walmart Marketplace, Shopify, TikTok Shop US/UK.
   - Opening legitimate business banking and payment gateway accounts (Mercury, Relay, Wise Business, Stripe, PayPal) as a non-resident founder.
   - Transfer pricing, double taxation avoidance treaties (DTT), and permanent establishment (PE) risks.

Guidelines for your answers:
- Deliver clear, authoritative, practical, and highly organized answers.
- Use bold headings, structured bullet points, and actionable checklists.
- Be transparent regarding legal requirements (e.g. emphasize that even if a foreign-owned US LLC has $0 US taxable income, Form 5472/1120 is strictly mandatory with steep $25,000 IRS penalties for non-filing).
- Provide concrete step-by-step guidance tailored to the user's specific scenario.
- Maintain a warm, highly professional, elite consulting tone.`;

    const userPromptText = `Client Context:
- Founder Residency: ${residency || "International / Non-US / Non-UK"}
- Target Market / Platforms: ${targetMarket || "US Amazon / Global Shopify"}
- Business Model: ${businessType || "E-Commerce / Digital Products / Consulting"}
- Monthly Revenue: ${monthlyRevenue || "Early Stage"}
- Banking / Payment Gateway Need: ${hasBankRequirement ? "Needs US/UK Bank & Stripe/Wise" : "Already has banking"}
- Entity Considered: ${selectedEntity || "Undecided"}

Client Query:
${userQuery || "Please evaluate my optimal corporate structure (US LLC vs UK LTD) and summarize my mandatory annual tax filing obligations."}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        ...(Array.isArray(conversationHistory) ? conversationHistory : []),
        { role: "user", parts: [{ text: userPromptText }] },
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
      },
    });

    res.json({
      success: true,
      text: response.text || "Could not generate response. Please reach out to our senior consultants.",
    });
  } catch (err: any) {
    console.error("Gemini Advisor Error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to generate AI tax consultation.",
    });
  }
});

// Rule-based fallback evaluator
function getRuleBasedConsultation(context: any): string {
  const isUsaFocused = (context.targetMarket || "").toLowerCase().includes("us") || (context.selectedEntity || "").toLowerCase().includes("llc");
  const isUkFocused = (context.targetMarket || "").toLowerCase().includes("uk") || (context.selectedEntity || "").toLowerCase().includes("ltd");

  if (isUkFocused && !isUsaFocused) {
    return `### 🇬🇧 Recommended Strategy: UK Limited (LTD) Formation & HMRC Compliance

**1. Entity Recommendation:**
For your operations selling into the UK & European markets, a **UK Private Limited Company (LTD)** registered with Companies House provides maximum credibility, seamless integration with UK Amazon & TikTok Shop, and straightforward corporate tax rates.

**2. Key Requirements for Non-Resident Founders:**
- **Companies House Registration:** Incorporation certificate, Articles of Association, and Unique Authentication Code.
- **UK Registered Office Address:** Required in London/UK for statutory government letters.
- **HMRC Corporation Tax (CT600):** Must file annual tax returns. Current standard UK small-profit rate is 19% (up to £50,000 profit).
- **UK VAT & NETP Rule:** If you are a non-UK resident business holding inventory in the UK (e.g. Amazon FBA UK), the £90,000 threshold does *not* apply; you must register for UK VAT from day one.
- **Banking:** Eligible for Wise Business, Revolut Business, and Payoneer.

**3. Next Step:**
Book a free strategy session with our UK Corporate Tax team to register your LTD within 24-48 hours.`;
  }

  return `### 🇺🇸 Recommended Strategy: USA LLC Formation & IRS Tax Compliance

**1. Optimal State Selection:**
- **Wyoming:** Best overall for international e-commerce and privacy. Low state annual report fee ($60), 0% state corporate/personal income tax, and member privacy protection.
- **Delaware:** Preferred if raising institutional venture capital or seeking formal US investor participation.
- **New Mexico:** Ideal for lowest annual maintenance cost ($0 state annual report fee).

**2. Mandatory Annual Tax & Compliance Obligations (Critical):**
- **IRS Form 5472 & Pro-Forma Form 1120:** Strictly required for 25%+ foreign-owned single-member LLCs (IRC §6038A). Due April 15 annually. *Warning: IRS assesses a $25,000 penalty for failure to file or late filing, even with $0 profit.*
- **FinCEN BOI (Beneficial Ownership Information):** Federal compliance reporting the company's beneficial owners.
- **Federal EIN (Employer Identification Number):** Form SS-4 filing with IRS to obtain tax ID for business banking (Mercury, Relay, Stripe).
- **US Sales Tax (Wayfair Nexus):** For Amazon FBA, Amazon collects and remits sales tax automatically in most marketplace states. For Shopify, you only collect where you establish economic or physical nexus.

**3. Banking & Payment Gateways:**
- Non-resident owners can establish full US business checking with **Mercury Bank** or **Relay Financial** (FDIC insured) using the Articles of Organization, Operating Agreement, and verified EIN.
- Seamless integration with US Stripe and PayPal Business.

**4. Next Step:**
Select your formation package in our Instant Configurator to receive expedited filing and dedicated tax agent representation.`;
}

// Start Server & Integrate Vite
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ApexGlobal Tax & Formation server running on http://0.0.0.0:${PORT}`);
  });
}

start();
