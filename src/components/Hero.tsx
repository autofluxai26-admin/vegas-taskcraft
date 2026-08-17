import React, { useState } from 'react';
import { Calendar, ShieldCheck, Star, MapPin, Award, ArrowRight, Phone, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { IMAGES } from '../assets/imagesData';
import { Logo } from './Logo';

interface HeroProps {
  onOpenDualBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDualBooking }) => {
  const [selectedService, setSelectedService] = useState<'tv' | 'furniture' | 'art' | 'repairs' | 'smarthome'>('tv');
  const [tvSize, setTvSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [hoursCount, setHoursCount] = useState<number>(2);

  // Instant Price Calculation
  const calculatePrice = () => {
    if (selectedService === 'tv') {
      if (tvSize === 'small') return '$100 USD';
      if (tvSize === 'medium') return '$150 USD';
      return '$200 USD';
    }
    if (selectedService === 'furniture') {
      return `$${hoursCount * 120} USD (${hoursCount}h @ $120/hr)`;
    }
    if (selectedService === 'art') {
      return '$60/hr Shelves • $50/$90 Mirrors';
    }
    if (selectedService === 'repairs') {
      return '$50 Curtains • $150/hr Paint/Lamps';
    }
    if (selectedService === 'smarthome') {
      return '$180 Alexa • $250 Solar Cameras';
    }
    return '$100 USD';
  };

  return (
    <section id="inicio" className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-[#070A12] border-b border-space-cardBorder">
      
      {/* Background Neon Grid Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* 1. Header Text Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>#1 Premium Residential Craftsmen in Las Vegas Valley</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Your Home <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Assembled & Decorated</span> to Perfection
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Professional TV mounting, heavy mirror hanging, IKEA/Wayfair furniture assembly, and smart home security systems by certified master craftsmen Carlos Chavez & Jonathan Rodriguez.
          </p>

          {/* Key Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold pt-2">
            <div className="flex items-center gap-2 bg-[#10172A] px-3 py-2 rounded-xl border border-gray-800 text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 bg-[#10172A] px-3 py-2 rounded-xl border border-gray-800 text-gray-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Laser Level Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-[#10172A] px-3 py-2 rounded-xl border border-gray-800 text-gray-200">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Same-Day Availability</span>
            </div>
          </div>
        </div>

        {/* 2. Main Vegas TaskCraft Hero Showcase Image */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-[#10172A] max-w-4xl mx-auto aspect-[16/9] sm:aspect-[21/9]">
          <img
            src={IMAGES.hero_handyman}
            alt="Vegas TaskCraft Master Technician"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-90"></div>

          {/* Logo Badge Overlay */}
          <div className="absolute top-4 left-4 bg-[#070A12]/90 backdrop-blur-md p-3 rounded-2xl border border-cyan-400/40 shadow-xl">
            <Logo size="sm" />
          </div>

          {/* Bottom Banner Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#070A12]/90 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-black text-white text-sm block">100% Satisfaction Guaranteed</span>
              <span className="text-gray-400 text-[11px]">Serving Summerlin, Henderson & Luxury High-Rise Condo Towers</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30 whitespace-nowrap">
              ✓ Active Units in LV
            </span>
          </div>
        </div>

        {/* 3. Instant Price Estimator & CTAs */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="bg-[#10172A] p-6 rounded-3xl border border-cyan-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant Price Estimator (0% Hidden Taxes)</span>
              </span>
              <span className="text-xs text-gray-400 font-semibold">Summerlin • Henderson • Las Vegas</span>
            </div>

            {/* Service Select Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedService('tv')}
                className={`py-2.5 px-2 rounded-xl border transition-all ${selectedService === 'tv' ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-[#070A12] text-gray-400 border-gray-800'}`}
              >
                TV Mounting
              </button>
              <button
                type="button"
                onClick={() => setSelectedService('furniture')}
                className={`py-2.5 px-2 rounded-xl border transition-all ${selectedService === 'furniture' ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-[#070A12] text-gray-400 border-gray-800'}`}
              >
                Furniture
              </button>
              <button
                type="button"
                onClick={() => setSelectedService('art')}
                className={`py-2.5 px-2 rounded-xl border transition-all ${selectedService === 'art' ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-[#070A12] text-gray-400 border-gray-800'}`}
              >
                Art & Mirrors
              </button>
              <button
                type="button"
                onClick={() => setSelectedService('repairs')}
                className={`py-2.5 px-2 rounded-xl border transition-all ${selectedService === 'repairs' ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-[#070A12] text-gray-400 border-gray-800'}`}
              >
                Curtains/Paint
              </button>
              <button
                type="button"
                onClick={() => setSelectedService('smarthome')}
                className={`py-2.5 px-2 rounded-xl border transition-all ${selectedService === 'smarthome' ? 'bg-cyan-500 text-black font-black border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'bg-[#070A12] text-gray-400 border-gray-800'}`}
              >
                Smart Home
              </button>
            </div>

            {/* Sub-options */}
            {selectedService === 'tv' && (
              <div className="flex gap-2 text-xs">
                <button type="button" onClick={() => setTvSize('small')} className={`flex-1 p-2.5 rounded-lg border font-bold ${tvSize === 'small' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}>Up to 42" ($100)</button>
                <button type="button" onClick={() => setTvSize('medium')} className={`flex-1 p-2.5 rounded-lg border font-bold ${tvSize === 'medium' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}>Up to 65" ($150)</button>
                <button type="button" onClick={() => setTvSize('large')} className={`flex-1 p-2.5 rounded-lg border font-bold ${tvSize === 'large' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}>65"+ ($200)</button>
              </div>
            )}

            {/* Result Bar */}
            <div className="flex items-center justify-between bg-[#070A12] p-4 rounded-2xl border border-gray-800">
              <span className="text-xs text-gray-300 font-bold">Estimated Net Total:</span>
              <span className="text-2xl font-black text-cyan-400">{calculatePrice()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onOpenDualBooking()}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>BOOK YOUR TASK / MULTI-CHECKOUT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenDualBooking('Visita Presencial')}
              className="px-6 py-4 rounded-full bg-[#10172A] hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>REQUEST ON-SITE ESTIMATE ($25)</span>
            </button>
          </div>

          {/* Direct Phone Bar */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>Direct Call / Text: <a href="tel:7027724116" className="font-extrabold text-white hover:text-cyan-400 underline">(702) 772-4116</a></span>
          </div>

        </div>

      </div>
    </section>
  );
};
