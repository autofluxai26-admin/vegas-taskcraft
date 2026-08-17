import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2, User, Sparkles } from 'lucide-react';

interface InteractiveCalendarSlotsProps {
  onSelectSlot: (date: string, time: string, tech: string) => void;
}

export const InteractiveCalendarSlots: React.FC<InteractiveCalendarSlotsProps> = ({ onSelectSlot }) => {
  const months = ['July 2026', 'August 2026', 'September 2026', 'October 2026'];
  const [currentMonthIdx, setCurrentMonthIdx] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number>(31);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [liveBookings, setLiveBookings] = useState<any[]>([]);

  const fetchBookings = () => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        let list: any[] = [];
        if (data.success && Array.isArray(data.bookings)) {
          list = data.bookings;
        }
        // Merge local storage bookings
        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          if (Array.isArray(local)) {
            list = [...local, ...list];
          }
        } catch (e) {}

        setLiveBookings(list);
      })
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
          setLiveBookings(local);
        } catch (e) {}
      });
  };

  // Fetch real-time active bookings from API & localStorage
  useEffect(() => {
    fetchBookings();
    window.addEventListener('vtc_booking_updated', fetchBookings);
    return () => window.removeEventListener('vtc_booking_updated', fetchBookings);
  }, []);

  // Dynamic slot calculation per day
  const getSlotsForDay = (day: number) => {
    const baseSlots = [
      { time: '09:00 AM - 11:00 AM', status: 'Available', tech: 'Carlos Chavez' },
      { time: '11:30 AM - 01:30 PM', status: 'Available', tech: 'Jonathan Rodriguez' },
      { time: '02:00 PM - 04:00 PM', status: 'Available', tech: 'Carlos Chavez & Jonathan Rodriguez' },
      { time: '04:30 PM - 06:30 PM', status: 'Available', tech: 'Jonathan Rodriguez' },
    ];

    // Check if any live booking exists for this day
    const dayBookings = liveBookings.filter(b => {
      if (!b.date) return false;
      const dateStr = String(b.date);
      return dateStr.includes(` ${day},`) || dateStr.includes(` ${day} `) || dateStr.endsWith(` ${day}`);
    });

    return baseSlots.map(slot => {
      const isBooked = dayBookings.some(b => {
        const slotTimeStr = slot.time.toLowerCase();
        const bTime = (b.time || b.timeSlot || '').toLowerCase();
        return bTime === slotTimeStr || bTime.includes(slotTimeStr.substring(0, 5));
      }) || (day === 28 && slot.time.includes('02:00 PM'));

      return {
        ...slot,
        status: isBooked ? 'Booked' : 'Available'
      };
    });
  };

  const timeSlots = getSlotsForDay(selectedDay);
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-[#10172A] p-6 rounded-3xl border border-cyan-500/30 space-y-6 shadow-xl">
      
      {/* Month Navigation */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentMonthIdx((prev) => (prev > 0 ? prev - 1 : months.length - 1))}
            className="p-2 rounded-xl bg-[#070A12] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-cyan-400" />
            <span>{months[currentMonthIdx]}</span>
          </h3>

          <button
            type="button"
            onClick={() => setCurrentMonthIdx((prev) => (prev < months.length - 1 ? prev + 1 : 0))}
            className="p-2 rounded-xl bg-[#070A12] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs font-bold text-cyan-400">
          Select any date to view real-time open slots
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
          <span key={d} className="font-black text-cyan-400 tracking-wider py-1 uppercase">{d}</span>
        ))}

        {daysInMonth.map((day) => {
          const isSelected = selectedDay === day;
          const hasBookings = getSlotsForDay(day).some(s => s.status === 'Booked');

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`p-2.5 rounded-xl border font-bold transition-all text-xs flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)] font-black scale-105'
                  : hasBookings
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                  : 'bg-[#070A12] border-gray-800 text-gray-300 hover:border-cyan-500/50'
              }`}
            >
              <span>{day}</span>
            </button>
          );
        })}
      </div>

      {/* Time Slots for Selected Day */}
      <div className="pt-4 border-t border-gray-800 space-y-4">
        <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Available Slots for Day {selectedDay} of {months[currentMonthIdx]}:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {timeSlots.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (slot.status === 'Available') {
                  setSelectedTimeSlot(slot.time);
                  onSelectSlot(`${months[currentMonthIdx]} ${selectedDay}`, slot.time, slot.tech);
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                slot.status === 'Booked'
                  ? 'bg-rose-950/30 border-rose-500/40 opacity-70 cursor-not-allowed'
                  : selectedTimeSlot === slot.time
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)] cursor-pointer'
                  : 'bg-[#070A12] border-gray-800 text-gray-200 hover:border-cyan-500/50 cursor-pointer'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-black text-white block">{slot.time}</span>
                <span className="text-[10px] text-gray-400 font-semibold">Technician: {slot.tech}</span>
              </div>

              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                slot.status === 'Available'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  : 'bg-rose-950 text-rose-400 border-rose-500/50'
              }`}>
                {slot.status === 'Available' ? '✓ Book Slot' : 'Full / Booked'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
