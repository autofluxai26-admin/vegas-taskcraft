import React from 'react';
import { Tv, Frame, Box, Wrench, ArrowRight, Layers, Eye, Check, Cpu } from 'lucide-react';
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
      priceGuide: 'Desde $100 USD (Según Tamaño)',
      basePrice: 100,
      description: 'Montaje profesional de televisores por tamaño ($100 hasta 42", $150 hasta 65", $200 de 65"+) con detección de vigas, anclajes pesados y ocultación de cables.',
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
        { name: 'Ladrillo & Mampostería', status: '100% Compatible', note: 'Fijación de expansión estructural' }
      ],
      tools: ['Nivel Láser Bosch 3D', 'Brocas de Diamante', 'Toggle Bolts Heavy Duty', 'Detector de Vigas Fluke']
    },
    {
      id: 'art-mirror',
      title: 'ART & MIRROR INSTALLATION',
      spanishTitle: 'Repisas, Espejos & Cuadros',
      image: IMAGES.art_mirror,
      priceGuide: '$60/hr Repisas • $50/$90 Espejos',
      basePrice: 60,
      description: 'Repisas y artes pequeños a $60 la hora. Espejos y artes grandes por $50 adicional (en obra) o $90 por contrato independiente.',
      procedures: [
        'Medición y marcado de altura visual óptima con láser',
        'Instalación de ganchos J-Hooks y rieles de alta resistencia',
        'Verificación de nivel de precisión con láser 3D',
        'Prueba de carga y estabilidad física'
      ],
      surfaces: [
        { name: 'Drywall & Yeso', status: '100% Compatible', note: 'Soportes de carga distribuida' },
        { name: 'Concreto & Mampostería', status: '100% Compatible', note: 'Chazos mecánicos' }
      ],
      tools: ['Nivel Láser', 'Ganchos J-Hooks 100lbs', 'Cinta Métrica Digital']
    },
    {
      id: 'furniture-assembly',
      title: 'FURNITURE ASSEMBLY & DECOR',
      spanishTitle: 'Ensamblaje de Muebles',
      image: IMAGES.furniture_assembly,
      priceGuide: '$120 / Hora (Cobro Justo)',
      basePrice: 120,
      description: 'Armado rápido y profesional de muebles IKEA, Wayfair, West Elm o Amazon por $120 la hora con kit de herramientas de torque preciso.',
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
      title: 'SMALL REPAIRS & FINISHES',
      spanishTitle: 'Cortinas, Pintura & Acabados',
      image: IMAGES.repairs_smarthome,
      priceGuide: 'Cortinas $50 • Lámparas/Pintura $150/hr',
      basePrice: 50,
      description: 'Cortinas a $50 por ventana, parches en pared desde $100, paneles desde $150, lámparas/ventiladores/pintura a $150/hr y setup de dispositivos por $40.',
      procedures: [
        'Instalación de cortinas y persianas por ventana ($50/cuba)',
        'Montaje de lámparas y ventiladores de techo ($150/hr)',
        'Trabajos de pintura limpia y acabados ($150/hr)',
        'Parches en pared drywall (desde $100) y paneles (desde $150)'
      ],
      surfaces: [
        { name: 'Puertas de Madera y Metal', status: '100% Compatible', note: 'Instalación de accesorios' },
        { name: 'Techos & Paredes', status: '100% Compatible', note: 'Lámparas y persianas' }
      ],
      tools: ['Multímetro Digital', 'Herramientas de Carpintería', 'Pistola de Calafateo']
    },
    {
      id: 'smart-security',
      title: 'SMART HOME & OUTDOOR SECURITY',
      spanishTitle: 'Smart Home & Seguridad (NUEVO)',
      image: IMAGES.vegas_map_carpet,
      priceGuide: 'Automatización & Cámaras Solar WiFi',
      basePrice: 180,
      description: 'Automatización de 3 puntos (TV, comedor, cocina con Alexa) y sistemas de vigilancia outdoor con cámaras WiFi y paneles solares.',
      procedures: [
        'Configuración de 3 puntos clave (TV, comedor, cocina) con comandos Alexa',
        'Instalación de cámaras de seguridad exteriores con paneles de energía solar',
        'Vincular aplicación móvil en smartphone para visualización 24/7'
      ],
      surfaces: [
        { name: 'Exteriores Residenciales', status: '100% Compatible', note: 'Anclaje solar y red WiFi' }
      ],
      tools: ['Kit de Diagnóstico WiFi', 'Probador de Carga Solar', 'Herramientas de Montaje']
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-[#070A12] border-b border-space-cardBorder relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Haz clic para ver procedimientos y superficies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Servicios Residenciales en <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Las Vegas</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Haz clic en cualquier tarjeta para ver la ventana interactiva con los procedimientos paso a paso y herramientas aplicadas.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenDetailModal(service)}
              className="space-card rounded-3xl border border-gray-800 hover:border-cyan-400/60 cursor-pointer overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
            >
              {/* Image Frame */}
              <div className="relative h-44 overflow-hidden bg-[#10172A]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent opacity-80"></div>
                
                <span className="absolute top-3 right-3 bg-[#070A12]/90 border border-cyan-400/50 text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Eye className="w-3 h-3 text-cyan-400" /> Ver Detalle
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors">
                    {service.spanishTitle}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1.5 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-gray-800 space-y-2">
                  <div className="bg-[#10172A] py-1.5 px-2.5 rounded-xl border border-cyan-500/30 text-center">
                    <span className="text-[11px] font-black text-cyan-400">
                      {service.priceGuide}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(service);
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  >
                    <span>Procedimientos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
