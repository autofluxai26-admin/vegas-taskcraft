import React from 'react';
import { MapPin, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { IMAGES } from '../assets/imagesData';

export const VegasCoverageMap: React.FC = () => {
  const coverageZones = [
    { name: 'Summerlin & Summerlin South', zip: '89135, 89144, 89138', time: '15-20 min response' },
    { name: 'Henderson & Green Valley', zip: '89052, 89014, 89012', time: '20-25 min response' },
    { name: 'Las Vegas Strip & High-Rise Towers', zip: 'Veer, Panorama, Waldorf, Turnberry', time: 'VIP High-Rise Access' },
    { name: 'Spring Valley & Enterprise', zip: '89148, 89113, 89178', time: '15-25 min response' },
    { name: 'North Las Vegas & Centennial Hills', zip: '89031, 89149, 89131', time: '25-30 min response' }
  ];

  return (
    <section id="cobertura" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Service Radius & High-Rise Coverage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Complete Coverage in <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Las Vegas Valley</span>
          </h2>

          <p className="text-gray-400 text-base">
            Active technician units on standby in Summerlin, Henderson, and Luxury High-Rise Condominiums.
          </p>
        </div>

        {/* Grid Map & Zones List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Map Container */}
          <div className="lg:col-span-7 bg-[#10172A] rounded-3xl overflow-hidden border border-cyan-500/30 p-4 shadow-xl relative aspect-[16/10]">
            <img
              src={IMAGES.vegas_map_carpet}
              alt="Las Vegas Valley Coverage Map"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-6 left-6 right-6 bg-[#070A12]/90 backdrop-blur-md p-4 rounded-2xl border border-cyan-400/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-extrabold text-white text-xs">Carlos & Jonathan Active Units in Route</span>
              </div>
              <span className="text-[11px] font-bold text-cyan-400">Response &lt; 2 Hours</span>
            </div>
          </div>

          {/* Right: Zones Cards */}
          <div className="lg:col-span-5 space-y-3">
            {coverageZones.map((zone, idx) => (
              <div
                key={idx}
                className="bg-[#10172A] p-4 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all space-y-1 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                    <span>{zone.name}</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {zone.time}
                  </span>
                </div>
                <p className="text-xs text-gray-400 pl-6">ZIP Codes: {zone.zip}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
