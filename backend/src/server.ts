import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// Railway automatically passes the PORT environment variable
const PORT = Number(process.env.PORT) || 3000;

// CORS configuration: Allow requests from the frontend website or any origin
const allowedOrigin = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: allowedOrigin ? [allowedOrigin, "http://localhost:3000", "http://localhost:5173"] : true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// In-memory Consultation Leads Store
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
    adminNotes: "Spoke with client on Google Meet. Verified passport. State filing submitted.",
    source: "consultation_hero"
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
    adminNotes: "Pending proof of address KYC.",
    source: "website_modal"
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

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Uomama Business Solutions - Railway Backend",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    leadsCount: leadStore.length,
    timestamp: new Date().toISOString(),
    corsOrigin: allowedOrigin || "All origins (*)"
  });
});

// 2. Settings Endpoints
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
      message: "Site settings updated successfully on Railway backend.",
      settings: backendSiteSettings,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Logo Upload Endpoint
app.post("/api/admin/upload-logo", (req, res) => {
  try {
    const { logoDataUrl } = req.body;
    if (!logoDataUrl) {
      return res.status(400).json({ success: false, error: "Logo data URL is required." });
    }
    backendSiteSettings.branding.logoUrl = logoDataUrl;
    res.json({
      success: true,
      message: "Logo stored successfully.",
      logoUrl: logoDataUrl,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Consultation Leads Endpoints
app.get("/api/consultations", (req, res) => {
  res.json({
    success: true,
    total: leadStore.length,
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
      message: "Consultation booked successfully. Specialist assigned.",
      lead: newLead,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || "Failed to submit consultation request.",
    });
  }
});

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

// 5. Automated SEO Audit Endpoint
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

// 6. AI Tax & Corporate Formation Advisor
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
      const fallbackResponse = getRuleBasedConsultation({
        residency,
        targetMarket,
        businessType,
        monthlyRevenue,
        selectedEntity,
      });
      return res.json({
        success: true,
        text: fallbackResponse,
        note: "Generated using rule-based tax intelligence model (set GEMINI_API_KEY on Railway for full dynamic LLM reasoning).",
      });
    }

    const systemPrompt = `You are the Principal International Corporate Tax Consultant and Corporate Formation Attorney at Uomama Business Solutions.
Your goal is to provide precise, legally sound, and strategically optimal guidance for global non-resident entrepreneurs forming entities in the United States (LLC / C-Corp) or United Kingdom (LTD).

Tone & Guidelines:
- Authoritative, professional, encouraging, and clear.
- Cite specific statutory forms and regulations (e.g. IRS Form 5472 & Form 1120 pro-forma, FinCEN BOI Reporting, HMRC CT600 Corporation Tax, VAT rules).
- Emphasize compliance to avoid penalties ($25,000 IRS penalty for non-filing).
- Format with markdown headers, bold points, and clean bulleted lists.`;

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

// Fallback Rule-based evaluator
function getRuleBasedConsultation(context: any): string {
  const isUkFocused = (context.targetMarket || "").toLowerCase().includes("uk") || (context.selectedEntity || "").toLowerCase().includes("ltd");
  if (isUkFocused) {
    return `### 🇬🇧 Recommended Strategy: UK Limited (LTD) Formation & HMRC Compliance
1. **Entity Recommendation:** UK Private Limited Company (LTD).
2. **Requirements:** London Registered Office, HMRC CT600, VAT Registration if holding UK inventory.
3. **Banking:** Wise Business or Revolut Business.`;
  }
  return `### 🇺🇸 Recommended Strategy: USA LLC Formation & IRS Tax Compliance
1. **Optimal State:** Wyoming (privacy, zero state tax, $60 annual report) or Delaware (investor ready).
2. **Mandatory Tax Filings:** IRS Form 5472 & Pro-Forma Form 1120 (IRC §6038A). FinCEN BOI report.
3. **Banking:** Mercury Bank or Relay Financial with US Stripe integration.`;
}

// 7. Robots.txt & Sitemap.xml
app.get("/robots.txt", (req, res) => {
  const isIndexed = backendSiteSettings.seo.robotsIndex;
  const baseUrl = backendSiteSettings.seo.canonicalBaseUrl || "https://uomamabusiness.com";

  let robotsContent = isIndexed
    ? `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  res.header("Content-Type", "text/plain");
  res.send(robotsContent);
});

app.get("/sitemap.xml", (req, res) => {
  const baseUrl = backendSiteSettings.seo.canonicalBaseUrl || "https://uomamabusiness.com";
  const today = new Date().toISOString().split("T")[0];

  const routes = [
    { path: "", priority: "1.0" },
    { path: "#about", priority: "0.8" },
    { path: "#services", priority: "0.9" },
    { path: "#portfolio", priority: "0.8" },
    { path: "#contact", priority: "0.9" },
    { path: "#service-usa-llc", priority: "0.9" },
    { path: "#service-uk-ltd", priority: "0.9" },
    { path: "#service-usa-tax", priority: "0.9" },
    { path: "#service-uk-tax", priority: "0.9" },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}/${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemapXml);
});

// 8. Standalone Web Admin Control Panel for Railway
app.get(["/", "/admin"], (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Uomama Business Solutions | Railway Backend Admin</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: #031E1B; color: #E6EFE9; padding: 30px 20px; line-height: 1.6; }
    .container { max-width: 1000px; margin: 0 auto; }
    header { border-bottom: 2px solid #D9A62E; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
    h1 { color: #ECCB77; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
    .badge { background: #0D554D; color: #ECCB77; border: 1px solid #D9A62E; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card { background: #073630; border: 1px solid #0E6359; border-radius: 12px; padding: 22px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
    .card h3 { color: #ECCB77; font-size: 16px; margin-bottom: 12px; }
    .stat-val { font-size: 32px; font-weight: 700; color: #FFFFFF; }
    .stat-desc { font-size: 13px; color: #A0C7BF; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }
    th { background: #042420; color: #ECCB77; text-align: left; padding: 12px; font-weight: 600; border-bottom: 1px solid #D9A62E; }
    td { padding: 12px; border-bottom: 1px solid #0D554D; }
    tr:hover { background: #0A433C; }
    .status-pill { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .status-new { background: #D9A62E; color: #021714; }
    .status-confirmed { background: #10B981; color: #FFFFFF; }
    .api-link { display: inline-block; margin-top: 10px; color: #ECCB77; text-decoration: none; font-weight: 600; font-size: 13px; border: 1px solid #D9A62E; padding: 6px 14px; border-radius: 6px; }
    .api-link:hover { background: #D9A62E; color: #031E1B; }
    .instructions { background: #052A25; border-left: 4px solid #D9A62E; padding: 16px; border-radius: 4px; margin-top: 25px; }
    code { background: #021714; color: #ECCB77; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>Uomama Business Solutions</h1>
        <p style="color: #A0C7BF; font-size: 14px; margin-top: 4px;">Standalone Production Backend API & Admin Server (Railway)</p>
      </div>
      <div class="badge">● Online & Healthy</div>
    </header>

    <div class="grid">
      <div class="card">
        <h3>Live Leads in Memory</h3>
        <div class="stat-val">${leadStore.length}</div>
        <div class="stat-desc">Consultation requests awaiting processing</div>
        <a href="/api/consultations" class="api-link" target="_blank">View Raw JSON Leads →</a>
      </div>
      <div class="card">
        <h3>Server Status</h3>
        <div class="stat-val">PORT ${PORT}</div>
        <div class="stat-desc">Gemini AI: ${Boolean(process.env.GEMINI_API_KEY) ? "Connected ✅" : "Rule-based Fallback ⚠️"}</div>
        <a href="/api/health" class="api-link" target="_blank">Health Check Endpoint →</a>
      </div>
      <div class="card">
        <h3>Site Settings & SEO</h3>
        <div class="stat-val">Active</div>
        <div class="stat-desc">Title: ${backendSiteSettings.branding.brandName}</div>
        <a href="/api/admin/settings" class="api-link" target="_blank">View Site Settings API →</a>
      </div>
    </div>

    <div class="card">
      <h3>Recent Client Inquiries</h3>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Country / State</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${leadStore
            .map(
              (l) => `<tr>
              <td><strong>${l.fullName}</strong></td>
              <td>${l.email}</td>
              <td>${l.serviceCategory}</td>
              <td>${l.country || "Global"}</td>
              <td><span class="status-pill status-${l.status}">${l.status}</span></td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="instructions">
      <h4 style="color: #ECCB77; margin-bottom: 8px;">🔗 How to Connect Your Frontend Website</h4>
      <p style="font-size: 13px; color: #D1E5E0;">
        1. Copy your Railway deployment domain (e.g. <code>https://your-app.up.railway.app</code>).<br />
        2. Set <code>VITE_API_URL=https://your-app.up.railway.app</code> in your frontend environment variables.<br />
        3. All website leads, consultation bookings, and SEO updates will automatically save to this Railway backend!
      </p>
    </div>
  </div>
</body>
</html>`;

  res.send(html);
});

// Start Server on 0.0.0.0 for Railway
app.listen(PORT, "0.0.0.0", () => {
  console.log(`=================================================`);
  console.log(`🚀 Uomama Business Solutions - Railway Backend Running!`);
  console.log(`📡 URL: http://0.0.0.0:${PORT}`);
  console.log(`🔑 Gemini Key: ${process.env.GEMINI_API_KEY ? "CONFIGURED" : "NOT SET (Rule-based Fallback Active)"}`);
  console.log(`🌐 CORS Allowed Origin: ${allowedOrigin || "*"}`);
  console.log(`=================================================`);
});
