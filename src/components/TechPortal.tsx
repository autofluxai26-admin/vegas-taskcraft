import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, Phone, User, CheckCircle2, FileText, DollarSign, Wrench, ChevronLeft, ChevronRight, Printer, Download, Sparkles } from 'lucide-react';

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

  // Generate dynamic heatmap status for all 31 days of the month
  const getDayStatus = (day: number) => {
    if (day === 12 || day === 18 || day === 27 || day === 29) {
      return { level: 'red', count: 4, text: '🔴 Muy Ocupado' };
    }
    if (day === 5 || day === 10 || day === 15 || day === 22 || day === 26 || day === 28) {
      return { level: 'yellow', count: 2, text: '🟡 Carga Media' };
    }
    return { level: 'green', count: day % 2 === 0 ? 1 : 0, text: '🟢 Disponible' };
  };

  const jobs = [
    {
      id: 'VTC-90412',
      customer: 'Elena Rostova',
      phone: '(702) 891-2390',
      address: '10432 Summerlin Centre Dr, Las Vegas, NV 89135',
      service: 'Montaje de TV 75" + Soundbar + Ocultador de Cableado',
      surface: 'Drywall sobre vigas de madera con anclajes Toggle Bolt',
      time: 'Hoy - 10:00 AM',
      assignedTo: 'Carlos',
      status: 'En Proceso',
      laborCost: 140.00,
      hardwareCost: 25.00,
      total: 165.00
    },
    {
      id: 'VTC-90415',
      customer: 'Marcus Vance',
      phone: '(702) 412-8831',
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
      address: '2214 Green Valley Pkwy, Henderson, NV 89014',
      service: 'Ensamblaje Juego de Habitación King IKEA + Escritorio',
      surface: 'Superficie de madera / anclaje anti-vuelco a la pared',
      time: 'Mañana - 9:00 AM',
      assignedTo: 'Carlos',
      status: 'Confirmado',
      laborCost: 210.00,
      hardwareCost: 35.00,
      total: 245.00
    }
  ];

  if (!isOpen) return null;

  const filteredJobs = activeTech === 'both' ? jobs : jobs.filter(j => j.assignedTo.toLowerCase() === activeTech);
  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#090D18] border border-amber-500/40 rounded-3xl shadow-space-glass overflow-hidden text-white my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#141C2E] border-b border-space-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Portal de Operaciones & Facturación de Técnicos</h3>
              <p className="text-xs text-amber-400 font-bold">Vegas TaskCraft LLC • Carlos & Jonathan Operational Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tech Selector */}
            <div className="flex bg-[#090D18] p-1 rounded-xl border border-gray-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTech('both')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'both' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                👥 Vista Compartida
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('carlos')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'carlos' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                👷‍♂️ Carlos
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('jonathan')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTech === 'jonathan' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                👷‍♂️ Jonathan
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#141C2E] border border-gray-700 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#070A12]/95">
          
          {/* Full Monthly Workload Heatmap Calendar */}
          <div className="bg-[#141C2E] p-6 rounded-3xl border border-space-cardBorder space-y-5">
            
            {/* Month Header Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-3 border-b border-gray-800">
              <div>
                <h4 className="font-extrabold text-white text-base flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-cyan-400" />
                  <span>Calendario de Trabajo Mensual Completo (Mapa de Calor)</span>
                </h4>
                <p className="text-xs text-gray-400">Nivel de disponibilidad por día para proyectar agendas futuras de Carlos y Jonathan</p>
              </div>

              {/* Month Switcher Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl bg-[#090D18] border border-gray-700 hover:border-amber-400 text-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="font-black text-amber-400 font-mono text-sm px-4 py-1.5 bg-[#090D18] rounded-xl border border-amber-500/40">
                  {availableMonths[currentMonthIndex]}
                </span>

                <button
                  type="button"
                  onClick={() => setCurrentMonthIndex((prev) => Math.min(availableMonths.length - 1, prev + 1))}
                  className="p-2 rounded-xl bg-[#090D18] border border-gray-700 hover:border-amber-400 text-gray-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Legend Badges */}
            <div className="flex items-center justify-end gap-4 text-xs font-bold pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> 🟢 Disponible (0-1)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> 🟡 Carga Media (2)
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> 🔴 Ocupado (3+)
              </span>
            </div>

            {/* Full 31-Day Calendar Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {daysArray.map((day) => {
                  const status = getDayStatus(day);
                  const isSelected = selectedCalendarDay === day;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedCalendarDay(day)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-16 ${
                        isSelected
                          ? 'ring-2 ring-amber-400 border-amber-400 scale-105 z-10 shadow-lg'
                          : ''
                      } ${
                        status.level === 'green'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60'
                          : status.level === 'yellow'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-950/60'
                          : 'bg-red-950/40 border-red-500/40 text-red-300 hover:bg-red-950/60'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{day}</span>
                      <span className="text-[10px] font-black">{status.count} Trabajos</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Scheduled Jobs List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Proyectos Asignados para el Día {selectedCalendarDay} de {availableMonths[currentMonthIndex]}</span>
              <span className="text-xs text-amber-400 font-mono">Técnicos: {activeTech === 'both' ? 'Carlos & Jonathan' : activeTech}</span>
            </h4>

            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#141C2E] p-5 rounded-2xl border border-space-cardBorder flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-0.5 bg-amber-950/60 rounded border border-amber-500/30">
                        {job.id}
                      </span>
                      <h5 className="font-extrabold text-white text-base">{job.customer}</h5>
                      <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {job.time}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/40">
                        Asignado a: {job.assignedTo}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{job.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{job.address}</span>
                      </p>
                    </div>

                    <div className="bg-[#090D18] p-2.5 rounded-xl border border-gray-800 text-xs space-y-1">
                      <div>
                        <span className="font-bold text-amber-400">Servicio Requerido: </span>
                        <span className="text-white font-semibold">{job.service}</span>
                      </div>
                      <div className="text-gray-400 text-[11px]">
                        📌 Detalles de Superficie & Pared: {job.surface}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end md:items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Total Est.:</span>
                      <span className="text-xl font-black text-amber-400">${job.total.toFixed(2)} USD</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedJobForInvoice(job)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Generar Factura Legal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Nevada Legal Invoice Modal */}
          {selectedJobForInvoice && (
            <div className="bg-white text-slate-900 p-8 rounded-3xl border-4 border-amber-500 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              
              {/* Invoice Top Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 pb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0F19] text-amber-400 flex items-center justify-center font-black text-xl">
                    VTC
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-[#0B0F19] tracking-tight">VEGAS TASKCRAFT LLC</h3>
                    <p className="text-xs text-slate-600 font-bold">Residential Decor & Solutions • Las Vegas, Nevada</p>
                    <p className="text-[10px] text-slate-500 font-mono">NV State Business License N°: NV-NV2026-981024</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 bg-amber-100 text-[#D97706] font-black text-xs uppercase tracking-wider rounded-md">
                    FACTURA OFICIAL LEGAL
                  </span>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-2">Factura N°: {selectedJobForInvoice.id}</p>
                  <p className="text-xs text-slate-500">Fecha: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Client & Tech Details */}
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <div>
                  <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">FACTURADO A:</h5>
                  <p className="font-extrabold text-slate-900 text-sm">{selectedJobForInvoice.customer}</p>
                  <p className="text-slate-600">{selectedJobForInvoice.address}</p>
                  <p className="text-slate-600 font-mono">{selectedJobForInvoice.phone}</p>
                </div>
                <div className="text-right">
                  <h5 className="font-bold text-slate-400 uppercase tracking-wider mb-1">TÉCNICO RESPONSABLE:</h5>
                  <p className="font-extrabold text-[#D97706] text-sm">{selectedJobForInvoice.assignedTo} (Certificado)</p>
                  <p className="text-slate-600">Servicio de Guante Blanco Garantizado</p>
                  <p className="text-emerald-600 font-bold">● Póliza de Seguro Comercial Activa</p>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-white font-extrabold uppercase">
                    <tr>
                      <th className="p-3">Descripción del Servicio</th>
                      <th className="p-3">Mano de Obra</th>
                      <th className="p-3">Materiales / Anclajes</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-slate-800">
                    <tr>
                      <td className="p-3 font-semibold">
                        {selectedJobForInvoice.service}
                        <span className="block text-[10px] text-slate-500">Superficie: {selectedJobForInvoice.surface}</span>
                      </td>
                      <td className="p-3 font-mono">${selectedJobForInvoice.laborCost.toFixed(2)}</td>
                      <td className="p-3 font-mono">${selectedJobForInvoice.hardwareCost.toFixed(2)}</td>
                      <td className="p-3 text-right font-mono font-bold">${(selectedJobForInvoice.laborCost + selectedJobForInvoice.hardwareCost).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="flex flex-col items-end space-y-1 text-xs">
                <div className="w-64 space-y-1.5 pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold">${(selectedJobForInvoice.laborCost + selectedJobForInvoice.hardwareCost).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Clark County NV Sales Tax (8.375%):</span>
                    <span className="font-mono font-bold">${((selectedJobForInvoice.laborCost + selectedJobForInvoice.hardwareCost) * 0.08375).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between font-black text-lg text-[#0B0F19] pt-2 border-t-2 border-[#0B0F19]">
                    <span>TOTAL FACTURADO:</span>
                    <span className="font-mono text-[#D97706]">${(selectedJobForInvoice.total * 1.08375).toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Legal Terms Line */}
              <div className="pt-4 border-t border-gray-200 text-[10px] text-slate-500 leading-relaxed">
                <p>
                  <strong>Términos Legales de Nevada:</strong> Servicios realizados bajo regulaciones de exención de Handyman de Nevada NRS 624. Incluye 1 año de garantía escrita en mano de obra y anclajes. Vegas TaskCraft LLC mantendrá reserva de responsabilidad comercial activa para trabajos en condominios High-Rise.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobForInvoice(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-200 text-slate-800 font-bold text-xs hover:bg-gray-300"
                >
                  Cerrar Vista Previa
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Bill</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Factura ${selectedJobForInvoice.id} enviada al cliente por SMS y Email!`)}
                    className="px-5 py-2.5 rounded-xl bg-[#D97706] text-white font-extrabold text-xs shadow-md hover:bg-amber-600 flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Enviar al Cliente</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
