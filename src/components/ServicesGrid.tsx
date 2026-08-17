import React from 'react';
import { Tv, Frame, Box, Wrench, ArrowRight, Layers, Eye, Check, Cpu } from 'lucide-react';
import type { ServiceDetail } from './ServiceDetailModal';
import { IMAGES } from '../assets/imagesData';

interface ServicesGridProps {
  onOpenDetailModal: (service: ServiceDetail) => void;
  onOpenCheckout: (serviceName?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenDetailModal, onOpenCheckout }) => {
  const services: ServiceDetail[] = [
    {
      id: 'tv-mounting',
      title: 'TV MOUNTING & HOME THEATER',
      spanishTitle: 'TV Mounting & Home Theater',
      image: IMAGES.tv_mounting,
      priceGuide: 'From $100 USD (By TV Size)',
      basePrice: 100,
      description: 'Professional TV mounting by screen size ($100 up to 42", $150 up to 65", $200 for 65"+) featuring magnetic stud detection, heavy-duty anchors, and cord concealment.',
      procedures: [
        'Digital & magnetic stud detection (wood/metal studs)',
        'Dust-free vacuum drilling process',
        'Toggle Bolt installation for up to 150 lbs load capacity',
        'Laser level 3-axis precision alignment',
        'Clean in-wall or surface raceway cord concealment'
      ],
      surfaces: [
        { name: 'Drywall & Sheetrock', status: '100% Compatible', note: 'Stud mounts or heavy-duty anchors' },
        { name: 'Concrete & Block', status: '100% Compatible', note: 'Diamond bit masonry drilling' },
        { name: 'Brick & Masonry', status: '100% Compatible', note: 'Expansion masonry anchors' }
      ],
      tools: ['Bosch 3D Laser Level', 'Diamond Drill Bits', 'Heavy Duty Toggle Bolts', 'Fluke Stud Scanner']
    },
    {
      id: 'art-mirror',
      title: 'ART & MIRROR INSTALLATION',
      spanishTitle: 'Art, Shelves & Heavy Mirrors',
      image: IMAGES.art_mirror,
      priceGuide: '$60/hr Shelves • $50/$90 Mirrors',
      basePrice: 60,
      description: 'Small art & shelf installation at $60 per hour. Heavy mirrors and large artwork at $50 add-on (during active job) or $90 standalone contract.',
      procedures: [
        'Laser level height & sightline measurement',
        'Heavy-duty J-Hooks & French cleat mounting',
        '3D laser level precision verification',
        'Physical load & stability testing'
      ],
      surfaces: [
        { name: 'Drywall & Plaster', status: '100% Compatible', note: 'Distributed load wall anchors' },
        { name: 'Concrete & Masonry', status: '100% Compatible', note: 'Mechanical expansion anchors' }
      ],
      tools: ['Laser Level', '100lbs J-Hooks', 'Digital Distance Measurer']
    },
    {
      id: 'furniture-assembly',
      title: 'FURNITURE ASSEMBLY & DECOR',
      spanishTitle: 'Furniture Assembly',
      image: IMAGES.furniture_assembly,
      priceGuide: '$120 / Hour (Fair Hourly Rate)',
      basePrice: 120,
      description: 'Fast and flawless assembly of IKEA, Wayfair, West Elm, or Amazon furniture at $120/hr with torque-controlled power tools to prevent wood damage.',
      procedures: [
        'Unpacking and hardware inventory check',
        'Assembly using torque-limited precision screwdrivers',
        'Leg leveling and hinge/drawer slide micro-adjustments',
        'Mandatory anti-tip safety wall anchoring',
        'Worksite cleanup and cardboard box disposal'
      ],
      surfaces: [
        { name: 'All Room Flooring Types', status: '100% Compatible', note: 'Adjustments on hard floors or carpets' }
      ],
      tools: ['DeWalt Torque Screwdriver', 'Hex Key Sets', 'Anti-Tip Wall Anchors']
    },
    {
      id: 'repairs-smarthome',
      title: 'CURTAINS, PAINTING & FINISHES',
      spanishTitle: 'Curtains, Paint & Finishes',
      image: IMAGES.curtains_painting || IMAGES.repairs_smarthome,
      priceGuide: 'Curtains $50 • Paint/Lamps $150/hr',
      basePrice: 50,
      description: 'Window curtains & blinds at $50/window, drywall patch repair from $100, accent panels from $150, lamps/ceiling fans/painting at $150/hr, and device setup for $40.',
      procedures: [
        'Window curtain rod & blind installation ($50/window)',
        'Ceiling fan & light fixture installation ($150/hr)',
        'Clean accent wall painting & touchups ($150/hr)',
        'Drywall patching (from $100) & accent wall panel installation (from $150)'
      ],
      surfaces: [
        { name: 'Wood & Metal Frames', status: '100% Compatible', note: 'Fixture mounting' },
        { name: 'Ceilings & Walls', status: '100% Compatible', note: 'Light fixtures & window rods' }
      ],
      tools: ['Digital Multimeter', 'Craftsman Tools', 'Caulking Gun']
    },
    {
      id: 'smart-security',
      title: 'SMART HOME & OUTDOOR SECURITY',
      spanishTitle: 'Smart Home & Security (NEW)',
      image: IMAGES.smarthome_security || IMAGES.vegas_map_carpet,
      priceGuide: '3-Point Alexa • Solar WiFi Cameras',
      basePrice: 180,
      description: '3-Point smart automation (TV, dining, kitchen with Alexa integration) and outdoor security camera systems with solar panels for 24/7 peace of mind.',
      procedures: [
        '3-Point smart setup (TV, dining, kitchen) with Alexa voice commands',
        'Outdoor security camera mounting with solar panel power units',
        'Smartphone app pairing for 24/7 live video monitoring'
      ],
      surfaces: [
        { name: 'Residential Exteriors', status: '100% Compatible', note: 'Solar mounting & WiFi setup' }
      ],
      tools: ['WiFi Network Diagnostic Kit', 'Solar Charge Tester', 'Outdoor Mounting Tools']
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Click any card to inspect procedures & surfaces</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Residential Craftsman Services in <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Las Vegas</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Click on any card to open the interactive spec sheet with step-by-step procedures and applied tools.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenDetailModal(service)}
              className="space-card rounded-3xl border border-gray-800 hover:border-cyan-400/60 cursor-pointer overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
            >
              {/* Image Frame */}
              <div className="relative h-44 overflow-hidden bg-[#10172A]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-80"></div>
                
                <span className="absolute top-3 right-3 bg-[#070A12]/90 border border-cyan-400/50 text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Eye className="w-3 h-3 text-cyan-400" /> View Specs
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors">
                    {service.spanishTitle}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1.5 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-gray-800 space-y-2">
                  <div className="bg-[#10172A] py-1.5 px-2.5 rounded-xl border border-cyan-500/30 text-center">
                    <span className="text-[11px] font-black text-cyan-400">
                      {service.priceGuide}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(service);
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  >
                    <span>Procedures</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
