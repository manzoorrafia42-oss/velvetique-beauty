import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const BestSellersSection: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProduct } = useShop();

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  const handleViewAll = () => {
    setSelectedCategory('All');
    setSelectedProduct(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and "VIEW ALL" link */}
        <div className="flex items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E8DFD7]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8B3A57] block mb-1">
              Customer Obsessions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#261E20] font-normal tracking-tight uppercase">
              Best Sellers
            </h2>
          </div>

          <button
            onClick={handleViewAll}
            className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B3A57] hover:text-[#5B1F32] flex items-center gap-1.5 transition-colors group cursor-pointer pb-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
