import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Phone, Calendar, ShieldCheck } from 'lucide-react';

interface TaskCraftAIChatProps {
  onOpenBooking: (serviceName?: string) => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    service?: string;
  };
}

export const TaskCraftAIChat: React.FC<TaskCraftAIChatProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! Soy TaskBot, el asistente inteligente de Vegas TaskCraft. 🛠️🎰\n¿En qué te puedo ayudar hoy? Puedo darte cotizaciones al instante, responder dudas sobre montajes o ayudarte a agendar un servicio.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const quickQuestions = [
    { label: '💰 Cotizar Montaje de TV', query: '¿Cuánto cuesta montar una TV en Las Vegas?' },
    { label: '🛋️ Ensamblaje Muebles', query: '¿Cuánto cuesta el ensamblaje de muebles IKEA?' },
    { label: '🤖 Smart Home & Cámaras', query: '¿Qué servicios ofrecen de Smart Home y Cámaras Solar WiFi?' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (userText?: string) => {
    const queryText = userText || input;
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setIsTyping(true);

    try {
      // Send request to backend API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      if (response.ok) {
        const data = await response.json();
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply || '¡Con gusto te ayudamos!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionButton: data.actionButton
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error('API offline fallback');
      }
    } catch (err) {
      // Smart offline fallback logic
      setTimeout(() => {
        let replyText = 'Con gusto podemos ayudarte con eso. Nuestros especialistas en Las Vegas realizan montajes y ensamblajes con precisión y garantía por escrito.';
        let btnLabel = 'Reservar Servicio';

        const lower = queryText.toLowerCase();
        if (lower.includes('tv') || lower.includes('televisor')) {
          replyText = 'El montaje de TV en Las Vegas cuesta $100 (hasta 42"), $150 (hasta 65") y $200 (65" en adelante). Incluye detección de vigas, anclajes Toggle Bolt y nivelación láser.';
          btnLabel = 'Reservar Montaje de TV';
        } else if (lower.includes('ikea') || lower.includes('mueble')) {
          replyText = '¡Sí! Ensamblamos todo tipo de muebles de IKEA, Wayfair y Amazon en Summerlin, Henderson y todo el valle a $120 la hora con herramientas de torque preciso.';
          btnLabel = 'Reservar Ensamblaje';
        } else if (lower.includes('smart') || lower.includes('cámara') || lower.includes('seguridad')) {
          replyText = 'Ofrecemos automatización de 3 puntos (TV, comedor, cocina) con Alexa ($180) y sistemas de cámaras outdoor WiFi con energía solar ($250).';
          btnLabel = 'Reservar Smart Home';
        } else if (lower.includes('repisa') || lower.includes('arte') || lower.includes('espejo')) {
          replyText = 'Repisas y artes pequeños a $60/hr. Espejos y cuadros grandes por $50 adicional en obra o $90 contrato independiente.';
          btnLabel = 'Reservar Repisas & Espejos';
        }

        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionButton: { label: btnLabel }
        };

        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 700);
      return;
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black px-5 py-3.5 rounded-full font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
        >
          <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Vegas TaskBot IA</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden text-white flex flex-col h-[520px] animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#10172A] border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white flex items-center gap-1.5">
                  <span>TaskBot IA</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">● En Línea</span>
                </h4>
                <p className="text-[10px] text-cyan-300 font-semibold">Vegas TaskCraft Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-[#070A12] text-gray-400 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3.5 custom-scrollbar bg-[#070A12]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-tr-none shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-[#10172A] text-gray-200 border border-cyan-500/30 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.actionButton && (
                    <button
                      onClick={() => onOpenBooking(msg.actionButton?.service)}
                      className="mt-2.5 w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-[11px] uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{msg.actionButton.label}</span>
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold p-2 bg-[#10172A] rounded-xl border border-cyan-500/30 w-fit">
                <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                <span>TaskBot está escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="p-2.5 bg-[#0A101F] border-t border-gray-800 flex gap-2 overflow-x-auto custom-scrollbar text-[11px]">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.query)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[#10172A] border border-cyan-500/30 text-cyan-300 font-semibold hover:bg-cyan-500/20 transition-all shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#10172A] border-t border-cyan-500/30 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-[#070A12] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
