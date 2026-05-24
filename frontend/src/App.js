import React, { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartDrawer from './components/CartDrawer';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <CartProvider>
      <div className="App bg-black min-h-screen" data-testid="app-root">
        <Navigation />
        <Hero />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
        <FloatingWhatsApp />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
