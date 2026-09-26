import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

export const TrustBadgesStrip: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On orders over $50'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: '30 days money-back guarantee'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      subtitle: '100% encrypted checkout'
    },
    {
      icon: Headphones,
      title: '24/7 Skincare Support',
      subtitle: 'Talk with our estheticians'
    }
  ];

  return (
    <div className="bg-[#F2EAE4] border-t border-b border-[#E2D5CB] py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {badges.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-[#8B3A57] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-semibold tracking-wide text-[#2B2324]">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-[#7A6B69]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
