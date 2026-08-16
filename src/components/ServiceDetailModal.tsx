import React from 'react';
import { X, CheckCircle, ShieldCheck, Layers, Wrench, ArrowRight, Zap, AlertCircle } from 'lucide-react';

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
  onSelectForCheckout: (service: ServiceDetail) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectForCheckout,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0F1626] border border-amber-500/40 rounded-3xl shadow-space-glass overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1626] via-[#0F1626]/60 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-amber-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase rounded-md tracking-wider">
                Detalle Técnico & Procedimientos
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{service.spanishTitle}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Tarifa Guía:</span>
              <span className="text-2xl font-black text-amber-400">{service.priceGuide}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Overview Description */}
          <div className="bg-[#141C2E] p-4 rounded-2xl border border-gray-800">
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {service.description}
            </p>
          </div>

          {/* 1. Procedimientos Aplicados Paso a Paso */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>1. Procedimientos de Seguridad & Montaje Aplicados:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.procedures.map((proc, idx) => (
                <div key={idx} className="bg-[#141C2E] p-3 rounded-xl border border-space-cardBorder flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-200 font-medium leading-normal">{proc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Superficies Compatibles */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Superficies Compatibles en Domicilio:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.surfaces.map((surf, idx) => (
                <div key={idx} className="bg-[#141C2E] p-3 rounded-xl border border-space-cardBorder flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{surf.name}</span>
                    <span className="text-[10px] text-gray-400">{surf.note}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-md font-bold">
                    {surf.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Herramientas & Equipamiento Usado */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-purple-400" />
              <span>3. Herramientas de Grado Comercial Utilizadas:</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#141C2E] border border-gray-700 text-gray-300 text-xs font-semibold rounded-lg">
                  🛠️ {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141C2E] border-t border-gray-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantía por escrito de 1 año</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-800 text-xs font-bold text-white hover:bg-gray-700"
            >
              Cerrar
            </button>
            
            <button
              onClick={() => {
                onClose();
                onSelectForCheckout(service);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs shadow-gold-cosmic hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Añadir a Cotización / Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
