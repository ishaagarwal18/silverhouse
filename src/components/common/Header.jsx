import React, { useState } from 'react';
import MegaMenu from './MegaMenu';
import { CATEGORIES } from '../../data/products';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, Shield, ChevronDown } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateHome,
  onNavigateCategory,
  onNavigateSubcategory,
  onNavigateYatraCustomizer,
  onOpenMobileMenu
}) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-silver-200 shadow-xs">
      {/* Top Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onOpenMobileMenu}
              className="p-2 text-silver-800 hover:text-[#D4AF37] focus:outline-hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start">
            <button
              onClick={onNavigateHome}
              className="group text-left flex items-center space-x-3 focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-full bg-silver-metallic border border-[#D4AF37] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-silver-600 transition-colors">
                  SILVER<span className="text-gold-gradient font-light">HOUSE</span>
                </span>
                <span className="block text-[9px] font-semibold tracking-widest text-silver-500 uppercase -mt-1">
                  Sacred 925 & 999 Pure Silver
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="py-6 text-sm font-semibold text-[#1A1A1A] hover:text-[#D4AF37] transition-colors flex items-center space-x-1"
              >
                <span>All Collections</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => onNavigateCategory("silver-coins-bars")}
              className="py-6 text-sm font-medium text-silver-700 hover:text-[#1A1A1A] transition-colors"
            >
              Coins & Bars
            </button>

            <button
              onClick={() => onNavigateCategory("silver-idols")}
              className="py-6 text-sm font-medium text-silver-700 hover:text-[#1A1A1A] transition-colors"
            >
              Silver Murti
            </button>

            <button
              onClick={() => onNavigateCategory("kids-baby")}
              className="py-6 text-sm font-medium text-silver-700 hover:text-[#1A1A1A] transition-colors"
            >
              Kids Nazariya
            </button>

            <button
              onClick={() => onNavigateCategory("sacred-rudraksha")}
              className="py-6 text-sm font-medium text-silver-700 hover:text-[#1A1A1A] transition-colors"
            >
              Sacred Rudraksha
            </button>

            {/* Specialized CTA: Custom Yatra Locket */}
            <button
              onClick={onNavigateYatraCustomizer}
              className="py-1.5 px-3.5 rounded-full bg-linear-to-r from-[#1A1A1A] to-[#333333] hover:from-[#D4AF37] hover:to-[#AA820A] text-white hover:text-black text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Custom Yatra Lockets</span>
            </button>
          </nav>

          {/* Action Icons Bar */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-silver-700 hover:text-[#1A1A1A] transition-colors relative group"
              title="Search products"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* User Account */}
            <button
              className="hidden sm:block p-2 text-silver-700 hover:text-[#1A1A1A] transition-colors"
              title="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-silver-700 hover:text-[#1A1A1A] transition-colors relative group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-black font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2.5 bg-[#1A1A1A] hover:bg-[#D4AF37] text-white hover:text-black rounded-full transition-all relative shadow-sm group flex items-center space-x-2"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline-block text-xs font-semibold pr-1">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#D4AF37] text-black font-bold text-[11px] px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      {isMegaMenuOpen && (
        <MegaMenu
          onSelectCategory={onNavigateCategory}
          onSelectSubcategory={onNavigateSubcategory}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}
    </header>
  );
}
