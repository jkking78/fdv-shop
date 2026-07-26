import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LookbookSection({ onExplore }) {
  return (
    <section className="lookbook-section">
      <div className="lookbook-container">
        {/* Left Editorial Images */}
        <div className="lookbook-image-grid">
          <div className="lookbook-img">
            <img src="/assets/ensemble_pink.jpg" alt="Lookbook FDV 1" />
          </div>
          <div className="lookbook-img offset">
            <img src="/assets/blazer_tailleur.jpg" alt="Lookbook FDV 2" />
          </div>
        </div>

        {/* Right Text Content */}
        <div className="lookbook-text">
          <span className="section-subtitle">ESPACE INSPIRATION</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            Sublimez Votre Silhouette <br />
            <span style={{ fontStyle: 'italic', color: '#A58BB8' }}>Sans Concession</span>
          </h2>
          <p style={{ color: '#6E6373', fontSize: '1.05rem', marginBottom: '28px', lineHeight: 1.7 }}>
            Chaque création FDV shopping est imaginée dans nos ateliers parisiens pour s’adapter aux femmes modernes et raffinées. 
            Matières nobles, coutures invisibles et coupes pensées pour vous mettre en valeur en toute occasion.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 600, color: '#2C222E' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E89CAE' }}></div>
              <span>Tissus éco-responsables de haute facture</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 600, color: '#2C222E' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A58BB8' }}></div>
              <span>Tailles ajustées du XS au XL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 600, color: '#2C222E' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }}></div>
              <span>Éditions limitées produites en petites séries</span>
            </div>
          </div>

          <button className="btn-primary" onClick={onExplore}>
            <span>DÉCOUVRIR LE LOOKBOOK</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
