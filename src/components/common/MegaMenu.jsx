import React, { useState } from 'react';
import { CATEGORIES } from '../../data/products';
import { ChevronRight, Sparkles, Shield, Gift, ArrowRight } from 'lucide-react';

export default function MegaMenu({ onSelectCategory, onSelectSubcategory, onClose }) {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-b border-silver-200 shadow-2xl z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto flex min-h-[380px]">
        {/* Left Vertical Categories List */}
        <div className="w-1/4 border-r border-silver-100 bg-[#FAFAFA] py-4">
          <p className="px-6 py-2 text-[10px] font-bold tracking-widest text-silver-500 uppercase">
            Explore Sacred Collections
          </p>
          <ul className="mt-1 space-y-1">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <li key={cat.id}>
                  <button
                    onMouseEnter={() => setActiveTab(cat.id)}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`w-full px-6 py-3 text-left font-medium text-sm flex items-center justify-between transition-all ${
                      isActive 
                        ? 'bg-white text-[#1A1A1A] font-semibold border-l-4 border-[#D4AF37] shadow-xs' 
                        : 'text-silver-700 hover:text-[#1A1A1A] hover:bg-silver-100/50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#D4AF37] translate-x-1' : 'text-silver-400'}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Content Area for Active Category */}
        <div className="w-3/4 p-8 flex justify-between gap-8 bg-white">
          {/* Subcategories Column */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 border-b border-silver-100 pb-3 mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                {activeCategory.name}
              </h3>
              <span className="bg-[#D4AF37]/10 text-[#AA820A] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                BIS Certified
              </span>
            </div>

            <p className="text-xs text-silver-600 mb-6 font-normal">
              {activeCategory.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onSelectSubcategory(activeCategory.id, sub.id);
                    onClose();
                  }}
                  className="group p-3.5 rounded-lg border border-silver-100 hover:border-[#D4AF37] hover:bg-[#FAFAFA] transition-all text-left flex flex-col justify-between"
                >
                  <span className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#AA820A] transition-colors">
                    {sub.name}
                  </span>
                  <span className="mt-2 text-xs text-silver-500 flex items-center group-hover:translate-x-1 transition-transform">
                    Explore Collection <ArrowRight className="w-3 h-3 ml-1 text-[#D4AF37]" />
                  </span>
                </button>
              ))}
            </div>

            {/* Purity Guarantee Badge Pill */}
            <div className="mt-8 pt-4 border-t border-silver-100 flex items-center space-x-6 text-xs text-silver-600">
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <span>999 Fine Pure / 925 Sterling Silver</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Tamper-Proof Blister Seal</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom Engraving Available</span>
              </div>
            </div>
          </div>

          {/* Featured Visual Spotlight Card */}
          <div className="w-72 bg-silver-50 rounded-xl overflow-hidden border border-silver-200 flex flex-col justify-between relative group">
            <img 
              src={activeCategory.heroBanner} 
              alt={activeCategory.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="p-4 bg-white flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">
                  Featured Craft
                </span>
                <h4 className="font-serif text-base font-semibold text-[#1A1A1A] mt-1">
                  Handcrafted {activeCategory.shortName}
                </h4>
                <p className="text-xs text-silver-600 mt-1 line-clamp-2">
                  Sacred perfection hallmarked for authenticity & spiritual harmony.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectCategory(activeCategory.id);
                  onClose();
                }}
                className="mt-4 w-full py-2 bg-[#1A1A1A] hover:bg-[#D4AF37] text-white hover:text-black text-xs font-semibold rounded transition-colors flex items-center justify-center space-x-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
