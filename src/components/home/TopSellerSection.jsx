import React from 'react';
import { Heart, ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';

export default function TopSellerSection({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onQuickView,
  onSelectProduct,
  onNavigateCategory
}) {
  // Filter top sellers or bestsellers, or take first 6-8 items
  const topSellers = products.filter(p => p.isBestSeller || p.priority >= 50 || p.rating >= 4.8).slice(0, 8);

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-[#E5DAC4] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#600814] mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#600814]">
                MOST LOVED CREATIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#600814] tracking-tight">
              TOP SELLER
            </h2>
            <p className="text-xs sm:text-sm text-silver-600 mt-1 font-sans">
              Discover the most trending products in SilverHouse
            </p>
          </div>

          <button
            onClick={() => onNavigateCategory && onNavigateCategory('all')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#600814] text-[#600814] hover:bg-[#600814] hover:text-white transition-all text-xs font-bold uppercase tracking-wider group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scrollable / Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topSellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const rawDiscount = product.originalPrice && product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            const discountPercent = rawDiscount > 0 ? rawDiscount : 20;

            const imgSrc = (Array.isArray(product.images) && product.images.length > 0 && product.images[0])
              ? product.images[0]
              : '/images/hero_silver_coins.png';

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#E8DFC9] overflow-hidden hover:shadow-xl hover:border-[#600814]/30 transition-all duration-300"
              >
                {/* Image Container with Zoom & Ribbons */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F2EC]">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                  />

                  {/* Discount Ribbon Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#600814] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center space-x-1">
                      <span>Save {discountPercent}%</span>
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 shadow-md'
                        : 'bg-white/90 text-silver-600 hover:text-[#600814] hover:bg-white shadow-xs'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="w-full py-2 bg-white/95 backdrop-blur-xs text-[#600814] text-xs font-bold rounded-xl shadow-md hover:bg-[#600814] hover:text-white transition-colors uppercase tracking-wider"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Card Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category & Purity Tag */}
                    <div className="flex items-center justify-between text-[11px] text-silver-500 mb-1">
                      <span className="font-semibold text-[#AA820A] uppercase tracking-wider truncate">
                        {product.purity || '925 Sterling'}
                      </span>
                      <div className="flex items-center space-x-1 text-amber-500 shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold text-[11px] text-silver-700">{product.rating || 4.9}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A] group-hover:text-[#600814] transition-colors line-clamp-1 cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing and Add to Cart */}
                  <div className="pt-3 mt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-bold text-base sm:text-lg text-[#600814]">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-silver-400 line-through">
                            ₹{Number(product.originalPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart && onAddToCart(product, 1);
                      }}
                      className="w-9 h-9 rounded-full bg-[#600814]/10 hover:bg-[#600814] text-[#600814] hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"
                      title="Add to Shopping Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
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
