import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingCart, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";

const SimilarProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await getProducts({ category, limit: 4 });
        const allProducts = Array.isArray(response) ? response : response.data || [];
        const filtered = allProducts.filter(p => p.id !== currentProductId).slice(0, 4);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSimilarProducts();
    }
  }, [currentProductId, category]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedProducts(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  if (loading || products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#DDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent mb-2 sm:mb-3">
          Similar Products
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-full" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl border border-[#314B6E]/50 overflow-hidden hover:border-[#607EA2] transition-all backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-[#314B6E]/40"
          >
            <Link to={`/products/${product.id}`}>
              {/* Image Container */}
              <div className="relative h-40 sm:h-48 lg:h-52 overflow-hidden bg-gradient-to-br from-[#0E141C] via-[#314B6E]/10 to-[#0E141C]">
                {/* Wishlist Button */}
                <motion.button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    toggleWishlist(product); 
                  }}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-[#314B6E]/60 backdrop-blur-sm border border-[#607EA2]/50 rounded-xl p-1.5 sm:p-2 hover:border-red-400 transition-all"
                  whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={14} 
                    className={`sm:w-4 sm:h-4 transition-all ${
                      isInWishlist(product.id) 
                        ? 'fill-red-400 text-red-400' 
                        : 'text-[#8197AC]'
                    }`} 
                  />
                </motion.button>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle at center, rgba(96, 126, 162, 0.15), transparent 70%)"
                  }}
                />

                {/* Product Image */}
                <motion.img
                  src={product.images?.[0] || product.thumbnail || product.image}
                  alt={product.title || product.name}
                  className="w-full h-full object-contain p-4 sm:p-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 space-y-2">
                {/* Category Badge */}
                <motion.span 
                  className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#607EA2]/30 text-[#DDE3A3] rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#607EA2]/50"
                  whileHover={{ scale: 1.05 }}
                >
                  {product.category}
                </motion.span>

                {/* Product Title */}
                <h3 className="font-black text-sm sm:text-base text-[#DDE3A3] line-clamp-1 group-hover:text-[#8197AC] transition-colors">
                  {product.title || product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={10} 
                      className={`sm:w-3 sm:h-3 ${
                        i < Math.floor(product.rating) 
                          ? "fill-[#8197AC] text-[#8197AC]" 
                          : "text-[#314B6E]"
                      }`} 
                    />
                  ))}
                  <span className="text-[#8197AC] font-bold text-[10px] sm:text-xs ml-1">
                    {product.rating?.toFixed(1) || '0.0'}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#DDE3A3]">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                  <Zap size={12} className="text-[#607EA2] sm:w-[14px] sm:h-[14px]" />
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <motion.button
              onClick={(e) => handleAddToCart(product, e)}
              className="w-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] py-2.5 sm:py-3 flex items-center justify-center gap-1.5 sm:gap-2 font-black text-sm sm:text-base relative overflow-hidden group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DDE3A3]/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              {/* Cart Icon */}
              <motion.div
                animate={addedProducts.has(product.id) ? { rotate: [0, -15, 15, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCart size={14} className="relative z-10 sm:w-4 sm:h-4" />
              </motion.div>
              
              {/* Button Text */}
              <AnimatePresence mode="wait">
                {addedProducts.has(product.id) ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative z-10"
                  >
                    ✓ ADDED!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative z-10"
                  >
                    <span className="hidden xs:inline">ADD TO CART</span>
                    <span className="xs:hidden">ADD</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SimilarProducts;