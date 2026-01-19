import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Package, Truck, Shield, ZoomIn, X, Zap } from "lucide-react";
import { getProductById, getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductDetailSkeleton = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto bg-[#0E141C]">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-4">
          <div className="bg-[#314B6E]/20 rounded-2xl h-96 animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-[#314B6E]/20 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="w-24 h-8 bg-[#314B6E]/20 rounded-full animate-pulse" />
          <div className="w-3/4 h-10 bg-[#314B6E]/20 rounded-lg animate-pulse" />
          <div className="w-32 h-6 bg-[#314B6E]/20 rounded animate-pulse" />
          <div className="w-40 h-12 bg-[#314B6E]/20 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

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

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return <p className="p-6 text-center text-[#8197AC]">Product not found.</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  const features = [
    { icon: Truck, text: "Free Shipping", color: "from-[#314B6E] to-[#607EA2]" },
    { icon: Package, text: "Easy Returns", color: "from-[#607EA2] to-[#8197AC]" },
    { icon: Shield, text: "Secure Payment", color: "from-[#8197AC] to-[#607EA2]" }
  ];

  return (
    <div className="bg-[#0E141C] min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div variants={itemVariants} className="relative lg:w-1/2">
            <motion.div className="absolute top-4 right-4 z-20" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <motion.button
                onClick={() => toggleWishlist(product)}
                className="bg-[#314B6E]/60 backdrop-blur-md border border-[#607EA2]/50 rounded-full p-2.5 shadow-lg hover:shadow-xl transition-all"
                animate={{ scale: isInWishlist(product.id) ? [1, 1.15, 1] : 1 }}
              >
                <Heart size={20} className={`transition-all ${isInWishlist(product.id) ? "fill-red-400 text-red-400" : "text-[#8197AC]"}`} />
              </motion.button>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl p-6 shadow-xl overflow-hidden group border-2 border-[#314B6E]/50"
              whileHover={{ boxShadow: "0 20px 40px -10px rgba(49, 75, 110, 0.4)" }}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#607EA2]/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8197AC]/20 to-transparent rounded-full blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={product.images?.[selectedImage] || "/placeholder.jpg"}
                    alt={`${product.title} - ${selectedImage + 1}`}
                    className="w-full h-96 object-contain relative z-10 cursor-zoom-in"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setIsZoomed(true)}
                  />

                  <motion.button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-3 left-3 bg-[#314B6E]/60 backdrop-blur-sm text-[#EDE3A3] px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs border border-[#607EA2]/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ZoomIn size={14} />
                    <span>Zoom</span>
                  </motion.button>

                  <div className="absolute bottom-3 right-3 bg-[#314B6E]/80 backdrop-blur-sm text-[#EDE3A3] px-3 py-1 rounded-full text-xs font-medium border border-[#607EA2]/50">
                    {selectedImage + 1} / {product.images?.length || 0}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="flex gap-3 mt-4">
              {product.images?.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-xl transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-[#607EA2] shadow-lg scale-105'
                      : 'ring-2 ring-[#314B6E]/50 hover:ring-[#607EA2] shadow-md'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] p-2">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-contain transition-opacity ${
                        selectedImage === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1 flex flex-col">
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] rounded-full text-xs font-semibold w-fit mb-3 shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              {product.category}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-black mb-4 text-[#EDE3A3] leading-tight"
            >
              {product.title}
            </motion.h1>

            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    <Star size={18} className={`${i < Math.floor(product.rating) ? "fill-[#8197AC] text-[#8197AC]" : "text-[#314B6E]"}`} />
                  </motion.div>
                ))}
              </div>
              <span className="text-base font-bold text-[#8197AC]">{product.rating}</span>
              <span className="text-[#607EA2] text-sm">• 2,847 reviews</span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#314B6E]/30 to-[#0E141C] rounded-xl border-2 border-[#607EA2]/50"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-black text-[#EDE3A3]">
                  ${product.price}
                </p>
              </motion.div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[#8197AC] mb-6 leading-relaxed text-sm">
              {product.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-[#EDE3A3] px-4 py-2 rounded-lg shadow-md`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.08 }}
                >
                  <feature.icon size={16} />
                  <span className="text-xs font-semibold">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              onClick={handleAddToCart}
              className="relative bg-gradient-to-r from-[#607EA2] via-[#8197AC] to-[#607EA2] text-[#0E141C] py-4 px-8 rounded-xl font-bold text-base shadow-xl overflow-hidden group"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(96, 126, 162, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EDE3A3] to-transparent opacity-0 group-hover:opacity-20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />

              <span className="flex items-center justify-center gap-2 relative z-10">
                <ShoppingCart size={20} />
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      ✓ Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <SimilarProducts currentProductId={product.id} category={product.category} />

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0E141C]/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={() => setIsZoomed(false)}
          >
            <motion.button
              className="absolute top-6 right-6 bg-[#314B6E]/60 hover:bg-[#314B6E]/80 text-[#EDE3A3] p-3 rounded-full backdrop-blur-sm transition-colors border border-[#607EA2]/50"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsZoomed(false)}
            >
              <X size={24} />
            </motion.button>

            <div className="absolute top-6 left-6 bg-[#314B6E]/60 backdrop-blur-sm text-[#EDE3A3] px-4 py-2 rounded-full font-bold text-sm border border-[#607EA2]/50">
              {selectedImage + 1} / {product.images?.length}
            </div>

            <motion.img
              src={product.images?.[selectedImage]}
              alt={product.title}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.1}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {product.images?.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedImage === index ? 'bg-[#EDE3A3] scale-125' : 'bg-[#607EA2]/40'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;