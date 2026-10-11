import React from 'react';
import { Filter, Star, Check, X } from 'lucide-react';
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

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    minRating > 0 ||
    selectedCertifications.length > 0;

  return (
    <div className="bg-[#E8EFE5] border-b border-[#D0DFCE] sticky top-16 sm:top-20 z-30 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          <span className="text-xs font-semibold text-[#43594A] flex items-center gap-1.5 flex-shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#24563B]" />
            <span>Category:</span>
          </span>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all touch-target flex-shrink-0 border ${
                  isSelected
                    ? 'bg-[#087F5B] text-white border-[#087F5B] shadow-sm font-semibold'
                    : 'bg-[#F8FAF6] text-[#35483A] border-[#C8D8C4] hover:bg-[#D8E6D3] hover:border-[#9CB89A]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Rating, Certifications and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            {/* Eco-Rating */}
            <div className="flex items-center gap-1.5 bg-[#F8FAF6] px-2.5 py-1.5 rounded-xl border border-[#D0DFCE]">
              <span className="text-[#43594A] font-medium flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Eco-Rating:</span>
              </span>

              <button
                onClick={() => setMinRating(0)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors ${
                  minRating === 0
                    ? 'bg-[#087F5B] text-white'
                    : 'text-[#43594A] hover:bg-[#E1EBDD]'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setMinRating(4)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-0.5 ${
                  minRating === 4
                    ? 'bg-[#087F5B] text-white'
                    : 'text-[#43594A] hover:bg-[#E1EBDD]'
                }`}
              >
                <span>4+</span>
                <Star className="w-2.5 h-2.5 fill-current" />
              </button>

              <button
                onClick={() => setMinRating(5)}
                className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-0.5 ${
                  minRating === 5
                    ? 'bg-[#087F5B] text-white'
                    : 'text-[#43594A] hover:bg-[#E1EBDD]'
                }`}
              >
                <span>5</span>
                <Star className="w-2.5 h-2.5 fill-current" />
              </button>
            </div>

            {/* Certification Filters */}
            <div className="hidden lg:flex items-center gap-1.5">
              {CERTIFICATIONS.slice(0, 3).map((cert) => {
                const active = selectedCertifications.includes(cert);

                return (
                  <button
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                      active
                        ? 'bg-[#D8E9D7] border-[#87AE8A] text-[#24563B]'
                        : 'bg-[#F8FAF6] border-[#D0DFCE] text-[#43594A] hover:bg-[#E1EBDD]'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-[#087F5B]" />}
                    <span>{cert}</span>
                  </button>
                );
              })}
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-[#43594A] hover:text-rose-600 transition-colors ml-1"
                title="Clear Filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Results Count and Sorting */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[#43594A]">
              Showing <strong className="text-[#26372D]">{totalResults}</strong> eco materials
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F8FAF6] border border-[#C8D8C4] text-[#26372D] rounded-lg px-2.5 py-2 text-xs focus:ring-1 focus:ring-[#087F5B] focus:outline-none"
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