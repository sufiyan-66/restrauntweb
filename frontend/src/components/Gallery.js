import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const galleryImages = [
    'https://customer-assets.emergentagent.com/job_e858e1da-bdd2-451d-9f85-91d60a32606a/artifacts/prxk96wk_photo_2026-05-24%2017.38.06.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/be3z3nth_photo_2026-05-24%2020.12.14.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/v8l0niyq_photo_2026-05-24%2021.13.19.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/a4xidj2z_photo_2026-05-24%2020.03.56.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/rfgndnn6_photo_2026-05-24%2020.22.12.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/zdmzocz4_photo_2026-05-24%2021.03.56.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/bfevlc40_photo_2026-05-24%2021.09.07.jpeg',
    'https://customer-assets.emergentagent.com/job_luxury-veg-eats-1/artifacts/3nl88ack_photo_2026-05-24%2020.44.05.jpeg',
  ];

  return (
    <section id="gallery" className="py-20 bg-black" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-4">Gallery</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-light font-heading text-white">
            A Visual Feast
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden group ${
                index === 0 || index === 7 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
