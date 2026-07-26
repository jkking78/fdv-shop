import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Heart size={24} style={{ color: '#E89CAE', fill: '#E89CAE' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2C222E' }}>
              Mes Coups de Cœur ({wishlistProducts.length})
            </h3>
          </div>

          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#6E6373' }}>
              <Heart size={44} style={{ color: '#D7C4DF', marginBottom: '12px' }} />
              <p>Votre liste d'envies est vide pour le moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
              {wishlistProducts.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '12px', borderRadius: '16px', border: '1px solid #EFE6F0', background: '#FAF6FA', alignItems: 'center' }}>
                  <img src={item.image} alt={item.title} style={{ width: '70px', height: '85px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600 }}>{item.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: '#6E6373' }}>{item.category}</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#2C222E', marginTop: '4px' }}>{item.price.toFixed(2)}€</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      className="btn-primary"
                      style={{ padding: '10px 16px', fontSize: '0.8rem' }}
                      onClick={() => {
                        onAddToCart(item);
                        onRemoveFromWishlist(item);
                      }}
                    >
                      <ShoppingBag size={14} />
                      <span>Ajouter</span>
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => onRemoveFromWishlist(item)}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
