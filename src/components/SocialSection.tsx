import React from 'react';
import { Instagram } from 'lucide-react';
import {
  HERO_PODIUM_IMAGE,
  BANNER_BODYCARE_IMAGE,
  CATEGORY_SKINCARE_IMAGE,
  CATEGORY_MAKEUP_IMAGE,
  CATEGORY_HAIRCARE_IMAGE
} from '../data/products';

export const SocialSection: React.FC = () => {
  const posts = [
    { image: HERO_PODIUM_IMAGE, handle: '@elena_glows', likes: '1.4k' },
    { image: CATEGORY_SKINCARE_IMAGE, handle: '@claudia_routine', likes: '890' },
    { image: BANNER_BODYCARE_IMAGE, handle: '@sarah.wellness', likes: '2.1k' },
    { image: CATEGORY_MAKEUP_IMAGE, handle: '@chloe_luxe', likes: '1.7k' },
    { image: CATEGORY_HAIRCARE_IMAGE, handle: '@velvetique_community', likes: '3.2k' }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-[#EAE1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.28em] font-semibold text-[#8B3A57] block mb-1">
            Join The Community
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#261E20] font-normal tracking-tight">
            #VelvetiqueBeauty
          </h2>
          <p className="text-xs sm:text-sm text-[#736361] mt-2 font-light">
            Tag us in your morning and evening skincare shelfies for a chance to be featured & receive $100 store credit.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#ECE4DC] shadow-xs cursor-pointer"
            >
              <img
                src={post.image}
                alt="Velvetique community showcase"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#4A2432]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 mb-2" />
                <span className="text-xs font-semibold">{post.handle}</span>
                <span className="text-[10px] text-[#F5D8E0] mt-0.5">♥ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
