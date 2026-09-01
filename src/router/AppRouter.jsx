import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import ProductListingPage from '../components/plp/ProductListingPage';
import ProductDetailPage from '../components/pdp/ProductDetailPage';

export default function AppRouter({
  products,
  categories,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onSelectProduct,
  onTriggerToast,
  onOpenCart
}) {
  return (
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <HomePage
            products={products}
            categories={categories}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        }
      />

      {/* Product Catalog / Category / Subcategory Listing Pages */}
      <Route
        path="/catalog"
        element={
          <ProductListingPage
            products={products}
            categories={categories}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        }
      />

      <Route
        path="/category/:categoryId"
        element={
          <ProductListingPage
            products={products}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        }
      />

      <Route
        path="/category/:categoryId/:subcategoryId"
        element={
          <ProductListingPage
            products={products}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        }
      />

      {/* Product Detail Page */}
      <Route
        path="/product/:productId"
        element={
          <ProductDetailPage
            allProducts={products}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectProduct={onSelectProduct}
            onNavigateCheckout={onOpenCart}
            onTriggerToast={onTriggerToast}
          />
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
