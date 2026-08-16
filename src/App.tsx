import { useState } from 'react';
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
import { TaskCraftAIChat } from './components/TaskCraftAIChat';
import { Footer } from './components/Footer';

export function App() {
  const [isDualBookingOpen, setIsDualBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState<string | undefined>(undefined);
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceDetail | null>(null);

  const [isTechPortalOpen, setIsTechPortalOpen] = useState(false);

  const handleOpenDualBooking = (serviceName?: string) => {
    setSelectedBookingService(serviceName);
    setIsDualBookingOpen(true);
  };

  const handleOpenDetailModal = (service: ServiceDetail) => {
    setSelectedServiceDetail(service);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Space Dark Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenDualBooking()}
        onOpenTechPortal={() => setIsTechPortalOpen(true)}
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
        <section className="py-16 bg-[#0B0F19] border-b border-space-cardBorder">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">
                Reserva a Futuro • <span className="text-gradient-gold">Calendario Mensual</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Selecciona cualquier día del mes para ver las franjas horarias libres y asegurar la atención de Carlos o Jonathan.
              </p>
            </div>

            <InteractiveCalendarSlots
              onSelectSlot={(date, time) => {
                handleOpenDualBooking();
              }}
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* 1. Modal de Checkout Interactivo Multi-Servicio & Visita Presencial */}
      <DualBookingModal
        isOpen={isDualBookingOpen}
        onClose={() => setIsDualBookingOpen(false)}
        initialService={selectedBookingService}
      />

      {/* 2. Modal de Procedimientos & Superficies Técnicas */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSelectForCheckout={() => handleOpenDualBooking(selectedServiceDetail?.spanishTitle)}
      />

      {/* 3. Portal Web para Técnicos (Carlos & Jonathan) */}
      <TechPortal
        isOpen={isTechPortalOpen}
        onClose={() => setIsTechPortalOpen(false)}
      />

      {/* 4. Floating AI Sales Assistant Chat */}
      <TaskCraftAIChat onOpenBooking={handleOpenDualBooking} />

    </div>
  );
}

export default App;
