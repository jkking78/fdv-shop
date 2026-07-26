import React from 'react';
import ProductCard from './ProductCard';
import CategoryPills from './CategoryPills';
import { ArrowRight } from 'lucide-react';

export default function ProductGrid({
  products,
  categories,
  activeCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) {
  return (
    <section id="featured-section" className="section-container">
      <div className="section-header">
        <div>
          <span className="section-subtitle">SÉLECTION EXCLUSIVE</span>
          <h2 className="section-title">Les Coups de Cœur de la Semaine</h2>
        </div>

        <a href="#featured-section" className="section-link" onClick={() => onSelectCategory('Tous les articles')}>
          <span>Voir tout le catalogue</span>
          <ArrowRight size={16} />
        </a>
      </div>

      <CategoryPills
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}
