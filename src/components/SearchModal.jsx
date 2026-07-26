import React, { useState } from 'react';
import { X, Search, ArrowRight, Eye } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products,
  onQuickView
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '16px' }}>
            Rechercher dans la Maison FDV
          </h3>

          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Que recherchez-vous ? (ex: Robe, Soft Nude, Sac...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="newsletter-input"
              style={{ width: '100%', paddingLeft: '44px', fontSize: '1rem' }}
              autoFocus
            />
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: '#9B8F9E' }} />
          </div>

          {query.trim() === '' ? (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6E6373', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                Recherches Populaires
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Robe Lavande', 'Ensemble Pink', 'Blazer Tailleur', 'Sac Rose', 'Collier Or'].map((term, i) => (
                  <button
                    key={i}
                    className="category-pill"
                    style={{ padding: '6px 16px', fontSize: '0.82rem' }}
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6E6373', marginBottom: '16px' }}>
                {filtered.length} Résultat(s) trouvé(s)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '50vh', overflowY: 'auto' }}>
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      border: '1px solid #EFE6F0',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F5ECF7'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={product.image} alt={product.title} style={{ width: '50px', height: '65px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem' }}>{product.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6E6373' }}>{product.category}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#2C222E' }}>{product.price.toFixed(2)}€</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
