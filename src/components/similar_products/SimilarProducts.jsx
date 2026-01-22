import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";

const SimilarProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading || products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 mt-16"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-black bg-gradient-to-r from-[#EDE3A3] via-[#8197AC] to-[#607EA2] bg-clip-text text-transparent mb-2">
          Similar Products
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl border border-[#314B6E]/50 overflow-hidden hover:border-[#607EA2] transition-all backdrop-blur-sm"
          >
            <Link to={`/products/${product.id}`}>
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0E141C] via-[#314B6E]/10 to-[#0E141C]">
                <motion.button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                  className="absolute top-3 right-3 z-10 bg-[#314B6E]/60 backdrop-blur-sm border border-[#607EA2]/50 rounded-xl p-2 hover:border-red-400 transition-all"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={16} className={`${isInWishlist(product.id) ? 'fill-red-400 text-red-400' : 'text-[#8197AC]'}`} />
                </motion.button>

                <motion.img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-contain p-6"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <div className="p-4 space-y-2">
                <motion.span className="inline-block px-2 py-1 bg-[#607EA2]/30 text-[#EDE3A3] rounded-lg text-xs font-bold uppercase">
                  {product.category}
                </motion.span>
                <h3 className="font-black text-[#EDE3A3] line-clamp-1 group-hover:text-[#8197AC] transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={`${i < Math.floor(product.rating) ? "fill-[#8197AC] text-[#8197AC]" : "text-[#314B6E]"}`} />
                  ))}
                  <span className="text-[#8197AC] font-bold text-xs ml-1">{product.rating}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#EDE3A3]">${product.price}</span>
                  <Zap size={14} className="text-[#607EA2]" />
                </div>
              </div>
            </Link>

            <motion.button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] py-3 flex items-center justify-center gap-2 font-bold relative overflow-hidden group/btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EDE3A3]/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <ShoppingCart size={16} className="relative z-10" />
              <span className="relative z-10">ADD TO CART</span>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SimilarProducts;