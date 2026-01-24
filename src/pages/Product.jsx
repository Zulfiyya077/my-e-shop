import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Filter, ChevronLeft, ChevronRight, X, Menu, ArrowUpDown, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useFilter } from "../context/FilterContext";
import { getProducts, getBrands, getCategories } from "../services/api";
import Skeleton from "../components/Skeleton";

const PER_PAGE = 6;

const CustomDropdown = ({ label, value, onChange, options, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="text-xs font-bold text-[#4A4A4A] mb-2 flex items-center gap-2 uppercase tracking-wider">
                    {Icon && <Icon size={14} />}
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 text-sm bg-white border-2 border-[#FF6F20] rounded-xl text-[#4A4A4A] font-bold hover:border-[#FFB300] transition-all shadow-sm"
            >
                <span className="truncate capitalize">{selectedOption.label}</span>
                <ChevronDown size={18} className={`text-[#FF6F20] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-[80] w-full mt-2 bg-white border-2 border-[#FF6F20] rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors capitalize ${value === option.value
                                        ? "bg-[#FF6F20] text-white"
                                        : "text-[#4A4A4A] hover:bg-[#FFF3E0] hover:text-[#FF6F20]"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Product = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const {
        category,
        setCategory,
        brand,
        setBrand,
        color,
        setColor,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
    } = useFilter();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [addedProducts, setAddedProducts] = useState(new Set());
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getProducts({
                    category: category !== "all" ? category : undefined,
                    brand: brand !== "all" ? brand : undefined,
                    color: color !== "all" ? color : undefined,
                    minPrice: priceRange[0] || undefined,
                    maxPrice: priceRange[1] !== 5000 ? priceRange[1] : undefined,
                    page,
                    limit: PER_PAGE,
                });

                let allProducts = [];
                if (response && Array.isArray(response.data)) {
                    allProducts = response.data;
                } else if (response && Array.isArray(response)) {
                    allProducts = response;
                }

                const sortedProducts = [...allProducts].sort((a, b) => {
                    switch (sortBy) {
                        case "price-asc":
                            return a.price - b.price;
                        case "price-desc":
                            return b.price - a.price;
                        case "name-asc":
                            return a.title.localeCompare(b.title);
                        case "name-desc":
                            return b.title.localeCompare(a.title);
                        default:
                            return 0;
                    }
                });

                const start = (page - 1) * PER_PAGE;
                const end = start + PER_PAGE;

                const paginatedProducts = sortedProducts.slice(start, end);

                setProducts(paginatedProducts);
                setTotalPages(Math.ceil(sortedProducts.length / PER_PAGE));

            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, brand, color, priceRange, sortBy, page]);

    useEffect(() => {
        setPage(1);
    }, [category, brand, color, priceRange, sortBy]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const b = await getBrands();
                const c = await getCategories();
                setBrands(Array.isArray(b) ? b : b.data || []);
                setCategories(Array.isArray(c) ? c : c.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFilters();
    }, []);

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

    const resetFilters = () => {
        setCategory("all");
        setBrand("all");
        setColor("all");
        setPriceRange([0, 5000]);
        setSortBy("default");
        setPage(1);
        setShowFilters(false);
    };

    const colorOptions = [
        { label: "All Colors", value: "all" },
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
        { label: "Red", value: "red" },
        { label: "Gray", value: "gray" },
        { label: "Blue", value: "blue" },
    ];

    const sortOptions = [
        { label: "Featured", value: "default" },
        { label: "Price: Low to High", value: "price-asc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Name: A to Z", value: "name-asc" },
        { label: "Name: Z to A", value: "name-desc" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    const FilterContent = () => (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-black text-[#4A4A4A] flex items-center gap-2">
                    <Filter size={20} className="text-[#FF6F20]" />
                    <span>Filters</span>
                </h2>
                <motion.button
                    onClick={resetFilters}
                    className="text-xs text-[#FF6F20] font-black hover:text-[#FFB300] px-3 py-1.5 rounded-lg hover:bg-[#FFF3E0] transition-all border-2 border-transparent hover:border-[#FF6F20]/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Clear All
                </motion.button>
            </div>

            <CustomDropdown
                label="Sort By"
                icon={ArrowUpDown}
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
            />

            <CustomDropdown
                label="Category"
                value={category}
                onChange={setCategory}
                options={[
                    { label: "All Departments", value: "all" },
                    ...categories.map(c => ({ label: c, value: c }))
                ]}
            />

            <CustomDropdown
                label="Brand"
                value={brand}
                onChange={setBrand}
                options={[
                    { label: "All Brands", value: "all" },
                    ...brands.map(b => ({ label: b, value: b }))
                ]}
            />

            <CustomDropdown
                label="Color"
                value={color}
                onChange={setColor}
                options={colorOptions}
            />

            <div>
                <label className="text-xs font-bold text-[#4A4A4A] mb-3 block uppercase tracking-wider">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex gap-2">
                    <div className="relative w-1/2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6F20] font-bold">$</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={priceRange[0] || ""}
                            onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                            className="w-full pl-7 pr-3 py-3 text-sm bg-white border-2 border-[#FF6F20] rounded-xl text-[#4A4A4A] placeholder-gray-400 hover:border-[#FFB300] focus:border-[#FF7043] outline-none font-bold transition-all shadow-sm"
                        />
                    </div>
                    <div className="relative w-1/2">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6F20] font-bold">$</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={priceRange[1] === 5000 ? "" : priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 5000])}
                            className="w-full pl-7 pr-3 py-3 text-sm bg-white border-2 border-[#FF6F20] rounded-xl text-[#4A4A4A] placeholder-gray-400 hover:border-[#FFB300] focus:border-[#FF7043] outline-none font-bold transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFF3E0]">
            <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-[#FF6F20] via-[#FFB300] to-[#FF7043] border-b-2 border-[#FF6F20] sticky top-0 z-40 shadow-xl"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 lg:py-5 flex items-center justify-between gap-3 text-white">
                    <div className="flex-1 min-w-0">
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight truncate"
                        >
                            Products
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs sm:text-sm font-bold opacity-90"
                        >
                            {products.length} results found
                        </motion.p>
                    </div>

                    <motion.button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden group bg-white text-[#FF6F20] px-4 py-2.5 rounded-xl font-black flex items-center gap-2 shadow-lg hover:shadow-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showFilters ? <X size={18} /> : <Filter size={18} />}
                        <span className="text-sm">Filters</span>
                    </motion.button>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                    {showFilters && (
                        <>
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                            />

                            <motion.div
                                key="panel"
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="lg:hidden fixed left-0 top-0 h-full w-[85vw] max-w-xs bg-white border-r-4 border-[#FF6F20] p-6 overflow-y-auto z-[70] shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-[#4A4A4A]">Filters</h2>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="p-2 bg-[#FFF3E0] rounded-xl text-[#FF6F20]"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <FilterContent />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex gap-8 relative">
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="bg-white rounded-3xl border-2 border-[#FF6F20]/10 p-6 sticky top-32 shadow-xl shadow-[#FF6F20]/5">
                            <FilterContent />
                        </div>
                    </aside>

                    <div className="flex-1">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {loading
                                ? Array.from({ length: PER_PAGE }).map((_, i) => <Skeleton key={i} />)
                                : products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        className="group bg-white rounded-3xl border-2 border-[#FF6F20]/5 overflow-hidden hover:border-[#FF6F20] transition-all duration-500 shadow-xl shadow-[#FF6F20]/5 hover:shadow-[#FF6F20]/20"
                                        whileHover={{ y: -8 }}
                                    >
                                        <Link to={`/products/${product.id}`}>
                                            <div className="relative h-56 sm:h-64 bg-[#FFF3E0]/50 p-6 overflow-hidden">
                                                <motion.button
                                                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                                    className="absolute top-4 right-4 z-10 bg-white border-2 border-[#FF6F20] rounded-2xl p-2.5 text-[#FF6F20] shadow-lg transition-all"
                                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Heart
                                                        size={18}
                                                        className={isInWishlist(product.id) ? 'fill-[#FF6F20]' : ''}
                                                    />
                                                </motion.button>

                                                <motion.img
                                                    src={product.images?.[0] || "/placeholder.jpg"}
                                                    alt={product.title}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            <div className="p-6 space-y-3">
                                                <span className="inline-block px-3 py-1 bg-[#FFF3E0] border border-[#FF6F20]/20 text-[#FF6F20] rounded-full text-[10px] font-black uppercase tracking-wider">
                                                    {product.category}
                                                </span>

                                                <h2 className="font-black text-lg text-[#4A4A4A] line-clamp-2 group-hover:text-[#FF6F20] transition-colors leading-tight min-h-[3.5rem]">
                                                    {product.title}
                                                </h2>

                                                <div className="flex items-center gap-2">
                                                    <div className="flex gap-0.5 text-[#FFB300]">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-[#4A4A4A] font-black text-xs">
                                                        {product.rating}
                                                    </span>
                                                </div>

                                                <div className="flex items-end gap-1.5 pt-2">
                                                    <span className="text-3xl font-black text-[#FF6F20]">
                                                        ${product.price ? Math.floor(product.price) : 0}
                                                        <span className="text-sm">.{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <motion.button
                                            onClick={(e) => handleAddToCart(product, e)}
                                            className="w-full bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-4 font-black flex items-center justify-center gap-2 hover:hue-rotate-15 transition-all relative overflow-hidden"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ShoppingCart size={18} className="relative z-10" />
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={addedProducts.has(product.id) ? "added" : "add"}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="relative z-10"
                                                >
                                                    {addedProducts.has(product.id) ? "ADDED!" : "ADD TO CART"}
                                                </motion.span>
                                            </AnimatePresence>
                                        </motion.button>
                                    </motion.div>
                                ))}
                        </motion.div>

                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-16 px-4">
                                <motion.button
                                    onClick={() => page > 1 && setPage(page - 1)}
                                    disabled={page === 1}
                                    className={`p-3 rounded-2xl border-2 transition-all ${page === 1
                                        ? 'bg-gray-100 text-gray-400 border-gray-200'
                                        : 'bg-white text-[#FF6F20] border-[#FF6F20] hover:bg-[#FFF3E0] shadow-lg'
                                        }`}
                                    whileHover={page > 1 ? { scale: 1.1 } : {}}
                                >
                                    <ChevronLeft size={20} />
                                </motion.button>

                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, idx) => {
                                        const pageNum = idx + 1;
                                        const isActive = pageNum === page;
                                        if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                                            return (
                                                <motion.button
                                                    key={pageNum}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 font-black transition-all ${isActive
                                                        ? 'bg-[#FF6F20] text-white border-transparent shadow-xl'
                                                        : 'bg-white text-[#4A4A4A] border-[#FF6F20]/20 hover:border-[#FF6F20]'
                                                        }`}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {pageNum}
                                                </motion.button>
                                            );
                                        }
                                        if (pageNum === page - 2 || pageNum === page + 2) return <span key={pageNum} className="px-1 text-[#FF6F20]">...</span>;
                                        return null;
                                    })}
                                </div>

                                <motion.button
                                    onClick={() => page < totalPages && setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className={`p-3 rounded-2xl border-2 transition-all ${page === totalPages
                                        ? 'bg-gray-100 text-gray-400 border-gray-200'
                                        : 'bg-white text-[#FF6F20] border-[#FF6F20] hover:bg-[#FFF3E0] shadow-lg'
                                        }`}
                                    whileHover={page < totalPages ? { scale: 1.1 } : {}}
                                >
                                    <ChevronRight size={20} />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF6F20; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default Product;