import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden" data-testid="hero-section">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1680946496238-5272d3c407fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkYXJrJTIwbHV4dXJ5fGVufDB8fHx8MTc3OTYzNzY3NHww&ixlib=rb-4.1.0&q=85"
          alt="Luxury Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-6"
          data-testid="hero-subtitle"
        >
          Pure Vegetarian Excellence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-7xl tracking-tighter font-light font-heading text-white mb-4"
          data-testid="hero-title"
        >
          Maa Harsiddhi <br /> Darbar Foods
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed tracking-wide"
          data-testid="hero-description"
        >
          Experience the finest pure vegetarian cuisine in Ujjain. From authentic Indian flavors to modern fusion delights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={scrollToMenu}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide glow-orange"
            data-testid="order-now-button"
          >
            Order Now
          </button>
          <a
            href="https://wa.me/919713131389"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-orange-500 text-white"
            data-testid="whatsapp-order-button"
          >
            Quick Order on WhatsApp
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToMenu}
            className="cursor-pointer"
          >
            <ArrowDown className="w-6 h-6 text-orange-600" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Special Offer Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-32 right-4 sm:right-10 glass px-6 py-4 animate-pulse z-10"
        data-testid="offer-badge"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-1">Special Offer</p>
        <p className="text-lg font-heading text-white">Order ₹999</p>
        <p className="text-sm text-gray-400">Get 9% Discount</p>
      </motion.div>
    </section>
  );
};

export default Hero;
