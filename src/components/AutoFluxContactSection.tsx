import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AutoFluxContactSectionProps {
  onOpenBooking: () => void;
}

export const AutoFluxContactSection: React.FC<AutoFluxContactSectionProps> = ({ onOpenBooking }) => {
  const [selectedServiceType, setSelectedServiceType] = useState('assembly');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    country: 'United States',
    company: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 bg-[#04060E] relative overflow-hidden">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* AutoFlux Headline Header matching 2nd Image */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Tell us about your project and we'll respond within 24 hours
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* AutoFlux Card Form Matching 2nd Reference Image */}
        <div className="bg-[#090E1A]/80 backdrop-blur-xl border border-cyan-900/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Full Name & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Juan Pérez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#050811] border border-cyan-900/40 text-white text-sm rounded-xl px-4 py-3.5 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    COUNTRY *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#050811] border border-cyan-900/40 text-white text-sm rounded-xl px-4 py-3.5 focus:border-cyan-400 focus:outline-none cursor-pointer"
                  >
                    <option value="United States">United States (Las Vegas, NV)</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Company Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="Mi Empresa S.L. / Particular"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#050811] border border-cyan-900/40 text-white text-sm rounded-xl px-4 py-3.5 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 702 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#050811] border border-cyan-900/40 text-white text-sm rounded-xl px-4 py-3.5 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="hola@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#050811] border border-cyan-900/40 text-white text-sm rounded-xl px-4 py-3.5 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Row 4: Service of Interest Chips (Matching 2nd Reference Image) */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">
                  SERVICE OF INTEREST *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    onClick={() => setSelectedServiceType('assembly')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      selectedServiceType === 'assembly'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-[#050811] border-cyan-900/30 text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      checked={selectedServiceType === 'assembly'}
                      onChange={() => setSelectedServiceType('assembly')}
                      className="text-cyan-400 focus:ring-0"
                    />
                    <span className="text-xs font-bold">Furniture Assembly & Decor</span>
                  </label>

                  <label
                    onClick={() => setSelectedServiceType('tv')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      selectedServiceType === 'tv'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-[#050811] border-cyan-900/30 text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      checked={selectedServiceType === 'tv'}
                      onChange={() => setSelectedServiceType('tv')}
                      className="text-cyan-400 focus:ring-0"
                    />
                    <span className="text-xs font-bold">TV Mounting & Audio</span>
                  </label>

                  <label
                    onClick={() => setSelectedServiceType('repairs')}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      selectedServiceType === 'repairs'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-[#050811] border-cyan-900/30 text-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      checked={selectedServiceType === 'repairs'}
                      onChange={() => setSelectedServiceType('repairs')}
                      className="text-cyan-400 focus:ring-0"
                    />
                    <span className="text-xs font-bold">Smart Home & Repairs</span>
                  </label>
                </div>
              </div>

              {/* Send Message Button Pill Matching AutoFlux Image 2 */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 hover:from-cyan-300 hover:to-blue-400 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>

            </form>
          ) : (
            /* Success Response */
            <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-cyan-950 text-cyan-400 border-2 border-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">¡Mensaje Recibido!</h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Gracias <span className="font-bold text-white">{formData.fullName}</span>. Nuestro equipo responderá a tu solicitud en menos de 24 horas.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-400 font-bold text-xs"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
