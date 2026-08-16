import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface InteractiveCalendarSlotsProps {
  onSelectSlot: (date: string, time: string) => void;
}

export const InteractiveCalendarSlots: React.FC<InteractiveCalendarSlotsProps> = ({ onSelectSlot }) => {
  const months = ['Julio 2026', 'Agosto 2026', 'Septiembre 2026', 'Octubre 2026'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(28);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const daysInMonth = 31;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const availableTimesForDay = [
    { time: '9:00 AM', status: 'Disponible' },
    { time: '11:30 AM', status: 'Disponible' },
    { time: '2:00 PM', status: 'Disponible' },
    { time: '4:30 PM', status: 'Disponible' },
    { time: '7:00 PM', status: 'Casi Lleno' },
  ];

  return (
    <div className="bg-[#141C2E] border border-amber-500/30 rounded-3xl p-6 shadow-space-glass space-y-6 text-white">
      
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between pb-3 border-b border-space-cardBorder">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-400" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider">
            Programar Servicio Futuro • Calendario Interactivo
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg bg-[#090D18] border border-gray-700 hover:border-amber-400 text-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="font-black text-amber-400 text-sm font-mono px-3 py-1 bg-[#090D18] rounded-xl border border-amber-500/30">
            {months[currentMonthIndex]}
          </span>

          <button
            type="button"
            onClick={() => setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))}
            className="p-1.5 rounded-lg bg-[#090D18] border border-gray-700 hover:border-amber-400 text-gray-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {daysArray.map((day) => {
            const isSelected = selectedDay === day;
            const isAvailable = day >= 28 || currentMonthIndex > 0;
            return (
              <button
                key={day}
                type="button"
                onClick={() => isAvailable && setSelectedDay(day)}
                className={`h-10 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-gold-cosmic scale-105 font-black'
                    : isAvailable
                    ? 'bg-[#090D18] hover:bg-space-cardBorder text-gray-200 border border-gray-800'
                    : 'bg-[#090D18]/40 text-gray-600 cursor-not-allowed'
                }`}
              >
                <span>{day}</span>
                {isAvailable && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Time Slots Selector for Selected Day */}
      <div className="pt-4 border-t border-space-cardBorder space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            Horarios Disponibles para el <span className="text-amber-400 font-extrabold">{selectedDay} de {months[currentMonthIndex]}</span>:
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">● Confirmación al Instante para Carlos o Jonathan</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {availableTimesForDay.map((slot, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedTime(slot.time);
                onSelectSlot(`${selectedDay} de ${months[currentMonthIndex]}`, slot.time);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                selectedTime === slot.time
                  ? 'bg-amber-500 text-black border-amber-400 shadow-gold-cosmic'
                  : 'bg-[#090D18] border-gray-800 text-gray-300 hover:border-amber-400/50'
              }`}
            >
              <div className="font-extrabold">{slot.time}</div>
              <div className="text-[9px] opacity-80 mt-0.5">{slot.status}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
