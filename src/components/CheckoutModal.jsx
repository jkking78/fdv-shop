import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, ArrowRight } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, onOrderComplete }) {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card'
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.90;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('success');
    if (onOrderComplete) onOrderComplete();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ padding: '36px 32px' }}>
          {step === 'form' ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <ShieldCheck size={26} style={{ color: '#27AE60' }} />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Finaliser Ma Commande</h3>
                  <p style={{ fontSize: '0.8rem', color: '#6E6373' }}>Paiement crypté SSL 256 bits hautement sécurisé</p>
                </div>
              </div>

              {/* Order Summary box */}
              <div style={{ background: '#FAF6FA', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '1px solid #EFE6F0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2C222E', marginBottom: '8px' }}>
                  Récapitulatif ({cart.length} articles)
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6E6373' }}>
                  <span>Sous-total:</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6E6373', marginTop: '4px' }}>
                  <span>Livraison:</span>
                  <span>{shipping === 0 ? 'OFFERTE' : `${shipping.toFixed(2)}€`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#2C222E', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #EFE6F0' }}>
                  <span>Total à payer:</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="newsletter-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="newsletter-input"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Adresse Email de confirmation"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="newsletter-input"
                  required
                />

                <input
                  type="text"
                  placeholder="Adresse de livraison"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="newsletter-input"
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Code Postal"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="newsletter-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="newsletter-input"
                    required
                  />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2C222E', display: 'block', marginBottom: '8px' }}>
                    MODE DE PAIEMENT
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: formData.paymentMethod === 'card' ? '2px solid #4A354F' : '1px solid #EFE6F0',
                        background: formData.paymentMethod === 'card' ? '#F5ECF7' : '#FFF',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <CreditCard size={16} />
                      Carte Bancaire
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'klarna' })}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: formData.paymentMethod === 'klarna' ? '2px solid #4A354F' : '1px solid #EFE6F0',
                        background: formData.paymentMethod === 'klarna' ? '#F5ECF7' : '#FFF',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                      }}
                    >
                      <span>Klarna (3x sans frais)</span>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                  <Lock size={16} />
                  <span>PAYER {total.toFixed(2)}€ SÉCURISÉ</span>
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#F0F9F4', color: '#27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <CheckCircle size={42} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#2C222E' }}>
                Commande Confirmée !
              </h3>
              <p style={{ color: '#6E6373', fontSize: '0.98rem', maxWidth: '420px', margin: '10px auto 24px auto', lineHeight: 1.6 }}>
                Merci pour votre confiance. Votre commande N° <strong>FDV-2026-{Math.floor(1000 + Math.random() * 9000)}</strong> a été enregistrée avec succès. Un e-mail de confirmation vient de vous être envoyé.
              </p>

              <button
                className="btn-primary"
                style={{ justifyContent: 'center' }}
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
              >
                CONTINUER MES ACHATS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
