import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Building2, 
  Loader2, 
  Check, 
  Lock
} from 'lucide-react';
import { formatPrice, calculateCartTotals, generateOrderId } from '../utils/formatters';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  currency,
  onOrderSuccess
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Marcus',
    lastName: 'Vance',
    streetAddress: '742 Evergreen Eco-Way, Suite 400',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    phone: '+1 (555) 234-8900',
    email: 'marcus.vance@greenbuilders.org'
  });

  // Step 2: Shipping Method State
  // standard: Free if >$100, otherwise $15.99
  // express: +$14.99 premium for Zero-Emission Electric Courier
  const [shippingMethod, setShippingMethod] = useState('standard');

  // Step 3: Payment Method State ('card', 'upi', 'trade_credit')
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card details
  const [cardData, setCardData] = useState({
    cardNumber: '4532 8920 1823 4921',
    cardHolder: 'MARCUS VANCE',
    expiry: '08/28',
    cvv: '849'
  });

  // UPI details
  const [upiId, setUpiId] = useState('ecobuilder@okaxis');

  // Trade credit organization
  const [tradeLicense, setTradeLicense] = useState('USGBC-LEED-CON-9021');

  if (!isOpen) return null;

  const totals = calculateCartTotals(cartItems, currency);

  // Additional express shipping surcharge if selected
  const expressSurchargeUSD = shippingMethod === 'express' ? 14.99 : 0;
  const expressSurcharge = currency === 'INR' ? Math.round(expressSurchargeUSD * 83.0) : expressSurchargeUSD;
  const finalTotalUSD = totals.totalUSD + expressSurchargeUSD;

  // Real-time card formatting handlers
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    setCardData({ ...cardData, expiry: val });
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCardData({ ...cardData, cvv: val });
  };

  const handleAddressChange = (field, val) => {
    setShippingAddress({ ...shippingAddress, [field]: val });
  };

  const validateStep1 = () => {
    const { firstName, lastName, streetAddress, city, state, zipCode } = shippingAddress;
    return firstName && lastName && streetAddress && city && state && zipCode;
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate 1-second processing state as required
    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        items: [...cartItems],
        totalUSD: finalTotalUSD,
        shippingMethod: shippingMethod === 'express' ? 'Express Zero-Emission' : 'Standard Green Shipping',
        shippingAddress: { ...shippingAddress },
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (ending 4921)' : paymentMethod === 'upi' ? `UPI (${upiId})` : 'Green Trade Credit',
        currency,
        status: 'Confirmed - Preparing for EV Dispatch',
        estimatedDelivery: shippingMethod === 'express' ? '1 - 2 Business Days' : '3 - 5 Business Days'
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
        onClick={!isProcessing ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Processing Sustainable Order...
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mt-2">
              Validating carbon-neutral trade route, locking inventory batches, and executing payment gateway transaction.
            </p>
            <div className="mt-4 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[11px] text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Green Transaction</span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Secure Green Checkout
              <Lock className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-400">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Shipping Address' :
                currentStep === 2 ? 'Zero-Emission Delivery Method' :
                currentStep === 3 ? 'Payment Method' : 'Final Order Review'
              }
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="px-5 py-3 bg-slate-850/60 border-b border-slate-800 flex items-center justify-between text-xs">
          {[
            { step: 1, label: 'Address', icon: MapPin },
            { step: 2, label: 'Shipping', icon: Truck },
            { step: 3, label: 'Payment', icon: CreditCard },
            { step: 4, label: 'Review', icon: CheckCircle2 }
          ].map(({ step, label, icon: Icon }) => {
            const isCompleted = currentStep > step;
            const isCurrent = currentStep === step;

            return (
              <div
                key={step}
                onClick={() => {
                  if (step < currentStep || (step === 2 && validateStep1())) {
                    setCurrentStep(step);
                  }
                }}
                className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isCurrent ? 'text-emerald-400 font-bold' : isCompleted ? 'text-slate-300 hover:text-white' : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isCurrent
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40'
                      : isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step}
                </div>
                <span className="hidden sm:inline">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: Shipping Address Form */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Delivery Site & Recipient Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.firstName}
                    onChange={(e) => handleAddressChange('firstName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.lastName}
                    onChange={(e) => handleAddressChange('lastName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Street Address / Jobsite *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.streetAddress}
                    onChange={(e) => handleAddressChange('streetAddress', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PIN / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contractor Phone</label>
                  <input
                    type="text"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Method Selector */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                Select Zero-Emission Logistics Route
              </h3>

              <div className="space-y-3">
                {/* Standard Green Shipping */}
                <div
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-emerald-500">
                        {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">
                          Standard Green Shipping (EV Freight Rail & Fleet)
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          3 - 5 Business Days • 100% Bio-diesel and Electric Fleet
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-emerald-400">
                        {totals.isFreeShipping ? 'FREE' : formatPrice(totals.shippingUSD, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Express Zero-Emission Electric Fleet */}
                <div
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-emerald-500">
                        {shippingMethod === 'express' && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>Express Zero-Emission Electric Courier</span>
                          <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-700">
                            Priority
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          1 - 2 Business Days • Solar-charged dedicated delivery vehicle
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-emerald-400">
                        +{formatPrice(14.99, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method Tab Selector */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Select Payment Method
              </h3>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-800 rounded-2xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-target ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-target ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('trade_credit')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-target ${
                    paymentMethod === 'trade_credit'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Trade Credit</span>
                </button>
              </div>

              {/* Tab 1: Credit / Debit Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  {/* Virtual Styled Card Preview */}
                  <div className="w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-xl shadow-emerald-950/40 border border-emerald-600/40 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                        EcoConstruct Commercial Card
                      </span>
                      <ShieldCheck className="w-5 h-5 text-emerald-300" />
                    </div>

                    <div className="font-mono text-base sm:text-lg tracking-widest font-bold">
                      {cardData.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <div className="text-[10px] text-emerald-300 uppercase">Card Holder</div>
                        <div className="font-semibold uppercase tracking-wider">
                          {cardData.cardHolder || 'NAME'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-300 uppercase">Expires</div>
                        <div className="font-semibold font-mono">
                          {cardData.expiry || 'MM/YY'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 8920 1823 4921"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="08/28"
                          value={cardData.expiry}
                          onChange={handleExpiryChange}
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="849"
                          value={cardData.cvv}
                          onChange={handleCvvChange}
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Marcus Vance"
                        value={cardData.cardHolder}
                        onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: UPI / QR Code */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 pt-1 animate-fadeIn text-center">
                  <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 inline-block mx-auto shadow-inner">
                    {/* Mock realistic QR code graphic */}
                    <div className="w-44 h-44 bg-white p-3 rounded-xl mx-auto flex flex-col justify-between items-center shadow">
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-100 rounded">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              (i % 2 === 0 && i % 3 === 0) || i === 0 || i === 5 || i === 30 || i === 35 || i === 14 || i === 21
                                ? 'bg-slate-900'
                                : (i % 5 === 0 ? 'bg-emerald-600' : 'bg-transparent')
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 font-medium">
                      Scan with Google Pay, PhonePe, Paytm, or BHIM
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 text-left">
                      Or Pay via UPI ID / VPA
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="contractor@okaxis"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <p className="text-[11px] text-emerald-400 text-left mt-1">
                      ✓ Instant zero-fee verification
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Cash on Delivery / Green Trade Credit */}
              {paymentMethod === 'trade_credit' && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-slate-850 border border-slate-750 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Building2 className="w-4 h-4" />
                      Contractor Net-30 Trade Credit & COD
                    </div>
                    <p className="text-xs text-slate-300">
                      Eligible for USGBC/LEED registered developers, certified green builders, or pay cash/cheque upon site unloading.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Builder Registration / LEED Contractor ID
                    </label>
                    <input
                      type="text"
                      placeholder="USGBC-LEED-CON-9021"
                      value={tradeLicense}
                      onChange={(e) => setTradeLicense(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Real-time Order Summary Review */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Review Your Sustainable Order
              </h3>

              {/* Delivery destination preview */}
              <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 text-xs space-y-1">
                <div className="text-slate-400 font-semibold uppercase tracking-wider">
                  Deliver To:
                </div>
                <div className="text-white font-bold">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </div>
                <div className="text-slate-300">
                  {shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                </div>
                <div className="text-emerald-400 font-medium">
                  Method: {shippingMethod === 'express' ? 'Express Zero-Emission Electric Courier' : 'Standard Green Shipping'}
                </div>
              </div>

              {/* Items in order */}
              <div className="border border-slate-800 rounded-xl divide-y divide-slate-800 max-h-44 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
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

              {/* Calculation Summary */}
              <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotalUSD, currency)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping Route</span>
                  <span className={totals.isFreeShipping && shippingMethod === 'standard' ? 'text-emerald-400 font-semibold' : ''}>
                    {shippingMethod === 'express'
                      ? formatPrice(14.99 + (totals.isFreeShipping ? 0 : totals.shippingUSD), currency)
                      : totals.isFreeShipping ? 'FREE' : formatPrice(totals.shippingUSD, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Tax (8.75%)</span>
                  <span>{formatPrice(totals.taxUSD, currency)}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-base font-extrabold text-white">
                  <span>Final Order Total</span>
                  <span className="text-emerald-400">{formatPrice(finalTotalUSD, currency)}</span>
                </div>
              </div>

              {/* Green Offset Callout */}
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Placing this order officially diverts ~185 kg CO₂ from industrial atmosphere via circular supply chains.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Buttons Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-850 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isProcessing}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium border border-slate-700 transition-colors flex items-center gap-1.5 touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium border border-slate-700 transition-colors touch-target"
            >
              Cancel
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !validateStep1()) {
                  alert('Please fill out all required address fields.');
                  return;
                }
                setCurrentStep(currentStep + 1);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] touch-target"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-emerald-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] touch-target"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Place Order ({formatPrice(finalTotalUSD, currency)})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
