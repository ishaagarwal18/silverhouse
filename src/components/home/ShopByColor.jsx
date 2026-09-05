import React from 'react';

export default function ShopByColor({ onSelectFinish, onNavigateCategory }) {
  const FINISHES = [
    {
      id: 'fine-silver',
      title: 'Shine in Silver',
      buttonLabel: 'FINE SILVER',
      image: '/images/shine_in_silver.jpg',
      bgGradient: 'from-[#8C6B38]/30 via-[#634823]/60 to-[#2A1D0E]/90',
      category: 'silver-jewellery'
    },
    {
      id: 'rose-gold',
      title: 'Glow in Rose Gold',
      buttonLabel: 'ROSE GOLD',
      image: '/images/glow_in_rose_gold.jpg',
      bgGradient: 'from-[#B2705B]/30 via-[#7D4536]/60 to-[#321711]/90',
      category: 'silver-jewellery'
    },
    {
      id: 'oxidised',
      title: 'Bold in Oxidised',
      buttonLabel: 'OXIDISED',
      image: '/images/bold_in_oxidised.jpg',
      bgGradient: 'from-[#7F793E]/30 via-[#514D25]/60 to-[#1F1E0C]/90',
      category: 'silver-jewellery'
    }
  ];

  const handleClick = (finish) => {
    if (onSelectFinish) {
      onSelectFinish(finish.id);
    } else if (onNavigateCategory) {
      onNavigateCategory(finish.category || 'all');
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-[#FDFBF7] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#600814] tracking-wider uppercase">
            SHOP BY COLOR
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2.5 mb-3" />
          <p className="text-xs sm:text-sm text-silver-600 font-sans">
            Choose your signature finish — radiant fine silver, blushing rose gold, or royal antique oxidised craftsmanship.
          </p>
        </div>

        {/* 3 Finish Cards Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FINISHES.map((finish) => (
            <div
              key={finish.id}
              onClick={() => handleClick(finish)}
              className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border-2 border-[#E5DAC4] shadow-md hover:shadow-2xl hover:border-[#600814]/40 transition-all duration-500 cursor-pointer flex flex-col justify-between p-6"
            >
              {/* Background Image */}
              <img
                src={finish.image}
                alt={finish.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Dark Luxury Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 group-hover:from-black/70 group-hover:to-black/85 transition-all" />

              {/* Top Title */}
              <div className="relative z-10 text-center pt-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-white drop-shadow-md group-hover:text-[#F3E5AB] transition-colors italic">
                  {finish.title}
                </h3>
              </div>

              {/* Bottom Action Pill Button */}
              <div className="relative z-10 flex justify-center pb-2">
                <button
                  type="button"
                  className="w-full py-3.5 bg-[#600814] text-white font-serif text-xs sm:text-sm font-bold tracking-[0.2em] rounded-xl shadow-lg group-hover:bg-[#7D0C1D] group-hover:shadow-xl transition-all duration-300 uppercase cursor-pointer"
                >
                  {finish.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
