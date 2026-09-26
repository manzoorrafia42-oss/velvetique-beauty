import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BANNER_BODYCARE_IMAGE } from '../data/products';

export const PromotionalBanner: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProduct } = useShop();

  const handleShopSale = () => {
    setSelectedCategory('All');
    setSelectedProduct(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD7]">
        
        {/* Left Mauve / Dusty Rose Panel */}
        <div className="md:col-span-5 bg-[#824657] text-[#FAF4F0] p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#9A5A6D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] uppercase text-[#FCE6EC] bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-full w-fit">
            <Tag className="w-3.5 h-3.5 text-[#FAD5DF]" />
            <span>Limited Time Offer</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-white">
            Up to 30% Off <br />
            <span className="italic font-light text-[#FCE6EC]">on Best Sellers</span>
          </h3>

          <p className="text-[#F5E6EC] text-sm sm:text-base leading-relaxed font-light max-w-sm">
            Glow more, spend less. Replenish your daily routine with our clinically tested, botanical barrier essentials.
          </p>

          <div className="pt-2">
            <button
              onClick={handleShopSale}
              className="px-8 py-3.5 bg-white text-[#6E2A3F] hover:bg-[#FAF4F0] text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Product Flat-lay Image */}
        <div className="md:col-span-7 relative min-h-[300px] sm:min-h-[380px] bg-[#EBE2DA]">
          <img
            src={BANNER_BODYCARE_IMAGE}
            alt="Velvetique Best Selling Bodycare and Botanical Skincare"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#824657]/20 via-transparent to-transparent hidden md:block" />
        </div>

      </div>
    </section>
  );
};
