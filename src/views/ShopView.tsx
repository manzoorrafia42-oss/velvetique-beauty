import React, { useState, useMemo } from 'react';
import { ChevronRight, Filter, SlidersHorizontal, ArrowUpDown, Search, RotateCcw, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailView } from './ProductDetailView';
import { CategoryType, Product } from '../types';

export const ShopView: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
    setActiveView
  } = useShop();

  // Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<'all' | 'under-30' | '30-45' | 'over-45'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // If a product is currently selected, render the PDP!
  if (selectedProduct) {
    return <ProductDetailView product={selectedProduct} />;
  }

  const categoryList: (CategoryType | 'All')[] = [
    'All',
    'Skincare',
    'Makeup',
    'Haircare',
    'Bodycare',
    'Sun Care',
    'Gift Sets'
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          prod.name.toLowerCase().includes(q) ||
          prod.tagline.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price
      if (priceRange === 'under-30' && prod.price >= 30) return false;
      if (priceRange === '30-45' && (prod.price < 30 || prod.price > 45)) return false;
      if (priceRange === 'over-45' && prod.price <= 45) return false;

      // Rating
      if (minRating > 0 && prod.rating < minRating) return false;

      // Stock
      if (inStockOnly && !prod.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery !== '' ||
    priceRange !== 'all' ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#7A6B69] mb-4 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-[#8B3A57] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA5]" />
          <span className="text-[#8B3A57] font-medium">Shop</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA5]" />
              <span className="text-[#2B2324] font-semibold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Page Title & Category Description */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#261E20] font-normal tracking-tight">
            {selectedCategory === 'All' ? 'All Formulas & Curations' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-[#736361] mt-2 max-w-2xl font-light">
            {selectedCategory === 'All'
              ? 'Explore our full suite of dermatologist-tested botanical rituals, clean active serums, weightless makeup, and luxury bodycare.'
              : CATEGORIES.find(c => c.name === selectedCategory)?.description || 'Clinically proven clean beauty rituals.'}
          </p>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#EAE1D8] mb-8">
          {categoryList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8B3A57] text-white shadow-sm'
                  : 'bg-white text-[#574846] border border-[#DFD3C8] hover:border-[#8B3A57] hover:text-[#8B3A57]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar: Search, Filters toggle, Sorting, Count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE1D8] mb-8">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7A77] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products in this view..."
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] placeholder-[#A3928F] focus:border-[#8B3A57] outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7A77] hover:text-[#2E2426]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D9CBC2] rounded-xl text-[#524544]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#8B3A57]" />
              )}
            </button>

            {/* Product Count */}
            <span className="text-[#7A6B69] hidden md:inline">
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} products
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-[#7A6B69] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border border-[#D9CBC2] rounded-xl text-xs text-[#2E2426] font-medium outline-none focus:border-[#8B3A57] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Left Sidebar Filters (3 Cols) */}
          <div className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD7] space-y-6 shadow-2xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E6DE]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2324] flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#8B3A57]" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#8B3A57] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#574846] block">
                  Price Range
                </label>
                <div className="space-y-1.5 text-xs text-[#524544]">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-30', label: 'Under $30' },
                    { id: '30-45', label: '$30 to $45' },
                    { id: 'over-45', label: 'Over $45' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-[#8B3A57]">
                      <input
                        type="radio"
                        name="price-filter"
                        checked={priceRange === item.id}
                        onChange={() => setPriceRange(item.id as any)}
                        className="accent-[#8B3A57]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2 pt-3 border-t border-[#F0E6DE]">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#574846] block">
                  Customer Rating
                </label>
                <div className="space-y-1.5 text-xs text-[#524544]">
                  {[
                    { val: 0, label: 'All Ratings' },
                    { val: 4.9, label: '4.9★ & above' },
                    { val: 4.8, label: '4.8★ & above' }
                  ].map(item => (
                    <label key={item.val} className="flex items-center gap-2 cursor-pointer hover:text-[#8B3A57]">
                      <input
                        type="radio"
                        name="rating-filter"
                        checked={minRating === item.val}
                        onChange={() => setMinRating(item.val)}
                        className="accent-[#8B3A57]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="pt-3 border-t border-[#F0E6DE]">
                <label className="flex items-center gap-2 text-xs text-[#524544] cursor-pointer hover:text-[#8B3A57]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="accent-[#8B3A57] rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Close Mobile Filter */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden w-full py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
              >
                Apply Filters
              </button>

            </div>
          </div>

          {/* Product Grid Area (9 Cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E8DFD7] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF4F0] text-[#8B3A57] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#291F21]">
                  No matching formulas found
                </h3>
                <p className="text-xs text-[#7A6B69] max-w-sm mx-auto">
                  We couldn't find any products matching your active filters. Try clearing your filters to explore our full selection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs hover:bg-[#722A42] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
