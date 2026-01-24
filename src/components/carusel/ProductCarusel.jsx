import React, { useState, useEffect, useCallback } from 'react';
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
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts({ limit: 6 });
                const data = response.data || [];
                setProducts(data.slice(0, 6));
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

    const getItemsPerView = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return itemsPerView.mobile;
            if (window.innerWidth < 1024) return itemsPerView.tablet;
            return itemsPerView.desktop;
        }
        return itemsPerView.desktop;
    }, []);

    const [currentItemsPerView, setCurrentItemsPerView] = useState(getItemsPerView());

    useEffect(() => {
        const handleResize = () => {
            setCurrentItemsPerView(getItemsPerView());
            setCurrentIndex(0);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getItemsPerView]);

    const maxIndex = Math.max(0, products.length - currentItemsPerView);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    useEffect(() => {
        let interval;
        if (isAutoPlaying && products.length > currentItemsPerView) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, products.length, currentItemsPerView, nextSlide]);

    const getBadgeColor = (product) => {
        if (product.discount > 30) return { gradient: "from-[#FF6F20] to-[#FFB300]", text: "Sale" };
        if (product.stock < 10) return { gradient: "from-[#FFB300] to-[#FF7043]", text: "Hot" };
        if (product.rating >= 4.5) return { gradient: "from-[#FF7043] to-[#FF6F20]", text: "Best Seller" };
        return { gradient: "from-[#FF6F20] to-[#FFB300]", text: "New" };
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
            <section className="bg-[#FFF3E0] py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent">Featured Products</h2>
                        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white border-2 border-[#FF6F20]/10 rounded-2xl h-80 sm:h-96 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    const cardWidth = currentItemsPerView === 1 ? '100%' :
        currentItemsPerView === 2 ? 'calc(50% - 12px)' :
            'calc(33.333% - 16px)';

    return (
        <section
            className="bg-[#FFF3E0] py-12 sm:py-16 lg:py-20 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] bg-clip-text text-transparent drop-shadow-sm">
                        Featured Products
                    </h2>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] mx-auto rounded-full mb-3 sm:mb-4" />
                    <p className="text-[#4A4A4A] text-sm sm:text-base lg:text-lg font-bold px-4">
                        Handpicked premium electronics for you
                    </p>
                </motion.div>

                <div className="relative">
                    {products.length > currentItemsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 sm:-left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-[#FF6F20] p-2 sm:p-3 lg:p-4 rounded-xl shadow-2xl hover:shadow-[#FF6F20]/30 transition-all hover:scale-110 group"
                            >
                                <ChevronLeft size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#FF6F20] group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 sm:-right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-[#FF6F20] p-2 sm:p-3 lg:p-4 rounded-xl shadow-2xl hover:shadow-[#FF6F20]/30 transition-all hover:scale-110 group"
                            >
                                <ChevronRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#FF6F20] group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    )}

                    <div className="overflow-hidden px-1 sm:px-2">
                        <motion.div
                            animate={{ x: `-${currentIndex * (100 / currentItemsPerView)}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="flex gap-3 sm:gap-4 lg:gap-6"
                        >
                            {products.map((product, index) => {
                                const badge = getBadgeColor(product);
                                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        onMouseEnter={() => setHoveredCard(product.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        className="flex-shrink-0"
                                        style={{ width: cardWidth, minWidth: cardWidth }}
                                    >
                                        <div className="group relative bg-white rounded-2xl overflow-hidden border-2 border-[#FF6F20]/10 hover:border-[#FF6F20] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FF6F20]/20">
                                            {product.discount > 0 && (
                                                <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-gradient-to-r ${badge.gradient} px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg`}>
                                                    <span className="text-white font-black text-[10px] sm:text-xs">{badge.text}</span>
                                                </div>
                                            )}

                                            <AnimatePresence>
                                                {hoveredCard === product.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 flex flex-col gap-2"
                                                    >
                                                        <button
                                                            onClick={() => toggleWishlist(product)}
                                                            className="bg-white border-2 border-[#FF6F20] p-2.5 rounded-xl hover:bg-[#FFF3E0] transition-all shadow-lg group/btn"
                                                        >
                                                            <Heart
                                                                size={18}
                                                                className={`transition-transform group-hover/btn:scale-110 ${isInWishlist(product.id) ? "fill-[#FF6F20] text-[#FF6F20]" : "text-[#FF6F20]"}`}
                                                            />
                                                        </button>

                                                        <Link to={`/products/${product.id}`}>
                                                            <button className="bg-white border-2 border-[#FF6F20] p-2.5 rounded-xl hover:bg-[#FFF3E0] transition-all shadow-lg group/btn">
                                                                <Eye size={18} className="text-[#FF6F20] group-hover/btn:scale-110 transition-transform" />
                                                            </button>
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <Link to={`/products/${product.id}`}>
                                                <div className="relative h-44 sm:h-56 lg:h-64 overflow-hidden bg-[#FFF3E0]/50">
                                                    <img
                                                        src={product.images?.[0] || "/placeholder.jpg"}
                                                        alt={product.title}
                                                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                            </Link>

                                            <div className="p-4 sm:p-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                className={`${i < Math.floor(product.rating) ? "fill-[#FFB300] text-[#FFB300]" : "text-gray-200"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[#4A4A4A] text-xs font-black">{product.rating?.toFixed(1)}</span>
                                                </div>

                                                <Link to={`/products/${product.id}`}>
                                                    <h3 className="text-sm sm:text-lg font-black text-[#4A4A4A] mb-3 group-hover:text-[#FF6F20] transition-colors line-clamp-2 min-h-[3rem]">
                                                        {product.title}
                                                    </h3>
                                                </Link>

                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-xl sm:text-2xl font-black text-[#FF6F20]">
                                                        ${product.discount > 0 ? discountedPrice : product.price.toFixed(2)}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-sm text-gray-400 line-through font-bold">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                <motion.button
                                                    onClick={(e) => handleAddToCart(product, e)}
                                                    whileHover={!isInCart(product.id) ? { scale: 1.02 } : {}}
                                                    whileTap={!isInCart(product.id) ? { scale: 0.98 } : {}}
                                                    className={`w-full py-3 sm:py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden font-black ${isInCart(product.id)
                                                            ? "bg-gray-100 text-[#4A4A4A]/40 shadow-none cursor-default"
                                                            : "bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white hover:shadow-[#FF6F20]/40"
                                                        }`}
                                                    disabled={isInCart(product.id)}
                                                >
                                                    {!isInCart(product.id) && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-white/20"
                                                            initial={{ x: "-100%" }}
                                                            whileHover={{ x: "100%" }}
                                                            transition={{ duration: 0.5 }}
                                                        />
                                                    )}

                                                    <ShoppingCart size={18} className={`${!isInCart(product.id) ? "group-hover/btn:rotate-12" : ""} transition-transform relative z-10`} />

                                                    <AnimatePresence mode="wait">
                                                        {isInCart(product.id) ? (
                                                            <motion.span
                                                                key="incart"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="relative z-10"
                                                            >
                                                                IN CART
                                                            </motion.span>
                                                        ) : addedProducts.has(product.id) ? (
                                                            <motion.span
                                                                key="added"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="relative z-10"
                                                            >
                                                                ADDED!
                                                            </motion.span>
                                                        ) : (
                                                            <motion.span
                                                                key="add"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                className="relative z-10"
                                                            >
                                                                Add to Cart
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {products.length > currentItemsPerView && (
                        <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-500 ${currentIndex === index
                                            ? "bg-[#FF6F20] w-12"
                                            : "bg-[#FFB300]/30 hover:bg-[#FFB300] w-3"
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