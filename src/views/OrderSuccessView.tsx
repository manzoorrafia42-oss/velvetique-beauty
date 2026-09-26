import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessView: React.FC = () => {
  const { latestOrder, setActiveView } = useShop();

  if (!latestOrder) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="font-serif text-3xl font-medium text-[#291F21]">No Active Order</h2>
        <p className="text-xs text-[#7A6B69]">
          Browse our collections to start your clean skincare ritual.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="px-6 py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const order = latestOrder;

  return (
    <div className="py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="text-center space-y-3 mb-10">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8 stroke-[2]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full">
            Payment Authorized · Demo Order Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#261E20]">
            Thank You, {order.shippingAddress.firstName}!
          </h1>
          <p className="text-sm text-[#665452] max-w-lg mx-auto font-light">
            Your Velvetique order <strong className="font-mono text-[#8B3A57]">{order.id}</strong> has been received and is being prepared in our climate-controlled facility.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-[#E8DFD7] shadow-md overflow-hidden space-y-6 p-6 sm:p-10">
          
          {/* Order Header Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#F0E6DE] text-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7976] block">
                Order Number
              </span>
              <span className="font-mono font-semibold text-[#291F21] text-sm">
                {order.id}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7976] block">
                Order Date
              </span>
              <span className="font-medium text-[#291F21] text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8B3A57]" />
                {order.date}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7976] block">
                Shipping Status
              </span>
              <span className="font-semibold text-emerald-700 text-sm flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                {order.status}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7976] block">
                Total Paid
              </span>
              <span className="font-serif font-bold text-[#8B3A57] text-base">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#F0E6DE]">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B3A57] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Shipping Destination
              </h4>
              <p className="text-sm font-semibold text-[#291F21]">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p className="text-xs text-[#635351] leading-relaxed">
                {order.shippingAddress.address} {order.shippingAddress.apartment && `· ${order.shippingAddress.apartment}`}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B3A57] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Carrier & Tracking
              </h4>
              <p className="text-xs font-semibold text-[#291F21]">
                DHL Express Climate Neutral
              </p>
              <p className="text-xs text-[#635351]">
                Tracking: <span className="font-mono text-[#8B3A57]">{order.trackingNumber}</span>
              </p>
              <p className="text-xs text-[#7A6B69]">
                Estimated Delivery: 2–4 Business Days
              </p>
              <p className="text-xs text-[#7A6B69]">
                Confirmation sent to: <strong>{order.shippingAddress.email}</strong>
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2324]">
              Items Ordered ({order.items.length})
            </h4>

            <div className="divide-y divide-[#F2ECE5]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#F7F4F0] rounded-xl overflow-hidden shrink-0 border border-[#EAE1D8]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-serif text-sm font-medium text-[#291F21]">
                        {item.product.name}
                      </h5>
                      <p className="text-[11px] text-[#8C7A77]">
                        Qty: {item.quantity} · {item.selectedVolume || item.product.category}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-sm font-semibold text-[#291F21]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE1D8] space-y-2 text-xs text-[#635351]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Promotional Savings</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({order.shippingMethod === 'express' ? 'Priority Overnight' : 'Standard'})</span>
              <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#291F21] pt-2 border-t border-[#E8DFD7]">
              <span>Amount Paid</span>
              <span className="font-serif text-lg text-[#8B3A57]">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-[#7A6B69]">
              Questions about this order? Contact <strong>care@velvetiquebeauty.com</strong>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
