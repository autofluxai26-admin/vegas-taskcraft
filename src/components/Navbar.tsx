import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, UserCheck } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTechPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenTechPortal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-space-cardBorder py-3 shadow-space-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Logo Component Integration */}
          <a href="#" className="flex items-center gap-2 group">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-gray-300">
            <a href="#inicio" className="hover:text-amber-400 transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios & Detalle</a>
            <a href="#cobertura" className="hover:text-amber-400 transition-colors">Perímetro LV</a>
            <a href="#nosotros" className="hover:text-amber-400 transition-colors">Equipo</a>
            
            {/* Tech Portal Link */}
            <button
              onClick={onOpenTechPortal}
              className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-black font-extrabold transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal Técnicos</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:7025558275"
              className="flex items-center gap-2 text-xs lg:text-sm font-bold text-gray-300 hover:text-white px-3 py-2 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>(702) 555-TASK</span>
            </a>
            
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-gold-cosmic hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar / Checkout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#141C2E] border border-gray-700 text-gray-300"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-space-cardBorder px-4 pt-3 pb-5 mt-2 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2.5 font-bold text-gray-200 text-sm">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Inicio</a>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Servicios & Detalle Técnicos</a>
            <a href="#cobertura" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Perímetro de Las Vegas</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400">Conoce a Nuestro Equipo</a>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTechPortal();
              }}
              className="text-amber-400 font-extrabold text-left py-1"
            >
              🔒 Portal para Técnicos
            </button>
          </nav>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2.5">
            <a
              href="tel:7025558275"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#141C2E] text-white font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>(702) 555-TASK</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-gold-cosmic"
            >
              Reservar / Checkout Directo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
