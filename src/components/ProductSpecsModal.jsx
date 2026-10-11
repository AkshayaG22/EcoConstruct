import React from 'react';
import { X, ShieldCheck, Star, Leaf, Check, ShoppingCart, Award, Layers, Ruler, Clock } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export default function ProductSpecsModal({
  product,
  currency,
  isOpen,
  onClose,
  onAddToCart
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F6F5EF] border border-[#C5D5C1] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header with Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#C5D5C1] flex items-center justify-between bg-[#E8F0E5]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.ecoRating}.0 Eco-Rating</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#647564] hover:text-[#292824] hover:bg-slate-800 transition-colors touch-target"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Top Info Section: Image + Title */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-48 h-40 rounded-xl overflow-hidden bg-[#E8F0E5] flex-shrink-0">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#292824]">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#405847] leading-relaxed">
                {product.description}
              </p>
              
              <div className="pt-2">
                <span className="text-2xl font-extrabold text-emerald-400">
                  {formatPrice(product.price, currency)}
                </span>
                <span className="text-xs text-[#647564] ml-1">
                  /{product.unit || 'unit'}
                </span>
              </div>
            </div>
          </div>

          {/* Sustainability Certifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#647564] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sustainability Certifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.certifications?.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#C5D5C1] text-xs text-[#405847]"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#647564] mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              Technical Specifications
            </h4>

            <div className="rounded-xl border border-[#C5D5C1] bg-[#E8F0E5]/60 overflow-hidden divide-y divide-[#DCE8D8] text-xs">
              {product.specs?.dimensions && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4">
                  <span className="font-semibold text-[#647564] sm:w-40 flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-[#647564]" />
                    Dimensions
                  </span>
                  <span className="text-[#405847]">{product.specs.dimensions}</span>
                </div>
              )}

              {product.specs?.embodiedCarbon && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4 bg-[#E8F0E5]">
                  <span className="font-semibold text-emerald-400 sm:w-40 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    Embodied Carbon
                  </span>
                  <span className="text-[#078765] font-medium">{product.specs.embodiedCarbon}</span>
                </div>
              )}

              {product.specs?.durability && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4">
                  <span className="font-semibold text-[#647564] sm:w-40 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#647564]" />
                    Rating / Strength
                  </span>
                  <span className="text-[#405847]">{product.specs.durability}</span>
                </div>
              )}

              {product.specs?.finish && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4">
                  <span className="font-semibold text-[#647564] sm:w-40 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#647564]" />
                    Finish & Sealing
                  </span>
                  <span className="text-[#405847]">{product.specs.finish}</span>
                </div>
              )}

              {product.specs?.leedContribution && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4">
                  <span className="font-semibold text-[#647564] sm:w-40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#647564]" />
                    LEED v4.1 Credits
                  </span>
                  <span className="text-[#405847]">{product.specs.leedContribution}</span>
                </div>
              )}

              {product.specs?.warranty && (
                <div className="flex flex-col sm:flex-row p-3 gap-1 sm:gap-4">
                  <span className="font-semibold text-[#647564] sm:w-40 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#647564]" />
                    Warranty Period
                  </span>
                  <span className="text-[#405847]">{product.specs.warranty}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-[#C5D5C1] bg-[#E8F0E5] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#E8F0E5] hover:bg-[#DCE8D8] text-[#405847] hover:text-[#292824] text-xs sm:text-sm font-medium border border-[#C5D5C1] transition-colors touch-target"
         >
            Close Specs
        </button>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#292824] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] touch-target"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart ({formatPrice(product.price, currency)})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
