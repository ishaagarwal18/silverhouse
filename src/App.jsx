import React, { useState } from 'react';
import AnnouncementBar from './components/common/AnnouncementBar';
import Header from './components/common/Header';
import MobileMenu from './components/common/MobileMenu';
import SearchModal from './components/common/SearchModal';
import QuickViewModal from './components/common/QuickViewModal';
import ToastContainer from './components/common/ToastContainer';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import ProductListingPage from './components/plp/ProductListingPage';
import ProductDetailPage from './components/pdp/ProductDetailPage';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import WishlistDrawer from './components/wishlist/WishlistDrawer';

export default function App() {
  // Navigation & View Routing State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'plp' | 'pdp'
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(['coin-laxmi-ganesh-999-10g', 'idol-pure-ganesha-sitting-50g']);

  // Modals & Drawers Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ totalAmount: 0, discountAmount: 0, appliedCoupon: null });

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const triggerToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers for Navigation
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategoryId('all');
    setSelectedSubcategoryId('all');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCategory = (catId) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId('all');
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSubcategory = (catId, subId) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId(subId);
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateYatraCustomizer = () => {
    // Navigate to PLP or directly open Yatra Locket PDP
    setSelectedCategoryId('custom-gifting');
    setSelectedSubcategoryId('custom-yatra-lockets');
    setCurrentView('plp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product, quantity = 1, customConfig = null) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && JSON.stringify(item.customConfig) === JSON.stringify(customConfig));
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, customConfig }];
      }
    });

    triggerToast('success', 'Added to Shopping Cart', `${product.name} (${quantity} qty) is in your cart.`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index, newQty) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index) => {
    const item = cartItems[index];
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    if (item) {
      triggerToast('info', 'Item Removed', `${item.product.name} removed from cart.`);
    }
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter(id => id !== product.id));
      triggerToast('info', 'Removed from Wishlist', `${product.name} removed from your saved items.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      triggerToast('success', 'Saved to Wishlist', `${product.name} added to your wishlist.`);
    }
  };

  // Checkout Handler
  const handleProceedCheckout = (totalAmount, discountAmount, appliedCoupon) => {
    setCheckoutData({ totalAmount, discountAmount, appliedCoupon });
    setIsCheckoutOpen(true);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-white">
      <div>
        {/* Top Announcement Bar */}
        <AnnouncementBar onNavigateCategory={handleNavigateCategory} />

        {/* Sticky Header with MegaMenu */}
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateCategory={handleNavigateCategory}
          onNavigateSubcategory={handleNavigateSubcategory}
          onNavigateYatraCustomizer={handleNavigateYatraCustomizer}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Main View Router */}
        <main>
          {currentView === 'home' && (
            <HomePage
              onNavigateCategory={handleNavigateCategory}
              onNavigateYatraCustomizer={handleNavigateYatraCustomizer}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentView === 'plp' && (
            <ProductListingPage
              categoryId={selectedCategoryId}
              subcategoryId={selectedSubcategoryId}
              onSelectCategory={handleNavigateCategory}
              onSelectSubcategory={handleNavigateSubcategory}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onSelectProduct={handleSelectProduct}
              onNavigateYatraCustomizer={handleNavigateYatraCustomizer}
            />
          )}

          {currentView === 'pdp' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistIds.includes(selectedProduct.id)}
              onSelectProduct={handleSelectProduct}
              onNavigateCheckout={() => {
                setIsCartOpen(true);
              }}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer
        onNavigateCategory={handleNavigateCategory}
        onNavigateYatraCustomizer={handleNavigateYatraCustomizer}
      />

      {/* Overlays & Drawers */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={handleNavigateCategory}
        onSelectSubcategory={handleNavigateSubcategory}
        onNavigateYatraCustomizer={handleNavigateYatraCustomizer}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onNavigateCategory={handleNavigateCategory}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onViewFullPDP={handleSelectProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={checkoutData.totalAmount}
        discountAmount={checkoutData.discountAmount}
        appliedCoupon={checkoutData.appliedCoupon}
        onClearCart={() => setCartItems([])}
        onNavigateHome={handleNavigateHome}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
