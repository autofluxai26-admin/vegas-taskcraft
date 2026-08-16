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
    { label: '💰 Cotizar Montaje de TV', query: '¿Cuánto cuesta montar una TV de 75" en Las Vegas?' },
    { label: '🛋️ Ensamblaje IKEA', query: '¿Arman muebles de IKEA o Wayfair en Summerlin?' },
    { label: '📅 Disponibilidad Hoy', query: '¿Tienen técnicos disponibles para el día de hoy?' }
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

        if (queryText.toLowerCase().includes('tv') || queryText.toLowerCase().includes('televisor')) {
          replyText = 'El montaje de TV tiene una guía de precio desde $95. Incluye detección de vigas, anclajes pesados y nivelación láser. ¿Te gustaría agendar una hora?';
          btnLabel = 'Reservar Montaje de TV';
        } else if (queryText.toLowerCase().includes('ikea') || queryText.toLowerCase().includes('mueble')) {
          replyText = '¡Sí! Ensamblamos todo tipo de muebles de IKEA, Wayfair y Amazon en Summerlin, Henderson y todo el valle. El costo promedio inicia en $85.';
          btnLabel = 'Reservar Ensamblaje';
        } else if (queryText.toLowerCase().includes('hoy') || queryText.toLowerCase().includes('disponib')) {
          replyText = '¡Tenemos unidades en ruta activas hoy en Las Vegas! Podemos llegar a tu domicilio en 2 horas o menos.';
          btnLabel = 'Ver Franjas de Hoy';
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
      }, 900);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-amber-500 via-vegas-gold to-amber-600 text-black shadow-gold-glow hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 font-bold text-sm"
        aria-label="Abrir Chat Asistente IA"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="hidden sm:inline">Vegas TaskBot IA</span>
      </button>

      {/* Chat Window Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-[#0E131F] border border-vegas-gold/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-950/80 via-[#131926] to-[#0E131F] border-b border-vegas-cardBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-vegas-gold/20 border border-vegas-gold/40 flex items-center justify-center text-vegas-gold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  Vegas TaskBot
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    IA Conectada
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400">Asistente de Cotización & Reservas 24/7</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-vegas-cardBg hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A0D14]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-vegas-gold/20 border border-vegas-gold/40 flex items-center justify-center text-vegas-gold shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-black font-semibold rounded-tr-none'
                    : 'bg-[#151C2C] text-gray-200 border border-vegas-cardBorder rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-black/70' : 'text-gray-400'}`}>
                    {msg.timestamp}
                  </span>

                  {/* Optional Action CTA button inside chat */}
                  {msg.actionButton && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenBooking(msg.actionButton?.service);
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-vegas-gold text-black font-extrabold text-xs shadow-md hover:scale-105 transition-transform"
                    >
                      {msg.actionButton.label}
                    </button>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-vegas-cardBg border border-vegas-cardBorder flex items-center justify-center text-gray-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                <Bot className="w-4 h-4 text-vegas-gold animate-bounce" />
                <span>TaskBot está escribiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2 bg-[#0E131F] border-t border-vegas-cardBorder/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-vegas-cardBg border border-vegas-cardBorder text-[10px] font-semibold text-amber-300 hover:border-amber-400 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0E131F] border-t border-vegas-cardBorder flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#0A0D14] border border-vegas-cardBorder text-white text-xs rounded-xl px-3 py-2.5 focus:border-vegas-gold focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
