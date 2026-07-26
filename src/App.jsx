import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import TrustBar from './components/TrustBar';
import ProductGrid from './components/ProductGrid';
import LookbookSection from './components/LookbookSection';
import CustomerReviews from './components/CustomerReviews';
import BrandRibbon from './components/BrandRibbon';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import WishlistModal from './components/WishlistModal';
import SearchModal from './components/SearchModal';
import AccountModal from './components/AccountModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

import { PRODUCTS, CATEGORIES, TESTIMONIALS } from './data/products';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('Tous les articles');
  const [cart, setCart] = useState([
    {
      ...PRODUCTS[0],
      selectedSize: 'S',
      selectedColor: 'Lavande Soft',
      quantity: 1
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['prod-1', 'prod-4']);
  const [toasts, setToasts] = useState([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'Tous les articles') return true;
    if (activeCategory === 'Nouveautés') return p.isNew;
    return p.category === activeCategory;
  });

  // Cart Operations
  const handleAddToCart = (productToAdd) => {
    const size = productToAdd.selectedSize || productToAdd.sizes[0] || 'M';
    const color = productToAdd.selectedColor || (productToAdd.colors[0] ? productToAdd.colors[0].name : 'Unique');
    const qty = productToAdd.quantity || 1;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.id === productToAdd.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...productToAdd,
            selectedSize: size,
            selectedColor: color,
            quantity: qty
          }
        ];
      }
    });

    addToast(`"${productToAdd.title}" a été ajouté à votre panier !`, 'cart');
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemToUpdate, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemToUpdate);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemToUpdate.id &&
        item.selectedSize === itemToUpdate.selectedSize &&
        item.selectedColor === itemToUpdate.selectedColor
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.selectedSize === itemToRemove.selectedSize &&
            item.selectedColor === itemToRemove.selectedColor
          )
      )
    );
    addToast('Article retiré du panier.', 'info');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      addToast(`"${product.title}" retiré de vos favoris.`, 'wishlist');
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast(`"${product.title}" ajouté à vos favoris !`, 'wishlist');
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Order Completed
  const handleOrderComplete = () => {
    setCart([]);
  };

  return (
    <div className="app-layout">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header / Navigation */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner
        onExploreClick={() => {
          setActiveCategory('Tous les articles');
          document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Trust & Value Proposition Bar */}
      <TrustBar />

      {/* Featured Collection & Product Grid */}
      <ProductGrid
        products={filteredProducts}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Lookbook / Inspiration Showcase */}
      <LookbookSection
        onExplore={() => {
          setActiveCategory('Nouveautés');
          document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Verified Customer Reviews */}
      <CustomerReviews testimonials={TESTIMONIALS} />

      {/* Newsletter Signup */}
      <Newsletter onSubscribeToast={(msg) => addToast(msg, 'info')} />

      {/* Quality Guarantees Ribbon */}
      <BrandRibbon />

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Account / Login Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onToast={(msg) => addToast(msg, 'info')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
