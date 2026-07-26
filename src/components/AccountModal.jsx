import React, { useState } from 'react';
import { X, User, Lock, Mail, Sparkles, Check } from 'lucide-react';

export default function AccountModal({ isOpen, onClose, onToast }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    if (onToast) onToast(isRegister ? 'Compte créé avec succès ! Bienvenue chez FDV shopping.' : 'Connexion réussie !');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '36px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="brand-icon-wrapper" style={{ margin: '0 auto 12px auto', width: '48px', height: '48px' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2C222E' }}>
              {loggedIn ? 'Mon Espace Privilège' : isRegister ? 'Créer un compte FDV' : 'Se Connecter'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6E6373', marginTop: '4px' }}>
              {loggedIn ? 'Accédez à vos commandes et vos avantages VIP' : 'Profitez d’offres exclusives et du suivi en temps réel'}
            </p>
          </div>

          {loggedIn ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: '#F0F9F4', border: '1px solid #C2E7D0', padding: '16px', borderRadius: '16px', color: '#1B6339', marginBottom: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
                Connectée en tant que client-vip@fdv.com
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6E6373', marginBottom: '20px' }}>
                Vos points de fidélité FDV Club: <strong>250 pts</strong> (Code de réduction -15% disponible).
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setLoggedIn(false)}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  style={{ width: '100%', paddingLeft: '40px' }}
                  required
                />
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#9B8F9E' }} />
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="newsletter-input"
                  style={{ width: '100%', paddingLeft: '40px' }}
                  required
                />
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#9B8F9E' }} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                {isRegister ? 'CRÉER MON COMPTE' : 'SE CONNECTER'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  style={{ fontSize: '0.85rem', color: '#68486E', textDecoration: 'underline', fontWeight: 600 }}
                >
                  {isRegister ? 'Déjà un compte ? Se connecter' : 'Nouveau client ? Créer un compte'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
