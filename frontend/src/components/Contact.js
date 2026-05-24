import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-4">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-light font-heading text-white mb-6">
            Visit Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-600/10 border border-orange-600/20">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-heading text-white mb-2">Address</h3>
                <p className="text-gray-400 leading-relaxed">
                  7 Neelganga Chauraha<br />
                  Ram Janki Mandir Ke Samne<br />
                  Ujjain (M.P.) 456010
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-600/10 border border-orange-600/20">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-heading text-white mb-2">Phone</h3>
                <a
                  href="tel:+919713131389"
                  className="text-orange-600 hover:text-orange-700"
                  data-testid="contact-phone-link"
                >
                  +91 9713131389
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-600/10 border border-orange-600/20">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-heading text-white mb-2">Opening Hours</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monday - Sunday<br />
                  10:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <p className="text-white font-heading text-xl mb-2">Find Us Here</p>
              <p className="text-gray-400 text-sm mb-6">7 Neelganga Chauraha, Ujjain</p>
              <a
                href="https://www.google.com/maps?q=7+Neelganga+Chauraha+Ujjain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide"
                data-testid="get-directions-button"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2026 Maa Harsiddhi Darbar Foods. Owned by Lokesh Gorkar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
