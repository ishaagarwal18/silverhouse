import React from 'react';
import HeroSlider from './HeroSlider';
import CategoryGrid from './CategoryGrid';
import FeaturedTabs from './FeaturedTabs';
import YatraLocketSpotlight from './YatraLocketSpotlight';
import ValuePropBar from './ValuePropBar';
import Testimonials from './Testimonials';

export default function HomePage({
  products,
  categories,
  onNavigateCategory,
  onNavigateYatraCustomizer,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onSelectProduct
}) {
  return (
    <div className="space-y-0">
      <HeroSlider
        onNavigateCategory={onNavigateCategory}
        onNavigateYatraCustomizer={onNavigateYatraCustomizer}
      />
      <ValuePropBar />
      <CategoryGrid categories={categories} onSelectCategory={onNavigateCategory} />
      <FeaturedTabs
        products={products}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
        onQuickView={onQuickView}
        onSelectProduct={onSelectProduct}
        onNavigateYatraCustomizer={onNavigateYatraCustomizer}
        onNavigateCategory={onNavigateCategory}
      />
      <YatraLocketSpotlight onNavigateCustomizer={onNavigateYatraCustomizer} />
      <Testimonials />
    </div>
  );
}
