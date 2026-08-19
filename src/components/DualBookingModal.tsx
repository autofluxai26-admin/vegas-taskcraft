import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle, ShieldCheck, MapPin, User, Phone, Sparkles, Layers, DollarSign, Calculator, Lock, Plus, Minus, Wrench, Tv, Frame, Shield, Cpu, Video, Check, Mail } from 'lucide-react';
import { OnlinePaymentModal } from './OnlinePaymentModal';
import { Logo } from './Logo';

interface DualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

// Live Phone Number Formatter: formats raw input to (000) 000-0000 format
export const formatPhoneNumber = (value: string) => {
  if (!value) return '';
  const digits = value.replace(/\D/g, ''); // keep only numbers
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Generate upcoming 14 business days (2 weeks rolling window)
export const getUpcomingBusinessDays = () => {
  const dates: { value: string; label: string }[] = [];
  const baseDate = new Date();
  
  let current = new Date(baseDate.getFullYear() < 2026 ? '2026-08-31T09:00:00' : baseDate);

  let added = 0;
  while (added < 14) {
    const dayOfWeek = current.getDay();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const formattedVal = `${monthNames[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;
    const label = `${formattedVal} (${dayNames[dayOfWeek]})`;
    
    dates.push({ value: formattedVal, label });
    added++;
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const DualBookingModal: React.FC<DualBookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'visit'>('checkout');

  // Multi-service selection toggles - ALL OFF BY DEFAULT
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    tv: false,
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

  // Sub-items ALL OFF BY DEFAULT
  const [repairItems, setRepairItems] = useState({
    wallPatch: false,
    panelInstall: false,
    electronicsSetup: false,
  });

  const [smartHomeItems, setSmartHomeItems] = useState({
    automation3point: false,
    outdoorSurveillance: false,
  });

  const upcomingDays = getUpcomingBusinessDays();

  // FICTITIOUS NEUTRAL PLACEHOLDERS & INITIAL STATE
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    date: upcomingDays[0]?.value || 'August 31, 2026',
    timeSlot: '09:00 AM - 11:00 AM',
  });

  const [existingBookings, setExistingBookings] = useState<any[]>([]);

  // Load existing bookings for conflict checking
  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        let list: any[] = [];
        if (data.success && Array.isArray(data.bookings)) list = data.bookings;
        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          if (Array.isArray(local)) list = [...local, ...list];
        } catch (e) {}
        setExistingBookings(list);
      })
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          setExistingBookings(local);
        } catch (e) {}
      });
  }, [isOpen]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [generatedBookingCode, setGeneratedBookingCode] = useState('');
  const [currentBookingPayload, setCurrentBookingPayload] = useState<any>(null);

  if (!isOpen) return null;

  // Build Detailed Service Description & Itemized Items
  const serviceSummaryParts: string[] = [];
  const itemizedLines: { name: string; unitPrice: number; qty: number; subtotal: number }[] = [];

  if (selectedServices.tv) {
    const tvPrice = tvSizeOption === 'small' ? 100 : tvSizeOption === 'medium' ? 150 : 200;
    const tvLabel = `TV Mounting (${tvSizeOption === 'small' ? 'Up to 42"' : tvSizeOption === 'medium' ? 'Up to 65"' : '65"+'})`;
    serviceSummaryParts.push(tvLabel);
    itemizedLines.push({ name: tvLabel, unitPrice: tvPrice, qty: 1, subtotal: tvPrice });
  }

  if (selectedServices.furniture) {
    const furnPrice = furnitureHours * 120;
    serviceSummaryParts.push(`Furniture Assembly (${furnitureHours} hrs @ $120/hr)`);
    itemizedLines.push({ name: 'Furniture Assembly Labor', unitPrice: 120, qty: furnitureHours, subtotal: furnPrice });
  }

  if (selectedServices.art) {
    const artBase = artHours * 60;
    const mirrorPrice = artOption === 'addon' ? 50 : 90;
    serviceSummaryParts.push(`Art & Shelves (${artHours} hrs) + ${artOption === 'addon' ? 'Heavy Mirror Add-on' : 'Standalone Mirror'}`);
    itemizedLines.push({ name: 'Shelves & Art Hanging', unitPrice: 60, qty: artHours, subtotal: artBase });
    itemizedLines.push({ name: artOption === 'addon' ? 'Heavy Mirror Add-on' : 'Standalone Heavy Mirror Contract', unitPrice: mirrorPrice, qty: 1, subtotal: mirrorPrice });
  }

  if (selectedServices.repairs) {
    if (curtainWindows > 0) {
      serviceSummaryParts.push(`Window Curtains (${curtainWindows} windows)`);
      itemizedLines.push({ name: 'Window Curtains & Blinds', unitPrice: 50, qty: curtainWindows, subtotal: curtainWindows * 50 });
    }
    if (lampHours > 0) {
      serviceSummaryParts.push(`Light Fixtures / Ceiling Fans (${lampHours} hrs)`);
      itemizedLines.push({ name: 'Light Fixture Installation', unitPrice: 150, qty: lampHours, subtotal: lampHours * 150 });
    }
    if (paintHours > 0) {
      serviceSummaryParts.push(`Accent Painting (${paintHours} hrs)`);
      itemizedLines.push({ name: 'Accent Wall Painting', unitPrice: 150, qty: paintHours, subtotal: paintHours * 150 });
    }
    if (repairItems.wallPatch) {
      serviceSummaryParts.push('Drywall Wall Patches');
      itemizedLines.push({ name: 'Drywall Patch Repair', unitPrice: 100, qty: 1, subtotal: 100 });
    }
    if (repairItems.panelInstall) {
      serviceSummaryParts.push('Accent Wall Panels');
      itemizedLines.push({ name: 'Accent Wall Panel Install', unitPrice: 150, qty: 1, subtotal: 150 });
    }
    if (repairItems.electronicsSetup) {
      serviceSummaryParts.push('Electronics Setup');
      itemizedLines.push({ name: 'Electronics Device Setup', unitPrice: 40, qty: 1, subtotal: 40 });
    }
  }

  if (selectedServices.smarthome) {
    if (smartHomeItems.automation3point) {
      serviceSummaryParts.push('3-Point Alexa Smart Automation');
      itemizedLines.push({ name: '3-Point Alexa Automation System', unitPrice: 180, qty: 1, subtotal: 180 });
    }
    if (smartHomeItems.outdoorSurveillance) {
      serviceSummaryParts.push('Outdoor Solar Security Camera System');
      itemizedLines.push({ name: 'Outdoor Solar Camera Installation', unitPrice: 250, qty: 1, subtotal: 250 });
    }
  }

  // Dynamic Real-time Pricing Calculation - STARTS AT $0.00 IF NO SERVICE SELECTED
  let grandTotal = itemizedLines.reduce((sum, item) => sum + item.subtotal, 0);

  if (activeTab === 'visit') {
    grandTotal = 25.0;
  }

  // Available Time Slots for Visit
  const timeSlotOptions = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM'
  ];

  // Conflict Checker for Selected Date & Slot
  const isSlotOccupied = (dateStr: string, slotStr: string) => {
    return existingBookings.some(b => {
      if (!b.date) return false;
      const bDate = String(b.date).toLowerCase();
      const targetDate = String(dateStr).toLowerCase();
      const bTime = (b.time || b.timeSlot || '').toLowerCase();
      const targetTime = String(slotStr).toLowerCase();
      return bDate.includes(targetDate) && (bTime === targetTime || bTime.includes(targetTime.substring(0, 5)));
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'checkout' && grandTotal === 0) {
      alert('⚠️ Please select at least one service before proceeding with checkout.');
      return;
    }

    // Check if slot is occupied
    if (isSlotOccupied(formData.date, formData.timeSlot)) {
      const available = timeSlotOptions.find(s => !isSlotOccupied(formData.date, s));
      if (available) {
        setFormData({ ...formData, timeSlot: available });
        alert(`⚠️ Selected time slot was occupied. We automatically assigned the first available slot: ${available}`);
      } else {
        alert(`⚠️ All slots on ${formData.date} are booked. Please select another date.`);
        return;
      }
    }

    const code = 'VTC-' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedBookingCode(code);

    const detailedServiceText = activeTab === 'checkout'
      ? serviceSummaryParts.join(' + ') || 'Multi-Service Assembly & Mounting'
      : 'On-Site Estimate & Dimension Visit ($25)';

    const bookingPayload = {
      bookingCode: code,
      id: code,
      customer: formData.name,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'vegastaskcraft@gmail.com',
      address: formData.address,
      service: detailedServiceText,
      bookingType: activeTab === 'checkout' ? 'Service Checkout' : 'On-Site Estimate ($25)',
      date: formData.date || upcomingDays[0]?.value || 'August 31, 2026',
      time: formData.timeSlot || '09:00 AM - 11:00 AM',
      timeSlot: formData.timeSlot || '09:00 AM - 11:00 AM',
      assignedTo: 'Carlos Chavez',
      assignedTech: 'Carlos Chavez',
      total: grandTotal,
      totalAmount: grandTotal,
      itemizedLines: activeTab === 'checkout' ? itemizedLines : [{ name: 'On-Site Estimate Visit Fee', unitPrice: 25, qty: 1, subtotal: 25 }]
    };

    setCurrentBookingPayload(bookingPayload);

    // Save to localStorage immediately
    try {
      const existing = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
      existing.unshift(bookingPayload);
      localStorage.setItem('vtc_bookings', JSON.stringify(existing));
      window.dispatchEvent(new Event('vtc_booking_updated'));
    } catch (err) {}

    // Send payload to backend / n8n
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
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
                  Vegas TaskCraft • Precision Craftsman Solutions
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

                  {/* Service 1: TV Mounting (OFF BY DEFAULT) */}
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

                  {/* Service 2: Furniture Assembly (OFF BY DEFAULT) */}
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

                  {/* Service 3: Art & Mirrors (OFF BY DEFAULT) */}
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

                  {/* Service 4: Curtains, Painting & Finishes (OFF BY DEFAULT) */}
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

                  {/* Service 5: Smart Home & Security (OFF BY DEFAULT) */}
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

                {/* 2. Customer Contact Form WITH GENERIC FICTITIOUS PLACEHOLDERS */}
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
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-300 mb-1">Mobile Phone (Format: (000) 000-0000):</label>
                      <input
                        type="tel"
                        required
                        placeholder="(702) 555-0199"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-cyan-400 font-bold focus:border-cyan-400 focus:outline-none"
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

                    {/* DYNAMIC 2-WEEK UPCOMING BUSINESS DAYS DROPDOWN */}
                    <div>
                      <label className="block font-bold text-cyan-400 mb-1">📅 Selected Service Date:</label>
                      <select
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#10172A] border border-cyan-500/60 rounded-xl p-3 text-white font-bold focus:border-cyan-400 focus:outline-none"
                      >
                        {upcomingDays.map(day => (
                          <option key={day.value} value={day.value} className="text-white bg-[#10172A]">
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-300 mb-1">Selected Time Slot:</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white font-bold focus:border-cyan-400 focus:outline-none"
                      >
                        {timeSlotOptions.map(slot => {
                          const occupied = isSlotOccupied(formData.date, slot);
                          return (
                            <option key={slot} value={slot} disabled={occupied} className={occupied ? 'text-gray-500 bg-[#070A12]' : 'text-white bg-[#10172A]'}>
                              {slot} {occupied ? '(FULL / BOOKED)' : '(AVAILABLE)'}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-300 mb-1">Exact Address in Las Vegas Valley / High-Rise Tower:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 7420 Las Vegas Blvd S, Suite 100, Las Vegas, NV"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Final Summary WITHOUT PRIVATE EMAIL TEXT */}
                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/40 shadow-lg space-y-3">
                  <div className="flex justify-between items-center text-sm font-black text-white">
                    <span>Total Net Booking Amount:</span>
                    <span className="text-2xl text-cyan-400 font-black">${grandTotal.toFixed(2)} USD</span>
                  </div>
                  <p className="text-[11px] text-cyan-300 font-semibold italic text-center">
                    ✓ Transparent flat-rate pricing with 0% hidden taxes. Instant email confirmation & official receipt.
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
              /* VISIT TAB ($25 On-Site Estimate Fee) WITH GENERIC FICTITIOUS PLACEHOLDERS */
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
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Mobile Phone (Format: (000) 000-0000):</label>
                    <input
                      type="tel"
                      required
                      placeholder="(702) 555-0199"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-cyan-400 font-bold focus:border-cyan-400 focus:outline-none"
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

                  {/* DYNAMIC 2-WEEK UPCOMING BUSINESS DAYS DROPDOWN FOR VISIT */}
                  <div>
                    <label className="block font-bold text-cyan-400 mb-1">📅 Desired Visit Date (2-Week Rolling Schedule):</label>
                    <select
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#10172A] border border-cyan-500/60 rounded-xl p-3 text-white font-bold focus:border-cyan-400 focus:outline-none"
                    >
                      {upcomingDays.map(day => (
                        <option key={day.value} value={day.value} className="text-white bg-[#10172A]">
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TIME SLOT SELECTION WITH CONFLICT VALIDATION */}
                  <div>
                    <label className="block font-bold text-cyan-400 mb-1">⏰ Desired Visit Time Window:</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#10172A] border border-cyan-500/60 rounded-xl p-3 text-white font-bold focus:border-cyan-400 focus:outline-none"
                    >
                      {timeSlotOptions.map(slot => {
                        const occupied = isSlotOccupied(formData.date, slot);
                        return (
                          <option key={slot} value={slot} disabled={occupied} className={occupied ? 'text-gray-500 bg-[#070A12]' : 'text-white bg-[#10172A]'}>
                            {slot} {occupied ? '(FULL / BOOKED)' : '(AVAILABLE FOR VISIT)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-300 mb-1">Visit Address in Las Vegas / Summerlin / Henderson:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7420 Las Vegas Blvd S, Suite 100, Las Vegas, NV"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#10172A] p-4 rounded-xl border border-cyan-500/40 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-gray-300 block">Flat On-Site Visit Fee:</span>
                    <span className="text-[11px] text-cyan-400 font-semibold italic">Checked against craftsman availability: No time slot collisions</span>
                  </div>
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
        onClose={() => {
          setIsPaymentModalOpen(false);
          onClose();
        }}
        bookingCode={generatedBookingCode}
        customerName={formData.name}
        totalAmount={grandTotal}
        bookingPayload={currentBookingPayload}
      />
    </>
  );
};
