import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../../services/api';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';


const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts({ limit: 5 });
                setProducts((response.data || []).slice(0, 5));

            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const itemsPerView = 3;
    const maxIndex = Math.max(0, products.length - itemsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const getBadgeColor = (product) => {
        if (product.discount > 30) return { gradient: "from-[#314B6E] to-[#607EA2]", text: "Sale" };
        if (product.stock < 10) return { gradient: "from-[#607EA2] to-[#DDE3A3]", text: "Hot" };
        if (product.rating >= 4.5) return { gradient: "from-[#607EA2] to-[#8197AC]", text: "Best Seller" };
        return { gradient: "from-[#8197AC] to-[#DDE3A3]", text: "New" };
    };

    const calculateDiscountedPrice = (price, discount) => {
        return (price * (1 - discount / 100)).toFixed(2);
    };

    if (loading) {
        return (
            <section className="bg-[#0E141C] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black mb-6 text-[#DDE3A3]">Featured Products</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#0E141C] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black mb-6 text-[#DDE3A3]">
                        Featured Products
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full mb-4" />
                    <p className="text-[#8197AC] text-lg font-semibold">
                        Discover our handpicked selection of premium tech
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 bg-gradient-to-r from-[#607EA2] to-[#8197AC] p-4 rounded-full shadow-2xl hover:shadow-[#607EA2]/50 transition-all hover:scale-110 group"
                    >
                        <ChevronLeft size={24} className="text-[#0E141C] group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 bg-gradient-to-r from-[#607EA2] to-[#8197AC] p-4 rounded-full shadow-2xl hover:shadow-[#607EA2]/50 transition-all hover:scale-110 group"
                    >
                        <ChevronRight size={24} className="text-[#0E141C] group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Cards Container */}
                    <div className="overflow-hidden px-2">
                        <motion.div
                            animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex gap-6"
                        >
                            {products.map((product, index) => {
                                const badge = getBadgeColor(product);
                                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        className="flex-shrink-0 w-[calc(33.333%-16px)]"
                                        style={{ minWidth: 'calc(33.333% - 16px)' }}
                                    >
                                        <div className="group relative bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl overflow-hidden border-2 border-[#314B6E]/50 hover:border-[#607EA2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#314B6E]/40">
                                            {/* Badge */}
                                            {product.discount > 0 && (
                                                <div className={`absolute top-4 left-4 z-20 bg-gradient-to-r ${badge.gradient} px-4 py-2 rounded-full shadow-lg`}>
                                                    <span className="text-[#0E141C] font-black text-xs">{badge.text}</span>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <AnimatePresence>
                                                {hoveredCard === product.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        className="absolute top-4 right-4 z-20 flex flex-col gap-2"
                                                    >
                                                        <button
                                                            onClick={() => toggleWishlist(product)}
                                                            className="bg-[#314B6E]/80 backdrop-blur-sm p-3 rounded-full hover:bg-[#607EA2] transition-all shadow-lg group/btn"
                                                        >
                                                            <Heart
                                                                size={20}
                                                                className={`text-[#DDE3A3] group-hover/btn:scale-110 transition-transform ${isInWishlist(product) ? "fill-red-500 text-red-500" : ""
                                                                    }`}
                                                            />
                                                        </button>


                                                        <Link to={`/products/${product.id}`}>
                                                            <button className="bg-[#314B6E]/80 backdrop-blur-sm p-3 rounded-full hover:bg-[#607EA2] transition-all shadow-lg group/btn">
                                                                <Eye size={20} className="text-[#DDE3A3] group-hover/btn:scale-110 transition-transform" />
                                                            </button>
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Image Container */}
                                            <Link to={`/products/${product.id}`}>
                                                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#314B6E]/10 to-[#1a2332]">
                                                    <img
                                                        src={product.thumbnail || product.images?.[2]}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E141C] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                                                </div>
                                            </Link>

                                            {/* Content */}
                                            <div className="p-6">
                                                {/* Rating */}
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                className={`${i < Math.floor(product.rating)
                                                                    ? "fill-[#DDE3A3] text-[#DDE3A3]"
                                                                    : "text-[#314B6E]"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[#8197AC] text-sm font-semibold">
                                                        {product.rating?.toFixed(1) || '0.0'}
                                                    </span>
                                                </div>

                                                {/* Product Name */}
                                                <Link to={`/products/${product.id}`}>
                                                    <h3 className="text-xl font-black text-[#DDE3A3] mb-4 group-hover:text-white transition-colors line-clamp-2 min-h-[3.5rem]">
                                                        {product.title}
                                                    </h3>
                                                </Link>

                                                {/* Price */}
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-3xl font-black text-[#DDE3A3]">
                                                        ${product.discount > 0 ? discountedPrice : product.price.toFixed(2)}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-lg text-[#607EA2] line-through font-semibold">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <motion.button
                                                    onClick={() => addToCart(product)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] font-black py-4 rounded-xl hover:shadow-2xl hover:shadow-[#607EA2]/50 transition-all flex items-center justify-center gap-2 group/btn"
                                                >

                                                    <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
                                                    Add to Cart
                                                </motion.button>
                                            </div>

                                            {/* Hover Effect Overlay */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredCard === product.id ? 1 : 0 }}
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDE3A3]/5 rounded-full blur-3xl" />
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#607EA2]/5 rounded-full blur-3xl" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-12">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                    ? "bg-[#DDE3A3] w-8"
                                    : "bg-[#607EA2]/50 hover:bg-[#607EA2]"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;