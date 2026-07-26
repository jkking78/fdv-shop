import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';

export default function Newsletter({ onSubscribeToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (onSubscribeToast) {
      onSubscribeToast('Félicitations ! Votre code -10% (FDV10) a été activé.');
    }
  };

  return (
    <section className="newsletter-section">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F5ECF7', padding: '6px 16px', borderRadius: '20px', color: '#68486E', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
        <Sparkles size={14} />
        <span>REJOIGNEZ LE CLUB PRIVILÈGE FDV</span>
      </div>

      <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#2C222E', marginBottom: '10px' }}>
        Bénéficiez de -10% sur votre 1ère commande
      </h2>
      <p style={{ color: '#6E6373', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto' }}>
        Inscrivez-vous à notre lettre d’information exclusive pour recevoir en avant-première nos ventes privées et nos conseils de style.
      </p>

      {subscribed ? (
        <div style={{ marginTop: '24px', background: '#F0F9F4', border: '1px solid #C2E7D0', padding: '16px 24px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#1B6339', fontWeight: 600 }}>
          <CheckCircle size={20} />
          <span>Code promo <strong>FDV10</strong> envoyé à {email} !</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Entrez votre adresse email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            required
          />
          <button type="submit" className="btn-primary" style={{ padding: '14px 28px', flexShrink: 0 }}>
            <span>S'INSCRIRE</span>
            <Send size={16} />
          </button>
        </form>
      )}
    </section>
  );
}
