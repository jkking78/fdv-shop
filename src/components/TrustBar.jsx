import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export default function TrustBar() {
  const props = [
    {
      icon: <Truck size={24} />,
      title: 'Livraison Rapide & Gratuite',
      desc: 'Offerte dès 50€ d’achat en France'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Paiement Sécurisé',
      desc: '3x / 4x sans frais disponible'
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Retours Faciles',
      desc: '14 jours pour échanger'
    },
    {
      icon: <Headphones size={24} />,
      title: 'Service Client VIP',
      desc: 'Conseillères disponibles 7j/7'
    }
  ];

  return (
    <section className="trust-bar-section">
      <div className="trust-grid">
        {props.map((item, idx) => (
          <div key={idx} className="trust-item">
            <div className="trust-icon-box">
              {item.icon}
            </div>
            <div>
              <div className="trust-title">{item.title}</div>
              <div className="trust-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
