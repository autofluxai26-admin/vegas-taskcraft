import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, MapPin, User, Phone, Sparkles, Layers, DollarSign, Calculator, Lock, Plus, Minus, Wrench, Tv, Frame, Shield, Cpu, Video, Check, Mail } from 'lucide-react';
import { OnlinePaymentModal } from './OnlinePaymentModal';
import { Logo } from './Logo';

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
    smarthome: false,
  });

  // Hourly states
  const [furnitureHours, setFurnitureHours] = useState<number>(2);
  const [artHours, setArtHours] = useState<number>(1);
  const [lampHours, setLampHours] = useState<number>(1);
  const [paintHours, setPaintHours] = useState<number>(2);
  const [curtainWindows, setCurtainWindows] = useState<number>(2);

  // Sub-option selections
  const [tvSizeOption, setTvSizeOption] = useState<'small' | 'medium' | 'large'>('medium');
  const [artOption, setArtOption] = useState<'addon' | 'standalone'>('addon');

  const [repairItems, setRepairItems] = useState({
    wallPatch: true,
    panelInstall: false,
    electronicsSetup: false,
  });

  const [smartHomeItems, setSmartHomeItems] = useState({
    automation3point: true,
    outdoorSurveillance: false,
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

  // Dynamic Real-time Pricing Calculation WITHOUT TAX PERCENTAGE
  let grandTotal = 0;

  if (selectedServices.tv) {
    if (tvSizeOption === 'small') grandTotal += 100.0;
    else if (tvSizeOption === 'medium') grandTotal += 150.0;
    else if (tvSizeOption === 'large') grandTotal += 200.0;
  }

  if (selectedServices.furniture) {
    grandTotal += furnitureHours * 120.0;
  }

  if (selectedServices.art) {
    grandTotal += artHours * 60.0;
    if (artOption === 'addon') grandTotal += 50.0;
    else if (artOption === 'standalone') grandTotal += 90.0;
  }

  if (selectedServices.repairs) {
    grandTotal += curtainWindows * 50.0;
    if (repairItems.wallPatch) grandTotal += 100.0;
    if (repairItems.panelInstall) grandTotal += 150.0;
    if (repairItems.electronicsSetup) grandTotal += 40.0;
    grandTotal += lampHours * 150.0;
    if (paintHours > 0) grandTotal += paintHours * 150.0;
  }

  if (selectedServices.smarthome) {
    if (smartHomeItems.automation3point) grandTotal += 180.0;
    if (smartHomeItems.outdoorSurveillance) grandTotal += 250.0;
  }

  if (activeTab === 'visit') {
    grandTotal = 25.0;
  }

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VTC-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedBookingCode(code);

    // Send payload to backend / n8n
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingCode: code,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        service: activeTab === 'checkout' ? 'Multi-Service Assembly & Mounting' : 'On-Site Estimate Visit ($25)',
        bookingType: activeTab === 'checkout' ? 'Service Checkout' : 'On-Site Estimate ($25)',
        date: 'August 2026 28',
        timeSlot: '02:00 PM - 04:00 PM',
        totalAmount: grandTotal
      })
    }).catch(err => console.error('API submit error:', err));

    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden text-white my-2 max-h-[96vh] flex flex-col">
          
          {/* Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#10172A] border-b border-cyan-500/30 flex items-center justify-between gap-3 relative">
            <div className="flex items-center gap-3 min-w-0 pr-8 sm:pr-0">
              <div className="shrink-0">
                <Logo size="sm" showText={false} />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-xs sm:text-base tracking-tight text-white block leading-tight truncate">
                  Interactive Booking & Checkout
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-400 font-bold tracking-wider uppercase block mt-0.5 truncate">
                  Vegas TaskCraft • contact@vegastaskcraft.com
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-[#070A12] border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Option Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#0A101F] p-1.5 border-b border-gray-800 text-[11px] sm:text-xs font-black gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'checkout'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.6)] font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span>OPTION 1: ONLINE CHECKOUT</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visit')}
              className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                activeTab === 'visit'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,240,255,0.6)] font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>OPTION 2: ON-SITE ESTIMATE ($25 VISIT FEE)</span>
            </button>
          </div>

          {/* Form Body Container */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
            
            {activeTab === 'checkout' ? (
              <form onSubmit={handleStartPayment} className="space-y-6">
                
                {/* 1. Services Selection Panel */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] border border-cyan-400 shrink-0">1</span>
                      <span>SELECT YOUR SERVICES & CONFIGURE OPTIONS:</span>
                    </h4>
                    <span className="text-[11px] text-cyan-300 font-bold">Transparent Prices & 0% Hidden Taxes</span>
                  </div>

                  {/* Service 1: TV Mounting */}
                  <div className={`p-4 rounded-2xl border transition-all ${selectedServices.tv ? 'bg-[#10172A] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-[#0A101F] border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedServices({ ...selectedServices, tv: !selectedServices.tv })}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.tv}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-gray-900 border-gray-700"
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2">
                          <Tv className="w-4 h-4 text-cyan-400 shrink-0" /> TV Mounting & Home Theater
                        </span>
                      </label>
                      <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                        ${tvSizeOption === 'small' ? '100' : tvSizeOption === 'medium' ? '150' : '200'} USD
                      </span>
                    </div>

                    {selectedServices.tv && (
                      <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setTvSizeOption('small')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${tvSizeOption === 'small' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}
                        >
                          📺 Up to 42" ($100 USD)
                        </button>
                        <button
                          type="button"
                          onClick={() => setTvSizeOption('medium')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${tvSizeOption === 'medium' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}
                        >
                          📺 Up to 65" ($150 USD)
                        </button>
                        <button
                          type="button"
                          onClick={() => setTvSizeOption('large')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${tvSizeOption === 'large' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}
                        >
                          📺 65"+ ($200 USD)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Service 2: Furniture Assembly */}
                  <div className={`p-4 rounded-2xl border transition-all ${selectedServices.furniture ? 'bg-[#10172A] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-[#0A101F] border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedServices({ ...selectedServices, furniture: !selectedServices.furniture })}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.furniture}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-gray-900 border-gray-700"
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-cyan-400 shrink-0" /> Furniture Assembly ($120 / Hour)
                        </span>
                      </label>
                      <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                        ${furnitureHours * 120} USD ({furnitureHours}h)
                      </span>
                    </div>

                    {selectedServices.furniture && (
                      <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between">
                        <span className="text-xs text-gray-300 font-semibold">Estimated Assembly Hours:</span>
                        <div className="flex items-center gap-3 bg-[#070A12] p-1 rounded-xl border border-gray-800">
                          <button
                            type="button"
                            onClick={() => setFurnitureHours(Math.max(1, furnitureHours - 1))}
                            className="w-7 h-7 rounded-lg bg-[#10172A] text-cyan-400 font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-white px-2">{furnitureHours} Hours</span>
                          <button
                            type="button"
                            onClick={() => setFurnitureHours(furnitureHours + 1)}
                            className="w-7 h-7 rounded-lg bg-[#10172A] text-cyan-400 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service 3: Art & Mirrors */}
                  <div className={`p-4 rounded-2xl border transition-all ${selectedServices.art ? 'bg-[#10172A] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-[#0A101F] border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedServices({ ...selectedServices, art: !selectedServices.art })}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.art}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-gray-900 border-gray-700"
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2">
                          <Frame className="w-4 h-4 text-cyan-400 shrink-0" /> Art, Shelves & Heavy Mirrors
                        </span>
                      </label>
                      <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                        ${artHours * 60 + (artOption === 'addon' ? 50 : 90)} USD
                      </span>
                    </div>

                    {selectedServices.art && (
                      <div className="mt-3 pt-3 border-t border-gray-800 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-300 font-bold">Small Shelves & Art ($60 / Hour):</span>
                          <div className="flex items-center gap-2 bg-[#070A12] p-1 rounded-xl border border-gray-800">
                            <button type="button" onClick={() => setArtHours(Math.max(1, artHours - 1))} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">-</button>
                            <span className="font-black text-white px-2">{artHours}h</span>
                            <button type="button" onClick={() => setArtHours(artHours + 1)} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">+</button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setArtOption('addon')}
                            className={`p-2 rounded-xl border font-bold text-center ${artOption === 'addon' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}
                          >
                            🖼️ Large Mirror Add-on (+$50)
                          </button>
                          <button
                            type="button"
                            onClick={() => setArtOption('standalone')}
                            className={`p-2 rounded-xl border font-bold text-center ${artOption === 'standalone' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-[#070A12] border-gray-800 text-gray-400'}`}
                          >
                            🖼️ Standalone Contract ($90)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service 4: Curtains, Painting & Finishes */}
                  <div className={`p-4 rounded-2xl border transition-all ${selectedServices.repairs ? 'bg-[#10172A] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-[#0A101F] border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedServices({ ...selectedServices, repairs: !selectedServices.repairs })}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.repairs}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-gray-900 border-gray-700"
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-cyan-400 shrink-0" /> Curtains, Painting, Lamps & Patches
                        </span>
                      </label>
                      <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                        Custom Estimate
                      </span>
                    </div>

                    {selectedServices.repairs && (
                      <div className="mt-3 pt-3 border-t border-gray-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-bold">Window Curtains ($50 / window):</span>
                          <div className="flex items-center gap-2 bg-[#070A12] p-1 rounded-xl border border-gray-800">
                            <button type="button" onClick={() => setCurtainWindows(Math.max(1, curtainWindows - 1))} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">-</button>
                            <span className="font-black text-white px-2">{curtainWindows} Windows</span>
                            <button type="button" onClick={() => setCurtainWindows(curtainWindows + 1)} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">+</button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-bold">Light Fixtures & Ceiling Fans ($150 / hr):</span>
                          <div className="flex items-center gap-2 bg-[#070A12] p-1 rounded-xl border border-gray-800">
                            <button type="button" onClick={() => setLampHours(Math.max(1, lampHours - 1))} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">-</button>
                            <span className="font-black text-white px-2">{lampHours}h</span>
                            <button type="button" onClick={() => setLampHours(lampHours + 1)} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">+</button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-bold">Accent Painting Jobs ($150 / hr):</span>
                          <div className="flex items-center gap-2 bg-[#070A12] p-1 rounded-xl border border-gray-800">
                            <button type="button" onClick={() => setPaintHours(Math.max(0, paintHours - 1))} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">-</button>
                            <span className="font-black text-white px-2">{paintHours}h</span>
                            <button type="button" onClick={() => setPaintHours(paintHours + 1)} className="w-6 h-6 rounded bg-[#10172A] text-cyan-400">+</button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-800/80">
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-[#070A12] border border-gray-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={repairItems.wallPatch}
                              onChange={(e) => setRepairItems({ ...repairItems, wallPatch: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Wall Patches ($100)</span>
                          </label>
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-[#070A12] border border-gray-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={repairItems.panelInstall}
                              onChange={(e) => setRepairItems({ ...repairItems, panelInstall: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Accent Panels ($150)</span>
                          </label>
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-[#070A12] border border-gray-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={repairItems.electronicsSetup}
                              onChange={(e) => setRepairItems({ ...repairItems, electronicsSetup: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Device Setup ($40)</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service 5: Smart Home & Security */}
                  <div className={`p-4 rounded-2xl border transition-all ${selectedServices.smarthome ? 'bg-[#10172A] border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.15)]' : 'bg-[#0A101F] border-gray-800 opacity-60'}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setSelectedServices({ ...selectedServices, smarthome: !selectedServices.smarthome })}>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedServices.smarthome}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-gray-900 border-gray-700"
                        />
                        <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-cyan-400 shrink-0" /> Smart Home & Security Systems
                        </span>
                      </label>
                      <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                        NEW
                      </span>
                    </div>

                    {selectedServices.smarthome && (
                      <div className="mt-3 pt-3 border-t border-gray-800 space-y-2 text-xs">
                        <label className="flex items-start gap-3 p-3 rounded-xl bg-[#070A12] border border-gray-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={smartHomeItems.automation3point}
                            onChange={(e) => setSmartHomeItems({ ...smartHomeItems, automation3point: e.target.checked })}
                            className="mt-1 rounded text-cyan-500"
                          />
                          <div>
                            <span className="font-extrabold text-white block">1. 3-Point Smart Automation ($180 USD)</span>
                            <span className="text-gray-400 text-[11px]">Integration across TV, Dining, and Kitchen using Alexa voice control & smart plugs.</span>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 rounded-xl bg-[#070A12] border border-gray-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={smartHomeItems.outdoorSurveillance}
                            onChange={(e) => setSmartHomeItems({ ...smartHomeItems, outdoorSurveillance: e.target.checked })}
                            className="mt-1 rounded text-cyan-500"
                          />
                          <div>
                            <span className="font-extrabold text-white block">2. Outdoor Security Camera System ($250 USD)</span>
                            <span className="text-gray-400 text-[11px]">HD WiFi security cameras with high-efficiency solar panel battery units.</span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                </div>

                {/* 2. Customer Contact Form (WITH EMAIL FIELD) */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] border border-cyan-400 shrink-0">2</span>
                    <span>APPOINTMENT BOOKING DETAILS:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-gray-300 mb-1">Full Name:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-300 mb-1">Mobile Phone (Las Vegas):</label>
                      <input
                        type="tel"
                        required
                        placeholder="(702) 772-4116"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-cyan-300 mb-1">Email Address (Instant Confirmation Receipt & Invoice):</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. client@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#10172A] border border-cyan-500/50 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-300 mb-1">Exact Address in Las Vegas Valley / High-Rise Tower:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Summerlin, Henderson, or High-Rise Condo Tower Name"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Final Summary WITHOUT TAX PERCENTAGE */}
                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/40 shadow-lg space-y-3">
                  <div className="flex justify-between items-center text-sm font-black text-white">
                    <span>Total Net Booking Amount:</span>
                    <span className="text-2xl text-cyan-400 font-black">${grandTotal.toFixed(2)} USD</span>
                  </div>
                  <p className="text-[11px] text-cyan-300 font-semibold italic text-center">
                    ✓ Transparent flat-rate pricing with 0% hidden taxes. Confirmation email sent instantly.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all transform hover:scale-[1.02]"
                >
                  PROCESS ONLINE BOOKING (${grandTotal.toFixed(2)} USD)
                </button>

              </form>
            ) : (
              /* VISIT TAB ($25 On-Site Estimate Fee) */
              <form onSubmit={handleStartPayment} className="space-y-6">
                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/40 space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-8 h-8 text-cyan-400 shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-white text-base">Request On-Site Estimate Visit ($25 USD)</h4>
                      <p className="text-xs text-gray-300">
                        Carlos or Jonathan will visit your residence in Las Vegas to assess the work, measure dimensions, and provide an accurate on-site quote.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Full Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Mobile Phone:</label>
                    <input
                      type="tel"
                      required
                      placeholder="(702) 772-4116"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-cyan-300 mb-1">Email Address (Instant Confirmation Receipt):</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#10172A] border border-cyan-500/50 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">Visit Address:</label>
                    <input
                      type="text"
                      required
                      placeholder="Full address in Las Vegas / Summerlin / Henderson"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#10172A] p-4 rounded-xl border border-gray-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-300">Flat On-Site Visit Fee:</span>
                  <span className="text-xl font-black text-cyan-400">$25.00 USD</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
                >
                  SCHEDULE ON-SITE VISIT ($25 USD)
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

      {/* Online Payment Modal */}
      <OnlinePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingCode={generatedBookingCode}
        customerName={formData.name}
        totalAmount={grandTotal}
      />
    </>
  );
};
