import React from 'react';
import { Star, Quote, CheckCircle2, ThumbsUp, Building2, UserCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Maria R.',
      location: 'Condominio en Summerlin',
      rating: 5,
      date: 'Hace 3 días',
      service: 'Montaje de TV 75" & Arte',
      comment: '¡Excelente servicio, muy detallistas! Colgaron mi TV de 75 pulgadas perfectamente en mi condominio de Summerlin y montaron 3 cuadros grandes alineados con láser. Muy limpios y respetuosos.'
    },
    {
      id: 2,
      name: 'Carlos & Elena M.',
      location: 'Green Valley, Henderson',
      rating: 5,
      date: 'Hace 1 semana',
      service: 'Ensamblaje de Juego de Habitación IKEA',
      comment: 'Armaron un juego de cama King con cajones y dos mesas de noche de IKEA en menos de 2 horas. Increíble eficiencia. Definitivamente los tendré como mis handymen de confianza en Las Vegas.'
    },
    {
      id: 3,
      name: 'David K.',
      location: 'High-Rise The Strip (Veer Towers)',
      rating: 5,
      date: 'Hace 2 semanas',
      service: 'Instalación de Espejos & Smart Home',
      comment: 'Contacté a Vegas TaskCraft para colgar un espejo gigante de 90 lbs y configurar la chapa inteligente Ring. Cumplieron con todos los permisos del edificio y el trabajo quedó impecable.'
    }
  ];

  return (
    <section id="resenas" className="py-20 bg-[#0A0D14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-vegas-gold text-xs font-bold uppercase tracking-wider">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>5.0 Estrellas en Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Lo que Dicen Nuestros Clientes en <span className="text-gradient-gold">Las Vegas</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            La satisfacción de nuestros vecinos es nuestra mejor carta de presentación.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 rounded-3xl border border-vegas-cardBorder hover:border-vegas-gold/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              {/* Quote Mark */}
              <Quote className="w-10 h-10 text-vegas-gold/20 absolute top-4 right-4 group-hover:text-vegas-gold/40 transition-colors" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{rev.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 rounded-md bg-amber-950/40 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                  {rev.service}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-vegas-cardBorder/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{rev.name}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-vegas-gold" />
                    <span>{rev.location}</span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400" title="Cliente Verificado">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Local Guarantee Callout */}
        <div className="mt-16 glass-card p-6 md:p-8 rounded-3xl border border-vegas-gold/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-gold-glow">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Garantía de Satisfacción 100% Vegas TaskCraft</h3>
              <p className="text-xs text-gray-300 mt-1">
                Si algo no queda perfectamente nivelado, firme o armado a tu gusto, lo corregimos de inmediato sin costo adicional.
              </p>
            </div>
          </div>
          <a
            href="tel:7025558275"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-vegas-gold text-black font-extrabold text-sm shadow-gold-glow hover:scale-105 transition-transform shrink-0"
          >
            Hablar con un Especialista
          </a>
        </div>

      </div>
    </section>
  );
};
