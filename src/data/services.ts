import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  // 1. USA Taxation
  {
    id: 'usa-tax',
    title: 'USA Taxation',
    heroHeadline: 'Strategic USA Federal & State Tax Advisory for Global Businesses',
    heroSupportingText: 'Professional tax consulting, annual statutory reporting guidance, and compliance management for domestic and foreign-owned US entities.',
    shortDescription: 'Comprehensive federal and state tax consulting, reporting guidance, and compliance management for domestic and international businesses.',
    detailedDescription: 'Navigating the US tax system requires careful planning and structured compliance. We provide strategic consulting for international business owners and US entities, helping you understand filing obligations, avoid common reporting pitfalls, and maintain good standing with federal and state revenue departments.',
    category: 'Filings & Compliance',
    jurisdiction: 'USA',
    keyHighlights: [
      'Federal & State Tax Guidance',
      'Foreign-Owned Entity Reporting Overview',
      'Annual Compliance Timelines',
      'Double Taxation & Treaty Orientation'
    ],
    scopePoints: [
      'Assistance in understanding IRS information returns (such as Form 5472 & Form 1120).',
      'Overview of multi-member partnership tax reporting (Form 1065 & Schedule K-1).',
      'Guidance on state franchise taxes and annual report schedules.',
      'Consultation on federal Employer Identification Number (EIN) and ITIN requirements.'
    ],
    deliverables: [
      'Customized Tax Obligation Matrix',
      'Statutory Deadline Checklist',
      'Direct Consultation with a Tax Specialist'
    ],
    offerings: [
      { title: 'IRS Form 5472 & 1120 Guidance', description: 'Mandatory annual informational reporting for foreign-owned single-member US LLCs.' },
      { title: 'Partnership Returns (Form 1065)', description: 'Multi-member LLC profit and loss allocations, capital accounts, and Schedule K-1s.' },
      { title: 'State Franchise & Annual Reports', description: 'State-specific annual franchise taxes and reporting deadlines across all 50 states.' },
      { title: 'Sales Tax Nexus Consulting', description: 'Economic nexus guidance for cross-border e-commerce sellers shipping across the US.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Entity & Activity Assessment', description: 'Evaluate your corporate structure, member tax residency, and US trade or business activity.' },
      { stepNumber: 2, title: 'Obligation Mapping', description: 'Identify applicable federal filings, state franchise requirements, and statutory deadlines.' },
      { stepNumber: 3, title: 'Filing Coordination', description: 'Provide structured documentation templates and guidance for accurate information returns.' },
      { stepNumber: 4, title: 'Ongoing Compliance Schedule', description: 'Establish an annual statutory calendar to ensure continual good standing with revenue authorities.' }
    ],
    focusAreas: [
      'Federal informational returns',
      'State franchise tax deadlines',
      'Non-resident reporting rules',
      'US economic nexus awareness',
      'Statutory record retention'
    ],
    relatedServiceIds: ['usa-llc', 'ecommerce-consulting', 'uk-tax']
  },

  // 2. UK Taxation
  {
    id: 'uk-tax',
    title: 'UK Taxation',
    heroHeadline: 'HMRC Corporation Tax, VAT & Statutory Accounting Compliance',
    heroSupportingText: 'Professional Corporation Tax, VAT advisory, and HMRC statutory compliance support for companies operating in or expanding into the UK.',
    shortDescription: 'Professional Corporation Tax, VAT advisory, and HMRC statutory compliance support for companies operating in or expanding into the UK.',
    detailedDescription: 'The UK tax environment involves strict statutory filing periods and distinct rules for both resident and non-resident corporate entities. We assist international founders and cross-border companies with Corporation Tax obligations, Value Added Tax (VAT) rules, and annual accounting coordination.',
    category: 'Filings & Compliance',
    jurisdiction: 'UK',
    keyHighlights: [
      'HMRC Corporation Tax Guidance',
      'UK VAT Registration & Thresholds',
      'Making Tax Digital (MTD) Advisory',
      'Annual Accounts & Confirmation Statements'
    ],
    scopePoints: [
      'Guidance on Corporation Tax returns (CT600) and calculation frameworks.',
      'VAT assessment for local sales, overseas fulfillment, and cross-border transactions.',
      'Advisory on EORI registration for smooth customs and international trade.',
      'Preparation support for Companies House annual filings.'
    ],
    deliverables: [
      'HMRC & Companies House Compliance Overview',
      'VAT Threshold Evaluation',
      '1-on-1 UK Tax Strategy Session'
    ],
    offerings: [
      { title: 'Corporation Tax (CT600)', description: 'Guidance on taxable profit calculations and annual CT600 return preparation.' },
      { title: 'VAT Advisory & Registration', description: 'Distance selling thresholds, Making Tax Digital (MTD) setup, and quarterly returns.' },
      { title: 'Companies House Accounts', description: 'Statutory balance sheet formatting and annual confirmation statement submissions.' },
      { title: 'EORI & Customs Advisory', description: 'Import and export registrations for smooth movement of physical inventory into the UK.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Company Trading Review', description: 'Analyze business trading activities, supply chain logistics, and turnover thresholds.' },
      { stepNumber: 2, title: 'Statutory Registration', description: 'Coordinate HMRC Corporation Tax activation, VAT numbers, and EORI certificates.' },
      { stepNumber: 3, title: 'Accounting Alignment', description: 'Align digital bookkeeping systems in accordance with Making Tax Digital requirements.' },
      { stepNumber: 4, title: 'Year-End Review & Submission', description: 'Coordinate statutory annual filings with HMRC and Companies House.' }
    ],
    focusAreas: [
      'Corporation Tax obligations',
      'UK VAT compliance & MTD',
      'Companies House statutory records',
      'EORI customs clearance',
      'Cross-border inventory VAT'
    ],
    relatedServiceIds: ['uk-ltd', 'ecommerce-consulting', 'usa-tax']
  },

  // 3. USA LLC Formation
  {
    id: 'usa-llc',
    title: 'USA LLC Formation',
    heroHeadline: 'Turnkey US Corporate Formation & Operational Readiness',
    heroSupportingText: 'Professional company formation across key US jurisdictions with registered agent coordination, EIN procurement, and banking setup guidance.',
    shortDescription: 'Turnkey company formation across key US jurisdictions with guidance on registered agents, operating agreements, and banking setup.',
    detailedDescription: 'Forming a Limited Liability Company (LLC) in the United States provides a flexible corporate structure, limited liability protection, and access to global payment infrastructure. We guide founders through jurisdiction selection (such as Wyoming, Delaware, or New Mexico), drafting organizational documents, and obtaining official registrations.',
    category: 'Business Setup & Formation',
    jurisdiction: 'USA',
    keyHighlights: [
      'State Selection & Strategic Filing',
      'Registered Agent Coordination',
      'EIN (Tax ID) Procurement Guidance',
      'Custom Operating Agreement Drafts'
    ],
    scopePoints: [
      'Articles of Organization filing with the selected Secretary of State.',
      'Assistance with Federal Employer Identification Number (EIN) acquisition.',
      'Provision of customized Operating Agreements and initial member resolutions.',
      'Guidance on US corporate banking and payment gateway prerequisites.'
    ],
    deliverables: [
      'Approved State Formation Documents',
      'Official EIN Confirmation Document',
      'Company Operating Agreement & Governance Pack'
    ],
    offerings: [
      { title: 'State Registration', description: 'Filing Articles of Organization in top jurisdictions including Wyoming, Delaware, Florida, and New Mexico.' },
      { title: 'Federal EIN Acquisition', description: 'Procurement of your Employer Identification Number from the IRS for banking and tax verification.' },
      { title: 'Registered Agent Service', description: '12-month commercial registered agent representation with statutory compliance notice forwarding.' },
      { title: 'Operating Agreement Drafting', description: 'Tailored single-member or multi-member operating agreements and organizational resolutions.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Jurisdiction & Name Check', description: 'Verify state name availability and select optimal state based on your business model.' },
      { stepNumber: 2, title: 'State Document Filing', description: 'Submit Articles of Organization and establish official commercial registered agent.' },
      { stepNumber: 3, title: 'IRS EIN Processing', description: 'Prepare and submit federal EIN applications for resident or international non-resident owners.' },
      { stepNumber: 4, title: 'Corporate Kit & Banking Pack', description: 'Deliver complete organizational documents, banking resolutions, and operating agreements.' }
    ],
    focusAreas: [
      'State jurisdiction selection',
      'Official Secretary of State filings',
      'IRS EIN registration',
      'Custom Operating Agreements',
      'US merchant readiness'
    ],
    relatedServiceIds: ['ecommerce-consulting', 'web-dev', 'seo-services']
  },

  // 4. UK LTD Formation
  {
    id: 'uk-ltd',
    title: 'UK LTD Formation',
    heroHeadline: 'Fast, Compliant UK Company Incorporation with Companies House',
    heroSupportingText: 'Professional company incorporation with Companies House, registered office address setup, and statutory secretarial support.',
    shortDescription: 'Efficient company incorporation with Companies House, registered office address setup, and statutory secretarial support.',
    detailedDescription: 'A UK Private Limited Company (LTD) is one of the most recognized and cost-effective business structures worldwide. We support entrepreneurs through standard and expedited incorporation, official address coordination, director governance protocols, and share capital allocation.',
    category: 'Business Setup & Formation',
    jurisdiction: 'UK',
    keyHighlights: [
      'Direct Companies House Filing',
      'London Registered Office Address Guidance',
      'Articles & Memorandum of Association',
      'PSC (Persons with Significant Control) Register'
    ],
    scopePoints: [
      'Filing of official incorporation forms with UK Companies House.',
      'Issuance of official Certificate of Incorporation and company number.',
      'Coordination of professional registered office and director service addresses.',
      'Consultation on setting up UK business banking and multi-currency accounts.'
    ],
    deliverables: [
      'Certificate of Incorporation & Company Number',
      'Memorandum & Articles of Association',
      'Statutory Company Register'
    ],
    offerings: [
      { title: 'Companies House Incorporation', description: 'Official registration of your private limited company with issuance of corporate registration number.' },
      { title: 'Registered Office Address', description: 'Prestigious London address for statutory mail forwarding and privacy protection.' },
      { title: 'Memorandum & Articles of Association', description: 'Standard or bespoke governing constitutions and share capital allocation certificates.' },
      { title: 'PSC & Director Registers', description: 'Statutory registers compliant with UK corporate governance mandates.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Company Details & Name Search', description: 'Confirm availability on the Companies House index and define share capital structure.' },
      { stepNumber: 2, title: 'Incorporation Submission', description: 'Submit incorporation filings, officer appointments, and registered office details.' },
      { stepNumber: 3, title: 'Certificate Issuance', description: 'Receive official Certificate of Incorporation, share certificates, and company constitution.' },
      { stepNumber: 4, title: 'HMRC & Banking Setup', description: 'Activate HMRC corporate tax profile and prepare documents for UK business banking accounts.' }
    ],
    focusAreas: [
      'Companies House registration',
      'UK registered office privacy',
      'Share structure & PSC register',
      'HMRC tax activation',
      'UK banking readiness'
    ],
    relatedServiceIds: ['ecommerce-consulting', 'uk-tax', 'web-dev']
  },

  // 5. E-commerce Business Consulting
  {
    id: 'ecommerce-consulting',
    title: 'E-commerce Business Consulting',
    heroHeadline: 'Strategic Cross-Border E-commerce & Marketplace Expansion',
    heroSupportingText: 'Comprehensive consulting for international merchants expanding across major global e-commerce platforms, Shopify, TikTok Shop, and payment processors.',
    shortDescription: 'Strategic consulting for international merchants expanding across major digital marketplaces and direct-to-consumer platforms.',
    detailedDescription: 'Selling globally requires synchronizing corporate entity setup, sales tax/VAT compliance, payment processing, and marketplace requirements. We help e-commerce brands navigate multichannel expansion across global marketplaces, Shopify, TikTok Shop, and international storefronts.',
    category: 'E-Commerce',
    jurisdiction: 'Global',
    keyHighlights: [
      'Marketplace Compliance & Verification',
      'Payment Gateway Architecture (Stripe/PayPal)',
      'Cross-Border Inventory & Tax Alignment',
      'Multichannel Expansion Strategy'
    ],
    scopePoints: [
      'Corporate structure alignment for US and European marketplace seller accounts.',
      'Guidance on Shopify Payments, Stripe, and merchant gateway verification.',
      'Onboarding requirements for TikTok Shop US and TikTok Shop UK.',
      'Coordination of US economic nexus sales tax and UK import VAT workflows.'
    ],
    deliverables: [
      'E-commerce Platform Readiness Assessment',
      'Payment Gateway & Banking Checklist',
      'Cross-Border Expansion Blueprint'
    ],
    offerings: [
      { title: 'Global Marketplace Advisory', description: 'Entity verification, brand registry preparation, and international marketplace expansion.' },
      { title: 'Shopify & Direct-To-Consumer', description: 'Store architecture, payment gateway integration, and multi-currency checkout workflows.' },
      { title: 'TikTok Shop Onboarding', description: 'Seller verification, merchant documentation compliance, and US/UK store registration.' },
      { title: 'Merchant Gateway Setup', description: 'Guidance on Stripe, PayPal, and merchant account approval for non-resident business entities.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'E-commerce Readiness Audit', description: 'Review corporate entity, tax identifiers, and target marketplace requirements.' },
      { stepNumber: 2, title: 'Payment & Banking Configuration', description: 'Structure merchant processing accounts with compliant billing and payout routes.' },
      { stepNumber: 3, title: 'Marketplace Verification', description: 'Prepare and submit documentation for global marketplace, Shopify, and TikTok Shop accounts.' },
      { stepNumber: 4, title: 'Multichannel Operations Strategy', description: 'Establish synchronized inventory, tax nexus monitoring, and scaling roadmaps.' }
    ],
    focusAreas: [
      'Global Marketplace store setup',
      'Shopify & DTC infrastructure',
      'TikTok Shop merchant onboarding',
      'Stripe & payment processing',
      'Cross-border tax & nexus alignment'
    ],
    relatedServiceIds: ['web-dev', 'seo-services', 'graphic-design', 'ai-agent']
  },

  // 6. AI Agent Development
  {
    id: 'ai-agent',
    title: 'AI Agent Development',
    heroHeadline: 'Intelligent AI Agents & Workflow Automation for Modern Businesses',
    heroSupportingText: 'Custom AI agent architectures and automated workflows designed to streamline operations, handle customer interactions, and enhance productivity.',
    shortDescription: 'Custom AI-driven agent solutions and workflow automation designed to streamline customer inquiries, automate repetitive tasks, and scale business operations.',
    detailedDescription: 'Artificial intelligence agents allow modern organizations to automate complex multi-step workflows, handle customer inquiries 24/7, and synthesize business data with high consistency. We design tailored AI agent systems grounded in your company knowledge base, integrated with your existing business software and communications.',
    category: 'Digital & AI Solutions',
    jurisdiction: 'Global',
    keyHighlights: [
      'Custom Task-Specific AI Agents',
      '24/7 Automated Inquiry Handling',
      'Internal Knowledge Base Integration',
      'Multi-Tool & API Workflow Automation'
    ],
    scopePoints: [
      'Workflow analysis to identify high-value automation opportunities.',
      'Architecture design for autonomous and human-in-the-loop AI agents.',
      'Structured prompt engineering, guardrails, and knowledge retrieval indexing.',
      'Integration with ticketing systems, CRMs, email, and messaging platforms.'
    ],
    deliverables: [
      'AI Agent Architecture Blueprint',
      'Custom Agent Configuration & Knowledge Index',
      'Integration & Operational Handover Documentation'
    ],
    offerings: [
      { title: 'Custom Conversational Agents', description: 'Domain-specific intelligent agents trained to understand brand guidelines and answer client questions.' },
      { title: 'Customer Inquiry Routing', description: 'Intelligent triage, sentiment detection, and automated routing to appropriate human teams.' },
      { title: 'Operational Workflow Automation', description: 'Automating multi-step administrative tasks, lead qualification, and data formatting.' },
      { title: 'Knowledge Base Retrieval', description: 'Grounding agents in your internal documentation, standard operating procedures, and product catalogs.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Workflow Analysis & Use-Case Mapping', description: 'Examine current manual processes, identify repetition, and establish automation goals.' },
      { stepNumber: 2, title: 'Architecture & Guardrail Design', description: 'Design agent logic, response constraints, fallbacks, and knowledge retrieval schemas.' },
      { stepNumber: 3, title: 'Agent Development & Integration', description: 'Build and connect the agent to your communication channels, APIs, and business systems.' },
      { stepNumber: 4, title: 'Testing & Operational Deployment', description: 'Conduct thorough scenario validation, refine response quality, and deploy into production.' }
    ],
    focusAreas: [
      'Operational efficiency',
      'Automated customer communication',
      'Knowledge retrieval accuracy',
      'Multi-system API integration',
      'Safe, reliable agent guardrails'
    ],
    relatedServiceIds: ['web-dev', 'ecommerce-consulting']
  },

  // 7. Website Design & Development
  {
    id: 'web-dev',
    title: 'Website Design & Development',
    heroHeadline: 'Modern, High-Performance Websites Built for Digital Growth',
    heroSupportingText: 'Custom web design and development solutions built with clean code, fast loading speeds, responsive layouts, and intuitive user experiences.',
    shortDescription: 'Modern, responsive, and performance-optimized websites built with clean code, modern design principles, and seamless e-commerce integration.',
    detailedDescription: 'Your website is the foundation of your digital brand. We design and develop custom, responsive web experiences tailored to your business goals—whether you require a high-converting corporate website, an e-commerce storefront, or a dynamic web application with modern responsive architecture.',
    category: 'Digital & AI Solutions',
    jurisdiction: 'Global',
    keyHighlights: [
      'Custom Responsive UI/UX Design',
      'Fast-Loading & Clean Architecture',
      'E-commerce & Checkout Integration',
      'Mobile-First & Accessible Layouts'
    ],
    scopePoints: [
      'Custom design wireframes and modern visual component styling.',
      'Full-stack responsive front-end and back-end web development.',
      'Integration with modern content systems, payment gateways, and analytics.',
      'Cross-browser optimization, accessibility, and speed tuning.'
    ],
    deliverables: [
      'Complete Production-Ready Website',
      'Responsive Mobile & Desktop Layouts',
      'Deployment & Maintenance Handover Guide'
    ],
    offerings: [
      { title: 'Custom Corporate Websites', description: 'Professional, high-impact web presence for consulting practices, B2B services, and enterprises.' },
      { title: 'E-commerce Storefronts', description: 'Custom Shopify, WooCommerce, and headless e-commerce builds designed for conversion.' },
      { title: 'Landing Pages & Funnels', description: 'High-converting standalone landing pages optimized for marketing campaigns and product launches.' },
      { title: 'Performance Optimization', description: 'Core Web Vitals tuning, asset optimization, and clean semantic markup for fast page loads.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Discovery & Wireframing', description: 'Define site architecture, user journeys, content requirements, and key conversion goals.' },
      { stepNumber: 2, title: 'Visual UI/UX Design', description: 'Create high-fidelity mockups, responsive layouts, typography scales, and color systems.' },
      { stepNumber: 3, title: 'Development & Integration', description: 'Write clean, maintainable code with responsive styling, interactive features, and APIs.' },
      { stepNumber: 4, title: 'Quality Assurance & Launch', description: 'Execute rigorous cross-device testing, speed audits, security checks, and live deployment.' }
    ],
    focusAreas: [
      'Responsive mobile & desktop design',
      'Fast loading speed & Core Web Vitals',
      'Clean, maintainable codebase',
      'Conversion-oriented UI/UX',
      'Seamless e-commerce & API connections'
    ],
    relatedServiceIds: ['seo-services', 'graphic-design', 'ai-agent']
  },

  // 8. SEO Services
  {
    id: 'seo-services',
    title: 'SEO Services',
    heroHeadline: 'SEO Strategies That Help Businesses Get Found',
    heroSupportingText: 'Professional search engine optimization services designed to improve website visibility, strengthen online presence and attract relevant organic traffic.',
    shortDescription: 'Professional search engine optimization services designed to improve website visibility, strengthen online presence and attract relevant organic traffic.',
    detailedDescription: 'Organic search visibility is a fundamental driver of sustainable business growth. Our SEO services focus on solid technical foundations, meticulous keyword alignment, on-page content optimization, and structured search strategy to help search engines understand and rank your digital assets effectively.',
    category: 'Digital & AI Solutions',
    jurisdiction: 'Global',
    keyHighlights: [
      'Comprehensive Technical SEO Audits',
      'Intent-Driven Keyword Research',
      'On-Page & Metadata Optimization',
      'Sustainable Organic Growth Strategy'
    ],
    scopePoints: [
      'Detailed site audits identifying crawl errors, indexation issues, and performance bottlenecks.',
      'Identification of high-intent search terms tailored to your target audience.',
      'Optimization of heading hierarchy, title tags, meta descriptions, and internal linking.',
      'Recommendations for structured content and ongoing organic performance tracking.'
    ],
    deliverables: [
      'Comprehensive SEO Audit Report',
      'Keyword Strategy & Mapping Matrix',
      'On-Page Optimization Roadmap'
    ],
    offerings: [
      { title: 'SEO Strategy', description: 'Comprehensive roadmap aligning search optimization with your broader commercial business objectives.' },
      { title: 'Keyword Research', description: 'In-depth analysis of search volume, competitive difficulty, and commercial search intent.' },
      { title: 'On-Page SEO', description: 'Refining page titles, meta descriptions, heading hierarchy, content structure, and internal links.' },
      { title: 'Technical SEO', description: 'Optimizing XML sitemaps, robots.txt, canonical tags, site architecture, and crawlability.' },
      { title: 'Content SEO', description: 'Structuring high-value content that answers user questions and satisfies search intent.' },
      { title: 'Local SEO', description: 'Optimizing local search presence, business listings, and geographic targeting.' },
      { title: 'E-commerce SEO', description: 'Product page optimization, category structure, faceted navigation, and schema markup.' },
      { title: 'SEO Audits', description: 'Comprehensive health checks pinpointing technical blockers and organic growth opportunities.' }
    ],
    processSteps: [
      { stepNumber: 1, title: 'Website & Business Analysis', description: 'Audit existing site health, historical search footprint, and core business goals.' },
      { stepNumber: 2, title: 'Keyword & Competitor Research', description: 'Identify target search queries, search intent, and competitive organic landscape.' },
      { stepNumber: 3, title: 'On-Page & Technical Optimization', description: 'Resolve crawl bottlenecks, implement schema, and optimize headings, metadata, and site architecture.' },
      { stepNumber: 4, title: 'Content & Search Strategy', description: 'Develop targeted content strategies that address user search queries and build topical relevance.' },
      { stepNumber: 5, title: 'Performance Monitoring & Improvement', description: 'Track organic indexing, monitor search performance metrics, and iterate on optimization.' }
    ],
    focusAreas: [
      'Search visibility',
      'Website structure',
      'Relevant keywords',
      'Technical health',
      'Content quality',
      'User experience',
      'Organic growth strategy'
    ],
    relatedServiceIds: ['web-dev', 'ecommerce-consulting', 'graphic-design']
  },

  // 9. Graphic Design Services
  {
    id: 'graphic-design',
    title: 'Graphic Design Services',
    heroHeadline: 'Creative Design That Builds Strong Brands',
    heroSupportingText: 'Professional graphic design solutions for businesses that want a consistent, modern and memorable visual identity.',
    shortDescription: 'Professional graphic design solutions for businesses that want a consistent, modern and memorable visual identity across all touchpoints.',
    detailedDescription: 'Visual identity shapes first impressions and communicates professional credibility. We craft cohesive visual assets, brand identity systems, digital advertising creatives, and marketing collateral designed to present your business with clarity, distinction, and polish across all customer touchpoints.',
    category: 'Digital & AI Solutions',
    jurisdiction: 'Global',
    keyHighlights: [
      'Complete Brand Identity Systems',
      'Modern Digital & Social Creatives',
      'E-commerce & Product Visuals',
      'Consistent Multi-Channel Collateral'
    ],
    scopePoints: [
      'Conceptualization of brand marks, typography pairings, and official color palettes.',
      'Design of high-resolution digital marketing creatives and social media kits.',
      'Creation of e-commerce storefront banners, product infographics, and feature graphics.',
      'Preparation of corporate pitch decks, presentation slides, and business collateral.'
    ],
    deliverables: [
      'Vector Logo & Brand Asset Kit',
      'Typography & Color Palette Guidelines',
      'High-Resolution Digital & Print-Ready Files'
    ],
    offerings: [
      { title: 'Logo Design', description: 'Distinctive, memorable logos designed for versatile application across digital and print media.' },
      { title: 'Brand Identity', description: 'Cohesive visual style guides encompassing color palettes, typography, and graphic elements.' },
      { title: 'Social Media Designs', description: 'Custom templates, banners, and promotional graphics tailored for all social platforms.' },
      { title: 'Advertising Creatives', description: 'Engaging visual creatives designed for digital ad campaigns and promotional banners.' },
      { title: 'Product Graphics', description: 'Clean product feature callouts, infographics, and technical specification visuals.' },
      { title: 'Marketing Materials', description: 'Brochures, one-pagers, business cards, flyers, and digital downloadable assets.' },
      { title: 'Presentation Design', description: 'Polished pitch decks, business proposals, and stakeholder presentation slides.' },
      { title: 'E-commerce Graphics', description: 'Hero banners, category tiles, trust badges, and storefront visual assets.' }
    ],
    digitalChannels: [
      'Websites',
      'Social media',
      'E-commerce stores',
      'Digital advertising',
      'Marketing campaigns',
      'Business presentations'
    ],
    processSteps: [
      { stepNumber: 1, title: 'Understand the Brand', description: 'Discover your brand values, target demographic, market positioning, and visual aesthetic goals.' },
      { stepNumber: 2, title: 'Creative Direction', description: 'Develop mood boards, visual concept sketches, and typographic directions for review.' },
      { stepNumber: 3, title: 'Design & Refinement', description: 'Execute high-fidelity designs and refine layouts through structured client feedback iterations.' },
      { stepNumber: 4, title: 'Final Delivery', description: 'Package vector files, web-ready formats, brand guides, and full resolution assets.' }
    ],
    focusAreas: [
      'Visual brand consistency',
      'Distinctive typography & color harmony',
      'Clean digital marketing assets',
      'High-resolution production standards',
      'Multi-platform creative adaptability'
    ],
    relatedServiceIds: ['web-dev', 'ecommerce-consulting', 'seo-services']
  }
];
