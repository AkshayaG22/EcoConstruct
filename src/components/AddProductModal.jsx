import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Star, 
  Image as ImageIcon, 
  Check, 
  Sparkles, 
  AlertCircle,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES, CERTIFICATIONS, DEFAULT_FALLBACK_IMAGE } from '../data/defaultProducts';

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  currentCurrency
}) {
  const availableCategories = CATEGORIES.filter(c => c !== 'All');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Timber & Wood');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('sq.m');
  const [ecoRating, setEcoRating] = useState(5);
  const [selectedCerts, setSelectedCerts] = useState(['FSC Certified', 'Carbon Neutral']);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  
  // Technical Specifications State
  const [dimensions, setDimensions] = useState('');
  const [embodiedCarbon, setEmbodiedCarbon] = useState('');
  const [durability, setDurability] = useState('');
  const [leedContribution, setLeedContribution] = useState('');
  const [warranty, setWarranty] = useState('20-Year Manufacturer Warranty');

  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleToggleCert = (cert) => {
    if (selectedCerts.includes(cert)) {
      setSelectedCerts(selectedCerts.filter(c => c !== cert));
    } else {
      setSelectedCerts([...selectedCerts, cert]);
    }
  };

  const handleAutoFillSample = () => {
    setTitle('Bio-Based Hempcrete Wall Blocks');
    setCategory('Insulation');
    setPrice('38.00');
    setUnit('block');
    setEcoRating(5);
    setSelectedCerts(['Carbon Neutral', 'VOC-Free', 'LEED Compliant']);
    setImageUrl('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80');
    setDescription('Ultra-insulating, vapor-permeable lightweight hemp-lime modular masonry blocks offering net-negative embodied carbon for exterior building envelopes.');
    setDimensions('300mm x 200mm x 150mm');
    setEmbodiedCarbon('-36 kg CO₂e / m² net carbon sink');
    setDurability('Compressive Strength 1.5 MPa / 2-Hour Fire Rating');
    setLeedContribution('MR Credit 6 & EA Credit 1 Energy Optimization');
    setWarranty('50-Year Structural Durability');
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Please enter a product title.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setFormError('Please enter a valid unit price greater than 0.');
      return;
    }

    // Convert price to base USD if user entered in INR
    const finalPriceUsd = currentCurrency === 'INR' ? (parsedPrice / 83.0) : parsedPrice;

    const newProduct = {
      id: `prod-custom-${Date.now()}`,
      title: title.trim(),
      category,
      price: parseFloat(finalPriceUsd.toFixed(2)),
      unit: unit || 'unit',
      ecoRating: Number(ecoRating),
      certifications: selectedCerts,
      imageUrl: imageUrl.trim() || DEFAULT_FALLBACK_IMAGE,
      description: description.trim() || 'High-performance eco-friendly architectural building material.',
      specs: {
        dimensions: dimensions.trim() || 'Standard Commercial Dimensions',
        embodiedCarbon: embodiedCarbon.trim() || 'Verified Low-Embodied Carbon',
        durability: durability.trim() || 'Commercial Grade Heavy Duty',
        finish: 'Eco-Certified Non-Toxic Surface',
        leedContribution: leedContribution.trim() || 'Contributes to LEED v4.1 Materials Credits',
        warranty: warranty.trim() || '15-Year Standard Commercial Warranty'
      },
      stock: 100,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onAddProduct(newProduct);
    onClose();

    // Reset Form
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setDimensions('');
    setEmbodiedCarbon('');
    setDurability('');
    setLeedContribution('');
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#F6F5EF]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F6F5EF] border border-slate-750 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#C5D5C1] bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#292824] flex items-center gap-2">
                Add New Eco Product
              </h2>
              <p className="text-xs text-[#647564]">
                Register sustainable building materials into the live catalog
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFillSample}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-xs hover:bg-emerald-900 transition-colors"
              title="Populate with sample data"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sample Demo Data</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#647564] hover:text-[#292824] hover:bg-white transition-colors touch-target"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Product Title */}
          <div>
            <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
              Product Title <span className="text-emerald-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cross-Laminated Timber (CLT) Structural Slabs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category & Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
                Category <span className="text-emerald-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Price */}
            <div>
              <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
                Unit Price ({currentCurrency === 'USD' ? '$ USD' : '₹ INR'}) <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647564] text-sm font-semibold">
                  {currentCurrency === 'USD' ? '$' : '₹'}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  required
                  placeholder="45.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Unit of Measure */}
            <div>
              <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
                Unit Metric
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="sq.m">sq.m (Square Meter)</option>
                <option value="sq.ft">sq.ft (Square Foot)</option>
                <option value="panel">panel</option>
                <option value="bundle">bundle</option>
                <option value="block">block</option>
                <option value="linear ft">linear ft</option>
                <option value="ton">ton</option>
              </select>
            </div>

          </div>

          {/* Eco-Rating Picker (1 to 5 Stars) */}
          <div>
            <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
              Eco-Rating ({ecoRating} / 5 Stars) <span className="text-emerald-400">*</span>
            </label>
            <div className="flex items-center gap-2 p-3 bg-white/80 rounded-xl border border-[#C5D5C1]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setEcoRating(star)}
                  className="p-1.5 rounded-lg hover:scale-110 transition-transform touch-target"
                  title={`${star} Star Eco-Rating`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= ecoRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-600 hover:text-[#647564]'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-[#647564] ml-2 font-medium">
                {ecoRating === 5 && '🌟 Maximum Circular & Low-Carbon Performance'}
                {ecoRating === 4 && '🌿 High Sustainability Standard'}
                {ecoRating <= 3 && '🍃 Eco-Compliant'}
              </span>
            </div>
          </div>

          {/* Sustainability Certifications (Checkboxes) */}
          <div>
            <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
              Sustainability Certifications
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CERTIFICATIONS.map((cert) => {
                const checked = selectedCerts.includes(cert);
                return (
                  <label
                    key={cert}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-colors ${
                      checked
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                        : 'bg-white/80 border-[#C5D5C1] text-[#405847] hover:bg-slate-750'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleCert(cert)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        checked
                          ? 'bg-emerald-500 border-emerald-500 text-[#292824]'
                          : 'border-slate-500'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">{cert}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Image URL with Preview & Fallback */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#405847] uppercase tracking-wider">
                Image URL (With Default Fallback)
              </label>
              <button
                type="button"
                onClick={() => setImageUrl(DEFAULT_FALLBACK_IMAGE)}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Leaf className="w-3 h-3" />
                Use Eco Stock Image
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="w-12 h-11 rounded-xl bg-white border border-[#C5D5C1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    onError={(e) => {
                      e.target.src = DEFAULT_FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-slate-500" />
                )}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-[#405847] uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              rows={2}
              placeholder="Highlight circular lifecycle, thermal insulation, or structural benefits..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#C5D5C1] rounded-xl text-sm text-[#292824] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Technical Specifications Section */}
          <div className="pt-2 border-t border-[#C5D5C1]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#647564] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Technical Specifications (Optional)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#647564] mb-1">Dimensions / Sizing</label>
                <input
                  type="text"
                  placeholder="e.g. 1200mm x 600mm x 25mm"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#C5D5C1] rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[#647564] mb-1">Embodied Carbon Metric</label>
                <input
                  type="text"
                  placeholder="e.g. -12.4 kg CO₂e / m² or 2.1 kg CO₂e"
                  value={embodiedCarbon}
                  onChange={(e) => setEmbodiedCarbon(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#C5D5C1] rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[#647564] mb-1">Durability / R-Value / Strength</label>
                <input
                  type="text"
                  placeholder="e.g. R-15 Thermal / Class A Fire Rating"
                  value={durability}
                  onChange={(e) => setDurability(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#C5D5C1] rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[#647564] mb-1">LEED / Green Building Points</label>
                <input
                  type="text"
                  placeholder="e.g. MR Credit 4 & EQ Credit 2"
                  value={leedContribution}
                  onChange={(e) => setLeedContribution(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#C5D5C1] rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#C5D5C1] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-700 text-[#405847] hover:text-[#292824] text-xs sm:text-sm font-medium border border-[#C5D5C1] transition-colors touch-target"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#292824] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] touch-target"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish & Save to Catalog</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
