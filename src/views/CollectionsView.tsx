import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, HERO_PODIUM_IMAGE, BANNER_BODYCARE_IMAGE, CATEGORY_SKINCARE_IMAGE, CATEGORY_HAIRCARE_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CollectionsView: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  const collections = [
    {
      id: 'glow',
      title: 'The Radiance Glow Collection',
      tagline: 'Triple Vitamin C, Niacinamide & Pure Damask Rose',
      description: 'Formulated to target dullness, hyperpigmentation, and cellular fatigue with botanical actives.',
      image: HERO_PODIUM_IMAGE,
      products: PRODUCTS.filter(p => p.id === 'prod-niacinamide-serum' || p.id === 'prod-dew-boost-moisturizer' || p.id === 'prod-radiant-glow-ritual-set')
    },
    {
      id: 'body-spa',
      title: 'The Atelier Body & Spa Indulgence',
      tagline: 'Whipped Shea, AHA Lactic Acid & Himalayan Botanicals',
      description: 'Luxurious textures and aromatherapeutic scents for five-star at-home relaxation.',
      image: BANNER_BODYCARE_IMAGE,
      products: PRODUCTS.filter(p => p.category === 'Bodycare')
    },
    {
      id: 'hair-density',
      title: 'Hair Density & Scalp Revitalization',
      tagline: 'Rosemary Leaf, Pea Peptides & Biomimetic Keratin',
      description: 'Clinical botanical treatments engineered to fortify weak hair follicles and encourage dense growth.',
      image: CATEGORY_HAIRCARE_IMAGE,
      products: PRODUCTS.filter(p => p.category === 'Haircare')
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8B3A57] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Formulations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#261E20] tracking-tight">
            Velvetique Collections
          </h1>
          <p className="text-sm text-[#736361] font-light leading-relaxed">
            Discover our tailored sets and curated beauty regimens designed to harmonize together for transformative results.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {collections.map((col, index) => (
            <div key={col.id} className="space-y-6">
              {/* Collection Header Banner */}
              <div className="bg-white rounded-3xl border border-[#E8DFD7] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B3A57]">
                    Collection 0{index + 1}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#291F21]">
                    {col.title}
                  </h2>
                  <p className="text-xs font-semibold text-[#5C4D4B]">
                    {col.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#7A6B69] font-light">
                    {col.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveView('shop');
                  }}
                  className="px-6 py-3 bg-[#4A2432] hover:bg-[#63293E] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs transition-colors self-start md:self-auto flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Collection Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {col.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
