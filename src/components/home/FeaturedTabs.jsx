import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Heart, Eye, ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';

const TABS = [
  { id: "bestsellers", label: "Best Sellers", filter: (p) => p.isBestSeller },
  { id: "kids-nazariya", label: "Kids Nazariya", filter: (p) => p.category === "kids-baby" },
  { id: "pure-999-coins", label: "Pure 999 Coins", filter: (p) => p.purityCode === "999" },
  { id: "custom-gifting", label: "Custom Gifting", filter: (p) => p.isCustomizable }
];

export default function FeaturedTabs({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onSelectProduct,
  onNavigateYatraCustomizer
}) {
  const [activeTab, setActiveTab] = useState("bestsellers");

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];
  const allProds = (products && products.length > 0) ? products : PRODUCTS;
  const items = allProds.filter(currentTab.filter).slice(0, 8);

  return (
    <section className="py-16 bg-white border-y border-silver-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-[#AA820A] tracking-widest uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full inline-block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
              Featured Sacred Collections
            </h2>
          </div>

          {/* Horizontal Tabs Switcher */}
          <div className="flex space-x-2 bg-silver-100 p-1.5 rounded-xl border border-silver-200 overflow-x-auto max-w-full">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-md'
                      : 'text-silver-700 hover:text-black hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPct = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-silver-200 overflow-hidden silver-card-hover flex flex-col justify-between relative"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-square bg-silver-50 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
                    <span className="bg-[#1A1A1A]/90 backdrop-blur-xs text-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {product.purityCode === '999' ? '999 Fine Pure' : '925 Sterling'}
                    </span>
                    {discountPct && (
                      <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>

                  {/* Top Right Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isWishlisted 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-white/80 text-silver-700 hover:bg-white hover:text-black'
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>

                  {/* Quick View Hover Overlay Button */}
                  <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-full py-2 bg-white/95 backdrop-blur-xs hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white text-xs font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Weight & Rating */}
                    <div className="flex items-center justify-between text-[11px] text-silver-500 mb-1">
                      <span className="font-semibold text-silver-700">Weight: {product.weightGrams}g</span>
                      <div className="flex items-center space-x-1 text-[#D4AF37]">
                        <Star className="w-3 h-3 fill-[#D4AF37]" />
                        <span className="font-bold text-[#1A1A1A]">{product.rating}</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-semibold text-sm text-[#1A1A1A] hover:text-[#AA820A] transition-colors line-clamp-2 cursor-pointer mb-2"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div>
                    {/* Price Block */}
                    <div className="flex items-baseline space-x-2 my-2">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-silver-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* CTA Button */}
                    {product.isYatraLocket ? (
                      <button
                        onClick={onNavigateYatraCustomizer}
                        className="w-full py-2.5 bg-linear-to-r from-[#1A1A1A] to-[#333333] hover:from-[#D4AF37] hover:to-[#AA820A] text-white hover:text-black font-semibold text-xs rounded-lg transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Customize Locket</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="w-full py-2.5 bg-silver-100 hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
