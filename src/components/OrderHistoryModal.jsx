import React from 'react';
import { X, Package, Calendar, MapPin, Truck, ExternalLink, Leaf } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
  currency,
  onSelectOrder
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Order History & Logistics Status
              </h2>
              <p className="text-xs text-slate-400">
                Persistent local records ({orders.length} orders found)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target"
            aria-label="Close orders"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-slate-500">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No orders placed yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Once you place an order with zero-emission delivery, its tracking ID and details will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {order.id}
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 font-semibold">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div>
                    <div className="text-slate-400 font-medium">Delivery Destination:</div>
                    <div className="font-semibold text-white">
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </div>
                    <div className="truncate">
                      {order.shippingAddress?.streetAddress}, {order.shippingAddress?.city}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-medium">Logistics Method:</div>
                    <div className="text-white font-medium flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{order.shippingMethod}</span>
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      Est: {order.estimatedDelivery}
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    {order.items?.length} items ({order.items?.map(i => i.title).slice(0, 2).join(', ')}{order.items?.length > 2 ? '...' : ''})
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {formatPrice(order.totalUSD, currency)}
                  </div>
                </div>

                <button
                  onClick={() => onSelectOrder(order)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 text-xs font-semibold border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5 touch-target"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Full Order Details & Receipt</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors touch-target"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
