import React from 'react';
import { Leaf, Award, Heart, Globe, Sparkles, Check } from 'lucide-react';
import { HERO_PODIUM_IMAGE, BANNER_BODYCARE_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const AboutView: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <div className="py-12 sm:py-20 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Brand Mission Statement */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#8B3A57] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261E20] font-normal leading-[1.1]">
            Radiant Skin. Real Confidence.
          </h1>
          <p className="text-sm sm:text-base text-[#6E5C5A] font-light leading-relaxed">
            Velvetique Beauty was born from a singular belief: high-performance clinical skincare should feel deeply indulgent, clean, and respectful of your natural biology.
          </p>
        </div>

        {/* Story Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#E8DFD7] shadow-xl bg-[#ECE4DC] aspect-[4/3]">
            <img
              src={HERO_PODIUM_IMAGE}
              alt="Velvetique Botanical Extraction"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B3A57]">
              The Formulation Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#261E20] font-normal">
              Where Dermatological Science Meets Pure Botanicals
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4D4B] leading-relaxed font-light">
              We eliminate the false dilemma between "organic beauty" and "active clinical results." Our biochemists pair concentrated bio-compatible actives—like multi-weight Niacinamide, tripeptides, and stabilized Vitamin C—with nutrient-dense botanical extracts like Damask rose hydrosol, organic cold-pressed marula, and snow mushroom.
            </p>
            <p className="text-xs sm:text-sm text-[#5C4D4B] leading-relaxed font-light">
              Every formula is dermatologically evaluated on reactive, sensitive skin types and certified cruelty-free.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#EAE1D8]">
                <h4 className="font-serif text-2xl font-bold text-[#8B3A57]">100%</h4>
                <p className="text-xs text-[#7A6B69] mt-0.5">Toxin-Free & Sulfate-Free</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EAE1D8]">
                <h4 className="font-serif text-2xl font-bold text-[#8B3A57]">50,000+</h4>
                <p className="text-xs text-[#7A6B69] mt-0.5">Loyal Radiant Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="bg-white rounded-3xl border border-[#E8DFD7] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#291F21]">
              The Four Velvetique Pillars
            </h3>
            <p className="text-xs text-[#7A6B69]">
              Every single drop adheres to our non-negotiable formulation standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EFE7E0] space-y-2">
              <Leaf className="w-6 h-6 text-[#8B3A57]" />
              <h4 className="font-serif text-base font-semibold text-[#291F21]">Pure & Clean</h4>
              <p className="text-xs text-[#6E5D5B] leading-relaxed">
                Formulated without over 2,500 questionable ingredients, including synthetic dyes, parabens, and microplastics.
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EFE7E0] space-y-2">
              <Award className="w-6 h-6 text-[#8B3A57]" />
              <h4 className="font-serif text-base font-semibold text-[#291F21]">Clinically Proven</h4>
              <p className="text-xs text-[#6E5D5B] leading-relaxed">
                Tested in third-party clinical trials with instrument measurements to guarantee real, visible transformation.
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EFE7E0] space-y-2">
              <Heart className="w-6 h-6 text-[#8B3A57]" />
              <h4 className="font-serif text-base font-semibold text-[#291F21]">Cruelty-Free Always</h4>
              <p className="text-xs text-[#6E5D5B] leading-relaxed">
                Certified by Leaping Bunny. We never test on animals, nor do we partner with ingredient suppliers who do.
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EFE7E0] space-y-2">
              <Globe className="w-6 h-6 text-[#8B3A57]" />
              <h4 className="font-serif text-base font-semibold text-[#291F21]">Eco-Conscious</h4>
              <p className="text-xs text-[#6E5D5B] leading-relaxed">
                Packaged in frosted recyclable glass and FSC-certified unbleached cartons printed with soy vegetable ink.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <button
            onClick={() => setActiveView('shop')}
            className="px-8 py-3.5 bg-[#8B3A57] hover:bg-[#722A42] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md transition-all cursor-pointer"
          >
            Experience The Formulas
          </button>
        </div>

      </div>
    </div>
  );
};
