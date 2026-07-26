import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export default function CustomerReviews({ testimonials }) {
  return (
    <section className="section-container" style={{ paddingTop: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="section-subtitle">TÉMOIGNAGES CLIENTES</span>
        <h2 className="section-title">Elles Adorent FDV Shopping</h2>
        <p style={{ color: '#6E6373', marginTop: '8px' }}>Découvrez l'expérience de nos clientes vérifiées</p>
      </div>

      <div className="reviews-grid">
        {testimonials.map((review) => (
          <div key={review.id} className="review-card">
            <div>
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </div>

            <div className="review-author">
              <img src={review.avatar} alt={review.name} className="review-avatar" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="review-author-name">{review.name}</span>
                  <CheckCircle size={14} style={{ color: '#27AE60' }} title="Achat vérifié" />
                </div>
                <div className="review-author-meta">{review.city} • Article: {review.product}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
