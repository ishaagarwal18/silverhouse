import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SilverTreasureSection({ onNavigateCategory, onNavigateYatraCustomizer }) {
  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#AA820A] tracking-[0.25em] uppercase bg-[#D4AF37]/15 px-3.5 py-1 rounded-full inline-block mb-3 border border-[#D4AF37]/30">
            ARTISANAL CRAFTSMANSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#600814] tracking-wide">
            SILVER TREASURE
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2.5 mb-3" />
          <p className="text-xs sm:text-sm text-silver-600 font-sans">
            Heirloom creations sanctified with authentic 925 & 999 silver purity for divine puja rooms and timeless dining.
          </p>
        </div>

        {/* 2 Large Feature Banner Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Divine Blessings in 925 Silver Idols */}
          <div
            onClick={() => onNavigateCategory && onNavigateCategory('silver-religious-idols')}
            className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#E5DAC4] cursor-pointer flex flex-col justify-end p-6 sm:p-7"
          >
            <img
              src="/images/silver_cow_calf_idol.jpg"
              alt="Divine Blessings in 925 Silver Idols"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 transition-all" />

            <div className="relative z-10 text-white">
              <span className="inline-flex items-center space-x-1.5 bg-[#600814] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-white/20">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>POOJA & MANDIR SANCTUM</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-white group-hover:text-[#F3E5AB] transition-colors leading-snug">
                Divine Blessings in 925 Silver Idols
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 font-sans mb-5 max-w-lg">
                Intricately cast Kamdhenu Cow, Radha Krishna, Bal Gopal, and Lord Ganesha murti idols, blessed with pure hallmark purity.
              </p>

              <button
                type="button"
                className="px-6 py-2.5 rounded-full border-2 border-white text-white font-serif text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#600814] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE IDOLS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Purity Served in 925 Silver Utensils */}
          <div
            onClick={() => onNavigateCategory && onNavigateCategory('all')}
            className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#E5DAC4] cursor-pointer flex flex-col justify-end p-6 sm:p-7"
          >
            <img
              src="/images/silver_utensils_pooja.jpg"
              alt="Purity Served in 925 Silver Utensils"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 transition-all" />

            <div className="relative z-10 text-white">
              <span className="inline-flex items-center space-x-1.5 bg-[#AA820A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-white/20">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>SACRED DINING & ARTIFACTS</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 text-white group-hover:text-[#F3E5AB] transition-colors leading-snug">
                Purity Served in 925 Silver Utensils
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 font-sans mb-5 max-w-lg">
                Handcrafted pure silver Pooja Thalis, traditional Diyas, Panchamrit Spoons, and ceremonial feeding bowls for your home.
              </p>

              <button
                type="button"
                className="px-6 py-2.5 rounded-full border-2 border-white text-white font-serif text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#600814] transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE UTENSILS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Support block: Customized Yatra Lockets Showcase */}
        <div
          onClick={onNavigateYatraCustomizer}
          className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 bg-gradient-to-r from-[#4A0812] via-[#2F040B] to-[#1F0207] p-8 sm:p-10 text-white shadow-xl cursor-pointer hover:border-[#D4AF37] transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">MADE-TO-ORDER PERSONALIZATION</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Customized Pure Silver Yatra & Photo Lockets
            </h3>
            <p className="text-xs sm:text-sm text-silver-300 font-sans">
              Enshrine sacred pilgrimage memories, family portraits, or deity images with custom Gotra laser engraving in 925 hallmarked sterling silver.
            </p>
          </div>

          <button
            type="button"
            className="px-8 py-3.5 rounded-full bg-[#D4AF37] text-black font-serif text-xs font-bold tracking-widest uppercase hover:bg-[#E5C158] transition-all shadow-lg flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>CUSTOMIZE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
