import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductModal({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Lavande');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          {/* Left Column: Image */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', background: '#F5ECF7' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '100%', minHeight: '440px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right Column: Details */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="product-category">{product.category}</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#2C222E', margin: '4px 0 12px 0' }}>
              {product.title}
            </h2>

            <div className="product-rating" style={{ marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#D4AF37" color="#D4AF37" />
              ))}
              <span style={{ fontWeight: 700, color: '#2C222E', marginLeft: '6px' }}>{product.rating}</span>
              <span>({product.reviewsCount} avis clients)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2C222E' }}>
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#9B8F9E', textDecoration: 'line-through' }}>
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>

            <div className="installment-tag" style={{ alignSelf: 'flex-start', marginBottom: '24px' }}>
              {product.installmentText}
            </div>

            {/* Color Picker */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2C222E', display: 'block', marginBottom: '8px' }}>
                COULEUR: <span style={{ color: '#68486E' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col.name)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: col.hex,
                      border: selectedColor === col.name ? '2px solid #4A354F' : '2px solid #FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      cursor: 'pointer'
                    }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2C222E' }}>TAILLE</label>
                <a href="#" style={{ fontSize: '0.78rem', color: '#68486E', textDecoration: 'underline' }}>Guide des tailles</a>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      border: selectedSize === size ? '2px solid #4A354F' : '1px solid #EFE6F0',
                      background: selectedSize === size ? '#4A354F' : '#FFFFFF',
                      color: selectedSize === size ? '#FFFFFF' : '#2C222E',
                      fontWeight: 600,
                      fontSize: '0.88rem'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
              <div className="qty-controls" style={{ padding: '6px 12px', background: '#FAF6FA', borderRadius: '25px', border: '1px solid #EFE6F0' }}>
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span style={{ fontWeight: 700, padding: '0 8px' }}>{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAdd}>
                <ShoppingBag size={18} />
                <span>AJOUTER AU PANIER</span>
              </button>

              <button
                className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                style={{ position: 'static', width: '48px', height: '48px' }}
                onClick={() => onToggleWishlist(product)}
              >
                <Heart size={20} fill={isWishlisted ? '#E89CAE' : 'none'} />
              </button>
            </div>

            {/* Info Tabs */}
            <div style={{ borderTop: '1px solid #EFE6F0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #EFE6F0', paddingBottom: '10px', marginBottom: '14px' }}>
                <button
                  style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'description' ? '#4A354F' : '#9B8F9E' }}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'fabric' ? '#4A354F' : '#9B8F9E' }}
                  onClick={() => setActiveTab('fabric')}
                >
                  Matière & Entretien
                </button>
                <button
                  style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'shipping' ? '#4A354F' : '#9B8F9E' }}
                  onClick={() => setActiveTab('shipping')}
                >
                  Livraison & Retours
                </button>
              </div>

              {activeTab === 'description' && (
                <p style={{ fontSize: '0.88rem', color: '#6E6373', lineHeight: 1.6 }}>{product.description}</p>
              )}

              {activeTab === 'fabric' && (
                <div style={{ fontSize: '0.88rem', color: '#6E6373' }}>
                  <p><strong>Matière:</strong> {product.fabric}</p>
                  <p style={{ marginTop: '6px' }}><strong>Entretien:</strong> {product.care}</p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div style={{ fontSize: '0.85rem', color: '#6E6373', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Truck size={14} style={{ color: '#A58BB8' }} />
                    <span>Livraison Colissimo sous 24-48h. Offerte dès 50€.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RotateCcw size={14} style={{ color: '#A58BB8' }} />
                    <span>Retours gratuits sous 14 jours via étiquette prépayée.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
