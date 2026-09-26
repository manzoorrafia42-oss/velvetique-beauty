import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

export const CategoryShowcase: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with subtle accent line like reference */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8B3A57] block mb-2">
            Explore Curations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#261E20] font-normal tracking-tight">
            Shop By Category
          </h2>
          <div className="w-12 h-0.5 bg-[#8B3A57] mx-auto mt-3" />
        </div>

        {/* Categories Grid (6 Arch/Round Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => navigateToCategory(category.id as CategoryType)}
              className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
            >
              {/* Arch / Round Image Container with elegant borders and hover zoom */}
              <div className="w-32 h-44 sm:w-36 sm:h-48 rounded-[48px] overflow-hidden bg-[#ECE4DC] border-2 border-[#E8DFD7] group-hover:border-[#8B3A57] transition-all duration-300 relative shadow-sm group-hover:shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Title & Count */}
              <div className="mt-3.5 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2B2324] group-hover:text-[#8B3A57] transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-[#8C7A77]">
                  {category.itemCount} Products
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
