import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import { fetchProducts } from '../../services/api';
import {
  Filter, Grid3X3, Grid2X2, LayoutGrid, ChevronRight, SlidersHorizontal,
  Heart, Eye, ShoppingBag, Star, Sparkles, X, Check, Search, RotateCcw
} from 'lucide-react';

export default function ProductListingPage({
  products,
  categories,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onSelectProduct,
  onNavigateYatraCustomizer
}) {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();

  const categoryList = (categories && categories.length > 0) ? categories : CATEGORIES;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryId || 'all');
  const [selectedPurity, setSelectedPurity] = useState('all');
  const [selectedRecipient, setSelectedRecipient] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4); // 2, 3, 4
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [backendItems, setBackendItems] = useState(null);

  // Sync state if categoryId / subcategoryId route params change
  useEffect(() => {
    setSelectedCategory(categoryId || 'all');
    setSelectedSubcategory(subcategoryId || 'all');
  }, [categoryId, subcategoryId]);

  // Fetch filtered data directly from Express Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadFilteredData() {
      const activeFilters = {
        category: selectedCategory,
        subcategory: selectedSubcategory,
        purity: selectedPurity,
        maxPrice,
        inStockOnly,
        sortBy
      };
      const fetched = await fetchProducts(activeFilters);
      if (isMounted && fetched) {
        setBackendItems(fetched);
      }
    }
    loadFilteredData();
    return () => { isMounted = false; };
  }, [selectedCategory, selectedSubcategory, selectedPurity, maxPrice, inStockOnly, sortBy]);

  const VIRTUAL_CATEGORIES = {
    women: {
      id: "women",
      name: "Women's Silver Collection",
      description: "Sacred 925 sterling silver rings, pendants, bangles, and payal for women.",
      heroBanner: "/images/hero_silver_coins.png"
    },
    mens: {
      id: "mens",
      name: "Men's Silver Collection",
      description: "Bold silver bracelets and rings crafted for men.",
      heroBanner: "/images/hero_sacred_rudraksha.png"
    },
    kids: {
      id: "kids",
      name: "Kids' Silver Collection",
      description: "Protective silver nazariya beads and baby bracelets.",
      heroBanner: "/images/hero_baby_nazariya.png"
    },
    jewellery: {
      id: "jewellery",
      name: "All Silver Jewellery",
      description: "Explore 925 sterling silver rings, chains, bangles, payal, and bracelets.",
      heroBanner: "/images/hero_silver_coins.png"
    },
    'custom-gifting': {
      id: "custom-gifting",
      name: "Personalized Yatra Lockets & Custom Silver",
      description: "Custom made-on-order 925 sterling silver yatra shrine lockets & personalized sacred artifacts.",
      heroBanner: "/images/hero_yatra_locket.png"
    },
    'custom-yatra-lockets': {
      id: "custom-yatra-lockets",
      name: "Personalized Sacred Yatra Lockets",
      description: "Preserve pilgrimage memories with deity photos and gotra laser engraving on solid 925 sterling silver.",
      heroBanner: "/images/hero_yatra_locket.png"
    }
  };

  const activeCategoryObj = categoryList.find(c => c.id === selectedCategory) || VIRTUAL_CATEGORIES[selectedCategory];

  // Fallback / Normalized Filtered List
  const filteredProducts = useMemo(() => {
    const rawList = (backendItems && backendItems.length > 0)
      ? backendItems
      : ((products && products.length > 0) ? products : PRODUCTS);
    let result = [...rawList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category_name || p.category || '').toLowerCase().includes(q) ||
        (p.purity || '').toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'women') {
        result = result.filter(p =>
          ['silver-rings', 'silver-pendants-chains', 'silver-bangles-kadas', 'silver-payal-anklets'].includes(p.category) ||
          (p.recipient || p.idealFor || p.ideal_for || '').toString().toLowerCase().includes('women')
        );
      } else if (selectedCategory === 'mens' || selectedCategory === 'men' || selectedCategory === 'men-silver-collection') {
        result = result.filter(p =>
          p.category === 'men-silver-collection' ||
          (p.recipient || p.idealFor || p.ideal_for || '').toString().toLowerCase().includes('men')
        );
      } else if (selectedCategory === 'kids' || selectedCategory === 'kids-baby' || selectedCategory === 'kids-nazariya-bracelets') {
        result = result.filter(p =>
          p.category === 'kids-nazariya-bracelets' ||
          (p.recipient || p.idealFor || p.ideal_for || '').toString().toLowerCase().includes('kids')
        );
      } else if (selectedCategory === 'jewellery') {
        result = result.filter(p =>
          ['silver-rings', 'silver-pendants-chains', 'silver-bangles-kadas', 'silver-payal-anklets', 'men-silver-collection', 'kids-nazariya-bracelets'].includes(p.category)
        );
      } else if (selectedCategory === 'silver-idols' || selectedCategory === 'silver-religious-idols') {
        result = result.filter(p => p.category === 'silver-religious-idols' || p.category_slug === 'silver-religious-idols');
      } else if (selectedCategory === 'custom-gifting' || selectedCategory === 'custom-yatra-lockets') {
        result = result.filter(p =>
          p.category === 'silver-pendants-chains' ||
          (p.subcategory || '').includes('locket') ||
          p.isCustomizable ||
          (p.name || '').toLowerCase().includes('locket') ||
          (p.description || '').toLowerCase().includes('locket')
        );
      } else {
        result = result.filter(p => p.category === selectedCategory || p.category_slug === selectedCategory);
      }
    }
    if (selectedSubcategory !== 'all') {
      result = result.filter(p => p.subcategory === selectedSubcategory);
    }
    if (selectedPurity !== 'all') {
      result = result.filter(p => p.purityCode === selectedPurity);
    }
    if (selectedRecipient !== 'all') {
      result = result.filter(p => {
        const val = (p.recipient || p.ideal_for || '').toString().toLowerCase();
        const target = selectedRecipient.toLowerCase();
        return val.includes(target) || val === 'all';
      });
    }
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }
    result = result.filter(p => p.price <= maxPrice);

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
  }, [backendItems, products, searchQuery, selectedCategory, selectedSubcategory, selectedPurity, selectedRecipient, maxPrice, inStockOnly, sortBy]);

  const categoryCounts = useMemo(() => {
    const rawList = (products && products.length > 0) ? products : PRODUCTS;
    const counts = { all: rawList.length };
    rawList.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    counts['women'] = rawList.filter(p => ['silver-rings', 'silver-pendants-chains', 'silver-bangles-kadas', 'silver-payal-anklets'].includes(p.category)).length;
    counts['mens'] = rawList.filter(p => p.category === 'men-silver-collection').length;
    counts['kids'] = rawList.filter(p => p.category === 'kids-nazariya-bracelets').length;
    counts['jewellery'] = rawList.filter(p => ['silver-rings', 'silver-pendants-chains', 'silver-bangles-kadas', 'silver-payal-anklets', 'men-silver-collection', 'kids-nazariya-bracelets'].includes(p.category)).length;
    return counts;
  }, [products]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('all');
    if (catId === 'all') {
      navigate('/catalog');
    } else {
      navigate(`/category/${catId}`);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedPurity('all');
    setSelectedRecipient('all');
    setMaxPrice(100000);
    setInStockOnly(false);
    setSortBy('featured');
    if (categoryId) {
      navigate('/catalog');
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20">

      {/* Category Hero Header Banner */}
      <div className="bg-[#1A1A1A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-silver-400 mb-4">
            <button
              onClick={() => navigate('/')}
              className="hover:text-[#D4AF37] cursor-pointer transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-silver-600" />
            {selectedCategory === 'all' ? (
              <span className="text-[#D4AF37] font-semibold">Catalog</span>
            ) : (
              <button
                onClick={() => handleCategorySelect('all')}
                className="hover:text-[#D4AF37] cursor-pointer text-silver-200 transition-colors"
              >
                Catalog
              </button>
            )}
            {activeCategoryObj && selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-silver-600" />
                {selectedSubcategory === 'all' ? (
                  <span className="text-[#D4AF37] font-semibold">{activeCategoryObj.name}</span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedSubcategory('all');
                      navigate(`/category/${selectedCategory}`);
                    }}
                    className="hover:text-[#D4AF37] cursor-pointer text-silver-200 transition-colors"
                  >
                    {activeCategoryObj.name}
                  </button>
                )}
              </>
            )}
            {selectedSubcategory !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-silver-600" />
                <span className="text-[#D4AF37] font-semibold capitalize">
                  {selectedSubcategory.replace(/-/g, ' ')}
                </span>
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

          {/* Left: Mobile Filter Button & Active Filter Chips */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start flex-wrap gap-y-2">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-silver-100 text-[#1A1A1A] text-xs font-bold rounded-lg flex items-center space-x-2 border border-silver-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span>Filter Catalog ({filteredProducts.length})</span>
            </button>

            <span className="text-xs text-silver-600 font-semibold hidden sm:inline-block">
              Showing <span className="text-[#1A1A1A] font-bold">{filteredProducts.length}</span> Products Found
            </span>

            {/* Active Filter Badges */}
            {(selectedCategory !== 'all' || selectedPurity !== 'all' || selectedRecipient !== 'all' || searchQuery || inStockOnly || maxPrice < 100000) && (
              <div className="flex items-center space-x-1.5 flex-wrap">
                {selectedCategory !== 'all' && (
                  <span className="bg-[#D4AF37]/15 text-[#AA820A] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span>Category: {activeCategoryObj?.name || selectedCategory}</span>
                    <button onClick={() => handleCategorySelect('all')} className="hover:text-black ml-1"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedPurity !== 'all' && (
                  <span className="bg-[#D4AF37]/15 text-[#AA820A] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span>Purity: {selectedPurity}</span>
                    <button onClick={() => setSelectedPurity('all')} className="hover:text-black ml-1"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedRecipient !== 'all' && (
                  <span className="bg-[#D4AF37]/15 text-[#AA820A] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span>Audience: {selectedRecipient}</span>
                    <button onClick={() => setSelectedRecipient('all')} className="hover:text-black ml-1"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-silver-200 text-[#1A1A1A] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-500 ml-1"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-red-600 hover:underline flex items-center space-x-1 ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Right: Grid Switcher */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            <span className="text-xs text-silver-400 font-medium hidden md:inline">Layout:</span>
            <div className="flex items-center space-x-1 bg-silver-100 p-1 rounded-lg border border-silver-200">
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
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">

          {/* Interactive Sidebar Filters (Desktop) */}
          <aside className={`w-72 bg-white p-6 rounded-2xl border border-silver-200 shadow-sm space-y-6 shrink-0 ${isMobileFilterOpen ? 'fixed inset-y-0 left-0 z-50 overflow-y-auto w-80 shadow-2xl block bg-white' : 'hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto'
            }`}>
            <div className="flex items-center justify-between border-b border-silver-200 pb-3">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] flex items-center space-x-2">
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <span>Filter Catalog</span>
              </h3>
              <button onClick={resetFilters} className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center space-x-1">
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Keyword Filter */}
            <div>
              <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider block mb-2">
                Search Keyword
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-silver-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search item, style..."
                  className="w-full bg-silver-50 border border-silver-300 rounded-lg pl-9 pr-8 py-2 text-xs text-[#1A1A1A] placeholder-silver-400 focus:outline-hidden focus:border-[#D4AF37] focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-silver-400 hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Radio / Checkbox List */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider block mb-2.5">
                Categories & Collections
              </label>
              <div className="space-y-1.5 text-xs max-h-56 overflow-y-auto pr-1">
                {/* All Categories Option */}
                <label
                  onClick={() => handleCategorySelect('all')}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${selectedCategory === 'all'
                    ? 'bg-[#1A1A1A] text-white font-bold shadow-xs'
                    : 'text-silver-700 hover:bg-silver-100'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category_filter"
                      checked={selectedCategory === 'all'}
                      onChange={() => handleCategorySelect('all')}
                      className="accent-[#D4AF37] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>All Categories</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCategory === 'all' ? 'bg-[#D4AF37] text-black' : 'bg-silver-100 text-silver-600'
                    }`}>
                    {categoryCounts.all || 0}
                  </span>
                </label>

                {/* Virtual Main Collections */}
                {[
                  { id: 'women', label: "Women's Collection" },
                  { id: 'mens', label: "Men's Collection" },
                  { id: 'kids', label: "Kids' Collection" },
                  { id: 'jewellery', label: "All Silver Jewellery" }
                ].map((item) => (
                  <label
                    key={item.id}
                    onClick={() => handleCategorySelect(item.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${selectedCategory === item.id
                      ? 'bg-[#1A1A1A] text-white font-bold shadow-xs'
                      : 'text-silver-700 hover:bg-silver-100'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category_filter"
                        checked={selectedCategory === item.id}
                        onChange={() => handleCategorySelect(item.id)}
                        className="accent-[#D4AF37] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCategory === item.id ? 'bg-[#D4AF37] text-black' : 'bg-silver-100 text-silver-600'
                      }`}>
                      {categoryCounts[item.id] || 0}
                    </span>
                  </label>
                ))}

                {/* Standard Categories List */}
                {categoryList.map((cat) => (
                  <label
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${selectedCategory === cat.id
                      ? 'bg-[#1A1A1A] text-white font-bold shadow-xs'
                      : 'text-silver-700 hover:bg-silver-100'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category_filter"
                        checked={selectedCategory === cat.id}
                        onChange={() => handleCategorySelect(cat.id)}
                        className="accent-[#D4AF37] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{cat.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCategory === cat.id ? 'bg-[#D4AF37] text-black' : 'bg-silver-100 text-silver-600'
                      }`}>
                      {categoryCounts[cat.id] || 0}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Silver Purity Radio Group */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider block mb-2.5">
                Silver Purity
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'all', label: 'All Purities' },
                  { id: '999', label: '999 Fine Pure Silver (99.9%)' },
                  { id: '925', label: '925 Sterling Silver (92.5%)' }
                ].map((purity) => (
                  <label
                    key={purity.id}
                    className={`flex items-center space-x-2.5 p-2 rounded-lg cursor-pointer font-medium transition-colors ${selectedPurity === purity.id ? 'bg-silver-100 text-[#1A1A1A] font-bold' : 'text-silver-700 hover:bg-silver-50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="purity_filter"
                      checked={selectedPurity === purity.id}
                      onChange={() => setSelectedPurity(purity.id)}
                      className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                    />
                    <span>{purity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider & Presets */}
            <div className="border-t border-silver-100 pt-4">
              <div className="flex justify-between items-center mb-2 text-xs">
                <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider">
                  Max Price Filter
                </label>
                <span className="font-bold text-[#1A1A1A] bg-[#D4AF37]/15 text-[#AA820A] px-2 py-0.5 rounded text-xs">
                  ≤ ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-silver-400 mt-1 mb-3">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
              </div>

              {/* Price Tier Presets */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { label: 'Under ₹2.5k', max: 2500 },
                  { label: 'Under ₹5k', max: 5000 },
                  { label: 'Under ₹10k', max: 10000 },
                  { label: 'All Prices', max: 100000 }
                ].map((tier) => (
                  <button
                    key={tier.label}
                    onClick={() => setMaxPrice(tier.max)}
                    className={`py-1 px-2 rounded text-center font-semibold transition-colors ${maxPrice === tier.max
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-silver-100 text-silver-700 hover:bg-silver-200'
                      }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience / Recipient Radio Badges */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider block mb-2.5">
                Target Audience / Occasion
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['all', 'Puja', 'Baby', 'Kids', 'Gifting', 'Investment'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedRecipient(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1 cursor-pointer ${selectedRecipient === tag
                      ? 'bg-[#D4AF37] text-black shadow-xs'
                      : 'bg-silver-100 text-silver-700 hover:bg-silver-200'
                      }`}
                  >
                    <span>{tag === 'all' ? 'All Audiences' : tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ready Stock Checkbox Switch */}
            <div className="border-t border-silver-100 pt-4">
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg bg-silver-50 hover:bg-silver-100 transition-colors">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-xs font-bold text-[#1A1A1A]">Ready in Stock Only</span>
              </label>
            </div>

            {/* Sort Options Radio List in Sidebar */}
            <div className="border-t border-silver-100 pt-4">
              <label className="text-[11px] font-bold text-silver-500 uppercase tracking-wider block mb-2.5">
                Sort By Order
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'featured', label: 'Featured Collections' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Best Customer Rating' },
                  { id: 'newest', label: 'Most Popular' }
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-2.5 p-2 rounded-lg cursor-pointer transition-colors ${sortBy === option.id
                      ? 'bg-[#1A1A1A] text-white font-bold'
                      : 'text-silver-700 hover:bg-silver-50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="sort_filter"
                      checked={sortBy === option.id}
                      onChange={() => setSortBy(option.id)}
                      className="accent-[#D4AF37] w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mobile Close Button */}
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
              <div className={`grid gap-6 ${gridCols === 2 ? 'grid-cols-1 sm:grid-cols-2' :
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
                          src={Array.isArray(product.images) && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        {Array.isArray(product.images) && product.images[1] && (
                          <img
                            src={product.images[1]}
                            alt={product.name}
                            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80';
                            }}
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
                          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${isWishlisted
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
