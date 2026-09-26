import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetails } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickTags = ['Niacinamide', 'Moisturizer', 'Cleanser', 'SPF 50', 'Matte Lipstick', 'Body Lotion', 'Rosemary Scalp', 'Gift Sets'];

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="min-h-screen px-4 pt-12 pb-20 text-center sm:p-0 flex items-start justify-center">
        
        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-[#FAF8F5] shadow-2xl rounded-3xl border border-[#E8DFD7]">
          
          {/* Search Header */}
          <div className="p-6 sm:p-8 bg-white border-b border-[#E8DFD7] relative">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-[#8B3A57] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search formulas, ingredients, categories, benefits..."
                className="w-full text-base sm:text-lg text-[#261E20] placeholder-[#A89895] outline-none font-sans"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full text-[#7A6B69] hover:text-[#261E20] hover:bg-[#F2ECE5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions / Popular Tags */}
            <div className="flex items-center flex-wrap gap-2 mt-4 pt-3 border-t border-[#F2ECE5]">
              <span className="text-[11px] uppercase tracking-wider text-[#8A7976] font-semibold mr-1">
                Trending:
              </span>
              {quickTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-[#F5EFEA] hover:bg-[#EBE2DA] text-[#524544] hover:text-[#8B3A57] text-xs rounded-full transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="text-center py-8 text-[#736361]">
                <p className="text-xs uppercase tracking-widest text-[#8B3A57] font-semibold mb-1">
                  Start Typing
                </p>
                <p className="text-sm font-light">
                  Search across our entire curated collection of clean skincare, makeup, haircare, and bodycare.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-serif text-lg text-[#2E2426]">No formulas found for "{query}"</p>
                <p className="text-xs text-[#7A6B69]">
                  Try searching for ingredients like "Niacinamide", "Zinc", "Squalane", or browse by category.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#8A7976] uppercase tracking-wider mb-2">
                  Found {filteredProducts.length} results
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        openProductDetails(product);
                        setIsSearchOpen(false);
                      }}
                      className="bg-white p-3 rounded-2xl border border-[#EBE3DC] hover:border-[#8B3A57] transition-all flex items-center gap-3.5 cursor-pointer shadow-xs hover:shadow-md group"
                    >
                      <div className="w-16 h-16 bg-[#F7F4F0] rounded-xl overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-[#8B3A57] tracking-wider block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#2E2426] truncate group-hover:text-[#8B3A57]">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-serif text-sm font-bold text-[#2E2426]">
                            ${product.price}
                          </span>
                          <span className="text-[11px] text-[#7A6B69] flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-[#E5A83B] fill-current" />
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A89895] group-hover:text-[#8B3A57] transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
