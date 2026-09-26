import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const { applyCoupon } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    applyCoupon('WELCOME15');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF4F0] border-t border-[#EAE0D7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#8B3A57] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Velvetique Atelier</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#261E20] tracking-tight">
          Unlock 15% Off Your First Ritual
        </h2>

        <p className="text-sm sm:text-base text-[#6E5C5A] mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Be the first to experience small-batch formulation launches, exclusive VIP masterclasses, and tailored dermatological advice.
        </p>

        {subscribed ? (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-emerald-200 max-w-md mx-auto shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#2B2324]">Welcome to the Atelier</h4>
            <p className="text-xs text-[#635351]">
              Your welcome voucher code <span className="font-bold text-[#8B3A57]">WELCOME15</span> (15% OFF) has been automatically applied to your cart!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#8C7A77] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white rounded-full border border-[#D9CBC2] focus:border-[#8B3A57] focus:ring-1 focus:ring-[#8B3A57] text-xs text-[#2E2426] placeholder-[#A3928F] outline-none shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#8B3A57] hover:bg-[#6E2A3F] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-[#8C7A77] mt-3">
              By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
