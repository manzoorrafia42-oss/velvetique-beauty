import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HERO_PODIUM_IMAGE, BANNER_BODYCARE_IMAGE } from '../data/products';

interface Slide {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  image: string;
  categoryFilter?: string;
}

const HERO_SLIDES: Slide[] = [
  {
    badge: 'NEW IN',
    title: 'Radiant Skin.',
    highlight: 'Real Confidence.',
    description: 'Clean, botanical formulas backed by dermatology. Formulated to nourish, protect, and empower your natural skin barrier every single day.',
    ctaText: 'SHOP NOW',
    image: HERO_PODIUM_IMAGE
  },
  {
    badge: 'LIMITED EDITION',
    title: 'Whipped Luxury.',
    highlight: 'Satin Touch.',
    description: 'Envelop your body in pure Madagascar vanilla, fresh jasmine, and rich antioxidant Vitamin C for 24-hour velvety moisture.',
    ctaText: 'EXPLORE BODYCARE',
    image: BANNER_BODYCARE_IMAGE,
    categoryFilter: 'Bodycare'
  }
];

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSelectedProduct } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCta = () => {
    if (slide.categoryFilter) {
      setSelectedCategory(slide.categoryFilter as any);
    } else {
      setSelectedCategory('All');
    }
    setSelectedProduct(null);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EBE3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left z-10">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-[#8B3A57] bg-[#F2E5E9] px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#8B3A57]" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261E20] font-normal leading-[1.08] tracking-tight">
              {slide.title}
              <span className="block font-medium italic text-[#8B3A57] mt-1">
                {slide.highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#635452] text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleCta}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#4A2432] hover:bg-[#63293E] text-[#FAF4F0] text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Skincare');
                  setActiveView('shop');
                }}
                className="w-full sm:w-auto px-7 py-3.5 border border-[#8C7A78] hover:border-[#4A2432] text-[#4A3E3D] hover:text-[#4A2432] text-xs font-medium uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer"
              >
                Explore Rituals
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-[#E8DFD7] flex items-center justify-center lg:justify-start gap-6 text-[12px] text-[#7A6B69]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A57]" />
                <span>100% Vegan & Clean</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A57]" />
                <span>Dermatologist Approved</span>
              </div>
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A57]" />
                <span>Sustainable Glass</span>
              </div>
            </div>
          </div>

          {/* Right Imagery Column matching reference layout */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-[4/3] max-h-[540px] w-full bg-[#ECE4DC] group">
              <img
                src={slide.image}
                alt="Velvetique Luxury Skincare and Beauty Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />

              {/* Gentle gradient scrim to keep edges pristine */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating product label card mimicking high end editorial look */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/80 hidden sm:flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2E2426]">
                    Botanical Dew Matrix
                  </p>
                  <p className="text-[10px] text-[#736361]">Triple Hyaluronic & Rose Extracts</p>
                </div>
              </div>
            </div>

            {/* Slider navigation arrows */}
            <div className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 z-20">
              <button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-[#4A3E3D] hover:text-[#8B3A57] rounded-full shadow-lg flex items-center justify-center transition-all border border-[#EBE3DC] hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 z-20">
              <button
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-[#4A3E3D] hover:text-[#8B3A57] rounded-full shadow-lg flex items-center justify-center transition-all border border-[#EBE3DC] hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-[#8B3A57]' : 'w-2 bg-[#D1C4BC] hover:bg-[#A8988F]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
