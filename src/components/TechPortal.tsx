import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, Phone, User, CheckCircle2, FileText, DollarSign, Wrench, ChevronLeft, ChevronRight, Printer, Download, Sparkles, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface TechPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechPortal: React.FC<TechPortalProps> = ({ isOpen, onClose }) => {
  const [activeTech, setActiveTech] = useState<'both' | 'carlos' | 'jonathan'>('both');
  const [selectedJobForInvoice, setSelectedJobForInvoice] = useState<any | null>(null);

  // Month navigation state
  const availableMonths = ['Julio 2026', 'Agosto 2026', 'Septiembre 2026', 'Octubre 2026'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(28);

  // Dynamic neon space heatmap status for all 31 days of the month
  const getDayStatus = (day: number) => {
    if (day === 12 || day === 18 || day === 27 || day === 29) {
      return { level: 'red', count: 4, text: '🔴 Ocupado (4)' };
    }
    if (day === 5 || day === 10 || day === 15 || day === 22 || day === 26 || day === 28) {
      return { level: 'cyan', count: 2, text: '⚡ Carga Media (2)' };
    }
    return { level: 'green', count: day % 2 === 0 ? 1 : 0, text: '🟢 Libre' };
  };

  const jobs = [
    {
      id: 'VTC-90412',
      customer: 'Elena Rostova',
      phone: '(702) 891-2390',
      email: 'elena.r@example.com',
      address: '10432 Summerlin Centre Dr, Las Vegas, NV 89135',
      service: 'Montaje de TV 75" + Soundbar + Ocultador de Cableado',
      surface: 'Drywall sobre vigas de madera con anclajes Toggle Bolt',
      time: 'Hoy - 10:00 AM',
      assignedTo: 'Carlos',
      status: 'En Proceso',
      laborCost: 150.00,
      hardwareCost: 15.00,
      total: 165.00
    },
    {
      id: 'VTC-90415',
      customer: 'Marcus Vance',
      phone: '(702) 412-8831',
      email: 'marcus.vance@example.com',
      address: 'Veer Towers - 3722 S Las Vegas Blvd #1804',
      service: 'Instalación Espejo 90 lbs + Galería de Arte 4 Piezas',
      surface: 'Pared de Concreto / Mampostería en Condominio High-Rise',
      time: 'Hoy - 2:30 PM',
      assignedTo: 'Jonathan',
      status: 'Pendiente',
      laborCost: 180.00,
      hardwareCost: 30.00,
      total: 210.00
    },
    {
      id: 'VTC-90420',
      customer: 'Robert Vance',
      phone: '(702) 998-1124',
      email: 'robert.vance@example.com',
      address: '2214 Green Valley Pkwy, Henderson, NV 89014',
      service: 'Ensamblaje Juego de Habitación King IKEA + Escritorio ($120/hr)',
      surface: 'Superficie de madera / anclaje anti-vuelco a la pared',
      time: 'Mañana - 9:00 AM',
      assignedTo: 'Carlos',
      status: 'Confirmado',
      laborCost: 240.00,
      hardwareCost: 0.00,
      total: 240.00
    }
  ];

  if (!isOpen) return null;

  const filteredJobs = activeTech === 'both' ? jobs : jobs.filter(j => j.assignedTo.toLowerCase() === activeTech);
  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden text-white my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Bar - Electric Space Blue Theme */}
        <div className="px-6 py-4 bg-[#10172A] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>Portal de Operaciones & Facturación de Técnicos</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold uppercase tracking-wider">
                  Neon Hub
                </span>
              </h3>
              <p className="text-xs text-cyan-400 font-bold tracking-wide">
                Vegas TaskCraft LLC • contact@vegastaskcraft.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Invoice Model Preview Button */}
            <button
              type="button"
              onClick={() => setSelectedJobForInvoice(jobs[0])}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500 hover:text-black font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Ver Formato Factura</span>
            </button>

            {/* Tech Selector */}
            <div className="flex bg-[#070A12] p-1 rounded-xl border border-cyan-500/30 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTech('both')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'both' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)] font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                👥 Vista Compartida
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('carlos')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'carlos' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)] font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                👤 Carlos
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('jonathan')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'jonathan' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.6)] font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                👤 Jonathan
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#10172A] border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          
          {/* Neon Space Calendar Section */}
          <div className="bg-[#10172A]/90 p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-lg">
            
            {/* Month & Legend Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : availableMonths.length - 1))}
                  className="p-2 rounded-lg bg-[#070A12] border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-cyan-400" />
                  <span>{availableMonths[currentMonthIndex]}</span>
                </h4>

                <button
                  type="button"
                  onClick={() => setCurrentMonthIndex((prev) => (prev < availableMonths.length - 1 ? prev + 1 : 0))}
                  className="p-2 rounded-lg bg-[#070A12] border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Status Legend */}
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>Disponible (0-1)</span>
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)]"></span>
                  <span>Carga Media (2)</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
                  <span>Ocupado (3+)</span>
                </span>
              </div>
            </div>

            {/* Dynamic Days Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map((dayName) => (
                <div key={dayName} className="text-[11px] font-black text-cyan-400 tracking-wider py-1 uppercase">
                  {dayName}
                </div>
              ))}

              {daysArray.map((day) => {
                const status = getDayStatus(day);
                const isSelected = selectedCalendarDay === day;

                let borderClass = 'border-gray-800 bg-[#070A12] text-gray-300';
                let badgeDot = 'bg-emerald-400';

                if (status.level === 'cyan') {
                  borderClass = 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]';
                  badgeDot = 'bg-cyan-400 shadow-[0_0_6px_rgba(0,240,255,0.9)]';
                } else if (status.level === 'red') {
                  borderClass = 'border-rose-500/40 bg-rose-950/30 text-rose-300';
                  badgeDot = 'bg-rose-500';
                }

                if (isSelected) {
                  borderClass = 'border-cyan-400 bg-cyan-500/20 text-white ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.5)] font-black';
                }

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedCalendarDay(day)}
                    className={`p-2 rounded-xl border text-left transition-all hover:scale-105 flex flex-col justify-between h-16 ${borderClass}`}
                  >
                    <span className="text-xs font-extrabold">{day}</span>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold">{status.count} Trabajos</span>
                      <span className={`w-2 h-2 rounded-full ${badgeDot}`}></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Jobs Assigned for Selected Day */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Proyectos Asignados para el Día {selectedCalendarDay} de {availableMonths[currentMonthIndex]}</span>
              </h4>
              <span className="text-xs font-bold text-gray-400">
                Técnicos: {activeTech === 'both' ? 'Carlos & Jonathan' : activeTech.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-black">
                        {job.id}
                      </span>
                      <h5 className="font-black text-white text-base">{job.customer}</h5>
                      <span className="text-xs text-cyan-300 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {job.time}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-extrabold">
                        Asignado a: {job.assignedTo}
                      </span>
                    </div>

                    <p className="text-xs font-extrabold text-cyan-300">{job.service}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" /> {job.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {job.address}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 italic">
                       Superficie: {job.surface}
                    </p>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-800">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Total Neto:</span>
                      <span className="text-xl font-black text-cyan-400">${job.total.toFixed(2)} USD</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedJobForInvoice(job)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Generar Factura Legal</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Invoice Generator Modal Overlay (Official Legal Invoice Format with Logo & Email) */}
        {selectedJobForInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#070A12] border-2 border-cyan-400 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.5)] text-white space-y-6">
              
              {/* Invoice Header with Official Logo & Contact Email */}
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
                <div className="flex items-center gap-3">
                  <Logo size="md" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-cyan-400 block">FACTURA # {selectedJobForInvoice.id}</span>
                    <span className="text-[11px] text-gray-300 block font-semibold">contact@vegastaskcraft.com</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJobForInvoice(null)}
                    className="p-1.5 rounded-xl bg-[#10172A] text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Invoice Printable Body */}
              <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-4 text-xs">
                
                {/* Provider & Client Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-gray-800 pb-4">
                  <div className="space-y-1">
                    <span className="font-extrabold text-cyan-400 block text-xs uppercase tracking-wider">PROVEEDOR DEL SERVICIO:</span>
                    <span className="font-black text-white text-sm block">Vegas TaskCraft LLC</span>
                    <span className="text-gray-300 block">Las Vegas Valley, NV</span>
                    <span className="text-cyan-300 font-semibold block flex items-center gap-1">
                      <Mail className="w-3 h-3 text-cyan-400" /> contact@vegastaskcraft.com
                    </span>
                    <span className="text-gray-300 block">(702) 555-TASK</span>
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="font-extrabold text-cyan-400 block text-xs uppercase tracking-wider">CLIENTE RECEPTOR:</span>
                    <span className="font-black text-white text-sm block">{selectedJobForInvoice.customer}</span>
                    <span className="text-gray-300 block">{selectedJobForInvoice.address}</span>
                    <span className="text-gray-300 block">{selectedJobForInvoice.phone}</span>
                    <span className="text-gray-400 block italic">{selectedJobForInvoice.email || 'contact@vegastaskcraft.com'}</span>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <span className="font-bold text-gray-400 block mb-1">Descripción del Servicio Realizado:</span>
                  <p className="font-extrabold text-white bg-[#070A12] p-3 rounded-xl border border-gray-800 leading-relaxed">
                    {selectedJobForInvoice.service}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 italic">
                    Superficie / Fijación: {selectedJobForInvoice.surface}
                  </p>
                </div>

                {/* Charges Breakdown */}
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mano de Obra Certificada (Carlos / Jonathan):</span>
                    <span className="font-bold text-white">${selectedJobForInvoice.laborCost.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Herrajes & Anclajes Heavy Duty:</span>
                    <span className="font-bold text-white">${selectedJobForInvoice.hardwareCost.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-cyan-400 pt-2 border-t border-gray-700">
                    <span>Monto Total Neto Pagado:</span>
                    <span>${selectedJobForInvoice.total.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Invoice Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gray-400 italic">
                  Documento digital válido para propósitos de seguro e impuestos comerciales.
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alert(`Imprimiendo Factura ${selectedJobForInvoice.id}...`)}
                    className="px-4 py-2 rounded-xl bg-[#10172A] border border-gray-700 text-white font-bold text-xs hover:border-cyan-400 flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" /> Imprimir Factura
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Descargando PDF Factura ${selectedJobForInvoice.id}...`)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Descargar PDF
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
