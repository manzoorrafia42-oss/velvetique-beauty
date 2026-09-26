import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProduct, navigateToCategory } = useShop();

  const handleNav = (view: 'home' | 'shop' | 'collections' | 'about' | 'blog' | 'contact') => {
    setActiveView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1620] text-[#F3E7ED] pt-16 pb-12 border-t border-[#4A2635]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#472635]">
          
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#EAA6B8]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C12 2 12.5 7 15.5 10C18.5 13 22 13 22 13C22 13 17 14.5 14 17.5C11 20.5 11 22 11 22C11 22 10.5 17 7.5 14C4.5 11 2 11 2 11C2 11 7 9.5 10 6.5C13 3.5 12 2 12 2Z" />
              </svg>
              <span className="font-serif text-2xl tracking-[0.16em] uppercase font-medium text-white">
                Velvetique
              </span>
            </div>
            <p className="text-xs text-[#D1B8C4] leading-relaxed max-w-sm font-light">
              Velvetique Beauty crafts clinical botanical skincare and weightless cosmetics designed to nourish your skin barrier and enhance your innate radiance without compromise.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-[#42212F] hover:bg-[#8B3A57] text-[#FAF4F0] flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-[#42212F] hover:bg-[#8B3A57] text-[#FAF4F0] flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-[#42212F] hover:bg-[#8B3A57] text-[#FAF4F0] flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-full bg-[#42212F] hover:bg-[#8B3A57] text-[#FAF4F0] flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#EAA6B8]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#D1B8C4]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">
                  Shop All
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('collections')} className="hover:text-white transition-colors">
                  Curated Collections
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors">
                  Skin Journal / Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#EAA6B8]">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#D1B8C4]">
              {(['Skincare', 'Makeup', 'Haircare', 'Bodycare', 'Sun Care', 'Gift Sets'] as CategoryType[]).map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => navigateToCategory(cat)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#EAA6B8]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#D1B8C4]">
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">
                  Shipping & Handling
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-white transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Skincare FAQs
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#EAA6B8]">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-[#D1B8C4]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EAA6B8] shrink-0 mt-0.5" />
                <span>450 Beverly Hills Blvd, Los Angeles, CA 90210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EAA6B8] shrink-0" />
                <span>care@velvetiquebeauty.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#EAA6B8] shrink-0" />
                <span>+1 (800) 835-8384</span>
              </p>
              <p className="text-[11px] text-[#A68897] pt-1">
                Mon - Fri: 8am - 6pm PST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BFA6B3] gap-4">
          <p>© {new Date().getFullYear()} Velvetique Beauty Inc. All rights reserved. Clean luxury skincare.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Carbon Neutral Operations</span>
            <span>·</span>
            <span>Leaping Bunny Certified</span>
            <span>·</span>
            <span>FSC Certified Recycled Packaging</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
