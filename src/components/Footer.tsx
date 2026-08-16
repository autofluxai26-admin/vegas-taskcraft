import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [formSent, setFormSent] = useState(false);

  return (
    <footer className="bg-[#0B0F19] text-white border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Brand Logo Component & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />

            <div className="space-y-2 pt-2 text-xs">
              <a href="tel:7025558275" className="flex items-center gap-2 text-amber-400 font-extrabold text-base hover:underline">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>(702) 555-TASK</span>
              </a>
              <p className="text-slate-300 font-mono">www.vegastaskcraft.com</p>
              <p className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Las Vegas, NV • Serving Summerlin, Henderson & LV Valley</span>
              </p>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3 text-xs">Navegación</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#inicio" className="hover:text-amber-400">Inicio</a></li>
                <li><a href="#servicios" className="hover:text-amber-400">Servicios</a></li>
                <li><a href="#nosotros" className="hover:text-amber-400">Equipo</a></li>
                <li><a href="#cobertura" className="hover:text-amber-400">Cobertura</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3 text-xs">Garantía</h4>
              <ul className="space-y-2 text-slate-300">
                <li><span>Licenciados</span></li>
                <li><span>Asegurados</span></li>
                <li><span>Mismo Día</span></li>
                <li><span>100% Precisión</span></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Contacto Rápido Directo</h4>

            {!formSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Dirección"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email / Teléfono"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-[#D97706] hover:from-[#D97706] hover:to-amber-600 text-black font-black text-xs uppercase tracking-wider shadow-gold-cosmic"
                >
                  SEND / ENVIAR MENSAJE
                </button>
              </form>
            ) : (
              <div className="text-center py-4 text-emerald-400 text-xs font-bold">
                ✓ ¡Mensaje enviado con éxito! Nos comunicaremos en breve.
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Vegas TaskCraft • Residential Decor and Solutions. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
};
