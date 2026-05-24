import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const categories = ['All', 'Chinese', 'Main Course', 'Tandoor Starter', 'Breads', 'Rice', 'Dal', 'Green Vegetable', 'Curd', 'Combo', 'Salad', 'Dessert', 'Thali'];

  useEffect(() => {
    fetchMenu();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchQuery, menuItems]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const filterItems = () => {
    let filtered = menuItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <section id="menu" className="py-20 bg-[#0a0a0a]" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-4">Our Menu</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-light font-heading text-white mb-6">
            Explore Our Delicious Offerings
          </h2>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#050505] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/30"
                data-testid="menu-search-input"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          data-testid="category-tabs"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#050505] text-gray-400 hover:bg-orange-600/10 hover:text-orange-600 border border-white/5'
              }`}
              data-testid={`category-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-[#050505] border border-white/5 hover:border-orange-500/30 transition-all duration-500 overflow-hidden group"
              data-testid={`menu-item-${item.id}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-orange-600 px-3 py-1 text-sm font-medium">
                  ₹{item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-heading text-white mb-2">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-4 tracking-wider uppercase">{item.category}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-white/20 hover:border-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
                  data-testid={`add-to-cart-${item.id}`}
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
