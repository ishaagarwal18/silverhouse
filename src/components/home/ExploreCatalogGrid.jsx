import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Sparkles, ArrowRight } from 'lucide-react';

export default function ExploreCatalogGrid({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onQuickView,
  onSelectProduct,
  onNavigateCategory
}) {
  // Guarantee exactly 16 products for the catalog grid
  let catalog16 = [...products];
  if (catalog16.length > 0 && catalog16.length < 16) {
    // If backend returns fewer than 16 products, loop around to ensure exactly 16 cards are rendered
    let i = 0;
    while (catalog16.length < 16) {
      const source = products[i % products.length];
      catalog16.push({
        ...source,
        id: `${source.id}-dup-${catalog16.length}`
      });
      i++;
    }
  } else if (catalog16.length > 16) {
    catalog16 = catalog16.slice(0, 16);
  }

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#EADFCB]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 text-[#600814] mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              LIVE INVENTORY FROM VAULT
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#600814] tracking-wide uppercase">
            EXPLORE NOW
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2.5 mb-3" />
          <p className="text-xs sm:text-sm text-silver-600 font-sans">
            Handcrafted 925 sterling silver artifacts, divine idols, everyday jewellery & fine silver collectibles.
          </p>
        </div>

        {/* 16-Product Responsive Grid (4x4 on Desktop, 2x8 on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {catalog16.map((product, index) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const imgSrc = (Array.isArray(product.images) && product.images.length > 0 && product.images[0])
              ? product.images[0]
              : '/images/hero_silver_coins.png';

            const rawDiscount = product.originalPrice && product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            const discountPercent = rawDiscount > 0 ? rawDiscount : 15;

            return (
              <div
                key={`${product.id}-${index}`}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#E8DFC9] overflow-hidden hover:shadow-xl hover:border-[#600814]/30 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F2EC]">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                  />

                  {/* Bestseller Badge or Discount Ribbon */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.isBestSeller && (
                      <span className="bg-[#600814] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Bestseller
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="bg-[#AA820A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        Save {discountPercent}%
                      </span>
                    )}
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

                  {/* Quick View Button */}
                  <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="w-full py-2 bg-white/95 backdrop-blur-xs text-[#600814] text-xs font-bold rounded-xl shadow-md hover:bg-[#600814] hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-silver-500 mb-1">
                      <span className="font-semibold text-[#AA820A] uppercase tracking-wider truncate">
                        {product.purity || '925 Sterling'}
                      </span>
                      <div className="flex items-center space-x-1 text-amber-500 shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-bold text-[11px] text-silver-700">{product.rating || 4.9}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A] group-hover:text-[#600814] transition-colors line-clamp-1 cursor-pointer"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                  </div>

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

        {/* Centered View More Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigateCategory && onNavigateCategory('all')}
            className="px-10 py-4 rounded-full bg-[#600814] text-white font-serif text-xs sm:text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#7D0C1D] shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3 group cursor-pointer"
          >
            <span>View More Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
