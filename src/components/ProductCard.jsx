import React, { useState } from 'react';
import { Star, ShieldCheck, ShoppingCart, Eye, Check, Leaf } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { DEFAULT_FALLBACK_IMAGE } from '../data/defaultProducts';

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onOpenSpecs
}) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || DEFAULT_FALLBACK_IMAGE);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="group bg-slate-800/90 rounded-2xl border border-slate-700/80 overflow-hidden flex flex-col hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-300">
      
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onOpenSpecs(product)}>
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(DEFAULT_FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for Tag Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Eco Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700 text-amber-300 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.ecoRating}.0</span>
        </div>

        {/* Quick Specs Hover Trigger on desktop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-medium border border-slate-600 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Quick View Specs
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Certifications Row */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {product.certifications?.slice(0, 3).map((cert, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/50"
              >
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                {cert}
              </span>
            ))}
            {product.certifications && product.certifications.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center font-medium">
                +{product.certifications.length - 3} more
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenSpecs(product)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
          >
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Embodied Carbon snippet if available */}
          {product.specs?.embodiedCarbon && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
              <Leaf className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{product.specs.embodiedCarbon}</span>
            </div>
          )}
        </div>

        {/* Pricing & Actions Footer */}
        <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
          
          <div>
            <div className="text-xs text-slate-400">Unit Price</div>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {formatPrice(product.price, currency)}
              <span className="text-xs font-normal text-slate-400 ml-1">
                /{product.unit || 'unit'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Specs Preview Modal Button */}
            <button
              onClick={() => onOpenSpecs(product)}
              className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium border border-slate-600 transition-colors touch-target flex items-center gap-1"
              title="View Technical Specs"
            >
              <Eye className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Specs</span>
            </button>

            {/* Quick + Add to Cart Button */}
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`px-3.5 py-2.5 sm:px-4 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all touch-target ${
                isAdded
                  ? 'bg-emerald-500 text-white shadow-emerald-500/40 scale-95'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>+ Cart</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
