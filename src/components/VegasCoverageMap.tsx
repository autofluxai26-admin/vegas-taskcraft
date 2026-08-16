import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { IMAGES } from '../assets/imagesData';

export const VegasCoverageMap: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Excelente servicio de Carlos y Jonathan. Colgaron mi TV perfectamente en mi condominio de Summerlin y armaron todo el centro de entretenimiento.",
      author: "Maria R.",
      location: "Summerlin Condos"
    },
    {
      id: 2,
      quote: "Armaron todo el juego de dormitorio de IKEA en menos de 2 horas en Henderson. Puntuales, limpios y muy respetuosos.",
      author: "Carlos M.",
      location: "Henderson / Green Valley"
    },
    {
      id: 3,
      quote: "Impecable instalación de un espejo de 90 lbs en mi condominio en The Strip (Veer Towers). Cumplieron todas las reglas del edificio.",
      author: "David K.",
      location: "The Strip High-Rise"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="cobertura" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Perímetro Completo en Las Vegas Valley</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Cobertura & Rutas Activas en <span className="text-gradient-cyan">Las Vegas</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Atendemos Summerlin, Henderson, Green Valley, Spring Valley, Enterprise y los High-Rises de The Strip sin recargos arbitrarios.
          </p>
        </div>

        {/* Side-by-Side Map & Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Testimonial Speech Bubble */}
          <div className="lg:col-span-5 relative">
            <div className="space-panel p-8 rounded-3xl border border-space-cardBorder relative space-y-6 shadow-2xl">
              
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shadow-gold-cosmic">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs text-amber-400 font-bold ml-2">5.0 Reseñas Verificadas</span>
              </div>

              <p className="text-base font-semibold text-gray-200 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </p>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{testimonials[currentIndex].author}</h4>
                  <p className="text-xs text-amber-400 font-semibold">{testimonials[currentIndex].location}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    className="p-2.5 rounded-xl bg-[#141C2E] border border-gray-700 hover:border-amber-400 text-gray-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    className="p-2.5 rounded-xl bg-[#141C2E] border border-gray-700 hover:border-amber-400 text-gray-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Las Vegas Penthouse Carpet Map Image Frame */}
          <div className="lg:col-span-7">
            <div className="space-panel p-4 rounded-3xl border border-space-cardBorder shadow-2xl relative overflow-hidden bg-[#141C2E]">
              
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span className="font-extrabold text-white text-xs uppercase tracking-wider">
                    Mapa de Perímetro • Las Vegas Penthouse Perspective
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Unidades Activas en Ruta
                </span>
              </div>

              {/* Image Frame with Base64 URI */}
              <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-gray-800 bg-[#090D18]">
                <img
                  src={IMAGES.vegas_map_carpet}
                  alt="Las Vegas Perimeter Map spread in penthouse floor with Las Vegas skyline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B0F19]/90 backdrop-blur-md p-3 rounded-xl border border-amber-500/30 flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Sin cargos adicionales por distancia en Las Vegas Valley
                  </span>
                  <a href="tel:7025558275" className="text-amber-400 font-extrabold hover:underline">
                    (702) 555-TASK
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
