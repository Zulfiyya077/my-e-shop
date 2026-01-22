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
    const [addedProducts, setAddedProducts] = useState(new Set());
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

    const itemsPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    };

    const getItemsPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return itemsPerView.mobile;
            if (window.innerWidth < 1024) return itemsPerView.tablet;
            return itemsPerView.desktop;
        }
        return itemsPerView.desktop;
    };

    const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView());

    useEffect(() => {
        const handleResize = () => {
            setCurrentItemsPerView(getItemsPerView());
            setCurrentIndex(0);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, products.length - currentItemsPerView);

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

    if (loading) {
        return (
            <section className="bg-[#0E141C] py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-[#DDE3A3]">Featured Products</h2>
                        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-2xl h-80 sm:h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    const cardWidth = currentItemsPerView === 1 ? '100%' : 
                     currentItemsPerView === 2 ? 'calc(50% - 12px)' : 
                     'calc(33.333% - 16px)';

    return (
        <section className="bg-[#0E141C] py-12 sm:py-16 lg:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-[#DDE3A3]">
                        Featured Products
                    </h2>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] mx-auto rounded-full mb-3 sm:mb-4" />
                    <p className="text-[#8197AC] text-sm sm:text-base lg:text-lg font-semibold px-4">
                        Discover our handpicked selection of premium tech
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons - Hide on mobile if only 1 item shown */}
                    {products.length > currentItemsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 sm:-left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-[#607EA2] to-[#8197AC] p-2 sm:p-3 lg:p-4 rounded-full shadow-2xl hover:shadow-[#607EA2]/50 transition-all hover:scale-110 group"
                            >
                                <ChevronLeft size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#0E141C] group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 sm:-right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-[#607EA2] to-[#8197AC] p-2 sm:p-3 lg:p-4 rounded-full shadow-2xl hover:shadow-[#607EA2]/50 transition-all hover:scale-110 group"
                            >
                                <ChevronRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#0E141C] group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    )}

                    {/* Cards Container */}
                    <div className="overflow-hidden px-1 sm:px-2">
                        <motion.div
                            animate={{ x: `${-currentIndex * (100 / currentItemsPerView)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex gap-3 sm:gap-4 lg:gap-6"
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
                                        className="flex-shrink-0"
                                        style={{ width: cardWidth, minWidth: cardWidth }}
                                    >
                                        <div className="group relative bg-gradient-to-br from-[#314B6E]/20 to-[#0E141C] rounded-xl sm:rounded-2xl overflow-hidden border border-[#314B6E]/50 sm:border-2 hover:border-[#607EA2] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#314B6E]/40">
                                            {/* Badge */}
                                            {product.discount > 0 && (
                                                <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 z-20 bg-gradient-to-r ${badge.gradient} px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg`}>
                                                    <span className="text-[#0E141C] font-black text-[10px] sm:text-xs">{badge.text}</span>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <AnimatePresence>
                                                {hoveredCard === product.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 z-20 flex flex-col gap-1.5 sm:gap-2"
                                                    >
                                                        <button
                                                            onClick={() => toggleWishlist(product)}
                                                            className="bg-[#314B6E]/80 backdrop-blur-sm p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-[#607EA2] transition-all shadow-lg group/btn"
                                                        >
                                                            <Heart
                                                                size={16}
                                                                className={`sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 text-[#DDE3A3] group-hover/btn:scale-110 transition-transform ${isInWishlist(product) ? "fill-red-500 text-red-500" : ""
                                                                    }`}
                                                            />
                                                        </button>

                                                        <Link to={`/products/${product.id}`}>
                                                            <button className="bg-[#314B6E]/80 backdrop-blur-sm p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-[#607EA2] transition-all shadow-lg group/btn">
                                                                <Eye size={16} className="sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 text-[#DDE3A3] group-hover/btn:scale-110 transition-transform" />
                                                            </button>
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Image Container */}
                                            <Link to={`/products/${product.id}`}>
                                                <div className="relative h-40 sm:h-52 lg:h-64 overflow-hidden bg-gradient-to-br from-[#314B6E]/10 to-[#1a2332]">
                                                    <img
                                                        src={product.thumbnail || product.images?.[2]}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E141C] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                                                </div>
                                            </Link>

                                            {/* Content */}
                                            <div className="p-3 sm:p-4 lg:p-6">
                                                {/* Rating */}
                                                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                                                    <div className="flex items-center gap-0.5 sm:gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                className={`sm:w-[14px] sm:h-[14px] lg:w-4 lg:h-4 ${i < Math.floor(product.rating)
                                                                    ? "fill-[#DDE3A3] text-[#DDE3A3]"
                                                                    : "text-[#314B6E]"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[#8197AC] text-xs sm:text-sm font-semibold">
                                                        {product.rating?.toFixed(1) || '0.0'}
                                                    </span>
                                                </div>

                                                {/* Product Name */}
                                                <Link to={`/products/${product.id}`}>
                                                    <h3 className="text-sm sm:text-base lg:text-xl font-black text-[#DDE3A3] mb-2 sm:mb-3 lg:mb-4 group-hover:text-white transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem]">
                                                        {product.title}
                                                    </h3>
                                                </Link>

                                                {/* Price */}
                                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                                                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#DDE3A3]">
                                                        ${product.discount > 0 ? discountedPrice : product.price.toFixed(2)}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-sm sm:text-base lg:text-lg text-[#607EA2] line-through font-semibold">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Add to Cart Button */}
                                                <motion.button
                                                    onClick={(e) => handleAddToCart(product, e)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] font-black py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl hover:shadow-2xl hover:shadow-[#607EA2]/50 transition-all flex items-center justify-center gap-1.5 sm:gap-2 group/btn text-sm sm:text-base relative overflow-hidden"
                                                >
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DDE3A3]/20 to-transparent"
                                                        animate={{ x: ["-100%", "100%"] }}
                                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                                    />
                                                    
                                                    <motion.div
                                                        animate={addedProducts.has(product.id) ? { rotate: [0, -15, 15, 0] } : {}}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 group-hover/btn:scale-110 transition-transform relative z-10" />
                                                    </motion.div>
                                                    
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
                                                                <span className="hidden xs:inline">Add to Cart</span>
                                                                <span className="xs:hidden">Add</span>
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            </div>

                                            {/* Hover Effect Overlay */}
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredCard === product.id ? 1 : 0 }}
                                            >
                                                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#DDE3A3]/5 rounded-full blur-3xl" />
                                                <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#607EA2]/5 rounded-full blur-3xl" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Dots Indicator */}
                    {products.length > currentItemsPerView && (
                        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 lg:mt-12">
                            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${currentIndex === index
                                        ? "bg-[#DDE3A3] w-6 sm:w-8"
                                        : "bg-[#607EA2]/50 hover:bg-[#607EA2] w-2 sm:w-3"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;