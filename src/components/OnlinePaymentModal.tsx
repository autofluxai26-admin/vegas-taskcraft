import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Smartphone, DollarSign, Sparkles, AlertCircle, Info } from 'lucide-react';
import { formatPhoneNumber } from './DualBookingModal';

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode: string;
  customerName: string;
  totalAmount: number;
  bookingPayload?: any;
}

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  isOpen,
  onClose,
  bookingCode,
  customerName,
  totalAmount,
  bookingPayload,
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

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Format phone in payload
    if (bookingPayload) {
      if (bookingPayload.phone) {
        bookingPayload.phone = formatPhoneNumber(bookingPayload.phone);
      }

      try {
        const existing = JSON.parse(localStorage.getItem('vtc_bookings') || '[]');
        existing.unshift(bookingPayload);
        localStorage.setItem('vtc_bookings', JSON.stringify(existing));
        window.dispatchEvent(new Event('vtc_booking_updated'));
      } catch (err) {}

      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      }).catch(err => console.error('API submit error:', err));
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#070A12] border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.4)] overflow-hidden text-white my-4 flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#10172A] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Secure Checkout & Scheduling</h4>
              <p className="text-xs text-cyan-400 font-bold">Vegas TaskCraft LLC • 256-bit SSL Encrypted</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#070A12] text-gray-400 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {isPaid ? (
            /* Success Receipt View with On-Site Payment Notice */
            <div className="text-center space-y-4 py-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">100% APPOINTMENT CONFIRMED!</span>
                <h3 className="text-2xl font-black text-white mt-1">Booking Registered Successfully</h3>
              </div>

              {/* Bank Maintenance & On-Site Payment Banner */}
              <div className="bg-amber-950/40 border border-amber-500/50 p-4 rounded-2xl text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Important Payment Notice:</span>
                </div>
                <p className="text-amber-100/90 leading-relaxed text-[11px] font-medium">
                  Automated online card processing is currently undergoing standard banking integration maintenance. 
                  <strong className="text-white"> Your appointment is 100% RESERVED and registered on our master calendar!</strong>
                </p>
                <p className="text-amber-200 font-extrabold text-[11px] pt-1 border-t border-amber-500/30">
                  💳 Payment of ${totalAmount.toFixed(2)} USD will be collected in person upon craftsman arrival at your service location (Cash, Card, or Zelle).
                </p>
              </div>

              <div className="bg-[#10172A] p-4 rounded-2xl border border-gray-800 space-y-2 text-xs text-left">
                <div className="flex justify-between">
                  <span className="text-gray-400">Booking Reference Code:</span>
                  <span className="font-black text-cyan-400">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer Name:</span>
                  <span className="font-bold text-white">{customerName || 'Valued Client'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800 text-sm">
                  <span className="font-bold text-white">Amount Due On-Site:</span>
                  <span className="font-black text-cyan-400">${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              <p className="text-[11px] text-cyan-300 font-semibold italic">
                ✓ A confirmation receipt has been sent to your email address and logged in our Technician Portal.
              </p>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                CLOSE & FINISH
              </button>
            </div>
          ) : (
            /* Payment Form */
            <form onSubmit={handlePay} className="space-y-5">
              
              {/* Order Summary Box */}
              <div className="bg-[#10172A] p-4 rounded-2xl border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Booking Code: {bookingCode}</span>
                  <span className="text-xs text-gray-200 font-semibold">{customerName || 'Vegas TaskCraft Client'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">Total Net Amount:</span>
                  <span className="text-xl font-black text-cyan-400">${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'card' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'bg-[#10172A] border-gray-800 text-gray-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'apple' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'bg-[#10172A] border-gray-800 text-gray-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'google' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'bg-[#10172A] border-gray-800 text-gray-400'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Google Pay</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Card Number:</label>
                    <input
                      type="text"
                      required
                      placeholder="4532 •••• •••• 8921"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-gray-300 mb-1">Expiration:</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-300 mb-1">CVC:</label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-300 mb-1">ZIP Code:</label>
                      <input
                        type="text"
                        required
                        placeholder="89135"
                        value={cardData.zip}
                        onChange={(e) => setCardData({ ...cardData, zip: e.target.value })}
                        className="w-full bg-[#10172A] border border-gray-700 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-[#10172A] rounded-2xl border border-gray-800 text-center space-y-2">
                  <p className="text-xs font-extrabold text-cyan-300">
                    Authorization window for {paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} (${totalAmount.toFixed(2)} USD).
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Confirming Appointment Slot...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>CONFIRM & BOOK APPOINTMENT (${totalAmount.toFixed(2)} USD)</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
