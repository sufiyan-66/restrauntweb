import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cartItems, total, updateQuantity, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    // Build WhatsApp message
    let message = `Hello Maa Harsiddhi Darbar Foods.\n\n`;
    message += `*Customer Name:* ${customerInfo.name}\n`;
    message += `*Phone:* ${customerInfo.phone}\n`;
    message += `*Address:* ${customerInfo.address}\n\n`;
    message += `*Order Details:*\n`;
    
    cartItems.forEach((item) => {
      message += `- ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    
    message += `\n*Total: ₹${total}*\n`;
    
    if (customerInfo.notes) {
      message += `\n*Special Instructions:* ${customerInfo.notes}\n`;
    }
    
    message += `\nPlease confirm my order.`;

    const whatsappUrl = `https://wa.me/919713131389?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart and close drawer
    clearCart();
    setIsCartOpen(false);
    setShowCheckout(false);
    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 z-50"
            data-testid="cart-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-[#0a0a0a] glass z-50 flex flex-col"
            data-testid="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-heading text-white">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                data-testid="close-cart-button"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Cart Items or Checkout Form */}
            <div className="flex-1 overflow-y-auto p-6">
              {!showCheckout ? (
                <>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex gap-4 bg-[#050505] border border-white/5 p-4"
                          data-testid={`cart-item-${item.id}`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-1">{item.name}</h3>
                            <p className="text-orange-600 text-sm mb-2">₹{item.price}</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-white/5 rounded"
                                data-testid={`decrease-quantity-${item.id}`}
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </button>
                              <span className="text-white w-8 text-center" data-testid={`quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-white/5 rounded"
                                data-testid={`increase-quantity-${item.id}`}
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 hover:bg-red-600/10 rounded transition-colors"
                              data-testid={`remove-item-${item.id}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                            <p className="text-white font-medium">₹{item.price * item.quantity}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-6" data-testid="checkout-form">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#050505] border-b border-white/10 text-white focus:outline-none focus:border-orange-500"
                      data-testid="checkout-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#050505] border-b border-white/10 text-white focus:outline-none focus:border-orange-500"
                      data-testid="checkout-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 bg-[#050505] border-b border-white/10 text-white focus:outline-none focus:border-orange-500 resize-none"
                      data-testid="checkout-address-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Special Instructions</label>
                    <textarea
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-4 py-3 bg-[#050505] border-b border-white/10 text-white focus:outline-none focus:border-orange-500 resize-none"
                      data-testid="checkout-notes-input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-3 bg-transparent border border-white/20 text-white hover:bg-white/5"
                    data-testid="back-to-cart-button"
                  >
                    Back to Cart
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-heading text-white">Total</span>
                  <span className="text-2xl font-heading text-orange-600" data-testid="cart-total">
                    ₹{total}
                  </span>
                </div>
                {total >= 999 && (
                  <p className="text-sm text-green-500 mb-4 text-center">You qualify for 9% discount!</p>
                )}
                {!showCheckout ? (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide glow-orange"
                    data-testid="proceed-to-checkout-button"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium tracking-wide glow-orange"
                    data-testid="place-order-button"
                  >
                    Place Order on WhatsApp
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
