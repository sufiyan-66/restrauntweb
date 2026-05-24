import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav
      style={{ opacity: isScrolled ? opacity : 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass shadow-2xl' : 'bg-transparent'
      }`}
      data-testid="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-heading font-light tracking-wider cursor-pointer"
            onClick={() => scrollToSection('hero')}
            data-testid="restaurant-logo"
          >
            <span className="text-orange-600">Maa Harsiddhi</span>
            <span className="text-white ml-2">Darbar</span>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8 font-body text-sm tracking-wide"
          >
            <button
              onClick={() => scrollToSection('menu')}
              className="text-gray-300 hover:text-orange-600"
              data-testid="nav-menu-link"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-300 hover:text-orange-600"
              data-testid="nav-gallery-link"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-gray-300 hover:text-orange-600"
              data-testid="nav-reviews-link"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-orange-600"
              data-testid="nav-contact-link"
            >
              Contact
            </button>
          </motion.div>

          {/* Cart & Call CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-orange-600/10 rounded-full"
              data-testid="cart-icon-button"
            >
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  data-testid="cart-item-count"
                >
                  {totalItems}
                </span>
              )}
            </button>
            <a
              href="tel:+919713131389"
              className="hidden sm:block px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide"
              data-testid="call-now-button"
            >
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
