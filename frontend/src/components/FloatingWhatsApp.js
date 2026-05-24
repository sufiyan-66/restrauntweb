import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/919713131389"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center shadow-2xl glow-orange animate-pulse"
      data-testid="floating-whatsapp-button"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
};

export default FloatingWhatsApp;
