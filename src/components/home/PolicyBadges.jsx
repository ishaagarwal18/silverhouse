import React from 'react';
import { ShieldCheck, Award, Sparkles, RefreshCw } from 'lucide-react';

export default function PolicyBadges() {
  const BADGES = [
    {
      icon: Sparkles,
      title: "925 Fine Silver",
      subtitle: "100% BIS Hallmarked Authenticity"
    },
    {
      icon: ShieldCheck,
      title: "6-Month Warranty",
      subtitle: "Craftsmanship & Quality Assured"
    },
    {
      icon: Award,
      title: "Lifetime Plating",
      subtitle: "Complimentary Care & Polish Support"
    },
    {
      icon: RefreshCw,
      title: "Easy 15 Days Return",
      subtitle: "No Questions Asked Instant Refunds"
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-[#FDFBF7] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3 sm:space-x-4 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8DFC9] shadow-xs hover:border-[#600814]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#600814]/5 border border-[#600814]/15 flex items-center justify-center shrink-0 group-hover:bg-[#600814] transition-colors duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#600814] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] group-hover:text-[#600814] transition-colors truncate">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-silver-600 truncate mt-0.5 font-sans">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
