import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Type, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
  fontScale: 'sm' | 'md' | 'lg';
  onChangeFontScale: (scale: 'sm' | 'md' | 'lg') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  fontScale,
  onChangeFontScale
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070A12]/95 backdrop-blur-md border-b border-space-cardBorder py-2 shadow-space-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Official Logo Component */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links (English, clean single line) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-gray-300 shrink-0">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Home</a>
            <a href="#servicios" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Services</a>
            <a href="#cobertura" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Perimeter LV</a>
            <a href="#nosotros" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Our Team</a>
          </nav>

          {/* Right Action Buttons & Accessibility Font Scaler */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Font Size Adjuster Control Widget [ A- | A | A+ ] */}
            <div className="flex items-center bg-[#10172A] px-1.5 py-1 rounded-full border border-cyan-500/40 text-[11px] font-extrabold shadow-sm">
              <span className="px-1 text-cyan-400 flex items-center gap-0.5" title="Adjust Text Size">
                <Type className="w-3.5 h-3.5" />
              </span>
              <button
                type="button"
                title="Small Text (14px)"
                onClick={() => onChangeFontScale('sm')}
                className={`px-1.5 py-0.5 rounded-full transition-all ${
                  fontScale === 'sm'
                    ? 'bg-cyan-400 text-black font-black shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A-
              </button>
              <button
                type="button"
                title="Normal Text (16px)"
                onClick={() => onChangeFontScale('md')}
                className={`px-1.5 py-0.5 rounded-full transition-all ${
                  fontScale === 'md'
                    ? 'bg-cyan-400 text-black font-black shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                type="button"
                title="Large Text (19px)"
                onClick={() => onChangeFontScale('lg')}
                className={`px-1.5 py-0.5 rounded-full transition-all ${
                  fontScale === 'lg'
                    ? 'bg-cyan-400 text-black font-black shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                A+
              </button>
            </div>

            {/* Phone & Email link */}
            <div className="flex flex-col text-right">
              <a
                href="tel:7027724116"
                className="flex items-center justify-end gap-1 text-[11px] font-bold text-gray-200 hover:text-cyan-400 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3 h-3 text-cyan-400" />
                <span>(702) 772-4116</span>
              </a>
              <a
                href="mailto:contact@vegastaskcraft.com"
                className="flex items-center justify-end gap-1 text-[10px] text-cyan-400 hover:underline transition-colors whitespace-nowrap"
              >
                <Mail className="w-2.5 h-2.5" />
                <span>contact@vegastaskcraft.com</span>
              </a>
            </div>
            
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black px-4 py-2 rounded-full font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book / Checkout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#10172A] border border-gray-700 text-gray-300"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070A12]/95 backdrop-blur-xl border-b border-space-cardBorder px-4 pt-3 pb-5 mt-2 space-y-4 animate-in slide-in-from-top duration-200">
          
          {/* Mobile Font Size Controller */}
          <div className="flex items-center justify-between bg-[#10172A] p-2.5 rounded-xl border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              <Type className="w-4 h-4" /> Text Size:
            </span>
            <div className="flex items-center gap-1 text-xs font-extrabold">
              <button
                type="button"
                onClick={() => onChangeFontScale('sm')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'sm' ? 'bg-cyan-400 text-black font-black' : 'text-gray-300'}`}
              >
                A- (Small)
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('md')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'md' ? 'bg-cyan-400 text-black font-black' : 'text-gray-300'}`}
              >
                A (Normal)
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('lg')}
                className={`px-3 py-1 rounded-lg ${fontScale === 'lg' ? 'bg-cyan-400 text-black font-black' : 'text-gray-300'}`}
              >
                A+ (Large)
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-2.5 font-bold text-gray-200 text-sm">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Home</a>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Services</a>
            <a href="#cobertura" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Perimeter LV</a>
            <a href="#nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-400">Our Team</a>
          </nav>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2.5 text-xs">
            <div className="flex flex-col gap-1 items-center bg-[#10172A] p-2.5 rounded-xl border border-gray-800">
              <a href="tel:7027724116" className="flex items-center gap-1.5 font-bold text-white">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>(702) 772-4116</span>
              </a>
              <a href="mailto:contact@vegastaskcraft.com" className="flex items-center gap-1 text-cyan-400 font-semibold">
                <Mail className="w-3.5 h-3.5" />
                <span>contact@vegastaskcraft.com</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-extrabold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              Book / Direct Checkout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
