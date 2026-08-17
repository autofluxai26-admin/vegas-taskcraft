import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, Phone, User, CheckCircle2, FileText, DollarSign, Wrench, ChevronLeft, ChevronRight, Printer, Download, Sparkles, Mail, Lock, ShieldCheck, Edit3, BarChart3, Layers, Trash2, Plus, Eye } from 'lucide-react';
import { Logo } from './Logo';

interface TechPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechPortal: React.FC<TechPortalProps> = ({ isOpen, onClose }) => {
  // Login Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [activeTech, setActiveTech] = useState<'both' | 'carlos' | 'jonathan'>('both');
  const [selectedJobForInvoice, setSelectedJobForInvoice] = useState<any | null>(null);

  // Day Details Modal State
  const [selectedDayModal, setSelectedDayModal] = useState<number | null>(null);

  // Month navigation state
  const availableMonths = ['July 2026', 'August 2026', 'September 2026', 'October 2026'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(1);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(31);

  const [jobs, setJobs] = useState<any[]>([
    {
      id: 'VTC-768394',
      customer: 'Jonathan Rodriguez',
      phone: '(702) 772-4116',
      email: 'vegastaskcraft@gmail.com',
      address: '3722 S Las Vegas Blvd, High-Rise Condo #1804',
      service: '75" TV Mounting + IKEA King Bedroom Assembly + Soundbar',
      surface: 'Concrete / Masonry Wall in High-Rise Condo Tower',
      date: 'August 31, 2026',
      time: '11:30 AM - 01:30 PM',
      assignedTo: 'Jonathan Rodriguez',
      status: 'Confirmed',
      bookingType: 'Service Checkout',
      itemizedLines: [
        { name: '75" TV Mounting & Audio Bar', unitPrice: 200.00, qty: 1, subtotal: 200.00 },
        { name: 'IKEA Bedroom Assembly Labor', unitPrice: 120.00, qty: 4, subtotal: 480.00 },
        { name: 'Accent Wall & Heavy Mirror Add-on', unitPrice: 700.00, qty: 1, subtotal: 700.00 }
      ],
      total: 1380.00
    },
    {
      id: 'VTC-90412',
      customer: 'Elena Rostova',
      phone: '(702) 772-4116',
      email: 'elena.r@example.com',
      address: '10432 Summerlin Centre Dr, Las Vegas, NV 89135',
      service: '75" TV Mounting + Soundbar + In-Wall Cord Concealment',
      surface: 'Drywall over wood studs with Toggle Bolt anchors',
      date: 'August 28, 2026',
      time: '10:00 AM - 12:00 PM',
      assignedTo: 'Carlos Chavez',
      status: 'In Progress',
      bookingType: 'Service Checkout',
      itemizedLines: [
        { name: '75" Heavy TV Mounting', unitPrice: 150.00, qty: 1, subtotal: 150.00 },
        { name: 'In-Wall Cable Concealment Kit', unitPrice: 15.00, qty: 1, subtotal: 15.00 }
      ],
      total: 165.00
    },
    {
      id: 'VTC-90415',
      customer: 'Marcus Vance',
      phone: '(702) 772-4116',
      email: 'marcus.vance@example.com',
      address: 'Veer Towers - 3722 S Las Vegas Blvd #1804',
      service: '90 lbs Heavy Mirror Installation + 4-Piece Gallery Wall',
      surface: 'Concrete / Masonry Wall in High-Rise Condo Tower',
      date: 'August 28, 2026',
      time: '02:00 PM - 04:00 PM',
      assignedTo: 'Jonathan Rodriguez',
      status: 'Pending',
      bookingType: 'Service Checkout',
      itemizedLines: [
        { name: 'Standalone Heavy Mirror Contract', unitPrice: 90.00, qty: 1, subtotal: 90.00 },
        { name: 'Gallery Art Hanging', unitPrice: 60.00, qty: 2, subtotal: 120.00 }
      ],
      total: 210.00
    },
    {
      id: 'VTC-90420',
      customer: 'Robert Vance',
      phone: '(702) 772-4116',
      email: 'robert.vance@example.com',
      address: '2214 Green Valley Pkwy, Henderson, NV 89014',
      service: 'IKEA King Bedroom Set Assembly + Desk ($120/hr)',
      surface: 'Hardwood floor / safety anti-tip wall anchoring',
      date: 'August 29, 2026',
      time: '09:00 AM - 11:00 AM',
      assignedTo: 'Carlos Chavez',
      status: 'Confirmed',
      bookingType: 'Service Checkout',
      itemizedLines: [
        { name: 'IKEA Furniture Assembly Labor', unitPrice: 120.00, qty: 2, subtotal: 240.00 }
      ],
      total: 240.00
    },
    {
      id: 'VTC-90425',
      customer: 'Sarah Jenkins',
      phone: '(702) 772-4116',
      email: 'sarah.j@example.com',
      address: '9021 Red Rock Canyon Rd, Summerlin, NV 89138',
      service: 'On-Site Estimate & Measurement Visit ($25)',
      surface: 'Living room high ceiling wall inspection',
      date: 'August 30, 2026',
      time: '04:00 PM - 05:00 PM',
      assignedTo: 'Jonathan Rodriguez',
      status: 'Scheduled Visit',
      bookingType: 'On-Site Estimate ($25)',
      itemizedLines: [
        { name: 'On-Site Visit & Dimension Estimate', unitPrice: 25.00, qty: 1, subtotal: 25.00 }
      ],
      total: 25.00
    }
  ]);

  const loadJobsList = () => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        let list = [...jobs];
        if (data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          list = data.bookings;
        }

        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          if (Array.isArray(local) && local.length > 0) {
            // deduplicate by id
            const map = new Map();
            [...local, ...list].forEach(item => {
              if (item && item.id && !map.has(item.id)) map.set(item.id, item);
            });
            list = Array.from(map.values());
          }
        } catch (e) {}

