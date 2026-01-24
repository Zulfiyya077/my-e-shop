import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistModal = () => {
  const {
    wishlistProducts,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isWishlistOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isWishlistOpen]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toggleWishlist(product.id);
  };

  if (!isWishlistOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white border-2 border-[#FF6F20] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b-2 border-[#FF6F20] bg-gradient-to-r from-[#FFF3E0] to-white">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-[#FF6F20]" fill="currentColor" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-black text-[#FF6F20]">My Wishlist</h2>
                <p className="text-sm text-gray-600 font-semibold">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 hover:bg-[#FFF3E0] rounded-xl transition-colors group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="text-[#FF6F20] transition-colors" />
            </motion.button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[60vh] bg-[#FFF3E0]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-[#FFB300] border-t-[#FF6F20] rounded-full"
                />
              </div>
            ) : wishlistProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Heart size={64} className="mx-auto text-[#FF6F20]/30 mb-4" />
                <p className="text-gray-600 text-lg font-semibold">Wishlist is empty</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {wishlistProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="border-2 border-[#FF6F20] rounded-xl p-4 flex gap-4 bg-white hover:shadow-lg transition-all"
                  >
                    <div className="relative">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-[#FF6F20]"
                      />
                      <motion.button
                        onClick={() => toggleWishlist(item.id)}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] p-1.5 rounded-full text-white shadow-lg"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart size={14} fill="currentColor" />
                      </motion.button>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-black text-[#4A4A4A] mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <p className="text-xl font-black text-[#FF6F20] mb-3">
                        ${item.price}
                      </p>

                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-2 rounded-lg flex items-center justify-center gap-2 font-bold shadow-lg relative overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                          />
                          <ShoppingCart size={16} className="relative z-10" />
                          <span className="relative z-10">Add</span>
                        </motion.button>

                        <motion.button
                          onClick={() => toggleWishlist(item.id)}
                          className="bg-[#FFF3E0] text-[#FF6F20] p-2 rounded-lg hover:bg-[#FFE8C5] transition-colors border-2 border-[#FF6F20]"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {wishlistProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border-t-2 border-[#FF6F20] flex gap-3 bg-white"
            >
              <motion.button
                onClick={() => {
                  wishlistProducts.forEach(addToCart);
                  clearWishlist();
                  setIsWishlistOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-3 rounded-xl font-black hover:shadow-2xl transition-shadow relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">Add All to Cart</span>
              </motion.button>

              <motion.button
                onClick={clearWishlist}
                className="bg-[#FFF3E0] text-[#FF6F20] px-6 rounded-xl font-bold hover:bg-[#FFE8C5] transition-colors border-2 border-[#FF6F20]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WishlistModal;