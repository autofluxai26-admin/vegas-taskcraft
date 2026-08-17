import React from 'react';
import { UserCheck, ShieldCheck, Award, Star, Phone, CheckCircle2 } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const team = [
    {
      name: 'Carlos Chavez',
      role: 'Master Craftsman & TV Mounting Specialist',
      experience: '9+ Years Experience in Las Vegas',
      specialty: 'Heavy TV Mounting, High-Rise Condos, Toggle-Bolt Anchors & Cord Concealment',
      status: 'On Duty • Active Unit',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Jonathan Rodriguez',
      role: 'Assembly & Smart Home Specialist',
      experience: '7+ Years Experience in Las Vegas',
      specialty: 'IKEA/Wayfair Assembly, Heavy Art & Mirrors, Alexa Smart Automation & Solar Cameras',
      status: 'On Duty • Active Unit',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <span>Certified Master Craftsmen</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet Your Expert <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Technicians</span>
          </h2>

          <p className="text-gray-400 text-base">
            Dedicated craftsmen assigned directly to your home. No random unverified subcontractors.
          </p>
        </div>

        {/* 2-Card Technician Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((tech, idx) => (
            <div
              key={idx}
              className="bg-[#10172A] rounded-3xl border border-cyan-500/30 p-6 space-y-5 shadow-xl hover:border-cyan-400 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <img
                    src={tech.photo}
                    alt={tech.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070A12] shadow-sm"></span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider inline-block">
                    ✓ {tech.status}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-cyan-300 font-bold">{tech.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-300 bg-[#070A12] p-4 rounded-2xl border border-gray-800">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{tech.experience}</span>
                </p>
                <p className="text-gray-400 text-[11px] leading-relaxed pt-1">
                  <span className="font-bold text-gray-200">Specialization:</span> {tech.specialty}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs font-bold">
                <span className="text-gray-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Background Checked
                </span>

                <a
                  href="tel:7027724116"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> (702) 772-4116
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
