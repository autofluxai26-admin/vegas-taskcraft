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
    tv: { name: 'Montaje de TV & Home Theater', base: 95, perItem: 65 },
    furniture: { name: 'Ensamblaje Muebles (Cobro por Hora $75/hr)', base: 150, perItem: 75 },
    art: { name: 'Montaje de Arte & Espejos', base: 75, perItem: 40 },
    repairs: { name: 'Reparaciones & Smart Home', base: 90, perItem: 60 },
  };

  const estimatedBasePrice = servicePrices[selectedService].base + (itemsCount - 1) * servicePrices[selectedService].perItem;

  return (
    <section id="inicio" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#0B0F19] border-b border-space-cardBorder overflow-hidden bg-cosmic-grid">
      
      {/* Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header Floating Pill */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141C2E] border border-amber-500/40 text-amber-400 text-xs font-extrabold uppercase tracking-wider shadow-gold-cosmic">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>SERVICIO RESIDENCIAL PREMIUM #1 EN LAS VEGAS VALLEY</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Showcase Frame with Embedded Base64 Image */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-space-glass group bg-[#141C2E]">
            <img
              src={IMAGES.hero_handyman}
              alt="Handyman installing frame in Las Vegas high-rise penthouse"
              className="w-full h-[460px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/30 to-transparent"></div>

            {/* Official Logo Integration Overlay Component */}
            <div className="absolute top-6 left-6 bg-[#0B0F19]/90 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-amber-500/40 shadow-2xl">
              <Logo size="md" />
            </div>

            {/* Bottom Callout & Action Buttons */}
            <div className="absolute bottom-6 left-6 right-6 space-y-4">
              <div className="text-white">
                <span className="inline-block px-3.5 py-1 bg-amber-500 text-black font-black text-xs uppercase tracking-wider rounded-full mb-2 shadow-md">
                  Las Vegas Valley • Summerlin • Henderson • High-Rises
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Tu Hogar Armado y Decorado con <span className="text-gradient-gold">Perfección</span>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenDualBooking()}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 text-black font-black text-xs uppercase tracking-wider shadow-gold-cosmic hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>BOOK YOUR TASK / CHECKOUT MULTI-SERVICIO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenDualBooking()}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#141C2E] border border-cyan-500/40 text-cyan-400 font-extrabold text-xs uppercase tracking-wider hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Solicitar Visita Física Gratuita</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Instant Calculator Box */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="space-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>Cotizador Instantáneo</span>
                </div>
                <span className="text-xs text-amber-400 font-bold px-2.5 py-1 bg-amber-950/60 rounded-full border border-amber-500/30">
                  Precios Transparentes
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
                    className="w-full bg-[#0B0F19] border border-gray-700 text-white text-xs rounded-xl p-3 focus:border-amber-400 cursor-pointer"
                  >
                    <option value="tv">📺 Montaje de TV & Home Theater ($95 base)</option>
                    <option value="furniture">🛋️ Ensamblaje Muebles ($75/Hora - Mín. 2h)</option>
                    <option value="art">🖼️ Montaje de Arte & Espejos ($75 base)</option>
                    <option value="repairs">🔧 Reparaciones & Smart Home ($90 base)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">
                    {selectedService === 'furniture' ? 'Horas de Servicio:' : 'Cantidad de Artículos:'}
                  </label>
                  <div className="flex items-center bg-[#0B0F19] border border-gray-700 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setItemsCount(Math.max(1, itemsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-[#141C2E] text-white font-bold hover:bg-amber-500 hover:text-black transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white text-xs">
                      {itemsCount} {selectedService === 'furniture' ? (itemsCount === 1 ? 'Hora' : 'Horas') : (itemsCount === 1 ? 'Artículo' : 'Artículos')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setItemsCount(itemsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-[#141C2E] text-white font-bold hover:bg-amber-500 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Base Estimate */}
                <div className="bg-[#0B0F19] p-4 rounded-2xl border border-gray-800 space-y-1 text-center">
                  <span className="text-xs text-gray-400 font-semibold block">Estimado Aproximado Base:</span>
                  <span className="text-3xl font-black text-amber-400">${estimatedBasePrice.toFixed(2)} USD</span>
                  <span className="text-[10px] text-gray-400 block pt-1 italic">
                    *El valor real final con impuestos (sales tax 8.375%) se calculará al realizar el checkout.
                  </span>
                </div>

                <button
                  onClick={() => onOpenDualBooking(servicePrices[selectedService].name)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-black text-xs uppercase tracking-wider shadow-gold-cosmic transition-all"
                >
                  RESERVAR / IR AL CHECKOUT
                </button>
              </div>

            </div>

            {/* Local Trust Card */}
            <div className="bg-[#141C2E] rounded-2xl p-4 border border-space-cardBorder flex items-center gap-3">
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
