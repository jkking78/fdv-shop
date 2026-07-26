import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) {
  const getBadgeClass = (badge) => {
    if (badge === 'Nouveau') return 'card-badge new';
    if (badge === 'Top Vente') return 'card-badge bestseller';
    return 'card-badge';
  };

  return (
    <div className="product-card">
      {/* Image Box */}
      <div className="product-image-box">
        {product.badge && (
          <span className={getBadgeClass(product.badge)}>
            {product.badge}
          </span>
        )}

        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} fill={isWishlisted ? '#E89CAE' : 'none'} />
        </button>

        <img src={product.image} alt={product.title} loading="lazy" />

        {/* Hover Quick Actions */}
        <div className="card-quick-actions">
          <button
            className="btn-add-cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag size={16} />
            <span>Ajouter au panier</span>
          </button>

          <button
            className="btn-quick-view"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Aperçu rapide"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Product Details Info */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <a
          href="#"
          className="product-title-link"
          onClick={(e) => {
            e.preventDefault();
            onQuickView(product);
          }}
        >
          {product.title}
        </a>

        <div className="product-rating">
          <Star size={13} className="star-icon" />
          <span style={{ fontWeight: 600 }}>{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">{product.price.toFixed(2)}€</span>
          {product.originalPrice && (
            <span className="product-original-price">{product.originalPrice.toFixed(2)}€</span>
          )}
        </div>

        {product.installmentText && (
          <div>
            <span className="installment-tag">{product.installmentText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
