import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="hero-container">
        {/* Left Side Text Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} style={{ color: '#E89CAE' }} />
            <span>Nouvelle Collection Printemps / Été</span>
          </div>

          <h1 className="hero-title">
            L'ÉLÉGANCE DANS <br />
            <span className="hero-title-accent">CHAQUE DÉTAIL</span>
          </h1>

          <p className="hero-subtitle">
            Des pièces exclusives conçues pour valoriser votre style, votre élégance et votre authenticité. 
            Une couture délicate aux nuances pastel et luxueuses.
          </p>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="btn-primary" onClick={onExploreClick}>
              <span>DÉCOUVRIR LA COLLECTION</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', marginStyle: 'negative' }}>
              {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Client"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    marginLeft: idx > 0 ? '-10px' : '0'
                  }}
                />
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D4AF37' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#D4AF37" />
                ))}
                <span style={{ fontWeight: 700, color: '#2C222E', fontSize: '0.85rem', marginLeft: '4px' }}>4.9/5</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#6E6373' }}>Plus de 2,500 clientes conquises</span>
            </div>
          </div>
        </div>

        {/* Right Side Fashion Showcase */}
        <div className="hero-image-wrapper">
          <div className="hero-card-frame">
            <img src="/assets/hero_fashion_model.jpg" alt="Collection FDV shopping" />
          </div>

          {/* Floating Luxury Badge */}
          <div className="floating-badge">
            <div className="floating-badge-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="floating-badge-title">Édition Couture FDV</div>
              <div className="floating-badge-subtitle">Qualité & Finitions Artisanales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
