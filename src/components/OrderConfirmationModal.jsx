import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Printer, 
  ArrowRight, 
  Leaf, 
  ShieldCheck, 
  Calendar, 
  MapPin,
  X
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function OrderConfirmationModal({
  order,
  isOpen,
  onClose,
  currency
}) {
  useEffect(() => {
    if (isOpen) {
      // Fire festive eco-colored confetti explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#6ee7b7', '#f59e0b']
      });
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-slideUp">
        
        {/* Top Celebration Header */}
        <div className="p-6 bg-gradient-to-b from-emerald-950/80 to-slate-900 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-3 right-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors touch-target"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 animate-bounce">
            <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Emission Logistics Reserved</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Order Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Thank you for choosing verified circular materials. Your building project is actively diverting carbon from the atmosphere.
          </p>

          <div className="mt-4 inline-block bg-slate-850 px-4 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 mr-2">Order Reference ID:</span>
            <strong className="text-sm font-mono text-emerald-400 tracking-wider font-bold">
              {order.id}
            </strong>
          </div>
        </div>

        {/* Scrollable Order Details */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          
          {/* Timeline & Delivery Box */}
          <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                Estimated Delivery Timeline
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {order.shippingMethod}
              </span>
            </div>

            <div className="text-base font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{order.estimatedDelivery}</span>
            </div>
            
            <p className="text-xs text-slate-400">
              Dispatched from regional zero-emissions warehouse via EV freight rail and fleet.
            </p>
          </div>

          {/* Shipping Details */}
          <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Customer & Site Shipping Destination
            </span>
            <div className="font-bold text-white text-sm">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </div>
            <div className="text-slate-300">
              {order.shippingAddress.streetAddress}
            </div>
            <div className="text-slate-300">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </div>
            <div className="text-slate-400 text-xs pt-1">
              Payment: <strong className="text-white">{order.paymentMethod}</strong>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Items Summary ({order.items.length})
            </div>
            <div className="rounded-xl border border-slate-800 divide-y divide-slate-800 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs bg-slate-850/40">
                  <div className="flex items-center gap-2.5">
                    <img src={item.imageUrl} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-white truncate max-w-xs">{item.title}</div>
                      <div className="text-slate-400">{item.quantity} × {formatPrice(item.price, currency)}</div>
                    </div>
                  </div>
                  <div className="font-bold text-white">
                    {formatPrice(item.price * item.quantity, currency)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Amount Paid</span>
              <span className="text-xs text-emerald-400 font-medium">Taxes and freight included</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {formatPrice(order.totalUSD, currency)}
            </div>
          </div>

          {/* Environmental Carbon Certificate Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300">
                Carbon Offset Certificate Registered
              </div>
              <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-relaxed">
                A verified digital certificate for LEED v4.1 MR Credit compliance will be delivered with your bill of lading.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-850 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-1.5 touch-target"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2 touch-target"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
