import React, { useState } from 'react';
import { ShieldCheck, Calculator, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { IMAGES } from '../assets/imagesData';

interface HeroProps {
  onOpenDualBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDualBooking }) => {
  const [selectedService, setSelectedService] = useState('tv');
  const [itemsCount, setItemsCount] = useState(1);

  const servicePrices: Record<string, { name: string; base: number; perItem: number }> = {
    tv: { name: 'Montaje de TV & Home Theater', base: 100, perItem: 50 },
    furniture: { name: 'Ensamblaje Muebles ($120/hr)', base: 120, perItem: 120 },
    art: { name: 'Repisas & Espejos ($60/hr)', base: 60, perItem: 50 },
    repairs: { name: 'Cortinas, Lámparas & Pintura', base: 100, perItem: 50 },
    smarthome: { name: 'Smart Home & Seguridad', base: 180, perItem: 70 },
  };

  const estimatedBasePrice = servicePrices[selectedService].base + (itemsCount - 1) * servicePrices[selectedService].perItem;

  return (
    <section id="inicio" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#070A12] border-b border-space-cardBorder overflow-hidden bg-cosmic-grid">
      
      {/* Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header Floating Pill */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10172A] border border-cyan-400/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>SERVICIO RESIDENCIAL PREMIUM #1 EN LAS VEGAS VALLEY</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Showcase Frame */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.2)] group bg-[#10172A]">
            <img
              src={IMAGES.hero_handyman}
              alt="Técnico realizando instalación en Las Vegas"
              className="w-full h-[460px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/30 to-transparent"></div>

            {/* Official Logo Integration Overlay Component (Transparent PNG) */}
            <div className="absolute top-6 left-6 bg-[#070A12]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-cyan-500/40 shadow-2xl">
              <Logo size="md" />
            </div>

            {/* Bottom Callout & Action Buttons */}
            <div className="absolute bottom-6 left-6 right-6 space-y-4">
              <div className="text-white">
                <span className="inline-block px-3.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs uppercase tracking-wider rounded-full mb-2 shadow-md">
                  Las Vegas Valley • Summerlin • Henderson • High-Rises
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Tu Hogar Armado y Decorado con <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Perfección</span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenDualBooking()}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>BOOK YOUR TASK / CHECKOUT MULTI-SERVICIO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenDualBooking()}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#10172A] border border-cyan-500/40 text-cyan-400 font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Solicitar Visita Física ($25)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Instant Calculator Box */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="space-panel rounded-3xl p-6 border border-cyan-500/40 shadow-2xl relative bg-[#10172A]/90">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span>Cotizador Instantáneo</span>
                </div>
                <span className="text-xs text-cyan-300 font-bold px-2.5 py-1 bg-cyan-950/80 rounded-full border border-cyan-500/40">
                  Sin Impuestos Ocultos
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                    Selecciona el Servicio:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#070A12] border border-gray-700 text-white text-xs rounded-xl p-3 focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="tv">📺 Montaje de TV & Home Theater (Desde $100)</option>
                    <option value="furniture">🛋️ Ensamblaje Muebles ($120/Hora)</option>
                    <option value="art">🖼️ Repisas & Espejos ($60/Hora)</option>
                    <option value="repairs">🔧 Cortinas, Lámparas & Pintura</option>
                    <option value="smarthome">🤖 Smart Home & Seguridad (NUEVO)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                    {selectedService === 'furniture' || selectedService === 'art' ? 'Horas de Servicio:' : 'Cantidad de Artículos:'}
                  </label>
                  <div className="flex items-center bg-[#070A12] border border-gray-700 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setItemsCount(Math.max(1, itemsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-[#10172A] text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white text-xs">
                      {itemsCount} {selectedService === 'furniture' || selectedService === 'art' ? (itemsCount === 1 ? 'Hora' : 'Horas') : (itemsCount === 1 ? 'Artículo' : 'Artículos')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setItemsCount(itemsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-[#10172A] text-cyan-400 font-bold hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Base Estimate */}
                <div className="bg-[#070A12] p-4 rounded-2xl border border-gray-800 space-y-1 text-center">
                  <span className="text-xs text-gray-400 font-semibold block">Estimado Aproximado Neto:</span>
                  <span className="text-3xl font-black text-cyan-400">${estimatedBasePrice.toFixed(2)} USD</span>
                  <span className="text-[10px] text-cyan-300 block pt-1 italic">
                    *Precios transparentes exactos sin cargos ocultos.
                  </span>
                </div>

                <button
                  onClick={() => onOpenDualBooking(servicePrices[selectedService].name)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                >
                  RESERVAR / IR AL CHECKOUT
                </button>
              </div>

            </div>

            {/* Local Trust Card */}
            <div className="bg-[#10172A] rounded-2xl p-4 border border-space-cardBorder flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Garantía de Satisfacción 100% en Las Vegas</p>
                <p className="text-[11px] text-gray-400">Atención personalizada por Carlos y Jonathan</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
