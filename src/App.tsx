import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import type { ServiceDetail } from './components/ServiceDetailModal';
import { VegasCoverageMap } from './components/VegasCoverageMap';
import { TeamSection } from './components/TeamSection';
import { InteractiveCalendarSlots } from './components/InteractiveCalendarSlots';
import { DualBookingModal } from './components/DualBookingModal';
import { TechPortal } from './components/TechPortal';
import { Footer } from './components/Footer';

export function App() {
  const [isDualBookingOpen, setIsDualBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState<string | undefined>(undefined);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceDetail | null>(null);

  const [isTechPortalOpen, setIsTechPortalOpen] = useState(false);

  // Global Accessibility Font Scaling State ('sm' | 'md' | 'lg')
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg'>('md');

  // Real-time Root Font Scaling for Guaranteed Page-Wide Scaling
  useEffect(() => {
    const rootFontSize = fontScale === 'sm' ? '14px' : fontScale === 'lg' ? '19px' : '16px';
    document.documentElement.style.fontSize = rootFontSize;
  }, [fontScale]);

  // Hidden Dedicated Route listener for Technicians (#techportal or #tech)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#techportal' || window.location.hash === '#tech' || window.location.hash === '#admin') {
        setIsTechPortalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenDualBooking = (serviceName?: string) => {
    setSelectedBookingService(serviceName);
    setIsDualBookingOpen(true);
  };

  const handleOpenDetailModal = (service: ServiceDetail) => {
    setSelectedServiceDetail(service);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black transition-all duration-300">
      
      {/* Space Dark Navbar with Accessibility Font Size Control */}
      <Navbar
        onOpenBooking={() => handleOpenDualBooking()}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenDualBooking={handleOpenDualBooking} />
        
        {/* Services Grid with Procedural Modal Trigger */}
        <ServicesGrid
          onOpenDetailModal={handleOpenDetailModal}
          onOpenCheckout={handleOpenDualBooking}
        />
        
        {/* Penthouse Carpet Perimeter Map */}
        <VegasCoverageMap />
        
        {/* Team Profiles: Carlos & Jonathan */}
        <TeamSection />

        {/* Interactive Month Calendar Picker & Time Slots Section */}
        <section className="py-16 bg-[#070A12] border-b border-space-cardBorder">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">
                Advance Booking • <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Monthly Calendar</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Select any date of the month to view open time slots and secure direct appointment with Carlos or Jonathan.
              </p>
            </div>

            <InteractiveCalendarSlots
              onSelectSlot={() => {
                handleOpenDualBooking();
              }}
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* 1. Interactive Dual Booking Modal (Multi-Service & On-Site Estimate) */}
      <DualBookingModal
        isOpen={isDualBookingOpen}
        onClose={() => setIsDualBookingOpen(false)}
        initialService={selectedBookingService}
      />

      {/* 2. Technical Procedures & Surfaces Modal */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSelectForCheckout={() => handleOpenDualBooking(selectedServiceDetail?.spanishTitle)}
      />

      {/* 3. Dedicated Technician Portal (Hidden Route #techportal for Carlos & Jonathan) */}
      <TechPortal
        isOpen={isTechPortalOpen}
        onClose={() => setIsTechPortalOpen(false)}
      />

    </div>
  );
}

export default App;
