import React from 'react';
import { Hero } from '../components/Hero';
import { BenefitsBar } from '../components/BenefitsBar';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { BestSellersSection } from '../components/BestSellersSection';
import { NewArrivalsSection } from '../components/NewArrivalsSection';
import { FeaturedCollectionSection } from '../components/FeaturedCollectionSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { SocialSection } from '../components/SocialSection';
import { TrustBadgesStrip } from '../components/TrustBadgesStrip';

export const HomeView: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <BenefitsBar />
      <CategoryShowcase />
      <PromotionalBanner />
      <BestSellersSection />
      <NewArrivalsSection />
      <FeaturedCollectionSection />
      <ReviewsSection />
      <NewsletterSection />
      <SocialSection />
      <TrustBadgesStrip />
    </div>
  );
};
