import React from 'react';
import { Filter, Star, Sparkles, Check, X } from 'lucide-react';
import { CATEGORIES, CERTIFICATIONS } from '../data/defaultProducts';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
  selectedCertifications,
  setSelectedCertifications,
  sortBy,
  setSortBy,
  totalResults
}) {
  const toggleCert = (cert) => {
    if (selectedCertifications.includes(cert)) {
      setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
    } else {
      setSelectedCertifications([...selectedCertifications, cert]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setMinRating(0);
    setSelectedCertifications([]);
  };

  const hasActiveFilters = selectedCategory !== 'All' || minRating > 0 || selectedCertifications.length > 0;

  return (
    <div className="bg-slate-900 border-b border-slate-800/80 sticky top-16 sm:top-20 z-30 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Category Pills (Horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 flex-shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Category:</span>
          </span>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all touch-target flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Row: Eco-Rating Toggle, Certifications, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Eco-Rating Filter Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Eco-Rating:</span>
              </span>
              <button
                onClick={() => setMinRating(0)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors ${
                  minRating === 0 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMinRating(4)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-0.5 ${
                  minRating === 4 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>4+</span>
                <Star className="w-2.5 h-2.5 fill-current" />
              </button>
              <button
                onClick={() => setMinRating(5)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-0.5 ${
                  minRating === 5 ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>5</span>
                <Star className="w-2.5 h-2.5 fill-current" />
              </button>
            </div>

            {/* Certifications Quick Filters */}
            <div className="hidden lg:flex items-center gap-1.5">
              {CERTIFICATIONS.slice(0, 3).map((cert) => {
                const active = selectedCertifications.includes(cert);
                return (
                  <button
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                      active
                        ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-emerald-400" />}
                    <span>{cert}</span>
                  </button>
                );
              })}
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors ml-1"
                title="Clear Filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-slate-400">
              Showing <strong className="text-white">{totalResults}</strong> eco materials
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Eco-Rating</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
