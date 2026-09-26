import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ChevronRight, ArrowLeft, Tag, Check, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    applyCoupon,
    removeCoupon,
    placeOrder,
    setActiveView
  } = useShop();

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: 'Rafia',
    lastName: 'Manzoor',
    email: 'manzoorrafia42@gmail.com',
    phone: '+1 (555) 234-8901',
    address: '742 Evergreen Terrace',
    apartment: 'Apt 4B',
    city: 'Beverly Hills',
    state: 'CA',
    postalCode: '90210',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'paypal' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = shippingMethod === 'express' ? 9.95 : (subtotal >= 50 ? 0 : 5.95);
  const finalTotal = Math.max(0, Math.round((subtotal - discountAmount + shippingCost) * 100) / 100);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(
        formData,
        shippingMethod,
        paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'apple-pay' ? 'Apple Pay' : paymentMethod === 'paypal' ? 'PayPal' : 'Klarna (4 installments)'
      );
      setIsSubmitting(false);
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="font-serif text-3xl font-medium text-[#291F21]">Your Cart is Empty</h2>
        <p className="text-xs text-[#7A6B69]">
          Please add some formulas to your shopping bag before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFD7]">
          <button
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#665452] hover:text-[#8B3A57] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-[#7A6B69]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-Bit SSL Demo Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Checkout Forms (7 Cols) */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD7] shadow-2xs space-y-4">
              <h3 className="font-serif text-xl font-medium text-[#291F21] flex items-center justify-between">
                <span>1. Contact Information</span>
                <span className="text-xs font-normal text-[#8A7976]">Demo order pre-filled</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD7] shadow-2xs space-y-4">
              <h3 className="font-serif text-xl font-medium text-[#291F21]">
                2. Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={e => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={e => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD7] shadow-2xs space-y-4">
              <h3 className="font-serif text-xl font-medium text-[#291F21]">
                3. Shipping Method
              </h3>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                  shippingMethod === 'standard'
                    ? 'border-[#8B3A57] bg-[#F9F3F0]'
                    : 'border-[#EAE1D8] bg-[#FAF8F5] hover:border-[#8B3A57]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#8B3A57]"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#2B2324]">
                        Standard Climate-Neutral Delivery
                      </p>
                      <p className="text-[11px] text-[#7A6B69]">Estimated 2–4 business days via DHL Express</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2E2426]">
                    {subtotal >= 50 ? 'FREE' : '$5.95'}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                  shippingMethod === 'express'
                    ? 'border-[#8B3A57] bg-[#F9F3F0]'
                    : 'border-[#EAE1D8] bg-[#FAF8F5] hover:border-[#8B3A57]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#8B3A57]"
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#2B2324]">
                        Priority VIP Overnight Air
                      </p>
                      <p className="text-[11px] text-[#7A6B69]">Next business morning with signature confirmation</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2E2426]">$9.95</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD7] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-medium text-[#291F21]">
                  4. Payment Method
                </h3>
                <span className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  Demo Mode Active
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'apple-pay', label: 'Apple Pay' },
                  { id: 'paypal', label: 'PayPal' },
                  { id: 'klarna', label: 'Klarna 4x' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id as any)}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === item.id
                        ? 'border-[#8B3A57] bg-[#8B3A57] text-white shadow-xs'
                        : 'border-[#D9CBC2] bg-[#FAF8F5] text-[#524544] hover:border-[#8B3A57]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE1D8] space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#544645]">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#544645]">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#544645]">
                        CVC Security Code
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple-pay' && (
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE1D8] text-center text-xs text-[#524544]">
                  Apple Pay biometric confirmation will prompt upon clicking "Place Order".
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE1D8] text-center text-xs text-[#524544]">
                  You will be securely redirected to PayPal sandbox to authorize payment.
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE1D8] text-center text-xs text-[#524544]">
                  Split your order into 4 interest-free payments of ${(finalTotal / 4).toFixed(2)}.
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? 'Authorizing Demo Order...' : `Complete Order · $${finalTotal.toFixed(2)}`}
              </button>

              <p className="text-[11px] text-center text-[#8C7A77]">
                By placing your order, you agree to Velvetique's Terms of Service and Return Policy.
              </p>
            </div>

          </form>

          {/* Right Order Summary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD7] shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-medium text-[#291F21] pb-3 border-b border-[#F0E6DE]">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5">
                    <div className="relative w-16 h-16 bg-[#F7F4F0] rounded-xl overflow-hidden shrink-0 border border-[#EAE1D8]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-[#8B3A57] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-[#291F21] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7A77]">
                        {item.selectedVolume || item.product.category}
                      </p>
                    </div>
                    <span className="font-serif text-sm font-semibold text-[#291F21]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code field */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-[#F0E6DE]">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C7A77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={e => setInputCoupon(e.target.value)}
                      placeholder="Discount code (e.g. GLOW10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CBC2] rounded-lg uppercase outline-none focus:border-[#8B3A57]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A2432] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#63293E] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {couponFeedback.message}
                  </p>
                )}
                {discountCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <span>Applied: {discountCode} (-${discountAmount.toFixed(2)})</span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-800 underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-[#5C4D4B] pt-4 border-t border-[#F0E6DE]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#291F21]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Savings Voucher</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#291F21] pt-3 border-t border-[#F0E6DE]">
                  <span>Total Amount Due</span>
                  <span className="font-serif text-xl text-[#8B3A57]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Callouts */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE1D8] space-y-1.5 text-[11px] text-[#7A6B69]">
                <p className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#8B3A57]" />
                  <span>Ships in 100% recyclable luxury box</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B3A57]" />
                  <span>Dermatologist backed 30-day satisfaction guarantee</span>
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
