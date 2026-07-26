import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 50;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.90;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FDV10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Code invalide. Essayez FDV10');
    }
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} style={{ color: '#68486E' }} />
            <h3 className="cart-title font-serif">Mon Panier ({cart.reduce((a, c) => a + c.quantity, 0)})</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="cart-free-shipping">
          {missingForFreeShipping > 0 ? (
            <div>
              Plus que <strong>{missingForFreeShipping.toFixed(2)}€</strong> pour débloquer la <strong>Livraison Offerte</strong> !
            </div>
          ) : (
            <div style={{ color: '#27AE60', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} />
              <span>Félicitations ! Vous bénéficiez de la livraison OFFERTE</span>
            </div>
          )}
          <div className="shipping-bar-track">
            <div
              className="shipping-bar-fill"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6E6373' }}>
              <ShoppingBag size={48} style={{ strokeWidth: 1, color: '#A58BB8', marginBottom: '16px' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#2C222E' }}>Votre panier est vide</h4>
              <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>Découvrez nos nouveautés et ajoutez vos coups de cœur.</p>
              <button
                className="btn-primary"
                style={{ marginTop: '24px', padding: '12px 24px', fontSize: '0.85rem' }}
                onClick={onClose}
              >
                DÉCOUVRIR LE CATALOGUE
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 className="cart-item-title">{item.title}</h4>
                    <button
                      onClick={() => onRemoveItem(item)}
                      style={{ color: '#9B8F9E', padding: '2px' }}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="cart-item-meta">
                    Taille: <strong>{item.selectedSize || 'M'}</strong> | Couleur: <strong>{item.selectedColor || 'Lavande'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => onUpdateQty(item, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="cart-item-price">{(item.price * item.quantity).toFixed(2)}€</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-row">
              <input
                type="text"
                placeholder="Code promo (ex: FDV10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button type="submit" className="promo-btn">
                Appliquer
              </button>
            </form>
            {promoApplied && (
              <div style={{ fontSize: '0.78rem', color: '#27AE60', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={12} />
                <span>Code FDV10 appliqué (-10%)</span>
              </div>
            )}
            {promoError && (
              <div style={{ fontSize: '0.78rem', color: '#E74C3C', marginBottom: '10px' }}>
                {promoError}
              </div>
            )}

            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>

            {discountPercent > 0 && (
              <div className="summary-row" style={{ color: '#27AE60' }}>
                <span>Remise (-{discountPercent}%)</span>
                <span>-{discountAmount.toFixed(2)}€</span>
              </div>
            )}

            <div className="summary-row">
              <span>Frais de livraison</span>
              <span>{shippingCost === 0 ? 'OFFERTE' : `${shippingCost.toFixed(2)}€`}</span>
            </div>

            <div className="summary-row total">
              <span>Total Estimé</span>
              <span>{finalTotal.toFixed(2)}€</span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#7A5F85', textAlign: 'center', margin: '8px 0 16px 0' }}>
              ou 3 versements de <strong>{(finalTotal / 3).toFixed(2)}€</strong> sans frais avec Klarna
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onCheckout}
            >
              <span>COMMANDER SÉCURISÉ ({finalTotal.toFixed(2)}€)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
