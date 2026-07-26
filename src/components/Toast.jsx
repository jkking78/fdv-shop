import React, { useEffect } from 'react';
import { Sparkles, CheckCircle, Heart, ShoppingBag } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.type === 'wishlist' ? (
            <Heart size={18} style={{ color: '#F4C7C3', fill: '#F4C7C3' }} />
          ) : t.type === 'cart' ? (
            <ShoppingBag size={18} style={{ color: '#E6DCF0' }} />
          ) : (
            <Sparkles size={18} style={{ color: '#D4AF37' }} />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
