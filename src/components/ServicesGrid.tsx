import React from 'react';
import { Tv, Frame, Box, Wrench, ArrowRight, Layers, Eye, Check } from 'lucide-react';
import type { ServiceDetail } from './ServiceDetailModal';
import { IMAGES } from '../assets/imagesData';

interface ServicesGridProps {
  onOpenDetailModal: (service: ServiceDetail) => void;
  onOpenCheckout: (serviceName?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenDetailModal, onOpenCheckout }) => {
  const services: ServiceDetail[] = [
    {
      id: 'tv-mounting',
      title: 'TV MOUNTING & HOME THEATER',
      spanishTitle: 'Montaje de TV & Home Theater',
      image: IMAGES.tv_mounting,
      priceGuide: 'Price Guide: $95',
      basePrice: 95,
      description: 'Montaje profesional de televisores de 32" a 85"+ en todo tipo de paredes con detección de vigas, anclajes pesados y ocultación estética de cableado.',
      procedures: [
        'Detección magnética y digital de vigas de madera/metal',
        'Perforación con sistema de aspiración antipolvo',
        'Colocación de taquetes de mariposa Toggle Bolts para 150 lbs',
        'Alineación y nivelado láser en 3 ejes',
        'Organización y ocultación estética de cables en canaleta'
      ],
      surfaces: [
        { name: 'Pared Seca (Drywall / Sheetrock)', status: '100% Compatible', note: 'Anclajes para vigas o taquetes pesados' },
        { name: 'Concreto & Bloque', status: '100% Compatible', note: 'Perforación con broca de diamante' },
        { name: 'Ladrillo & Mampostería', status: '100% Compatible', note: 'Fijación de expansión estructural' },
        { name: 'Piedra Natural & Azulejo', status: '100% Compatible', note: 'Brocas especiales anti-grietas' }
      ],
      tools: ['Nivel Láser Bosch 3D', 'Brocas de Diamante', 'Toggle Bolts Heavy Duty', 'Detector de Vigas Fluke']
    },
    {
      id: 'art-mirror',
      title: 'ART & MIRROR INSTALLATION',
      spanishTitle: 'Montaje de Arte & Espejos',
      image: IMAGES.art_mirror,
      priceGuide: 'Price Guide: $75',
      basePrice: 75,
      description: 'Colgado de precisión para espejos decorativos pesados, galerías familiares, cuadros valiosos y piezas de arte de gran volumen.',
      procedures: [
        'Medición y marcado de altura visual óptima',
        'Instalación de ganchos J-Hooks y rieles de alta resistencia',
        'Verificación de nivel de precisión con láser',
        'Prueba de carga y estabilidad física'
      ],
      surfaces: [
        { name: 'Drywall & Yeso', status: '100% Compatible', note: 'Soportes de carga distribuida' },
        { name: 'Concreto & Mampostería', status: '100% Compatible', note: 'Chazos mecánicos' },
        { name: 'Paredes de Madera Accent', status: '100% Compatible', note: 'Atornillado directo a viga' }
      ],
      tools: ['Nivel Láser', 'Ganchos J-Hooks 100lbs', 'Cinta Métrica Digital']
    },
    {
      id: 'furniture-assembly',
      title: 'FURNITURE ASSEMBLY & DECOR',
      spanishTitle: 'Ensamblaje de Muebles (Cobro por Hora)',
      image: IMAGES.furniture_assembly,
      priceGuide: 'Price Guide: $75 / Hora',
      basePrice: 75,
      description: 'Cobro justo por hora ($75/hr - Mínimo 2 horas) para ensamblaje rápido de camas, escritorios, sofás y armarios IKEA, Wayfair o Amazon.',
      procedures: [
        'Desempaque e inventario de herrajes y piezas',
        'Armado con atornillador de torque regulado para no dañar la madera',
        'Nivelación de patas y ajuste fino de bisagras y rieles',
        'Fijación obligatoria de seguridad anti-vuelco a la pared',
        'Limpieza total del área y retiro de cajas de cartón'
      ],
      surfaces: [
        { name: 'Todo Tipo de Habitación', status: '100% Compatible', note: 'Ajuste en suelos planos o alfombras' }
      ],
      tools: ['Atornillador Torque Dewalt', 'Llaves Hex hexagonales', 'Anclajes Anti-Vuelco']
    },
    {
      id: 'repairs-smarthome',
      title: 'SMALL REPAIRS & SMART HOME',
      spanishTitle: 'Reparaciones & Smart Home',
      image: IMAGES.repairs_smarthome,
      priceGuide: 'Price Guide: $90',
      basePrice: 90,
      description: 'Instalación de cerraduras electrónicas Ring/Nest, persianas, cortinas, lámparas y reparaciones artesanales menores del hogar.',
      procedures: [
        'Desmontaje de accesorios anteriores con cuidado',
        'Cableado y conexión eléctrica segura de dispositivos smart',
        'Configuración inicial y vinculación a red Wi-Fi de la vivienda',
        'Prueba de funcionamiento en smartphone'
      ],
      surfaces: [
        { name: 'Puertas de Madera y Metal', status: '100% Compatible', note: 'Instalación de cerraduras smart' },
        { name: 'Techos & Paredes', status: '100% Compatible', note: 'Lámparas y persianas' }
      ],
      tools: ['Multímetro Digital', 'Herramientas de Carpintería', 'Pistola de Calafateo']
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>Haz clic para ver procedimientos y superficies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Servicios Residenciales en <span className="text-gradient-gold">Las Vegas</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Haz clic en cualquier tarjeta para ver la ventana interactiva con los procedimientos paso a paso y herramientas aplicadas.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenDetailModal(service)}
              className="space-card rounded-3xl border border-gray-800 hover:border-amber-500/60 cursor-pointer overflow-hidden transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Frame with Base64 URI */}
              <div className="relative h-48 overflow-hidden bg-[#141C2E]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141C2E] via-transparent to-transparent opacity-80"></div>
                
                <span className="absolute top-3 right-3 bg-[#070A12]/90 border border-amber-500/40 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Eye className="w-3 h-3" /> Ver Detalle Técnico
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-lg group-hover:text-amber-400 transition-colors">
                    {service.spanishTitle}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-gray-800 space-y-2">
                  <div className="bg-[#070A12] py-2 px-3 rounded-xl border border-gray-800 text-center">
                    <span className="text-xs font-black text-amber-400">
                      {service.priceGuide}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(service);
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Procedimientos & Superficies</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