        setJobs(list);
      })
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          if (Array.isArray(local) && local.length > 0) {
            const map = new Map();
            [...local, ...jobs].forEach(item => {
              if (item && item.id && !map.has(item.id)) map.set(item.id, item);
            });
            setJobs(Array.from(map.values()));
          }
        } catch (e) {}
      });
  };

  // Fetch live bookings from server API & localStorage
  useEffect(() => {
    loadJobsList();
    window.addEventListener('vtc_booking_updated', loadJobsList);
    return () => window.removeEventListener('vtc_booking_updated', loadJobsList);
  }, [isOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCreds.password === 'taskcraft2026' || loginCreds.password === 'admin' || loginCreds.password === '1234') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Default password is: taskcraft2026');
    }
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm(`Are you sure you want to delete job ${jobId}?`)) {
      const updated = jobs.filter(j => j.id !== jobId);
      setJobs(updated);
      try {
        localStorage.setItem('vtc_bookings', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Heatmap status for calendar days
  const getDayStatus = (day: number) => {
    const dayJobs = jobs.filter(j => j.date && (String(j.date).includes(` ${day},`) || String(j.date).includes(` ${day} `) || String(j.date).endsWith(` ${day}`)));
    if (dayJobs.length >= 3 || day === 12 || day === 18) return { level: 'red', count: dayJobs.length || 4 };
    if (dayJobs.length > 0 || day === 28 || day === 29 || day === 31) return { level: 'cyan', count: dayJobs.length || 2 };
    return { level: 'green', count: 0 };
  };

  if (!isOpen) return null;

  // Login Modal Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-white space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <Logo size="sm" />
            <button onClick={onClose} className="p-1.5 rounded-xl bg-[#10172A] text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white">Technician Portal Login</h3>
            <p className="text-xs text-gray-400 font-medium">Authorized Access for Carlos Chavez & Jonathan Rodriguez</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 font-bold text-center">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-300 mb-1">Technician Username:</label>
              <input
                type="text"
                required
                placeholder="carlos / jonathan / admin"
                value={loginCreds.username}
                onChange={(e) => setLoginCreds({ ...loginCreds, username: e.target.value })}
                className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1">Password:</label>
              <input
                type="password"
                required
                placeholder="Enter password (taskcraft2026)"
                value={loginCreds.password}
                onChange={(e) => setLoginCreds({ ...loginCreds, password: e.target.value })}
                className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              LOG IN TO PORTAL
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredJobs = activeTech === 'both' ? jobs : jobs.filter(j => j.assignedTo && j.assignedTo.toLowerCase().includes(activeTech));
  const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filter jobs for selected modal day
  const modalDayJobs = selectedDayModal
    ? jobs.filter(j => j.date && (String(j.date).includes(` ${selectedDayModal},`) || String(j.date).includes(` ${selectedDayModal} `) || String(j.date).endsWith(` ${selectedDayModal}`)))
    : [];

  // Weekly Stats Calculations
  const weeklyServicesCount = jobs.filter(j => j.bookingType === 'Service Checkout').length;
  const weeklyEstimatesCount = jobs.filter(j => j.bookingType !== 'Service Checkout').length;
  const weeklyTotalRevenue = jobs.reduce((sum, j) => sum + (j.total || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden text-white my-4 max-h-[94vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#10172A] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>Technician Operations & Invoicing Portal</span>
              </h3>
              <p className="text-xs text-cyan-400 font-bold tracking-wide">
                Vegas TaskCraft LLC • contact@vegastaskcraft.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex bg-[#070A12] p-1 rounded-xl border border-cyan-500/30 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('daily')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'daily' ? 'bg-cyan-500 text-black font-black shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'text-gray-400 hover:text-white'
                }`}
              >
                📅 Daily View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('weekly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'weekly' ? 'bg-cyan-500 text-black font-black shadow-[0_0_10px_rgba(0,240,255,0.6)]' : 'text-gray-400 hover:text-white'
                }`}
              >
                📊 Weekly Summary
              </button>
            </div>

            {/* Tech Filter */}
            <div className="hidden sm:flex bg-[#070A12] p-1 rounded-xl border border-cyan-500/30 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTech('both')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTech === 'both' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'text-gray-400'}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('carlos')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTech === 'carlos' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'text-gray-400'}`}
              >
                Carlos
              </button>
              <button
                type="button"
                onClick={() => setActiveTech('jonathan')}
                className={`px-2.5 py-1 rounded-lg transition-all ${activeTech === 'jonathan' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'text-gray-400'}`}
              >
                Jonathan
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

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          
          {activeTab === 'weekly' ? (
            /* WEEKLY SUMMARY DASHBOARD */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-1 shadow-lg">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span>Weekly Active Jobs:</span>
                    <Wrench className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-3xl font-black text-white">{jobs.length} Scheduled</span>
                  <p className="text-[11px] text-cyan-400 font-semibold">{weeklyServicesCount} Installations • {weeklyEstimatesCount} On-Site Estimates</p>
                </div>

                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-1 shadow-lg">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span>Weekly Projected Total:</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-3xl font-black text-cyan-400">${weeklyTotalRevenue.toFixed(2)} USD</span>
                  <p className="text-[11px] text-gray-400 font-semibold">Flat rates with 0% hidden taxes</p>
                </div>

                <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-1 shadow-lg">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span>Technician Units Status:</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-3xl font-black text-emerald-400">100% Active</span>
                  <p className="text-[11px] text-gray-300 font-semibold">Carlos Chavez & Jonathan Rodriguez</p>
                </div>
              </div>

              <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Weekly Activity Breakdown (Estimates vs Service Jobs)</span>
                  </h4>
                  <span className="text-xs text-gray-400 font-bold">Week of August 24 - 31, 2026</span>
                </div>

                <div className="space-y-3">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-[#070A12] p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full font-extrabold text-[10px] ${job.bookingType === 'Service Checkout' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'}`}>
                            {job.bookingType || 'Service Job'}
                          </span>
                          <span className="font-black text-white">{job.id}</span>
                          <span className="text-cyan-400 font-bold">📅 {job.date || 'August 31, 2026'} ({job.time})</span>
                        </div>
                        <p className="font-extrabold text-cyan-300 text-sm">{job.service}</p>
                        <p className="text-gray-300 font-semibold">Client: {job.customer} • Address: {job.address}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block font-bold">Assigned Tech:</span>
                          <span className="font-bold text-white">{job.assignedTo}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedJobForInvoice(job)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Itemized Invoice
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* DAILY CALENDAR HEATMAP & PROJECTS */
            <div className="space-y-6">
              
              {/* Heatmap Section - Click any day to open Day Details Modal */}
              <div className="bg-[#10172A]/90 p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-lg">
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

                  <span className="text-xs font-extrabold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-400/40">
                    ⚡ Click any day to inspect full day activity window
                  </span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((dayName) => (
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
                        onClick={() => {
                          setSelectedCalendarDay(day);
                          setSelectedDayModal(day);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all hover:scale-105 flex flex-col justify-between h-16 cursor-pointer ${borderClass}`}
                      >
                        <span className="text-xs font-extrabold">{day}</span>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold">{status.count} Jobs</span>
                          <span className={`w-2 h-2 rounded-full ${badgeDot}`}></span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Jobs Cards with Full Date & Time Badges */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <h4 className="text-sm font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Assigned Projects for Day {selectedCalendarDay} of {availableMonths[currentMonthIndex]}</span>
                  </h4>
                  <span className="text-xs font-bold text-gray-400">
                    Technicians: {activeTech === 'both' ? 'Carlos Chavez & Jonathan Rodriguez' : activeTech.toUpperCase()}
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
                          
                          {/* FULL DATE & TIME BADGE */}
                          <span className="text-xs text-cyan-300 font-bold flex items-center gap-1 bg-[#070A12] px-3 py-1 rounded-full border border-cyan-500/30">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>📅 {job.date || `August ${selectedCalendarDay}, 2026`} ({job.time})</span>
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-extrabold">
                            Assigned to: {job.assignedTo}
                          </span>
                        </div>

                        {/* DETAILED SERVICE BREAKDOWN */}
                        <p className="text-xs font-extrabold text-cyan-300 leading-relaxed bg-[#070A12] p-2.5 rounded-xl border border-gray-800">
                          {job.service}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-cyan-400" /> {job.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {job.address}
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-400 italic">
                          Surface / Anchoring: {job.surface || 'Standard Drywall & Anchors'}
                        </p>
                      </div>

                      {/* Actions & Price */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-800">
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block uppercase font-bold">Total Net:</span>
                          <span className="text-xl font-black text-cyan-400">${(job.total || 0).toFixed(2)} USD</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedJobForInvoice(job)}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Official Invoice</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* DAY DETAILS MODAL (VENTANA DE TRABAJOS DEL DÍA) */}
        {selectedDayModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-[#070A12] border-2 border-cyan-400 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.5)] text-white space-y-5 max-h-[92vh] flex flex-col">
              
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-lg font-black text-white">
                    Day Activity Window • Day {selectedDayModal} of {availableMonths[currentMonthIndex]}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDayModal(null)}
                  className="p-1.5 rounded-xl bg-[#10172A] text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-4 custom-scrollbar flex-1">
                {modalDayJobs.length > 0 ? (
                  modalDayJobs.map((job) => (
                    <div key={job.id} className="bg-[#10172A] p-4 rounded-2xl border border-cyan-500/30 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-cyan-400 text-sm">{job.id} • {job.customer}</span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                          Assigned: {job.assignedTo}
                        </span>
                      </div>
                      <p className="font-extrabold text-white">{job.service}</p>
                      <p className="text-gray-300">📅 Date: {job.date} ({job.time})</p>
                      <p className="text-gray-300">📍 Address: {job.address} • Phone: {job.phone}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                        <span className="text-cyan-400 font-black text-sm">Total: ${job.total.toFixed(2)} USD</span>
                        <button
                          onClick={() => {
                            setSelectedDayModal(null);
                            setSelectedJobForInvoice(job);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs"
                        >
                          Generate Invoice
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-[#10172A] rounded-2xl border border-gray-800 text-gray-400 text-xs">
                    No scheduled jobs for Day {selectedDayModal}. This date is open for new bookings.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ITEMIZED INVOICE MODAL OVERLAY */}
        {selectedJobForInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-[#070A12] border-2 border-cyan-400 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.5)] text-white space-y-6 max-h-[94vh] flex flex-col">
              
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <Logo size="md" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-cyan-400 block">OFFICIAL ITEMIZED INVOICE</span>
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

              {/* Invoice Body */}
              <div className="bg-[#10172A] p-5 rounded-2xl border border-cyan-500/30 space-y-4 text-xs overflow-y-auto custom-scrollbar flex-1">
                
                <div className="grid grid-cols-2 gap-4 bg-[#070A12] p-3 rounded-xl border border-gray-800">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400">Invoice Code / ID:</label>
                    <input
                      type="text"
                      value={selectedJobForInvoice.id}
                      onChange={(e) => setSelectedJobForInvoice({ ...selectedJobForInvoice, id: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-lg p-2 text-cyan-400 font-black text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400">Full Service Date & Time:</label>
                    <input
                      type="text"
                      value={`${selectedJobForInvoice.date || 'August 31, 2026'} (${selectedJobForInvoice.time})`}
                      onChange={(e) => setSelectedJobForInvoice({ ...selectedJobForInvoice, time: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-lg p-2 text-white font-bold text-xs"
                    />
                  </div>
                </div>

                {/* Provider & Client */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-800 pb-4">
                  <div className="space-y-2">
                    <span className="font-extrabold text-cyan-400 block text-xs uppercase tracking-wider">SERVICE PROVIDER:</span>
                    <div className="space-y-1 font-bold text-gray-200">
                      <p className="text-white font-black text-sm">Vegas TaskCraft LLC</p>
                      <p className="text-gray-300">Las Vegas Valley, NV</p>
                      <p className="text-cyan-300 text-xs">contact@vegastaskcraft.com</p>
                      <p className="text-gray-300">(702) 772-4116</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-extrabold text-cyan-400 block text-xs uppercase tracking-wider">RECIPIENT CLIENT:</span>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={selectedJobForInvoice.customer}
                        onChange={(e) => setSelectedJobForInvoice({ ...selectedJobForInvoice, customer: e.target.value })}
                        className="w-full bg-[#070A12] border border-gray-700 rounded-lg p-2 text-white font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Client Address"
                        value={selectedJobForInvoice.address}
                        onChange={(e) => setSelectedJobForInvoice({ ...selectedJobForInvoice, address: e.target.value })}
                        className="w-full bg-[#070A12] border border-gray-700 rounded-lg p-2 text-gray-300"
                      />
                      <input
                        type="text"
                        placeholder="Client Phone"
                        value={selectedJobForInvoice.phone}
                        onChange={(e) => setSelectedJobForInvoice({ ...selectedJobForInvoice, phone: e.target.value })}
                        className="w-full bg-[#070A12] border border-gray-700 rounded-lg p-2 text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* ITEMIZED BREAKDOWN TABLE (CON VALORES UNITARIOS Y SUBTOTALES) */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-cyan-400 text-xs uppercase tracking-wider">
                      ITEMIZED SERVICES & UNIT COSTS TABLE:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const currentLines = selectedJobForInvoice.itemizedLines || [];
                        const updatedLines = [...currentLines, { name: 'New Craftsman Service Line', unitPrice: 50, qty: 1, subtotal: 50 }];
                        const newTotal = updatedLines.reduce((acc: number, line: any) => acc + (line.subtotal || 0), 0);
                        setSelectedJobForInvoice({ ...selectedJobForInvoice, itemizedLines: updatedLines, total: newTotal });
                      }}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs flex items-center gap-1 hover:bg-cyan-500 hover:text-black transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Line Item
                    </button>
                  </div>

                  <div className="bg-[#070A12] rounded-xl border border-gray-800 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#10172A] border-b border-gray-800 text-cyan-400 font-black">
                        <tr>
                          <th className="p-3">Item / Service Description</th>
                          <th className="p-3 w-28 text-right">Unit Price ($)</th>
                          <th className="p-3 w-20 text-center">Qty/Hrs</th>
                          <th className="p-3 w-28 text-right">Subtotal ($)</th>
                          <th className="p-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {(selectedJobForInvoice.itemizedLines || [
                          { name: selectedJobForInvoice.service || 'Craftsman Assembly & Installation', unitPrice: selectedJobForInvoice.laborCost || 150, qty: 1, subtotal: selectedJobForInvoice.laborCost || 150 }
                        ]).map((line: any, idx: number) => (
                          <tr key={idx}>
                            <td className="p-2">
                              <input
                                type="text"
                                value={line.name}
                                onChange={(e) => {
                                  const updatedLines = [...(selectedJobForInvoice.itemizedLines || [])];
                                  updatedLines[idx].name = e.target.value;
                                  setSelectedJobForInvoice({ ...selectedJobForInvoice, itemizedLines: updatedLines });
                                }}
                                className="w-full bg-[#10172A] border border-gray-700 rounded p-1.5 text-white font-semibold"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                value={line.unitPrice}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  const updatedLines = [...(selectedJobForInvoice.itemizedLines || [])];
                                  updatedLines[idx].unitPrice = val;
                                  updatedLines[idx].subtotal = val * (updatedLines[idx].qty || 1);
                                  const newTotal = updatedLines.reduce((acc: number, l: any) => acc + (l.subtotal || 0), 0);
                                  setSelectedJobForInvoice({ ...selectedJobForInvoice, itemizedLines: updatedLines, total: newTotal });
                                }}
                                className="w-full bg-[#10172A] border border-gray-700 rounded p-1.5 text-white font-bold text-right"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="number"
                                value={line.qty}
                                onChange={(e) => {
                                  const qty = parseInt(e.target.value) || 1;
                                  const updatedLines = [...(selectedJobForInvoice.itemizedLines || [])];
                                  updatedLines[idx].qty = qty;
                                  updatedLines[idx].subtotal = (updatedLines[idx].unitPrice || 0) * qty;
                                  const newTotal = updatedLines.reduce((acc: number, l: any) => acc + (l.subtotal || 0), 0);
                                  setSelectedJobForInvoice({ ...selectedJobForInvoice, itemizedLines: updatedLines, total: newTotal });
                                }}
                                className="w-full bg-[#10172A] border border-gray-700 rounded p-1.5 text-white font-bold text-center"
                              />
                            </td>
                            <td className="p-2 text-right font-black text-cyan-400">
                              ${(line.subtotal || line.unitPrice * line.qty).toFixed(2)}
                            </td>
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedLines = (selectedJobForInvoice.itemizedLines || []).filter((_: any, i: number) => i !== idx);
                                  const newTotal = updatedLines.reduce((acc: number, l: any) => acc + (l.subtotal || 0), 0);
                                  setSelectedJobForInvoice({ ...selectedJobForInvoice, itemizedLines: updatedLines, total: newTotal });
                                }}
                                className="text-rose-400 hover:text-rose-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between items-center text-base font-black text-cyan-400 pt-3 border-t border-gray-700">
                  <span>Grand Total Net Amount:</span>
                  <span className="text-2xl font-black text-cyan-400">
                    ${(selectedJobForInvoice.total || 0).toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 shrink-0">
                <span className="text-[11px] text-gray-400 italic">
                  Digital itemized invoice format ready to print or export to PDF.
                </span>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alert(`Printing Official Itemized Invoice ${selectedJobForInvoice.id}...`)}
                    className="px-4 py-2.5 rounded-xl bg-[#10172A] border border-gray-700 text-white font-bold text-xs hover:border-cyan-400 flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" /> Print Invoice
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading PDF Itemized Invoice ${selectedJobForInvoice.id}...`)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Download PDF
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
