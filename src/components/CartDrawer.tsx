import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountCode,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    setActiveView,
    setSelectedProduct
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shippingPercentage = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E8DFD7]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8DFD7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8B3A57]" />
              <h3 className="font-serif text-xl font-medium text-[#291F21]">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#736361] hover:text-[#291F21] hover:bg-[#F2ECE5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F4ECE5] px-6 py-3 border-b border-[#EAE0D7]">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A3E3D] mb-1.5">
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-[#8B3A57] font-bold">${amountNeededForFreeShipping.toFixed(2)}</strong> more for <span className="underline">FREE Shipping</span>!
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked! Free Standard Shipping Applied
                </span>
              )}
              <span className="text-[11px] text-[#7A6B69]">{shippingPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#DFD3C8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B3A57] rounded-full transition-all duration-500"
                style={{ width: `${shippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F2ECE5] text-[#8B3A57] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2E2426]">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#7A6B69] max-w-xs mx-auto">
                  Discover clean, clinical botanical formulations tailored to transform your skincare ritual.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#8B3A57] hover:bg-[#6E2A3F] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedVolume || index}`}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE1D8] flex gap-3.5 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setActiveView('shop');
                      setIsCartOpen(false);
                    }}
                    className="w-20 h-20 bg-[#F7F4F0] rounded-xl overflow-hidden shrink-0 cursor-pointer border border-[#EFE7E0]"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setSelectedProduct(item.product);
                            setActiveView('shop');
                            setIsCartOpen(false);
                          }}
                          className="font-serif text-sm font-medium text-[#291F21] line-clamp-1 hover:text-[#8B3A57] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVolume)}
                          className="text-[#9C8C89] hover:text-rose-700 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVolume && (
                        <p className="text-[11px] text-[#8C7A77]">
                          Size: {item.selectedVolume}
                        </p>
                      )}
                    </div>

                    {/* Quantity controls & item price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#DFD3C8] rounded-lg overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVolume)}
                          className="p-1 hover:bg-[#EBE2DA] text-[#524544] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#291F21]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVolume)}
                          className="p-1 hover:bg-[#EBE2DA] text-[#524544] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-[#291F21]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotals & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8DFD7] space-y-4">
              
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C7A77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={e => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. GLOW10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CBC2] rounded-lg uppercase placeholder:normal-case focus:border-[#8B3A57] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4A2432] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#63293E] transition-colors cursor-pointer"
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
                    <span>Code {discountCode} applied (-${discountAmount.toFixed(2)})</span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-800 underline text-[10px] hover:text-emerald-950"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#635351] pt-1 border-t border-[#F2ECE5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#291F21]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#291F21] pt-2 border-t border-[#F2ECE5]">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-[#8B3A57]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-xs text-[#6B5A58] hover:text-[#291F21] font-medium tracking-wide uppercase text-center transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7A77]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-bit SSL Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
