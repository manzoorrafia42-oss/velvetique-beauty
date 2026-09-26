import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const NewArrivalsSection: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProduct } = useShop();

  // Pick new or recently launched products
  const newArrivals = PRODUCTS.filter(p => p.isNew || p.badge === 'Popular' || p.category === 'Sun Care').slice(0, 4);

  const handleExploreNew = () => {
    setSelectedCategory('All');
    setSelectedProduct(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-18 bg-[#F5EFE9]/60 border-t border-[#EAE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E2D6CB] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8B3A57] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Just Formulated</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#261E20] font-normal tracking-tight">
              New Arrivals
            </h2>
          </div>

          <button
            onClick={handleExploreNew}
            className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B3A57] hover:text-[#5B1F32] flex items-center gap-1.5 transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
