import React from 'react';
import { X, CheckCircle2, ShieldCheck, Wrench, ArrowRight, Layers, DollarSign, Sparkles } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  spanishTitle: string;
  image: string;
  priceGuide: string;
  basePrice: number;
  description: string;
  procedures: string[];
  surfaces: { name: string; status: string; note: string }[];
  tools: string[];
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForCheckout: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectForCheckout,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden text-white my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Image & Title Banner */}
        <div className="relative h-48 sm:h-56 shrink-0 bg-[#10172A]">
          <img
            src={service.image}
            alt={service.spanishTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-[#070A12]/80 border border-gray-700 text-gray-300 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-extrabold uppercase tracking-wider mb-1 inline-block">
              Residential Craftsman Spec Sheet
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white">{service.spanishTitle}</h3>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 text-xs sm:text-sm">
          
          {/* Overview Description */}
          <p className="text-gray-300 leading-relaxed bg-[#10172A] p-4 rounded-2xl border border-cyan-500/30">
            {service.description}
          </p>

          {/* Step-by-step Procedures */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-cyan-400 uppercase text-xs tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Procedure:</span>
            </h4>

            <div className="space-y-2">
              {service.procedures.map((proc, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#10172A] p-3 rounded-xl border border-gray-800">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-cyan-500/40">
                    {idx + 1}
                  </span>
                  <span className="text-gray-200 text-xs font-semibold">{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatible Surfaces */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-cyan-400 uppercase text-xs tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Compatible Surfaces & Anchor Types:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.surfaces.map((surf, idx) => (
                <div key={idx} className="bg-[#10172A] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-xs">{surf.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      {surf.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">{surf.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Tools Applied */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-cyan-400 uppercase text-xs tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Professional Tools Applied:</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#10172A] border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  ✓ {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-4 bg-[#10172A] border-t border-cyan-500/30 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-gray-400 block font-bold uppercase">Price Guide:</span>
            <span className="text-base sm:text-lg font-black text-cyan-400">{service.priceGuide}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectForCheckout();
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-black text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-2"
          >
            <span>Book This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
