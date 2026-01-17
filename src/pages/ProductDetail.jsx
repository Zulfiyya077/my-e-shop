// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Package, Truck, Shield, ZoomIn, X } from "lucide-react";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

// ✨ Product Detail Skeleton Component
const ProductDetailSkeleton = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Skeleton */}
        <div className="lg:w-1/2 space-y-4">
          <div className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-3/4 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-40 h-12 bg-gray-200 rounded-xl animate-pulse" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="w-full h-14 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductById(id);
        setProduct(response); 
        console.log("Fetched product:", response);
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
  if (!product) return <p className="p-6 text-center text-gray-500">Product not found.</p>;

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
    { icon: Truck, text: "Free Shipping", color: "from-blue-500 to-blue-600" },
    { icon: Package, text: "Easy Returns", color: "from-green-500 to-green-600" },
    { icon: Shield, text: "Secure Payment", color: "from-purple-500 to-purple-600" }
  ];

  return (
    <>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ✨ Compact Image Gallery */}
          <motion.div variants={itemVariants} className="relative lg:w-1/2">
            {/* Favorite Button */}
            <motion.div className="absolute top-4 right-4 z-20" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <motion.button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                animate={{ scale: isFavorite ? [1, 1.15, 1] : 1 }}
              >
                <Heart size={20} className={`transition-all duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </motion.button>
            </motion.div>

            {/* Main Image Container */}
            <motion.div 
              className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-xl overflow-hidden group"
              whileHover={{ boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/20 to-transparent rounded-full blur-2xl" />

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
                  
                  {/* Zoom Button */}
                  <motion.button
                    onClick={() => setIsZoomed(true)}
                    className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ZoomIn size={14} />
                    <span>Zoom</span>
                  </motion.button>

                  {/* Image Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {selectedImage + 1} / {product.images?.length || 0}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images?.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-xl transition-all ${
                    selectedImage === index 
                      ? 'ring-3 ring-blue-500 shadow-lg scale-105' 
                      : 'ring-2 ring-gray-200/50 hover:ring-gray-300 shadow-md'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-2">
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

          {/* ✨ Compact Info Section */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col">
            {/* Category Badge */}
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold w-fit mb-3 shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              {product.category}
            </motion.span>

            {/* Title */}
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight"
            >
              {product.title}
            </motion.h1>

            {/* Rating */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    <Star size={18} className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                  </motion.div>
                ))}
              </div>
              <span className="text-base font-bold text-gray-700">{product.rating}</span>
              <span className="text-gray-400 text-sm">• 2,847 reviews</span>
            </motion.div>

            {/* Price */}
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div 
                className="inline-block px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${product.price}
                </p>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-gray-600 mb-6 leading-relaxed text-sm">
              {product.description}
            </motion.p>

            {/* Features */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-lg shadow-md`}
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

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-4 px-8 rounded-xl font-bold text-base shadow-xl overflow-hidden group"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
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

      {/* ✨ Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsZoomed(false)}
            >
              <X size={24} />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm">
              {selectedImage + 1} / {product.images?.length}
            </div>

            {/* Zoomed Image */}
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

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {product.images?.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedImage === index ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;