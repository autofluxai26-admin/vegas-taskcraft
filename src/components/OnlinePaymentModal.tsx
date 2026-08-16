import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Smartphone, DollarSign, Sparkles } from 'lucide-react';

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string;
  customerName: string;
  totalAmount: number;
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  isOpen,
  onClose,
  bookingCode,
  customerName,
  totalAmount,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    zip: '',
  });

  if (!isOpen) return null;

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0B0F19] border border-amber-500/40 rounded-3xl shadow-space-glass overflow-hidden text-white my-6 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#141C2E] border-b border-space-cardBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold text-sm tracking-tight text-white">Pasarela de Pago Segura • SSL 256-bit</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/50 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {!isPaid ? (
            <form onSubmit={handlePaySubmit} className="space-y-5">
              
              {/* Amount Box */}
              <div className="bg-[#141C2E] p-4 rounded-2xl border border-amber-500/30 text-center space-y-1">
                <span className="text-xs text-gray-400 font-semibold block">Total a Pagar (Taxes Incluidos):</span>
                <span className="text-3xl font-black text-amber-400">${totalAmount.toFixed(2)} USD</span>
                <span className="text-[10px] text-emerald-400 font-bold block">Orden N°: {bookingCode}</span>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-gold-cosmic'
                      : 'bg-[#141C2E] border-gray-800 text-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Tarjeta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'apple'
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-[#141C2E] border-gray-800 text-gray-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'google'
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-cyan-cosmic'
                      : 'bg-[#141C2E] border-gray-800 text-gray-300'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Google Pay</span>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
                      Número de Tarjeta de Crédito/Débito:
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="4532 •••• •••• 8912"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#141C2E] border border-gray-700 text-white text-xs rounded-xl focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Expiración:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full p-2.5 bg-[#141C2E] border border-gray-700 text-white text-xs rounded-xl text-center focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        CVC / CVV:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full p-2.5 bg-[#141C2E] border border-gray-700 text-white text-xs rounded-xl text-center focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Código ZIP:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="89135"
                        value={cardData.zip}
                        onChange={(e) => setCardData({ ...cardData, zip: e.target.value })}
                        className="w-full p-2.5 bg-[#141C2E] border border-gray-700 text-white text-xs rounded-xl text-center focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-black font-black text-sm uppercase tracking-wider shadow-gold-cosmic hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Procesando Pago Seguro...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pagar ${totalAmount.toFixed(2)} USD Ahora</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pago procesado con encriptación bancaria. Garantía total Vegas TaskCraft.</span>
              </p>

            </form>
          ) : (
            /* Paid Receipt Confirmation */
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">¡Pago Confirmado!</h4>
                <p className="text-xs text-gray-300">
                  Gracias <span className="font-bold text-white">{customerName}</span>. Tu transacción ha sido procesada con éxito.
                </p>
              </div>

              <div className="bg-[#141C2E] p-4 rounded-2xl border border-amber-500/40 max-w-xs mx-auto space-y-1">
                <span className="text-[10px] text-gray-400 block">Número de Recibo Oficial:</span>
                <span className="text-xl font-mono font-black text-amber-400">{bookingCode}</span>
                <span className="text-xs text-emerald-400 font-bold block pt-1">Monto Cobrado: ${totalAmount.toFixed(2)} USD</span>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-gray-800 text-white font-bold text-xs hover:bg-gray-700"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
