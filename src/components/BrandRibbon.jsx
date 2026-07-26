import React from 'react';
import { Gem, Award, HeartHandshake, UserCheck } from 'lucide-react';

export default function BrandRibbon() {
  const commitments = [
    {
      icon: <Gem size={22} />,
      title: 'Pièces Exclusives',
      desc: 'Créations uniques en séries limitées'
    },
    {
      icon: <Award size={22} />,
      title: 'Qualité Premium',
      desc: 'Matières d’exception sélectionnées'
    },
    {
      icon: <HeartHandshake size={22} />,
      title: 'Conçu pour Vous',
      desc: 'Coupe ajustée & confort absolu'
    },
    {
      icon: <UserCheck size={22} />,
      title: 'Accompagnement VIP',
      desc: 'Conseil style personnalisé offert'
    }
  ];

  return (
    <section className="brand-ribbon-section">
      <div className="brand-ribbon-container">
        {commitments.map((item, idx) => (
          <div key={idx} className="brand-ribbon-item">
            <div className="brand-ribbon-icon">
              {item.icon}
            </div>
            <div>
              <div className="brand-ribbon-title">{item.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#D5CAD8', marginTop: '2px' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
