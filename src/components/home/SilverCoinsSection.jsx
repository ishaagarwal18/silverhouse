import React from 'react';
import { Sparkles, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SilverCoinsSection({ onNavigateCategory, onNavigateYatraCustomizer }) {
  const HIGHLIGHTS = [
    {
      title: "999 Fine Purity Assay",
      desc: "Guaranteed 99.9% fine silver stamped with national hallmark laboratory certification."
    },
    {
      title: "Tamper-Evident Packaging",
      desc: "Hermetically sealed blister certicards protecting coins against oxidation and transit damage."
    },
    {
      title: "Custom Photo & Name Engraving",
      desc: "Memorialize life's greatest blessings with custom family photos & auspicious inscriptions."
    },
    {
      title: "Zero Making Loss Guarantee",
      desc: "Investment-grade bullion bars with certified buyback value across India."
    }
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#AA820A] tracking-[0.25em] uppercase bg-[#D4AF37]/15 px-3.5 py-1 rounded-full inline-block mb-3 border border-[#D4AF37]/30">
            999 BULLION & COMMEMORATIVE GIFTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#600814] tracking-wide">
            SILVER COINS & BARS
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2.5 mb-3" />
          <p className="text-xs sm:text-sm text-silver-600 font-sans">
            Pure 999 fine investment bars, auspicious temple coins, and personalized keepsake tokens.
          </p>
        </div>

        {/* 2-Column Banner Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Large Visual: Personalized Silver Photo Coins & Keepsakes */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border-2 border-[#E5DAC4] shadow-xl group">
            <img
              src="/images/personalized_silver_coin.jpg"
              alt="Personalized Pure 999 Silver Gifts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 text-white z-10">
              <span className="bg-[#600814] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block border border-white/20">
                LIFELONG KEEPSAKE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 leading-snug">
                Personalized 999 Silver Photo Coins & Gifts
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 max-w-lg mb-4 font-sans">
                Preserve newborn smiles, wedding vows, and anniversary milestones in pure 999 silver with custom laser photo medallion engravings.
              </p>
              <button
                onClick={() => onNavigateCategory && onNavigateCategory('silver-coins-bars')}
                className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-serif text-xs font-bold tracking-widest uppercase hover:bg-[#E5C158] transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <span>EXPLORE ALL COINS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Highlights & Investment Features */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFC9] shadow-md">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#600814] mb-4">
                Assay Certified Silver Bullion
              </h3>
              
              <div className="space-y-4">
                {HIGHLIGHTS.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5">
                    <CheckCircle2 className="w-5 h-5 text-[#AA820A] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1A]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-silver-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#F0EBE1] flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateCategory && onNavigateCategory('silver-coins-bars')}
                  className="flex-1 py-3 bg-[#600814] text-white font-serif text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#7D0C1D] transition-colors text-center cursor-pointer shadow-sm"
                >
                  Shop Bullion Coins
                </button>
                <button
                  onClick={onNavigateYatraCustomizer}
                  className="flex-1 py-3 border border-[#600814] text-[#600814] font-serif text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#600814] hover:text-white transition-colors text-center cursor-pointer"
                >
                  Custom Photo Gifts
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
