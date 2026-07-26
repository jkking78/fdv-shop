import React from 'react';
import { Truck, CreditCard, Tag, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <div className="announcement-item">
          <Truck size={13} style={{ color: '#F4C7C3' }} />
          <span>Livraison offerte dès 50€</span>
        </div>
        <span style={{ opacity: 0.4 }}>|</span>
        <div className="announcement-item">
          <CreditCard size={13} style={{ color: '#F4C7C3' }} />
          <span>Paiement en 3x sans frais</span>
        </div>
        <span style={{ opacity: 0.4 }}>|</span>
        <div className="announcement-item">
          <Tag size={13} style={{ color: '#F4C7C3' }} />
          <span>-10% sur votre première commande avec le code <strong className="announcement-badge">FDV10</strong></span>
        </div>
      </div>
    </div>
  );
}
