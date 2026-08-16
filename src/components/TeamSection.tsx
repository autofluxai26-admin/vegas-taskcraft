import React from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../assets/imagesData';

export const TeamSection: React.FC = () => {
  const team = [
    {
      id: 'carlos',
      name: 'Carlos',
      role: 'Master Craftsman & Lead Installer',
      bio: 'Especialista principal en montajes pesados de TV, instalación de galerías de arte y soluciones residenciales en Las Vegas. Más de 9 años de experiencia en Summerlin, Henderson y condominios de alta gama.',
      photo: IMAGES.hero_handyman,
      specialties: ['Montajes TV 85"+', 'Drywall & Concreto', 'Instalación Arte & Espejos', 'Cerraduras Smart'],
      rating: '5.0 ⭐ (180+ Trabajos)'
    },
    {
      id: 'jonathan',
      name: 'Jonathan',
      role: 'Assembly & High-Rise Specialist',
      bio: 'Experto certificado en ensamblaje de muebles de paquete (IKEA, Wayfair, West Elm) y fijaciones de seguridad anti-vuelco. Especializado en acceso a condominios High-Rise en The Strip cumpliendo normativas HOA.',
      photo: IMAGES.furniture_assembly,
      specialties: ['Muebles IKEA & Wayfair', 'Montaje en Mampostería', 'Sistemas Home Theater', 'Atención en The Strip'],
      rating: '5.0 ⭐ (150+ Trabajos)'
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Técnicos Locales Certificados</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            CONOCE A NUESTRO <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">EQUIPO</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Especialistas dedicados a brindarte un servicio profesional, limpio, puntual y con garantía total en Las Vegas Valley.
          </p>
        </div>

        {/* White-Glove Guarantee Callout Banner */}
        <div className="bg-[#10172A] p-6 rounded-3xl border border-cyan-500/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Servicio de Guante Blanco (White-Glove Service)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                  100% Protegido
                </span>
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Utilizamos coberturas especiales de piso, mantas protectoras para tus muebles, cubre-calzados higiénicos y realizamos la limpieza total y retiro de empaques al finalizar. Contamos con todos los seguros comerciales y permisos para condominios High-Rise en Las Vegas.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Member Presentation Cards (Carlos & Jonathan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="space-card p-6 md:p-8 rounded-3xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start shadow-xl bg-[#10172A]"
            >
              {/* Photo */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)] bg-[#070A12]"
                />
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-md text-[10px] font-bold">
                  ● Técnico Activo
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-2xl font-black text-white">{member.name}</h3>
                    <span className="text-xs font-bold text-cyan-400">{member.rating}</span>
                  </div>
                  <p className="text-xs font-bold text-cyan-300 mt-0.5">{member.role}</p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {member.specialties.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#070A12] border border-cyan-500/30 text-gray-300 text-[11px] font-semibold rounded-full">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
