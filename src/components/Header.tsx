import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountModalOpen,
    activeView,
    setActiveView,
    setSelectedCategory,
    setSelectedProduct,
    navigateToCategory,
    user
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'shop' | 'collections' | 'about' | 'blog' | 'contact') => {
    setActiveView(view);
    setSelectedProduct(null);
    if (view === 'shop') {
      setSelectedCategory('All');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: CategoryType) => {
    navigateToCategory(category);
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE3DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A3E3D] hover:text-[#6B2D44] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Wordmark (Zone 1) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex flex-col items-center sm:items-start text-left focus:outline-none"
            >
              <div className="flex items-center gap-1.5">
                {/* Botanical leaf emblem */}
                <svg className="w-6 h-6 text-[#8B3A57] transition-transform duration-300 group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 12.5 7 15.5 10C18.5 13 22 13 22 13C22 13 17 14.5 14 17.5C11 20.5 11 22 11 22C11 22 10.5 17 7.5 14C4.5 11 2 11 2 11C2 11 7 9.5 10 6.5C13 3.5 12 2 12 2Z" opacity="0.85"/>
                </svg>
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#2E2426] uppercase">
                  Velvetique
                </span>
              </div>
              <span className="text-[9px] tracking-[0.38em] uppercase text-[#8A7976] -mt-1 font-sans pl-7">
                Beauty & Skincare
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-[#524544]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'home' ? 'text-[#8B3A57] font-semibold' : ''}`}
            >
              Home
              {activeView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
              )}
            </button>

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('shop')}
                className={`flex items-center gap-1 hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'shop' ? 'text-[#8B3A57] font-semibold' : ''}`}
              >
                Shop
                <ChevronDown className="w-3.5 h-3.5" />
                {activeView === 'shop' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
                )}
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#FAF8F5] border border-[#E8DFD7] rounded-xl shadow-xl py-3 px-2 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        handleNavClick('shop');
                        setShopDropdownOpen(false);
                      }}
                      className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#2E2426] hover:bg-[#F2ECE5] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>All Products</span>
                      <span className="text-[11px] text-[#8A7976] font-normal lowercase">browse all</span>
                    </button>
                    <div className="h-px bg-[#EFE8E1] my-1" />
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id as CategoryType)}
                        className="text-left px-3 py-2 text-xs text-[#524544] hover:text-[#8B3A57] hover:bg-[#F5EFE9] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#A69794]">{cat.itemCount}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('collections')}
              className={`hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'collections' ? 'text-[#8B3A57] font-semibold' : ''}`}
            >
              Collections
              {activeView === 'collections' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'about' ? 'text-[#8B3A57] font-semibold' : ''}`}
            >
              About Us
              {activeView === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'blog' ? 'text-[#8B3A57] font-semibold' : ''}`}
            >
              Blog
              {activeView === 'blog' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#8B3A57] transition-colors relative py-1 ${activeView === 'contact' ? 'text-[#8B3A57] font-semibold' : ''}`}
            >
              Contact
              {activeView === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A57]" />
              )}
            </button>
          </nav>

          {/* Action Icons (Zone 3) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A3E3D] hover:text-[#8B3A57] transition-colors rounded-full hover:bg-[#F2ECE5]"
              aria-label="Search Catalog"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-[#4A3E3D] hover:text-[#8B3A57] transition-colors rounded-full hover:bg-[#F2ECE5] relative"
              aria-label="User Account"
              title={user.isLoggedIn ? `Account: ${user.name}` : 'Sign In'}
            >
              <User className="w-5 h-5" />
              {user.isLoggedIn && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B3A57] rounded-full ring-2 ring-[#FAF8F5]" />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#4A3E3D] hover:text-[#8B3A57] transition-colors rounded-full hover:bg-[#F2ECE5] relative"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B3A57] text-[#FAF4F0] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-2 px-3 bg-[#4A2432] hover:bg-[#612A3D] text-[#FAF4F0] rounded-full transition-all duration-200 shadow-sm active:scale-95"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F7D8E0]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D97E96] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium tracking-wider hidden sm:inline">
                Cart {cartCount > 0 && `(${cartCount})`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD7] bg-[#FAF8F5] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium tracking-wide uppercase text-[#4A3E3D]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 hover:text-[#8B3A57] border-b border-[#EFE8E1]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2 hover:text-[#8B3A57] border-b border-[#EFE8E1]"
            >
              All Products
            </button>

            {/* Categories Mobile List */}
            <div className="pl-3 py-1 space-y-2 border-l-2 border-[#E8DFD7] my-1">
              <span className="text-[11px] text-[#8A7976] font-semibold uppercase tracking-widest block">
                Categories
              </span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id as CategoryType)}
                  className="block text-left text-xs text-[#524544] hover:text-[#8B3A57] py-1"
                >
                  {cat.name} ({cat.itemCount})
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 hover:text-[#8B3A57] border-b border-[#EFE8E1]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 hover:text-[#8B3A57] border-b border-[#EFE8E1]"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 hover:text-[#8B3A57] border-b border-[#EFE8E1]"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#8B3A57]"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 border-t border-[#E8DFD7] flex items-center justify-between text-xs text-[#7A6B69]">
            <span>Need assistance? hello@velvetiquebeauty.com</span>
          </div>
        </div>
      )}
    </header>
  );
};
