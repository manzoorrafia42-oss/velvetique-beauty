import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-22 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-1 text-[#E5A83B] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs font-bold text-[#2E2426] ml-2">4.9 / 5.0 Average</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#261E20] font-normal tracking-tight">
            Loved By 50,000+ Real Faces
          </h2>
          <p className="text-sm text-[#736361] mt-2 font-light">
            Read verified experiences from real customers who upgraded their daily rituals with Velvetique.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE1D8] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E5A83B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h4 className="font-serif text-base font-semibold text-[#291F21]">
                  "{rev.title}"
                </h4>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#61514F] leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product metadata */}
              <div className="pt-3 border-t border-[#F2ECE5] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#2E2426]">
                    {rev.author}
                  </span>
                  <span className="text-[10px] text-[#A69794]">
                    {rev.date}
                  </span>
                </div>
                {rev.skinType && (
                  <p className="text-[10px] text-[#8C7A77]">
                    Skin Profile: <span className="text-[#594B49]">{rev.skinType}</span>
                  </p>
                )}
                {rev.productName && (
                  <p className="text-[10px] text-[#8B3A57] font-medium truncate">
                    Purchased: {rev.productName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
