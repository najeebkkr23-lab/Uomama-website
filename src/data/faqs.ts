import { FaqItem } from '../types';

export const faqsData: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'usa-tax',
    question: 'What are the main annual tax filing requirements for a US LLC?',
    answer: 'US LLCs have federal and state reporting requirements that depend on their ownership structure and operational activity. Single-member LLCs owned by non-US residents typically submit annual informational disclosures (such as IRS Form 5472 and a pro-forma Form 1120), while multi-member LLCs generally file partnership returns (Form 1065). In addition, most US states require an annual report or franchise tax filing.'
  },
  {
    id: 'faq-2',
    category: 'uk-tax',
    question: 'How does UK Corporation Tax work for a UK Limited Company?',
    answer: 'Every active UK Limited Company must file an annual Company Tax Return (Form CT600) with HMRC along with statutory annual accounts. Corporation Tax is calculated on taxable profits. Businesses must register with HMRC for Corporation Tax upon commencing trading and meet statutory deadlines for tax payment and return submission.'
  },
  {
    id: 'faq-3',
    category: 'usa-llc',
    question: 'Can non-US residents form a US LLC remotely?',
    answer: 'Yes. Non-US residents can legally form and own a US LLC without physical residency or visiting the United States. The formation process involves selecting a registered agent in your chosen state, filing the Articles of Organization with the Secretary of State, obtaining a federal Employer Identification Number (EIN) from the IRS, and establishing an operating agreement.'
  },
  {
    id: 'faq-4',
    category: 'uk-ltd',
    question: 'What is required to incorporate a UK Limited Company?',
    answer: 'To form a UK LTD company, you will need a unique company name, at least one director, at least one shareholder (can be the same individual), a registered office address in the UK, and standard Memorandum and Articles of Association. Once registered with Companies House, you receive an official Certificate of Incorporation.'
  },
  {
    id: 'faq-5',
    category: 'ecommerce',
    question: 'How do US LLCs and UK LTDs help international e-commerce sellers?',
    answer: 'Having a formal corporate entity in the US or UK enables international sellers to open local merchant accounts (such as Stripe or Shopify Payments), register brand trademarks, verify seller accounts on leading e-commerce marketplaces and TikTok Shop, and maintain clear separation between personal assets and business operations.'
  },
  {
    id: 'faq-6',
    category: 'ecommerce',
    question: 'What is the difference between selling in the US vs. UK/Europe e-commerce markets?',
    answer: 'The US e-commerce market requires a US tax identifier (such as an EIN or W-8BEN) and compliance with US state sales tax rules. The UK/European market generally requires Value Added Tax (VAT) registration if you store physical goods within local fulfillment centers. Our consulting helps clarify these distinct regulatory requirements.'
  },
  {
    id: 'faq-7',
    category: 'digital-ai',
    question: 'How do SEO and Website Development integrate together?',
    answer: 'Effective search engine optimization begins at the website architecture and code level. Clean semantic HTML, fast loading speeds, mobile responsiveness, structured heading tags, and optimized site navigation provide the essential technical foundation needed for search engines to crawl and index your pages effectively.'
  },
  {
    id: 'faq-8',
    category: 'digital-ai',
    question: 'What is the role of AI Agent Development in business operations?',
    answer: 'AI agents are custom automation systems designed to handle repetitive workflows, respond to customer inquiries based on internal knowledge bases, and coordinate data across different software tools. They help teams reduce operational overhead while maintaining consistent response quality.'
  }
];
