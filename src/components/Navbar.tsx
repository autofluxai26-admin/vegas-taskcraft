import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, UserCheck, Type } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTechPortal: () => void;
  fontScale: 'sm' | 'md' | 'lg';
  onChangeFontScale: (scale: 'sm' | 'md' | 'lg') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTechPortal,
  fontScale,
  onChangeFontScale
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070A12]/90 backdrop-blur-md border-b border-space-cardBorder py-2.5 shadow-space-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Logo Component Integration */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios & Detalle</a>
            <a href="#cobertura" className="hover:text-cyan-400 transition-colors">Perímetro LV</a>
            <a href="#nosotros" className="hover:text-cyan-400 transition-colors">Equipo</a>
            
            {/* Tech Portal Link */}
            <button
              onClick={onOpenTechPortal}
              className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500 hover:text-black font-extrabold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal Técnicos</span>
            </button>
          </nav>

          {/* Right Action Buttons & Accessibility Font Scaler */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Font Size Adjuster Control Widget [ A- | A | A+ ] */}
            <div className="flex items-center bg-[#10172A] p-1 rounded-full border border-cyan-500/30 text-[11px] font-extrabold">
              <span className="px-2 text-cyan-400 flex items-center gap-1">
                <Type className="w-3 h-3" />
              </span>
              <button
                type="button"
                title="Texto Pequeño"
                onClick={() => onChangeFontScale('sm')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  fontScale === 'sm'
                    ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(0,240,255,0.6)] font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                title="Texto Normal"
                onClick={() => onChangeFontScale('md')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  fontScale === 'md'
                    ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(0,240,255,0.6)] font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                title="Texto Grande"
                onClick={() => onChangeFontScale('lg')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  fontScale === 'lg'
                    ? 'bg-cyan-500 text-black shadow-[0_0_8px_rgba(0,240,255,0.6)] font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            <a
              href="tel:7025558275"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white px-2.5 py-1.5 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>(702) 555-TASK</span>
            </a>
            
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black px-5 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar / Checkout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#10172A] border border-gray-700 text-gray-300"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070A12]/95 backdrop-blur-xl border-b border-space-cardBorder px-4 pt-3 pb-5 mt-2 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Font Size Controller */}
          <div className="flex items-center justify-between bg-[#10172A] p-2 rounded-xl border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              <Type className="w-4 h-4" /> Tamaño de letra:
            </span>
            <div className="flex items-center gap-1 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => onChangeFontScale('sm')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'sm' ? 'bg-cyan-500 text-black font-black' : 'text-gray-300'}`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('md')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'md' ? 'bg-cyan-500 text-black font-black' : 'text-gray-300'}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('lg')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'lg' ? 'bg-cyan-500 text-black font-black' : 'text-gray-300'}`}
              >
                A+
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-2.5 font-bold text-gray-200 text-sm">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Inicio</a>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Servicios & Detalle Técnicos</a>
            <a href="#cobertura" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Perímetro de Las Vegas</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Conoce a Nuestro Equipo</a>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTechPortal();
              }}
              className="text-cyan-400 font-extrabold text-left py-1"
            >
              🔒 Portal para Técnicos
            </button>
          </nav>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2.5">
            <a
              href="tel:7025558275"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#10172A] text-white font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>(702) 555-TASK</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Reservar / Checkout Directo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
