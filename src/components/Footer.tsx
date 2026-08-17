import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [formSent, setFormSent] = useState(false);

  return (
    <footer className="bg-[#070A12] text-white border-t border-space-cardBorder pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Brand Logo Component & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />

            <div className="space-y-2 pt-2 text-xs">
              <a href="tel:7027724116" className="flex items-center gap-2 text-cyan-400 font-extrabold text-base hover:underline">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>(702) 772-4116</span>
              </a>
              <a href="mailto:contact@vegastaskcraft.com" className="flex items-center gap-2 text-cyan-300 font-bold hover:underline">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>contact@vegastaskcraft.com</span>
              </a>
              <p className="text-gray-400 font-mono">www.vegastaskcraft.com</p>
              <p className="text-gray-400 flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Las Vegas, NV • Serving Summerlin, Henderson & LV Valley</span>
              </p>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-3 text-xs">Navigation</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#inicio" className="hover:text-cyan-400">Home</a></li>
                <li><a href="#servicios" className="hover:text-cyan-400">Services</a></li>
                <li><a href="#nosotros" className="hover:text-cyan-400">Our Team</a></li>
                <li><a href="#cobertura" className="hover:text-cyan-400">Coverage</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-3 text-xs">Guarantee</h4>
              <ul className="space-y-2 text-gray-300">
                <li><span>Licensed</span></li>
                <li><span>Insured</span></li>
                <li><span>Same-Day</span></li>
                <li><span>100% Precision</span></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-5 bg-[#10172A] p-5 rounded-3xl border border-cyan-500/30 space-y-3 shadow-lg">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Direct Quick Contact</h4>

            {!formSent ? (
              <form onSubmit={(e) => { e.preventDefault(); setFormSent(true); }} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full bg-[#070A12] border border-gray-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Address"
                    className="w-full bg-[#070A12] border border-gray-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-[#070A12] border border-gray-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-cyan-400"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  SEND MESSAGE
                </button>
              </form>
            ) : (
              <div className="text-center py-4 text-emerald-400 text-xs font-bold">
                ✓ Message sent successfully! Our team will reply shortly.
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-gray-800 text-center text-[11px] text-gray-500">
          © {new Date().getFullYear()} Vegas TaskCraft LLC • Residential Decor and Solutions • contact@vegastaskcraft.com
        </div>

      </div>
    </footer>
  );
};
