import React from 'react';
import { Sparkles, Instagram, Facebook, Pin as Pinterest, Mail, Phone } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: '#F4C7C3' }} />
            <span>FDV shopping</span>
          </div>
          <p className="footer-desc">
            La destination couture des femmes raffinées. Nos pièces célèbrent votre féminité, votre élégance et votre confiance au quotidien.
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
            <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Instagram size={18} />
            </a>
            <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Facebook size={18} />
            </a>
            <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Pinterest size={18} />
            </a>
          </div>
        </div>

        {/* Collections Links */}
        <div>
          <h4 className="footer-col-title">Nos Collections</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onSelectCategory('Robes & Ensembles'); }}>Robes & Ensembles</a></li>
            <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onSelectCategory('Blazers & Vestes'); }}>Blazers & Vestes</a></li>
            <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onSelectCategory('Accessoires'); }}>Accessoires de Luxe</a></li>
            <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); onSelectCategory('Nouveautés'); }}>Nouveautés de la Semaine</a></li>
          </ul>
        </div>

        {/* Client Support */}
        <div>
          <h4 className="footer-col-title">Service Client</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Suivre ma commande</a></li>
            <li><a href="#" className="footer-link">Livraisons & Retours</a></li>
            <li><a href="#" className="footer-link">Guide des Tailles</a></li>
            <li><a href="#" className="footer-link">Paiement en 3x / 4x</a></li>
            <li><a href="#" className="footer-link">Foire Aux Questions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="footer-col-title">Maison FDV</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#B5A8B8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} style={{ color: '#F4C7C3' }} />
              <span>contact@fdv-shopping.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={16} style={{ color: '#F4C7C3' }} />
              <span>+33 (0)1 42 68 00 00</span>
            </div>
            <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>Du Lundi au Samedi: 9h00 - 19h00</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div>© 2026 FDV shopping. Tous droits réservés. Conçu avec élégance.</div>
        <div style={{ display: 'flex', gap: '12px', opacity: 0.8, fontSize: '0.75rem' }}>
          <span>VISA</span> • <span>MASTERCARD</span> • <span>APPLE PAY</span> • <span>KLARNA 3X</span> • <span>PAYPAL</span>
        </div>
      </div>
    </footer>
  );
}
