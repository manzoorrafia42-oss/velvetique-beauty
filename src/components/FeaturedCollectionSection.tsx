import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_PODIUM_IMAGE, PRODUCTS } from '../data/products';

export const FeaturedCollectionSection: React.FC = () => {
  const { addToCart, openProductDetails } = useShop();

  const giftSet = PRODUCTS.find(p => p.id === 'prod-radiant-glow-ritual-set') || PRODUCTS[0];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-b border-[#EBE3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-[#E8DFD7] overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] bg-[#ECE4DC]">
              <img
                src={giftSet.image}
                alt="Velvetique The Radiant Glow Ritual"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-[#63293E] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-md">
                Featured 4-Piece Ritual
              </div>
            </div>

            {/* Right Editorial Copy & Bundle Action */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8B3A57] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  The Golden Protocol
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#261E20] leading-tight">
                  The Radiant Glow Ritual
                </h3>
              </div>

              <p className="text-[#635452] text-sm sm:text-base leading-relaxed font-light">
                Our signature morning-to-night skincare ritual bundled together in an eco-certified keepsakes box. Formulated to calm redness, repair barrier function, and deliver long-lasting dewy luminosity.
              </p>

              {/* Clinical proofs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 border-y border-[#F0E6DE]">
                <div className="flex items-start gap-2 text-xs text-[#4A3E3D]">
                  <Check className="w-4 h-4 text-[#8B3A57] shrink-0 mt-0.5" />
                  <span>96% reported visibly refined pore clarity</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A3E3D]">
                  <Check className="w-4 h-4 text-[#8B3A57] shrink-0 mt-0.5" />
                  <span>72-hour sustained moisture lock</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A3E3D]">
                  <Check className="w-4 h-4 text-[#8B3A57] shrink-0 mt-0.5" />
                  <span>100% non-comedogenic & clean certified</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#4A3E3D]">
                  <Check className="w-4 h-4 text-[#8B3A57] shrink-0 mt-0.5" />
                  <span>Includes deluxe vegan cosmetic travel clutch</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-3xl font-semibold text-[#291F21]">
                      ${giftSet.price}
                    </span>
                    <span className="text-base text-[#9E8E8B] line-through font-normal">
                      ${giftSet.originalPrice || 140}
                    </span>
                    <span className="text-xs font-semibold text-[#8B3A57] uppercase tracking-wider">
                      Save 30%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8C7A77]">Free Express Shipping included</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openProductDetails(giftSet)}
                    className="px-5 py-3 border border-[#8C7A78] hover:border-[#4A2432] text-[#4A3E3D] hover:text-[#4A2432] text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => addToCart(giftSet, 1)}
                    className="px-7 py-3 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Claim Ritual
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
