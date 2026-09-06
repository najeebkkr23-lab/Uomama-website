import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqsData } from '../data/faqs';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'usa-llc', label: 'USA LLC Formation' },
    { id: 'uk-ltd', label: 'UK LTD Formation' },
    { id: 'usa-tax', label: 'USA Taxation' },
    { id: 'uk-tax', label: 'UK Taxation' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'digital-ai', label: 'Digital & AI' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqsData
    : faqsData.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 lg:py-24 bg-gradient-to-b from-[#DFAD36] via-[#ECCB77] to-[#D59E27] border-b-2 border-[#D9A62E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031E1B] border-2 border-[#D9A62E] text-[#ECCB77] text-xs font-bold uppercase tracking-wider shadow-md">
            <HelpCircle className="w-3.5 h-3.5 text-[#ECCB77]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#042420] tracking-tight font-serif">
            Common Questions & Answers
          </h2>
          <p className="text-base text-[#042420]/90 leading-relaxed font-normal">
            Clear, transparent information regarding international formations, tax obligations, e-commerce, web development, and AI automation.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`faq-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-b from-[#063E38] to-[#042420] text-[#ECCB77] shadow-md border-2 border-[#D9A62E]'
                  : 'bg-white text-[#063E38] border-2 border-[#D9A62E]/40 hover:border-[#D9A62E] hover:bg-[#FAF2DB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl transition-all duration-300 overflow-hidden select-none ${
                  isOpen 
                    ? 'bg-white border-2 border-[#D9A62E] shadow-[0_16px_32px_rgba(4,36,32,0.18)]' 
                    : 'bg-white border-2 border-[#D9A62E] shadow-[0_6px_16px_rgba(4,36,32,0.08)] hover:shadow-[0_10px_22px_rgba(4,36,32,0.12)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#063E38] pr-4 font-serif">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#063E38] border-[#D9A62E] text-[#ECCB77]' : 'bg-[#FAF2DB] border-[#D9A62E] text-[#063E38]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-700 leading-relaxed border-t border-[#D9A62E]/30 pt-4 font-normal bg-[#FAF2DB]/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
