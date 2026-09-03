import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        id="policy-modal"
        className="bg-gradient-to-b from-[#0A4740] via-[#073630] to-[#042420] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(217,166,46,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] border-2 border-[#D9A62E] relative animate-in zoom-in-95"
      >
        <div className="sticky top-0 bg-[#06332E]/95 backdrop-blur-md px-6 py-4 border-b border-[#D9A62E]/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#031E1B] text-[#ECCB77] flex items-center justify-center border border-[#D9A62E]/50">
              {isPrivacy ? <Shield className="w-4 h-4 text-[#ECCB77]" /> : <FileText className="w-4 h-4 text-[#ECCB77]" />}
            </div>
            <h3 className="text-base font-bold text-white font-serif">
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-[#ECCB77] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 text-sm text-slate-200 leading-relaxed font-normal">
          {isPrivacy ? (
            <>
              <p className="font-bold text-[#ECCB77] font-serif text-base">1. Information Collection</p>
              <p>
                Uomama Business Solutions values your trust and is committed to protecting confidential and personal data submitted through our consultation request forms, project inquiries, and communication channels.
              </p>
              <p className="font-bold text-[#ECCB77] font-serif text-base">2. Use of Information</p>
              <p>
                Contact and business information gathered during consultations is utilized strictly to evaluate corporate structuring requirements, coordinate statutory compliance filings, and schedule advisory sessions.
              </p>
              <p className="font-bold text-[#ECCB77] font-serif text-base">3. Data Confidentiality</p>
              <p>
                All company, fiscal, tax, and intellectual property details discussed during engagements remain strictly protected under robust confidentiality standards.
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-[#ECCB77] font-serif text-base">1. Nature of Consulting Services</p>
              <p>
                Uomama Business Solutions delivers advisory consulting, corporate formations coordination, tax compliance support, e-commerce strategy, digital engineering, and custom AI development.
              </p>
              <p className="font-bold text-[#ECCB77] font-serif text-base">2. Statutory Filings & Compliance</p>
              <p>
                Clients are responsible for providing accurate and verifiable company information for state, federal, and statutory bodies (including US Secretary of State filings, IRS forms, HMRC tax returns, and UK Companies House submissions).
              </p>
              <p className="font-bold text-[#ECCB77] font-serif text-base">3. Professional Engagement</p>
              <p>
                Uomama Business Solutions operates with the highest standards of professional integrity, confidentiality, and international compliance.
              </p>
            </>
          )}

          <div className="pt-4 border-t border-[#D9A62E]/30 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#042420] bg-[#D9A62E] hover:bg-[#ECCB77] border border-[#D9A62E] transition-colors cursor-pointer shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
