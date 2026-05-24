import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Star } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Amazing pure veg food! The Paneer Tikka was absolutely delicious. Highly recommended!',
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Best restaurant in Ujjain. The Dal Makhni and Butter Naan are to die for!',
    },
    {
      name: 'Amit Patel',
      rating: 5,
      text: 'Great ambiance and wonderful food. The Chinese section has amazing options.',
    },
    {
      name: 'Sneha Verma',
      rating: 5,
      text: 'Loved the Shahi Paneer and the service was excellent. Will definitely visit again!',
    },
    {
      name: 'Vikram Singh',
      rating: 5,
      text: 'Authentic Indian flavors! The Thali is a must-try. Great value for money.',
    },
    {
      name: 'Anjali Desai',
      rating: 5,
      text: 'Perfect place for family dinners. Clean, hygienic, and delicious vegetarian food.',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-[#0a0a0a] overflow-hidden" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-4">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-light font-heading text-white">
            What Our Customers Say
          </h2>
        </motion.div>
      </div>

      {/* Scrolling Reviews */}
      <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="mx-4 w-[400px] bg-[#050505] border border-white/5 p-6"
            data-testid={`review-card-${index}`}
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-600 text-orange-600" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{review.text}</p>
            <p className="text-orange-600 font-medium">{review.name}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Reviews;
