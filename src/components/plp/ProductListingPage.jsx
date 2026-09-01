import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { 
  Filter, Grid3X3, Grid2X2, LayoutGrid, ChevronRight, SlidersHorizontal, 
  Heart, Eye, ShoppingBag, Star, Sparkles, X, Check 
} from 'lucide-react';

export default function ProductListingPage({
  products,
  categoryId,
  subcategoryId,
  onSelectCategory,
  onSelectSubcategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onSelectProduct,
  onNavigateYatraCustomizer
}) {
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryId || 'all');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [selectedRecipient, setSelectedRecipient] = useState('all');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4); // 2, 3, 4
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if categoryId prop changes
  React.useEffect(() => {
    if (categoryId) setSelectedCategory(categoryId);
    if (subcategoryId) setSelectedSubcategory(subcategoryId);
  }, [categoryId, subcategoryId]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const rawList = (products && products.length > 0) ? products : PRODUCTS;
    let result = [...rawList];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedSubcategory !== 'all') {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }

    if (selectedPurity !== 'all') {
      result = result.filter(p => p.purityCode === selectedPurity);
    }

    if (selectedRecipient !== 'all') {
      result = result.filter(p => p.recipient.includes(selectedRecipient));
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    result = result.filter(p => p.price <= maxPrice);

    // Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [products, selectedCategory, selectedSubcategory, selectedPurity, selectedRecipient, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedPurity('all');
    setSelectedRecipient('all');
    setMaxPrice(100000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">
      
      {/* Category Hero Header Banner */}
      <div className="bg-[#1A1A1A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-silver-400 mb-4">
            <button onClick={() => onSelectCategory('all')} className="hover:text-[#D4AF37]">Home</button>
            <ChevronRight className="w-3 h-3 text-silver-600" />
            <span className="text-silver-200">Catalog</span>
            {activeCategoryObj && (
              <>
                <ChevronRight className="w-3 h-3 text-silver-600" />
                <span className="text-[#D4AF37] font-semibold">{activeCategoryObj.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                100% HALLMARKED PURE SILVER
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 text-white">
                {activeCategoryObj ? activeCategoryObj.name : "All Sacred Silver Artifacts"}
              </h1>
              <p className="text-xs sm:text-sm text-silver-300 max-w-2xl mt-2 font-normal">
                {activeCategoryObj ? activeCategoryObj.description : "Explore our complete range of certified 925 sterling silver and 999 fine silver murti, coins, utensils, rudraksha & custom lockets."}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs font-semibold text-[#D4AF37] flex items-center space-x-2 shrink-0">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Showing {filteredProducts.length} Sacred Items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-silver-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Mobile Filter Button & Active Count */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-silver-100 text-[#1A1A1A] text-xs font-bold rounded-lg flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>Filter Items ({filteredProducts.length})</span>
            </button>

            <span className="text-xs text-silver-600 font-semibold hidden sm:inline-block">
              {filteredProducts.length} Products Found
            </span>
          </div>

          {/* Right: Grid Switcher & Sorting */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            
            {/* Grid Columns Toggle (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1 bg-silver-100 p-1 rounded-lg border border-silver-200">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded transition-colors ${gridCols === 2 ? 'bg-white text-black shadow-xs' : 'text-silver-500 hover:text-black'}`}
                title="2 Columns View"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${gridCols === 3 ? 'bg-white text-black shadow-xs' : 'text-silver-500 hover:text-black'}`}
                title="3 Columns View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${gridCols === 4 ? 'bg-white text-black shadow-xs' : 'text-silver-500 hover:text-black'}`}
                title="4 Columns View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-silver-700">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-silver-50 border border-silver-300 rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1A1A] focus:outline-hidden focus:border-[#D4AF37]"
              >
                <option value="featured">Featured Collections</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Customer Rating</option>
                <option value="newest">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          
          {/* Interactive Sidebar Filters (Desktop) */}
          <aside className={`w-64 bg-white p-6 rounded-2xl border border-silver-200 shadow-xs space-y-6 shrink-0 ${
            isMobileFilterOpen ? 'fixed inset-y-0 left-0 z-50 overflow-y-auto w-80 shadow-2xl block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between border-b border-silver-200 pb-3">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <span>Filters</span>
              </h3>
              <button onClick={resetFilters} className="text-xs text-[#D4AF37] hover:underline font-semibold">
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-silver-500 uppercase tracking-wider block mb-2">
                Category
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                  className={`w-full text-left py-1.5 px-2 rounded-md font-medium transition-colors ${
                    selectedCategory === 'all' ? 'bg-[#1A1A1A] text-white font-bold' : 'text-silver-700 hover:bg-silver-100'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory('all'); }}
                    className={`w-full text-left py-1.5 px-2 rounded-md font-medium transition-colors ${
                      selectedCategory === cat.id ? 'bg-[#1A1A1A] text-white font-bold' : 'text-silver-700 hover:bg-silver-100'
                    }`}
                  >
                    {cat.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Purity Filter */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-xs font-bold text-silver-500 uppercase tracking-wider block mb-2">
                Silver Purity
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'all', label: 'All Purities' },
                  { id: '999', label: '999 Fine Pure Silver' },
                  { id: '925', label: '925 Sterling Silver' }
                ].map((purity) => (
                  <label key={purity.id} className="flex items-center space-x-2 cursor-pointer font-medium text-silver-800">
                    <input
                      type="radio"
                      name="purity"
                      checked={selectedPurity === purity.id}
                      onChange={() => setSelectedPurity(purity.id)}
                      className="accent-[#D4AF37]"
                    />
                    <span>{purity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="border-t border-silver-100 pt-4">
              <div className="flex justify-between items-center mb-2 text-xs">
                <label className="font-bold text-silver-500 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-bold text-[#1A1A1A]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] text-silver-400 mt-1">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Intended Recipient */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-xs font-bold text-silver-500 uppercase tracking-wider block mb-2">
                Recipient / Occasion
              </label>
              <div className="space-y-1 text-xs">
                {['all', 'Puja', 'Baby', 'Kids', 'Gifting', 'Investment'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedRecipient(tag)}
                    className={`mr-1 mb-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                      selectedRecipient === tag
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'bg-silver-100 text-silver-700 hover:bg-silver-200'
                    }`}
                  >
                    {tag === 'all' ? 'All Occasions' : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="border-t border-silver-100 pt-4">
              <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-silver-800">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4 rounded"
                />
                <span>Ready in Stock Only</span>
              </label>
            </div>

            {/* Mobile Close */}
            {isMobileFilterOpen && (
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1A1A1A] text-white font-bold text-xs rounded-lg mt-6"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-silver-200 text-center">
                <Sparkles className="w-12 h-12 text-silver-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">No Silver Artifacts Match Filters</h3>
                <p className="text-xs text-silver-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range or purity filter options to see available products.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}>
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const discountPct = product.originalPrice 
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-silver-200 overflow-hidden silver-card-hover flex flex-col justify-between relative"
                    >
                      {/* Image Preview */}
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
                            {product.purityCode === '999' ? '999 Pure' : '925 Sterling'}
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
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                        </button>

                        {/* Quick View Button */}
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

                      {/* Info Area */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
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
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
