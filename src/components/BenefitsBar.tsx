import React from 'react';
import { Leaf, Award, HeartHandshake, Globe } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: Leaf,
      title: 'Clean Ingredients',
      subtitle: 'Safe, non-toxic & sulfate-free'
    },
    {
      icon: Award,
      title: 'Clinically Proven',
      subtitle: 'Dermatologically evaluated'
    },
    {
      icon: HeartHandshake,
      title: 'Cruelty Free',
      subtitle: 'We never test on animals'
    },
    {
      icon: Globe,
      title: 'Sustainable Beauty',
      subtitle: 'Good for you & the planet'
    }
  ];

  return (
    <section className="bg-white border-b border-[#EBE3DC] py-6 sm:py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#EFE7E0]">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3.5 px-3 ${index > 0 ? 'pt-4 md:pt-0' : ''}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-[#F7F1EC] text-[#8B3A57] flex items-center justify-center shrink-0 border border-[#EBE1D8] transition-transform duration-300 hover:scale-110">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-[#2B2324]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#786866] mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
