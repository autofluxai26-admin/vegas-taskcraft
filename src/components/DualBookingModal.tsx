import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, MapPin, User, Phone, Sparkles, Layers, DollarSign, Calculator, Lock, Plus, Minus, Wrench, Tv, Frame } from 'lucide-react';
import { OnlinePaymentModal } from './OnlinePaymentModal';

interface DualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const DualBookingModal: React.FC<DualBookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'visit'>('checkout');

  // Multi-service selection toggles
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    tv: true,
    furniture: false,
    art: false,
    repairs: false,
  });

  // Furniture Assembly Hourly State (Default 2 Hours minimum @ $75/hr)
  const [furnitureHours, setFurnitureHours] = useState<number>(2);

  // Multi-product selections inside TV Mounting
  const [tvItems, setTvItems] = useState({
    mainTv: true,
    secondTv: false,
    soundbar: true,
  });

  // Multi-product selections inside Art & Mirrors
  const [artItems, setArtItems] = useState({
    heavyMirror: true,
    gallerySet: false,
    standardFrames: false,
  });

  // Multi-product selections inside Reparaciones Menores
  const [repairItems, setRepairItems] = useState({
    smartLock: true,
    ringDoorbell: false,
    blinds: false,
    handymanPatch: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [generatedBookingCode, setGeneratedBookingCode] = useState('');

  if (!isOpen) return null;

  // Dynamic Real-time Pricing Calculation
  let subtotal = 0;

  if (selectedServices.tv) {
    if (tvItems.mainTv) subtotal += 95.0;
    if (tvItems.secondTv) subtotal += 75.0;
    if (tvItems.soundbar) subtotal += 35.0;
  }

  // HOURLY CHARGE FOR FURNITURE ASSEMBLY ($75/hr)
  if (selectedServices.furniture) {
    subtotal += furnitureHours * 75.0;
  }

  if (selectedServices.art) {
    if (artItems.heavyMirror) subtotal += 95.0;
    if (artItems.gallerySet) subtotal += 130.0;
    if (artItems.standardFrames) subtotal += 50.0;
  }

  if (selectedServices.repairs) {
    if (repairItems.smartLock) subtotal += 90.0;
    if (repairItems.ringDoorbell) subtotal += 80.0;
    if (repairItems.blinds) subtotal += 70.0;
    if (repairItems.handymanPatch) subtotal += 85.0;
  }

  const tax = subtotal * 0.08375; // 8.375% Clark County Nevada Sales Tax
  const grandTotal = subtotal + tax;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VTC-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedBookingCode(code);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-[#090E1A] border-2 border-amber-500/40 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-white my-4 max-h-[94vh] flex flex-col">
          
          {/* Header Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#141C2E] via-[#090E1A] to-[#141C2E] border-b border-space-cardBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block leading-none">
                  Reserva & Checkout Interactivo
                </span>
                <span className="text-[10px] text-amber-400 font-extrabold tracking-widest uppercase">
                  Vegas TaskCraft • Modern Booking Engine
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-[#141C2E] border border-gray-700 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex border-b border-space-cardBorder bg-[#050811]">
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`flex-1 py-4 px-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'checkout'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Opción 1: Checkout Multi-Servicio (Pago Online Directo)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visit')}
              className={`flex-1 py-4 px-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
                activeTab === 'visit'
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10 shadow-[0_4px_20px_rgba(6,182,212,0.15)]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Opción 2: Visita Presencial / Cotización In Situ</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#090E1A]">
            <form onSubmit={handleStartPayment} className="space-y-6">
              
              {activeTab === 'checkout' ? (
                /* TAB 1: MODERN MULTI-SERVICE CHECKOUT WITH HOURLY FURNITURE ASSEMBLY */
                <div className="space-y-6">
                  
                  {/* Step Badge 1 */}
                  <div className="flex items-center justify-between pb-1 border-b border-gray-800">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center">1</span>
                      SELECCIONA TUS SERVICIOS & CONFIGURA TUS OPCIONES:
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Precios Claros & Sin Sorpresas</span>
                  </div>

                  <div className="space-y-4">
                    
                    {/* SERVICE 1: TV MOUNTING */}
                    <div className={`rounded-2xl border transition-all overflow-hidden ${
                      selectedServices.tv ? 'bg-[#141C2E] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-[#050811] border-gray-800'
                    }`}>
                      <label className="p-4 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.tv}
                            onChange={(e) => setSelectedServices({ ...selectedServices, tv: e.target.checked })}
                            className="rounded text-amber-500 focus:ring-0 w-5 h-5 cursor-pointer"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-white block">📺 Montaje de TV & Home Theater</span>
                            <span className="text-[11px] text-gray-400">Televisores 32" a 85"+ en todo tipo de paredes</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                          Desde $95 USD
                        </span>
                      </label>

                      {/* TV Options */}
                      {selectedServices.tv && (
                        <div className="p-4 bg-[#050811] border-t border-gray-800 space-y-3 animate-in fade-in duration-200">
                          <span className="text-[11px] font-bold text-gray-300 uppercase block">Selecciona los Equipos a Montar:</span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              tvItems.mainTv ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={tvItems.mainTv}
                                onChange={(e) => setTvItems({ ...tvItems, mainTv: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>TV Principal 55"-75" ($95)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              tvItems.secondTv ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={tvItems.secondTv}
                                onChange={(e) => setTvItems({ ...tvItems, secondTv: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>TV Secundaria ($75)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              tvItems.soundbar ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={tvItems.soundbar}
                                onChange={(e) => setTvItems({ ...tvItems, soundbar: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>Barra de Audio ($35)</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SERVICE 2: FURNITURE ASSEMBLY (COBRO POR HORA - $75/HR) */}
                    <div className={`rounded-2xl border transition-all overflow-hidden ${
                      selectedServices.furniture ? 'bg-[#141C2E] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-[#050811] border-gray-800'
                    }`}>
                      <label className="p-4 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.furniture}
                            onChange={(e) => setSelectedServices({ ...selectedServices, furniture: e.target.checked })}
                            className="rounded text-amber-500 focus:ring-0 w-5 h-5 cursor-pointer"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-white block">🛋️ Ensamblaje de Muebles (Cobro por Hora)</span>
                            <span className="text-[11px] text-amber-400 font-semibold">Tarifa Justa: $75.00 USD / Hora (Mínimo 2 Horas)</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                          $75 / Hora
                        </span>
                      </label>

                      {/* HOURLY COUNTER SELECTOR FOR FURNITURE ASSEMBLY */}
                      {selectedServices.furniture && (
                        <div className="p-5 bg-[#050811] border-t border-gray-800 space-y-4 animate-in fade-in duration-200">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141C2E] p-4 rounded-2xl border border-amber-500/30">
                            <div>
                              <span className="text-xs font-bold text-white block">Horas Estimadas de Servicio:</span>
                              <span className="text-[11px] text-gray-400">Puedes estimar las horas o nuestros técnicos te asesorarán</span>
                            </div>

                            {/* Hours Increment/Decrement Controls */}
                            <div className="flex items-center gap-3 bg-[#050811] p-1.5 rounded-xl border border-gray-700">
                              <button
                                type="button"
                                onClick={() => setFurnitureHours(Math.max(2, furnitureHours - 1))}
                                className="w-9 h-9 rounded-lg bg-[#141C2E] text-white font-black hover:bg-amber-500 hover:text-black transition-colors flex items-center justify-center text-base"
                              >
                                -
                              </button>
                              <span className="font-mono font-black text-amber-400 text-sm px-3">
                                {furnitureHours} {furnitureHours === 1 ? 'Hora' : 'Horas'} (${furnitureHours * 75} USD)
                              </span>
                              <button
                                type="button"
                                onClick={() => setFurnitureHours(furnitureHours + 1)}
                                className="w-9 h-9 rounded-lg bg-[#141C2E] text-white font-black hover:bg-amber-500 hover:text-black transition-colors flex items-center justify-center text-base"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-[11px] text-gray-300 space-y-1 bg-[#141C2E]/60 p-3 rounded-xl border border-gray-800">
                            <p className="font-bold text-amber-400">✓ Qué incluye el cobro por hora:</p>
                            <p>Armado profesional de cualquier mueble (IKEA, Wayfair, West Elm), desempaque, clasificación de piezas, atornillado con herramientas de torque regulado, nivelación de puertas y anclaje anti-vuelco de seguridad a la pared.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SERVICE 3: ART & MIRRORS */}
                    <div className={`rounded-2xl border transition-all overflow-hidden ${
                      selectedServices.art ? 'bg-[#141C2E] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-[#050811] border-gray-800'
                    }`}>
                      <label className="p-4 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.art}
                            onChange={(e) => setSelectedServices({ ...selectedServices, art: e.target.checked })}
                            className="rounded text-amber-500 focus:ring-0 w-5 h-5 cursor-pointer"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-white block">🖼️ Montaje Arte & Espejos Pesados</span>
                            <span className="text-[11px] text-gray-400">Nivelado láser y anclajes mecánicos de precisión</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                          Desde $75 USD
                        </span>
                      </label>

                      {/* Art Options */}
                      {selectedServices.art && (
                        <div className="p-4 bg-[#050811] border-t border-gray-800 space-y-3 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              artItems.heavyMirror ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={artItems.heavyMirror}
                                onChange={(e) => setArtItems({ ...artItems, heavyMirror: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>Espejo Pesado &gt;50 lbs ($95)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              artItems.gallerySet ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={artItems.gallerySet}
                                onChange={(e) => setArtItems({ ...artItems, gallerySet: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>Galería 3-5 Cuadros ($130)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              artItems.standardFrames ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={artItems.standardFrames}
                                onChange={(e) => setArtItems({ ...artItems, standardFrames: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>Cuadros Standard ($50)</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SERVICE 4: REPARACIONES MENORES & SMART HOME */}
                    <div className={`rounded-2xl border transition-all overflow-hidden ${
                      selectedServices.repairs ? 'bg-[#141C2E] border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : 'bg-[#050811] border-gray-800'
                    }`}>
                      <label className="p-4 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.repairs}
                            onChange={(e) => setSelectedServices({ ...selectedServices, repairs: e.target.checked })}
                            className="rounded text-amber-500 focus:ring-0 w-5 h-5 cursor-pointer"
                          />
                          <div>
                            <span className="font-extrabold text-sm text-white block">🔧 Reparaciones Menores & Smart Home</span>
                            <span className="text-[11px] text-gray-400">Ring Doorbell, cerraduras smart, persianas y retoques</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                          Desde $80 USD
                        </span>
                      </label>

                      {/* Repair Options */}
                      {selectedServices.repairs && (
                        <div className="p-4 bg-[#050811] border-t border-gray-800 space-y-3 animate-in fade-in duration-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              repairItems.smartLock ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={repairItems.smartLock}
                                onChange={(e) => setRepairItems({ ...repairItems, smartLock: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>🔑 Cerradura Inteligente Smart Lock ($90)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              repairItems.ringDoorbell ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={repairItems.ringDoorbell}
                                onChange={(e) => setRepairItems({ ...repairItems, ringDoorbell: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>🔔 Ring / Nest Doorbell ($80)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              repairItems.blinds ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={repairItems.blinds}
                                onChange={(e) => setRepairItems({ ...repairItems, blinds: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>🪟 Persianas / Cortinas ($70)</span>
                            </label>

                            <label className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                              repairItems.handymanPatch ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-[#141C2E] border-gray-800 text-gray-400'
                            }`}>
                              <input
                                type="checkbox"
                                checked={repairItems.handymanPatch}
                                onChange={(e) => setRepairItems({ ...repairItems, handymanPatch: e.target.checked })}
                                className="rounded text-amber-500 focus:ring-0"
                              />
                              <span>🛠️ Parche / Reparación General ($85)</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Real-time Itemized Price Summary */}
                  <div className="bg-[#141C2E] p-5 rounded-2xl border border-amber-500/40 space-y-2.5 text-xs shadow-xl">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal Servicios Seleccionados:</span>
                      <span className="font-mono font-bold text-white">${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Nevada Clark County Sales Tax (8.375%):</span>
                      <span className="font-mono font-semibold text-[#D97706]">${tax.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between font-black text-amber-400 text-lg pt-2 border-t border-gray-800">
                      <span>Total Real Final a Pagar:</span>
                      <span className="font-mono">${grandTotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                </div>
              ) : (
                /* TAB 2: PHYSICAL VISIT REQUEST */
                <div className="space-y-4">
                  <div className="bg-[#141C2E] p-5 rounded-2xl border border-cyan-500/30 space-y-2">
                    <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Evaluación Presencial en tu Domicilio de Las Vegas
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Nuestros técnicos capacitados (Carlos o Jonathan) acudirán a tu propiedad para medir, evaluar el tipo de pared y darte una cotización justa.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Detalles del Trabajo Solicitado:
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Escribe aquí los detalles del servicio que necesitas evaluar..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#141C2E] border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-cyan-400"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step Badge 2: Customer Contact Details */}
              <div className="space-y-3 pt-4 border-t border-space-cardBorder">
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center">2</span>
                  DATOS DEL CLIENTE & DIRECCIÓN EN LAS VEGAS:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nombre Completo *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141C2E] border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono Directo (702...) *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#141C2E] border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Dirección Exacta / Condominio en Las Vegas *"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#141C2E] border border-gray-700 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4.5 rounded-full bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-black text-sm uppercase tracking-wider shadow-gold-cosmic hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {activeTab === 'checkout' ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>CONFIRMAR Y PROCEDER AL PAGO ONLINE (${grandTotal.toFixed(2)} USD)</span>
                  </>
                ) : (
                  <span>SOLICITAR VISITA FÍSICA AHORA</span>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* Online Payment Modal Component */}
      <OnlinePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          onClose();
        }}
        bookingCode={generatedBookingCode}
        customerName={formData.name || 'Cliente'}
        totalAmount={grandTotal}
      />
    </>
  );
};
