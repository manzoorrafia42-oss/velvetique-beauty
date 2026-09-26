import React from 'react';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon } = useShop();

  return (
    <div className="bg-[#6B2D44] text-[#FAF4F0] text-xs font-medium tracking-wide py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-4 text-[#F3E7E0] text-[11px]">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#E6B8C2]" />
            Free Worldwide Shipping Over $50
          </span>
          <span className="opacity-40">|</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E6B8C2]" />
            100% Clean & Dermatologist Tested
          </span>
        </div>

        <div className="w-full lg:w-auto text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C4CE] animate-pulse" />
          <span>
            Complimentary Shipping on Orders $50+ &nbsp;·&nbsp; Use code{' '}
            <button
              onClick={() => applyCoupon('GLOW10')}
              className="underline font-semibold tracking-wider text-[#FFFFFF] hover:text-[#FAD5DC] transition-colors cursor-pointer"
              title="Click to copy & apply GLOW10"
            >
              GLOW10
            </button>{' '}
            for 10% OFF
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#F3E7E0]">
          <span className="hover:text-white transition-colors cursor-default">USD ($)</span>
          <span className="opacity-40">|</span>
          <a href="#support" className="hover:text-white transition-colors">Support</a>
        </div>
      </div>
    </div>
  );
};
