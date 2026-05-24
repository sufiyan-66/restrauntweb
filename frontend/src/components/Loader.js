import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-heading text-orange-600 tracking-wide">Maa Harsiddhi Darbar Foods</h2>
        <p className="text-sm text-gray-400 mt-2 font-body">Pure Veg Restaurant & Cafe</p>
      </motion.div>
    </div>
  );
};

export default Loader;
