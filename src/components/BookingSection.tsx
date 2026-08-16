import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, User, Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface BookingSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = () => {
  const [selectedSlot, setSelectedSlot] = useState('9:00 AM');
  const [selectedDate, setSelectedDate] = useState('15 de Marzo');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    taskType: 'Montaje de TV',
    date: 'Mañana'
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const teamMembers = [
    {
      name: 'Michael R.',
      role: 'Master Craftsman',
      exp: '8+ Años en Las Vegas',
      photo: '/assets/hero_handyman.png'
    },
    {
      name: 'Sarah L.',
      role: 'Assembly & Decor Specialist',
      exp: 'Summerlin & Henderson',
      photo: '/assets/art_mirror.png'
    },
    {
      name: 'James G.',
      role: 'TV & Home Theater Installer',
      exp: 'High-Rise Specialist',
      photo: '/assets/tv_mounting.png'
    }
  ];

  const timeSlots = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VTC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setSubmitted(true);
  };

  return (
    <section id="nosotros" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section 1: Our Team Header matching Image */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight uppercase">
            Our Team
          </h2>
          <p className="text-slate-600 text-sm font-semibold">
            Friendly team members, skilled long-time Vegas locals.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-16 rounded-xl object-cover border border-gray-300 shrink-0"
              />
              <div>
                <h4 className="font-extrabold text-slate-900 text-base">{member.name}</h4>
                <p className="text-xs text-[#D97706] font-bold">{member.role}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{member.exp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Side-by-Side Available Slots & Interactive Booking Form */}
        <div id="contacto" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Left Box: AVAILABLE SLOTS */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D97706]" />
                  <h3 className="font-extrabold text-sm uppercase tracking-wider">AVAILABLE SLOTS</h3>
                </div>
                <span className="text-xs text-amber-400 font-mono font-bold">Marzo 2026</span>
              </div>

              <p className="text-xs text-slate-300">
                Selecciona la hora que prefieras para la llegada de nuestro técnico a tu domicilio:
              </p>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 px-4 rounded-xl font-extrabold text-xs transition-all ${
                      selectedSlot === slot
                        ? 'bg-[#D97706] text-white shadow-lg scale-102'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Confirmación Inmediata</span>
              </span>
              <span className="font-bold text-amber-400">(702) 555-TASK</span>
            </div>
          </div>

          {/* Right Box: INTERACTIVE BOOKING FORM */}
          <div className="lg:col-span-7 bg-[#0F172A] text-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-700">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">INTERACTIVE BOOKING</h3>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Nombre Completo:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu Nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Dirección en Las Vegas:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dirección / Condominio"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Tipo de Tarea:
                    </label>
                    <select
                      value={formData.taskType}
                      onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97706]"
                    >
                      <option value="Montaje de TV">Montaje de TV & Audio</option>
                      <option value="Ensamblaje Muebles">Ensamblaje Muebles (IKEA)</option>
                      <option value="Arte y Espejos">Arte & Espejos</option>
                      <option value="Reparaciones">Reparaciones Generales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Horario Seleccionado:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${selectedSlot} - Confirmado`}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-amber-400 font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D97706] to-amber-600 hover:from-[#D97706] hover:to-amber-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all"
                >
                  BOOK NOW
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-white">¡Reserva Confirmada!</h4>
                <p className="text-xs text-slate-300">
                  Gracias <span className="font-bold text-white">{formData.name}</span>. Código de reserva: <span className="text-amber-400 font-mono font-bold">{bookingCode}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Nueva Reserva
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
