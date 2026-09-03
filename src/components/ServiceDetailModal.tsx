import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Layers, 
  Calendar, 
  Globe2,
  FileText,
  Receipt,
  Landmark,
  Building2,
  ShoppingCart,
  Bot,
  Code2,
  Search,
  Palette,
  Sparkles
} from 'lucide-react';
import { ServiceItem, ServiceType } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookConsultation: (serviceId: ServiceType) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookConsultation
}) => {
  if (!service) return null;

  const getServiceIcon = (id: ServiceType) => {
    switch (id) {
      case 'usa-tax': return FileText;
      case 'uk-tax': return Receipt;
      case 'usa-llc': return Landmark;
      case 'uk-ltd': return Building2;
      case 'ecommerce-consulting': return ShoppingCart;
      case 'ai-agent': return Bot;
      case 'web-dev': return Code2;
      case 'seo-services': return Search;
      case 'graphic-design': return Palette;
      default: return Sparkles;
    }
  };

  const ServiceIcon = getServiceIcon(service.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        id="service-detail-modal"
        className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(217,166,46,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] border-2 border-[#D9A62E] relative animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#06332E]/95 backdrop-blur-md px-6 py-4 border-b border-[#D9A62E]/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#073630] to-[#021714] border border-[#D9A62E] flex items-center justify-center text-[#ECCB77] shadow-sm shrink-0">
              <ServiceIcon className="w-4 h-4 text-[#ECCB77]" />
            </div>
            <span className="px-3 py-1 rounded-lg bg-[#031E1B] border border-[#D9A62E]/50 text-[#ECCB77] text-xs font-bold uppercase tracking-wider">
              {service.jurisdiction} • {service.category}
            </span>
          </div>

          <button
            id="close-service-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-[#ECCB77] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#073630] to-[#021714] border-2 border-[#D9A62E] flex items-center justify-center text-[#ECCB77] shadow-md shrink-0">
              <ServiceIcon className="w-6 h-6 text-[#ECCB77] drop-shadow-sm" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-serif">
                {service.title}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mt-1 font-normal">
                {service.detailedDescription}
              </p>
            </div>
          </div>

          {/* Scope Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">
              Detailed Advisory Scope
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {service.scopePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#031E1B] border border-[#D9A62E]/40 text-xs text-slate-200 leading-relaxed shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#ECCB77] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ECCB77]">
              Deliverables & Engagement Output
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#031E1B] border border-[#D9A62E]/40 text-center hover:border-[#D9A62E] transition-colors shadow-sm">
                  <FileCheck className="w-5 h-5 text-[#ECCB77] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-[#D9A62E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-300 text-center sm:text-left font-normal">
              Speak directly with an advisor regarding your timeline and requirements.
            </p>

            <button
              id="service-modal-book-cta"
              onClick={() => {
                onClose();
                onBookConsultation(service.id);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors shadow-md cursor-pointer"
            >
              <span>Book Strategy Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#042420]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
