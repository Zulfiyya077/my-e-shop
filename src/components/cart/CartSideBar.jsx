import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart, ShoppingBag, CreditCard, Package, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const CartSideBar = () => {
  const navigate = useNavigate();
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
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-white shadow-2xl z-50 border-l-4 border-[#FF6F20]"
            >
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center p-6 border-b-2 border-[#FF6F20] bg-gradient-to-r from-[#FFF3E0] to-white"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <ShoppingBag className="w-8 h-8 text-[#FF6F20]" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFB300] rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-black text-[#FF6F20]">Shopping Cart</h2>
                    <motion.p
                      className="text-sm text-gray-600"
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
                  className="p-2 bg-[#FFF3E0] hover:bg-[#FFE8C5] rounded-xl transition-colors duration-200 border-2 border-[#FF6F20]"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-[#FF6F20]" />
                </motion.button>
              </motion.div>

              <div className="flex flex-col h-[calc(100%-88px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#FFF3E0]">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4 items-center bg-white p-4 rounded-2xl border-2 border-[#FF6F20]"
                          >
                            <motion.div
                              className="w-24 h-24 bg-[#FFF3E0] rounded-xl"
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <div className="flex-1 space-y-3">
                              <motion.div
                                className="h-4 bg-[#FFF3E0] rounded-full w-3/4"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="h-4 bg-[#FFF3E0] rounded-full w-1/2"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </>
                    ) : cartItems.length === 0 ? (
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
                          <ShoppingCart className="w-32 h-32 text-[#FF6F20]/30 mb-4" />
                        </motion.div>
                        <motion.p
                          className="text-xl font-black text-[#4A4A4A] mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Your cart is empty
                        </motion.p>
                        <motion.p
                          className="text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Add some products to get started!
                        </motion.p>
                      </motion.div>
                    ) : (
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
                            className="bg-white border-2 border-[#FF6F20] rounded-2xl p-4 hover:shadow-2xl hover:shadow-[#FF6F20]/30 transition-all duration-300 relative overflow-hidden"
                            whileHover={{ y: -4, borderColor: "#FFB300" }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-[#FFF3E0]/50 to-[#FFE8C5]/50 opacity-0"
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />

                            <div className="flex gap-4 relative z-10">
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                              >
                                <img
                                  src={item.images?.[0]}
                                  alt={item.title}
                                  className="w-24 h-24 object-cover rounded-xl shadow-lg border-2 border-[#FF6F20]"
                                />
                                <motion.div
                                  className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                                >
                                  {item.quantity}
                                </motion.div>
                              </motion.div>

                              <div className="flex-1 min-w-0">
                                <h3 className="font-black text-[#4A4A4A] mb-1 line-clamp-2 text-sm">
                                  {item.title}
                                </h3>
                                <motion.p
                                  className="text-xl font-black text-[#FF6F20]"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                  ${item.price.toFixed(2)}
                                </motion.p>

                                <div className="flex items-center gap-3 mt-3">
                                  <motion.button
                                    onClick={() => decreaseQty(item.id)}
                                    className="w-9 h-9 flex items-center justify-center border-2 border-[#FF6F20] rounded-xl bg-white hover:bg-[#FFF3E0] text-[#FF6F20] transition-all duration-200 font-bold shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    -
                                  </motion.button>
                                  <motion.span
                                    className="font-black text-[#4A4A4A] w-10 text-center text-lg"
                                    key={item.quantity}
                                    initial={{ scale: 1.5, color: "#FFB300" }}
                                    animate={{ scale: 1, color: "#4A4A4A" }}
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    onClick={() => increaseQty(item.id)}
                                    className="w-9 h-9 flex items-center justify-center border-2 border-[#FF6F20] rounded-xl bg-white hover:bg-[#FFF3E0] text-[#FF6F20] transition-all duration-200 font-bold shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    +
                                  </motion.button>
                                </div>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                <motion.button
                                  onClick={() => toggleWishlist(item)}
                                  className={`p-2 rounded-xl transition-all duration-200 border-2 ${isInWishlist(item.id)
                                      ? "bg-gradient-to-r from-pink-500 to-red-500 text-white border-pink-400 shadow-lg shadow-pink-500/30"
                                      : "bg-white text-[#FF6F20] hover:bg-[#FFF3E0] hover:text-pink-400 border-[#FF6F20]"
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

                                <motion.button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 rounded-xl bg-white text-red-400 hover:bg-red-500 hover:text-white border-2 border-[#FF6F20] hover:border-red-400 shadow-sm transition-all"
                                  whileHover={{ scale: 1.15, rotate: -10 }}
                                  whileTap={{ scale: 0.9, rotate: 0 }}
                                >
                                  <Trash2 size={20} />
                                </motion.button>
                              </div>
                            </div>

                            <motion.div
                              className="mt-3 pt-3 border-t-2 border-[#FF6F20]/30 flex justify-between items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              <span className="text-sm text-gray-600 flex items-center gap-1 font-semibold">
                                <Package size={14} />
                                Subtotal:
                              </span>
                              <span className="font-black text-[#FF6F20] text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </motion.div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {cartItems.length > 0 && (
                  <motion.div
                    variants={totalVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-t-2 border-[#FF6F20] p-6 bg-white"
                  >
                    <motion.div
                      className="flex justify-between items-center mb-4 p-5 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-2xl shadow-lg shadow-[#FF6F20]/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-white" />
                        <span className="text-lg font-black text-white">
                          Total:
                        </span>
                      </div>
                      <motion.span
                        className="text-3xl font-black text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        ${totalPrice.toFixed(2)}
                      </motion.span>
                    </motion.div>

                    <div className="space-y-3">
                      <motion.button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/checkout");
                        }}
                        className="w-full bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-4 rounded-xl font-black shadow-xl shadow-[#FF6F20]/30 flex items-center justify-center gap-2 relative overflow-hidden"
                        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(255, 111, 32, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0"
                          whileHover={{ opacity: 0.2 }}
                        />
                        <CreditCard size={20} />
                        Checkout Now
                      </motion.button>

                      <motion.button
                        onClick={clearCart}
                        className="w-full bg-[#FFF3E0] text-[#FF6F20] py-3 rounded-xl font-bold hover:bg-[#FFE8C5] transition-all duration-200 border-2 border-[#FF6F20]"
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 111, 32, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 179, 0, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 111, 32, 0.8);
        }
      `}</style>
    </>
  );
};

export default CartSideBar;