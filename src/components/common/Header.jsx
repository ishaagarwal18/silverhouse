import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { useAuth } from '../../context/AuthContext';
import { Search, Heart, ShoppingBag, User, Menu, Sparkles, ChevronDown, LogOut, Building2, Shield } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  categories,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateHome,
  onNavigateCategory,
  onNavigateSubcategory,
  onNavigateYatraCustomizer,
  onOpenMobileMenu,
  onOpenInfoModal
}) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const DROPDOWNS = {
    jewellery: [
      { label: "VIEW ALL JEWELLERY", action: () => onNavigateCategory("jewellery") },
      { label: "SILVER RINGS", action: () => onNavigateCategory("silver-rings") },
      { label: "SILVER PENDANTS & CHAINS", action: () => onNavigateCategory("silver-pendants-chains") },
      { label: "SILVER BANGLES & KADAS", action: () => onNavigateCategory("silver-bangles-kadas") },
      { label: "SILVER PAYAL & ANKLETS", action: () => onNavigateCategory("silver-payal-anklets") },
      { label: "SILVER RELIGIOUS IDOLS", action: () => onNavigateCategory("silver-religious-idols") }
    ],
    coins: [
      { label: "VIEW ALL COINS & BARS", action: () => onNavigateCategory("silver-coins-bars") },
      { label: "PURE 999 FINE COINS", action: () => onNavigateCategory("silver-coins-bars") },
      { label: "LOTUS TEMPLE COINS", action: () => onNavigateCategory("silver-coins-bars") }
    ],
    women: [
      { label: "VIEW ALL WOMEN", action: () => onNavigateCategory("women") },
      { label: "SILVER RINGS", action: () => onNavigateCategory("silver-rings") },
      { label: "SILVER PENDANTS & CHAINS", action: () => onNavigateCategory("silver-pendants-chains") },
      { label: "SILVER BANGLES & KADAS", action: () => onNavigateCategory("silver-bangles-kadas") },
      { label: "SILVER PAYAL & ANKLETS", action: () => onNavigateCategory("silver-payal-anklets") }
    ],
    mens: [
      { label: "VIEW ALL MEN COLLECTION", action: () => onNavigateCategory("mens") },
      { label: "HEAVY CURB LINK BRACELET", action: () => onNavigateCategory("men-silver-collection") }
    ],
    kids: [
      { label: "VIEW ALL KIDS", action: () => onNavigateCategory("kids") },
      { label: "EVIL EYE BABY NAZARIYA", action: () => onNavigateCategory("kids-nazariya-bracelets") }
    ],
    gifts: [
      { label: "ALL SACRED GIFTS", action: () => onNavigateCategory("all") },
      { label: "SILVER RELIGIOUS IDOLS", action: () => onNavigateCategory("silver-religious-idols") },
      { label: "SILVER COINS & BARS", action: () => onNavigateCategory("silver-coins-bars") }
    ],
    more: [
      { label: "ABOUT SILVERHOUSE", action: () => onOpenInfoModal && onOpenInfoModal('about') },
      { label: "100% BIS HALLMARK CERTIFICATION", action: () => onOpenInfoModal && onOpenInfoModal('hallmark') },
      { label: "EXPRESS NATIONWIDE SHIPPING", action: () => onOpenInfoModal && onOpenInfoModal('shipping') }
    ]
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-silver-200 shadow-xs">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onOpenMobileMenu}
              className="p-2 text-[#600814] hover:bg-silver-100 rounded-full focus:outline-hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo (SILVERHOUSE) */}
          <div className="flex items-center">
            <button
              onClick={onNavigateHome}
              className="group text-left flex items-center space-x-3 focus:outline-hidden"
            >
              {/* Circular Emblem Icon */}
              <div className="w-10 h-10 rounded-full border-2 border-[#600814] bg-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-[#600814]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#600814] group-hover:opacity-85 transition-opacity">
                  SILVERHOUSE
                </span>
                <span className="block text-[8px] font-bold tracking-[0.22em] text-[#600814]/70 uppercase -mt-0.5">
                  Sacred 925 & 999 Pure Silver
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 2xl:space-x-7">
            
            {/* SHOP ALL (MegaMenu Trigger) */}
            <div
              className="relative"
              onMouseEnter={() => {
                setActiveDropdown(null);
                setIsMegaMenuOpen(true);
              }}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>SHOP ALL</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* SILVER JEWELLERY */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('jewellery');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => onNavigateCategory("jewellery")}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>SILVER JEWELLERY</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'jewellery' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'jewellery' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.jewellery.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* SILVER COINS */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('coins');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => onNavigateCategory("silver-coins-bars")}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>SILVER COINS</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'coins' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'coins' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.coins.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* WOMEN */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('women');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => onNavigateCategory("women")}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>WOMEN</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'women' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'women' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.women.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* MENS */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('mens');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => onNavigateCategory("mens")}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>MENS</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'mens' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'mens' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.mens.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* KIDS */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('kids');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => onNavigateCategory("kids")}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>KIDS</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'kids' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'kids' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.kids.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* GIFTS */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('gifts');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={onNavigateYatraCustomizer}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>GIFTS</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'gifts' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'gifts' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.gifts.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* MORE */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIsMegaMenuOpen(false);
                setActiveDropdown('more');
              }}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(true)}
                className="py-6 text-xs xl:text-sm font-bold tracking-wider text-[#600814] hover:opacity-75 transition-opacity flex items-center space-x-1 uppercase focus:outline-hidden"
              >
                <span>MORE</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#600814] transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 w-64 bg-white shadow-2xl rounded-b-md border border-silver-200 border-t-0 z-50 py-3 px-5 text-left animate-in fade-in slide-in-from-top-1">
                  <ul className="space-y-2">
                    {DROPDOWNS.more.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="text-[11px] font-bold tracking-wider text-[#600814] hover:text-[#AA820A] uppercase transition-colors text-left block w-full py-1 border-b border-silver-100/60 last:border-0"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action Icons (User, Search, Cart) */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* User Account & Profile Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-silver-100 transition-colors focus:outline-none"
                  title={user.fullName || 'User Profile'}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#600814] to-[#AA820A] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'SH'}
                  </div>
                  {isAdmin && (
                    <span className="hidden xl:inline-block text-[10px] font-bold bg-[#D4AF37] text-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ADMIN
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="p-2 text-[#600814] hover:opacity-75 transition-opacity relative flex items-center space-x-1"
                  title="Sign In / Register"
                >
                  <User className="w-5 h-5 stroke-[1.8]" />
                  <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-[#600814]">Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {isAuthenticated && isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-silver-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 text-left">
                  <div className="pb-3 border-b border-silver-100 mb-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#1A1A1A] truncate">{user.fullName || 'User'}</h4>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${isAdmin ? 'bg-[#D4AF37] text-black' : 'bg-silver-100 text-silver-700'}`}>
                        {user.role || 'CUSTOMER'}
                      </span>
                    </div>
                    <p className="text-xs text-silver-500 truncate mt-0.5">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    {isAdmin && (
                      <a
                        href="http://localhost:5000"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left px-3 py-2 text-xs font-bold text-[#600814] hover:bg-silver-50 rounded-xl flex items-center space-x-2 transition-colors"
                      >
                        <Building2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Open Admin Studio</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#600814] hover:opacity-75 transition-opacity relative group"
              title="Search products"
            >
              <Search className="w-5 h-5 stroke-[1.8] group-hover:scale-110 transition-transform" />
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#600814] hover:opacity-75 transition-opacity relative group"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#600814] text-white font-bold text-[10px] rounded-full flex items-center justify-center">
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
          categories={categories}
          onSelectCategory={onNavigateCategory}
          onSelectSubcategory={onNavigateSubcategory}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}
    </header>
  );
}
