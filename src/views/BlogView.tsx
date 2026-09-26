import React, { useState } from 'react';
import { ArrowRight, Calendar, User, Clock, Sparkles } from 'lucide-react';
import { HERO_PODIUM_IMAGE, BANNER_BODYCARE_IMAGE, CATEGORY_SKINCARE_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const BlogView: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: 'The Science of Niacinamide: Why 10% is the Dermatological Gold Standard',
      excerpt: 'How Vitamin B3 repairs broken lipid barriers, balances sebum, and tightens stretched pores without triggering sensitivity or flushing.',
      author: 'Dr. Audrey Vance, MD',
      date: 'Sep 21, 2026',
      readTime: '4 min read',
      category: 'Ingredient Science',
      image: CATEGORY_SKINCARE_IMAGE,
      content: `Niacinamide (Vitamin B3) is one of the rare skincare actives celebrated uniformly across clinical research and organic botanical circles. Unlike volatile actives such as pure L-Ascorbic acid or retinoids that demand complex pH buffering and risk inflammatory purging, Niacinamide functions harmoniously at skin-neutral pH 5.5 to 6.5.

At 10% clinical concentration, studies indicate a 44% reduction in sebum oxidation within 14 days, coupled with increased production of intracellular ceramides. When combined with Zinc PCA—as we have engineered in the Velvetique Radiance Serum—it forms a microscopic defense matrix that accelerates post-acne mark healing while refining pore diameter.`
    },
    {
      id: 2,
      title: 'Ceramides vs. Squalane: How to Diagnose and Repair Your Damaged Moisture Mantle',
      excerpt: 'If your skin stings when applying mild mists or feels tight under makeup, your lipid bilayer is compromised. Here is your 3-step triage guide.',
      author: 'Camilla Moreau, Lead Esthetician',
      date: 'Sep 14, 2026',
      readTime: '6 min read',
      category: 'Barrier Health',
      image: HERO_PODIUM_IMAGE,
      content: `Your skin's outermost barrier—the stratum corneum—is famously described as bricks (corneocyte skin cells) and mortar (lipids). When over-exfoliation or harsh sulfates dissolve the lipid mortar, trans-epidermal water loss (TEWL) skyrockets.

Squalane acts as a biomimetic lightweight emollient that mirrors your body's natural sebum, preventing atmospheric moisture escape. Ceramides, on the other hand, provide the structural building blocks that lock those cells together. In the Velvetique Hydra-Intense Gel Cream, we combine olive squalane with bio-fermented peptides and snow mushroom to deliver 72-hour sustained moisture.`
    },
    {
      id: 3,
      title: 'The Bodycare Revolution: Why Facial-Grade Actives Belong Below the Neck',
      excerpt: 'From keratosis pilaris to sun pigmentation on the décolletage, learn why treating your body skin with stabilized Vitamin C and lactic acid is essential.',
      author: 'Elena Vance, Holistic Skin Educator',
      date: 'Sep 06, 2026',
      readTime: '5 min read',
      category: 'Body Wellness',
      image: BANNER_BODYCARE_IMAGE,
      content: `For decades, mass-market body lotions relied heavily on cheap petroleum and artificial silicones that coat skin without active therapeutic renewal. Yet skin below the neck possesses fewer sebaceous glands, making it prone to premature drying, crepey texture, and keratosis pilaris bumps.

By formulating the Velvetique Brightening Body Lotion with stabilized Ascorbyl Glucoside (Vitamin C) alongside 5% Lactic Acid (AHA) and unrefined Ghanaian shea butter, the formula dissolves cellular glue while drenching parched limbs in long-lasting satin nourishment.`
    }
  ];

  return (
    <div className="py-12 sm:py-18 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#8B3A57] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            The Velvetique Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#261E20] tracking-tight">
            Skin Intelligence & Rituals
          </h1>
          <p className="text-sm text-[#736361] font-light leading-relaxed">
            Evidence-based ingredient breakdowns, esthetician advice, and seasonal skin barrier protocols.
          </p>
        </div>

        {/* Modal / Reading View if an article is clicked */}
        {selectedArticle !== null && (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8DFD7] shadow-lg max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-xs font-semibold uppercase tracking-wider text-[#8B3A57] hover:underline cursor-pointer"
            >
              ← Back to All Articles
            </button>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8B3A57]">
                {articles.find(a => a.id === selectedArticle)?.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#291F21]">
                {articles.find(a => a.id === selectedArticle)?.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-[#7A6B69] pt-1">
                <span>By {articles.find(a => a.id === selectedArticle)?.author}</span>
                <span>·</span>
                <span>{articles.find(a => a.id === selectedArticle)?.date}</span>
                <span>·</span>
                <span>{articles.find(a => a.id === selectedArticle)?.readTime}</span>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#F2ECE5]">
              <img
                src={articles.find(a => a.id === selectedArticle)?.image}
                alt="Article cover"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-sm text-[#4A3E3D] leading-relaxed space-y-4 whitespace-pre-line font-light">
              {articles.find(a => a.id === selectedArticle)?.content}
            </div>

            <div className="pt-6 border-t border-[#F2ECE5] flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCategory('Skincare');
                  setActiveView('shop');
                }}
                className="px-6 py-2.5 bg-[#8B3A57] text-white text-xs font-semibold uppercase tracking-wider rounded-full"
              >
                Shop Related Formulas
              </button>
            </div>
          </div>
        )}

        {/* 3-Column Articles Grid */}
        {selectedArticle === null && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article.id)}
                className="bg-white rounded-3xl border border-[#E8DFD7] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/10] bg-[#ECE4DC] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 space-y-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#8B3A57]">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#291F21] group-hover:text-[#8B3A57] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#6B5A58] line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-[11px] text-[#8A7976] border-t border-[#F5EFE9] mt-4">
                  <span>{article.date}</span>
                  <span className="font-medium text-[#8B3A57] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
