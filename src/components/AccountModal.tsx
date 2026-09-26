import React, { useState } from 'react';
import { X, User, Package, Heart, LogOut, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    user,
    loginUser,
    logoutUser,
    orders,
    setIsWishlistOpen,
    setActiveView
  } = useShop();

  const [tab, setTab] = useState<'profile' | 'orders' | 'login' | 'register'>('profile');
  const [loginEmail, setLoginEmail] = useState('manzoorrafia42@gmail.com');
  const [loginName, setLoginName] = useState('Rafia Manzoor');
  const [loginPassword, setLoginPassword] = useState('••••••••');

  if (!isAccountModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(loginName || 'Rafia Manzoor', loginEmail);
    setTab('profile');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD7] animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8DFD7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F5EFE9] text-[#8B3A57] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#291F21]">
                {user.isLoggedIn ? user.name : 'Velvetique Beauty Club'}
              </h3>
              <p className="text-[11px] text-[#7A6B69]">
                {user.isLoggedIn ? 'VIP Gold Member · 450 Loyalty Points' : 'Sign in to access orders and member benefits'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-1.5 rounded-full text-[#7A6B69] hover:text-[#291F21] hover:bg-[#F2ECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        {user.isLoggedIn ? (
          <div className="flex border-b border-[#E8DFD7] bg-[#FAF8F5] px-6">
            <button
              onClick={() => setTab('profile')}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                tab === 'profile'
                  ? 'border-[#8B3A57] text-[#8B3A57]'
                  : 'border-transparent text-[#736361] hover:text-[#291F21]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Address</span>
            </button>
            <button
              onClick={() => setTab('orders')}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                tab === 'orders'
                  ? 'border-[#8B3A57] text-[#8B3A57]'
                  : 'border-transparent text-[#736361] hover:text-[#291F21]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
            </button>
            <button
              onClick={() => {
                setIsAccountModalOpen(false);
                setIsWishlistOpen(true);
              }}
              className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 border-transparent text-[#736361] hover:text-[#291F21] flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Wishlist</span>
            </button>
          </div>
        ) : (
          <div className="flex border-b border-[#E8DFD7] bg-[#FAF8F5] px-6">
            <button
              onClick={() => setTab('login')}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                tab === 'login' ? 'border-[#8B3A57] text-[#8B3A57]' : 'border-transparent text-[#736361]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                tab === 'register' ? 'border-[#8B3A57] text-[#8B3A57]' : 'border-transparent text-[#736361]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Tab Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {user.isLoggedIn && tab === 'profile' && (
            <div className="space-y-6">
              {/* Account summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#EAE1D8] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B3A57] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Customer Details
                  </h4>
                  <p className="text-sm font-semibold text-[#291F21]">{user.name}</p>
                  <p className="text-xs text-[#736361] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#A3928F]" />
                    {user.email}
                  </p>
                  <p className="text-xs text-[#736361] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#A3928F]" />
                    +1 (555) 234-8901
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#EAE1D8] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B3A57] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Default Shipping Address
                  </h4>
                  <p className="text-xs font-semibold text-[#291F21]">Beverly Hills Residence</p>
                  <p className="text-xs text-[#635351] leading-relaxed">
                    742 Evergreen Terrace<br />
                    Beverly Hills, CA 90210<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Membership perks */}
              <div className="bg-[#FAF3F0] p-4 rounded-2xl border border-[#EADBD5] flex items-center justify-between">
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#291F21]">
                    Velvetique Tier: Pure Glow
                  </h5>
                  <p className="text-xs text-[#7A6B69]">
                    You are only $58 away from Diamond Tier (Free Deluxe Samples with every order).
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8B3A57] bg-white px-3 py-1 rounded-full shadow-2xs">
                  450 pts
                </span>
              </div>

              {/* Logout button */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={logoutUser}
                  className="text-xs text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Velvetique</span>
                </button>
              </div>
            </div>
          )}

          {user.isLoggedIn && tab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#7A6B69]">
                  You have not placed any orders yet.
                </div>
              ) : (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE1D8] shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F2ECE5] pb-3 gap-2">
                      <div>
                        <span className="font-serif text-base font-semibold text-[#291F21]">
                          Order {order.id}
                        </span>
                        <p className="text-[11px] text-[#8C7A77]">Placed on {order.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          {order.status}
                        </span>
                        <span className="font-serif text-sm font-bold text-[#291F21]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="space-y-2">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-[#524544]">
                          <span className="truncate max-w-[280px]">
                            {it.quantity}x {it.product.name}
                          </span>
                          <span className="font-medium text-[#291F21]">
                            ${(it.product.price * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-[#8C7A77] pt-2 border-t border-[#F2ECE5] flex items-center justify-between">
                      <span>Tracking: {order.trackingNumber}</span>
                      <span>Payment: {order.paymentMethod}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!user.isLoggedIn && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={loginName}
                  onChange={e => setLoginName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#544645]">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] outline-none focus:border-[#8B3A57]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md cursor-pointer mt-2"
              >
                {tab === 'login' ? 'Sign In to Velvetique' : 'Join Velvetique Club'}
              </button>

              <p className="text-[11px] text-center text-[#8C7A77]">
                Demo authentication active. Enter your details to test account flows.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
