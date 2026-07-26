import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export default function Header({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', category: 'Tous les articles' },
    { label: 'Nouveautés', category: 'Nouveautés' },
    { label: 'Collections', category: 'Tous les articles' },
    { label: 'Robes & Ensembles', category: 'Robes & Ensembles' },
    { label: 'Accessoires', category: 'Accessoires' }
  ];

  const handleNavClick = (catName) => {
    onSelectCategory(catName);
    setMobileMenuOpen(false);
    // Smooth scroll to product selection if not already there
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Mobile Hamburger */}
        <button
          className="icon-btn mobile-only"
          style={{ display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <a href="#" className="brand-logo" onClick={() => onSelectCategory('Tous les articles')}>
          <div className="brand-icon-wrapper">
            <Sparkles size={20} />
          </div>
          <div>
            <span>FDV shopping</span>
            <span className="brand-subtext">MAISON DE COUTURE</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <button
                  className={`nav-link ${activeCategory === item.category && item.label !== 'Accueil' ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.category)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Action Icons */}
        <div className="header-actions">
          <button className="icon-btn" onClick={onOpenSearch} title="Rechercher">
            <Search size={20} />
          </button>
          <button className="icon-btn" onClick={onOpenAccount} title="Mon compte">
            <User size={20} />
          </button>
          <button className="icon-btn" onClick={onOpenWishlist} title="Mes favoris">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={onOpenCart} title="Panier">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FAF7F4',
          borderTop: '1px solid #EFE6F0',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              style={{
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#2C222E',
                padding: '8px 0'
              }}
              onClick={() => handleNavClick(item.category)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
