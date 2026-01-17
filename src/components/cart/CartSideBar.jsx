import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart, ShoppingBag, CreditCard, Package } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const CartSideBar = () => {
  const {
    cartItems,
    setIsCartOpen,
    isCartOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart,
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isCartOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const sidebarVariants = {
    hidden: { 
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    visible: { 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const emptyCartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        delay: 0.2 
      }
    }
  };

  const totalVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, type: "spring" }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50"
            >
              {/* Header */}
              <motion.div 
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center p-6 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                    <motion.p 
                      className="text-sm text-blue-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </motion.div>

              {/* Content */}
              <div className="flex flex-col h-[calc(100%-88px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      // Loading Skeleton
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4 items-center bg-gray-100 p-4 rounded-2xl"
                          >
                            <motion.div 
                              className="w-24 h-24 bg-gray-300 rounded-xl"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <div className="flex-1 space-y-3">
                              <motion.div 
                                className="h-4 bg-gray-300 rounded-full w-3/4"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div 
                                className="h-4 bg-gray-300 rounded-full w-1/2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </>
                    ) : cartItems.length === 0 ? (
                      // Empty Cart
                      <motion.div
                        variants={emptyCartVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center justify-center h-full text-center py-12"
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <ShoppingCart className="w-32 h-32 text-gray-300 mb-4" />
                        </motion.div>
                        <motion.p 
                          className="text-xl font-semibold text-gray-600 mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Your cart is empty
                        </motion.p>
                        <motion.p 
                          className="text-gray-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Add some products to get started!
                        </motion.p>
                      </motion.div>
                    ) : (
                      // Cart Items
                      <>
                        {cartItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className="bg-white border-2 border-gray-100 rounded-2xl p-4 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                            whileHover={{ y: -4 }}
                          >
                            {/* Gradient Background Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />

                            <div className="flex gap-4 relative z-10">
                              {/* Image */}
                              <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                              >
                                <img
                                  src={item.images?.[0]}
                                  alt={item.title}
                                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                                />
                                <motion.div
                                  className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                                >
                                  {item.quantity}
                                </motion.div>
                              </motion.div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 text-sm">
                                  {item.title}
                                </h3>
                                <motion.p 
                                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                  ${item.price.toFixed(2)}
                                </motion.p>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-3">
                                  <motion.button
                                    onClick={() => decreaseQty(item.id)}
                                    className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 rounded-xl bg-white hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all duration-200 font-bold text-gray-600 shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    -
                                  </motion.button>
                                  <motion.span 
                                    className="font-bold text-gray-700 w-10 text-center text-lg"
                                    key={item.quantity}
                                    initial={{ scale: 1.5, color: "#3B82F6" }}
                                    animate={{ scale: 1, color: "#374151" }}
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    onClick={() => increaseQty(item.id)}
                                    className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 rounded-xl bg-white hover:bg-green-50 hover:border-green-400 hover:text-green-600 transition-all duration-200 font-bold text-gray-600 shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    +
                                  </motion.button>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col items-center gap-2">
                                {/* Wishlist */}
                                <motion.button
                                  onClick={() => toggleWishlist(item)}
                                  className={`p-2 rounded-xl transition-all duration-200 ${
                                    isInWishlist(item.id)
                                      ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg"
                                      : "bg-gray-100 text-gray-400 hover:bg-pink-50 hover:text-pink-400"
                                  }`}
                                  whileHover={{ scale: 1.15, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  animate={isInWishlist(item.id) ? {
                                    scale: [1, 1.2, 1],
                                  } : {}}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Heart
                                    size={20}
                                    fill={isInWishlist(item.id) ? "currentColor" : "none"}
                                  />
                                </motion.button>

                                {/* Delete */}
                                <motion.button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm"
                                  whileHover={{ scale: 1.15, rotate: -10 }}
                                  whileTap={{ scale: 0.9, rotate: 0 }}
                                >
                                  <Trash2 size={20} />
                                </motion.button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <motion.div 
                              className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Package size={14} />
                                Subtotal:
                              </span>
                              <span className="font-bold text-gray-800 text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </motion.div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <motion.div 
                    variants={totalVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-t-2 border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white"
                  >
                    {/* Total */}
                    <motion.div 
                      className="flex justify-between items-center mb-4 p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg font-semibold text-white">
                        Total:
                      </span>
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        ${totalPrice.toFixed(2)}
                      </motion.span>
                    </motion.div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => {
                          alert("Checkout successful! 🎉");
                          clearCart();
                          setIsCartOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0"
                          whileHover={{ opacity: 0.1 }}
                        />
                        <CreditCard size={20} />
                        Checkout Now
                      </motion.button>
                      
                      <motion.button
                        onClick={clearCart}
                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear Cart
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSideBar;