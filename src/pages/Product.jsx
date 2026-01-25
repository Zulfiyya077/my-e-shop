import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Filter, ChevronLeft, ChevronRight, X, Menu, ArrowUpDown, ChevronDown, Search, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useFilter } from "../context/FilterContext";
import { getProducts, getBrands, getCategories } from "../services/api";
import Skeleton from "../components/Skeleton";
import { toast } from "react-toastify";

const PER_PAGE = 6;

const MultiSelectDropdown = ({ label, value, onChange, options, icon: Icon }) => {
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

    const toggleItem = (val) => {
        if (value.includes(val)) {
            onChange(value.filter(v => v !== val));
        } else if (value.length < 3) {
            onChange([...value, val]);
        } else {
            toast.warning("You can select maximum 3 items", {
                style: { background: "#4A4A4A", color: "white" }
            });
        }
    };

    const getTriggerLabel = () => {
        if (value.length === 0) return "All";
        const firstValue = value[0];
        const label = options.find(o => o.value === firstValue)?.label || firstValue;
        if (value.length === 1) return label;
        return `${label} + ${value.length - 1} more`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="text-xs font-bold text-[#4A4A4A] mb-2 flex items-center gap-2 uppercase tracking-wider">
                    {Icon && <Icon size={14} className="text-[#FF6F20]" />}
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 text-sm bg-white border-2 rounded-xl text-[#4A4A4A] font-bold transition-all shadow-sm ${isOpen || value.length > 0 ? 'border-[#FF6F20]' : 'border-gray-100 hover:border-[#FF6F20]/30'}`}
            >
                <span className="truncate capitalize">{getTriggerLabel()}</span>
                <ChevronDown size={18} className={`text-[#FF6F20] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-[80] w-full mt-2 bg-white border-2 border-[#FF6F20] rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar p-1"
                    >
                        <button
                            onClick={() => { onChange([]); setIsOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-lg mb-1 ${value.length === 0 ? "bg-[#FF6F20] text-white" : "text-[#4A4A4A] hover:bg-[#FFF3E0]"}`}
                        >
                            All Items
                        </button>
                        <div className="h-px bg-gray-100 my-1" />
                        {options.filter(opt => opt.value !== "all").map((option) => (
                            <button
                                key={option.value}
                                onClick={() => toggleItem(option.value)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-colors rounded-lg mb-1 ${value.includes(option.value)
                                    ? "bg-[#FFF3E0] text-[#FF6F20]"
                                    : "text-[#4A4A4A] hover:bg-gray-50"
                                    }`}
                            >
                                <span className="truncate capitalize">{option.label}</span>
                                {value.includes(option.value) && <Zap size={14} className="fill-[#FF6F20] text-[#FF6F20]" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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
    const { addToCart, isInCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const {
        category: contextCategory,
        setCategory: setContextCategory,
        brand: contextBrand,
        setBrand: setContextBrand,
        color: contextColor,
        setColor: setContextColor,
        priceRange: contextPriceRange,
        setPriceRange: setContextPriceRange,
        sortBy: contextSortBy,
        setSortBy: setContextSortBy,
        page,
        setPage,
        resetAllFilters: contextResetAll,
    } = useFilter();

    const [localCategory, setLocalCategory] = useState(contextCategory);
    const [localBrand, setLocalBrand] = useState(contextBrand);
    const [localColor, setLocalColor] = useState(contextColor);
    const [localPriceRange, setLocalPriceRange] = useState(contextPriceRange);

    useEffect(() => {
        setLocalCategory(contextCategory);
        setLocalBrand(contextBrand);
        setLocalColor(contextColor);
        setLocalPriceRange(contextPriceRange);
    }, [contextCategory, JSON.stringify(contextBrand), JSON.stringify(contextColor), contextPriceRange]);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [addedProducts, setAddedProducts] = useState(new Set());

    const handleApplyFilters = () => {
        setContextCategory(localCategory);
        setContextBrand(localBrand);
        setContextColor(localColor);
        setContextPriceRange(localPriceRange);
        // We don't setContextSortBy here anymore as it's immediate
        setPage(1);
        setShowFilters(false);
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

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getProducts({
                    category: contextCategory !== "all" ? contextCategory : undefined,
                });

                let allProducts = [];
                if (response && Array.isArray(response.data)) {
                    allProducts = response.data;
                } else if (response && Array.isArray(response)) {
                    allProducts = response;
                }

                const filteredProducts = allProducts.filter(product => {
                    const categoryMatch = contextCategory === "all" ||
                        (product.category && product.category.toLowerCase() === contextCategory.toLowerCase());

                    const brandMatch = contextBrand.length === 0 ||
                        (product.brand && contextBrand.some(b => b.toLowerCase() === product.brand.toLowerCase()));

                    const normalizeColor = (c) => c?.toLowerCase().replace('ay', 'ey');
                    const colorMatch = contextColor.length === 0 ||
                        (product.color && contextColor.some(c => normalizeColor(c) === normalizeColor(product.color)));

                    const priceMatch = (product.price || 0) >= contextPriceRange[0] && (product.price || 0) <= contextPriceRange[1];

                    return categoryMatch && brandMatch && colorMatch && priceMatch;
                });

                const calculatedTotalPages = Math.ceil(filteredProducts.length / PER_PAGE);

                if (page > calculatedTotalPages && calculatedTotalPages > 0) {
                    setPage(1);
                    return;
                }

                const sortedProducts = [...filteredProducts].sort((a, b) => {
                    switch (contextSortBy) {
                        case "price-asc":
                            return (a.price || 0) - (b.price || 0);
                        case "price-desc":
                            return (b.price || 0) - (a.price || 0);
                        case "name-asc":
                            return (a.title || "").localeCompare(b.title || "");
                        case "name-desc":
                            return (b.title || "").localeCompare(a.title || "");
                        default:
                            return 0;
                    }
                });

                const start = Math.max(0, (page - 1) * PER_PAGE);
                const end = start + PER_PAGE;
                const paginatedProducts = sortedProducts.slice(start, end);

                setProducts(paginatedProducts);
                setTotalPages(calculatedTotalPages);

            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [contextCategory, contextBrand, contextColor, contextPriceRange, contextSortBy, page]);

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

    const resetFilters = () => {

        contextResetAll();

        setLocalCategory("all");
        setLocalBrand([]);
        setLocalColor([]);
        setLocalPriceRange([0, 5000]);

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

    const filterContentUI = (
        <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-[#4A4A4A] flex items-center gap-2">
                    <Filter size={18} className="text-[#FF6F20]" />
                    <span>Filters</span>
                </h2>
                <motion.button
                    onClick={resetFilters}
                    className="text-[10px] text-[#FF6F20] font-black hover:text-[#FFB300] px-2 py-1 rounded-lg hover:bg-[#FFF3E0] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Clear All
                </motion.button>
            </div>

            <div className="space-y-4">
                <CustomDropdown
                    label="Sort By"
                    icon={ArrowUpDown}
                    value={contextSortBy}
                    onChange={(val) => {
                        setContextSortBy(val);
                    }}
                    options={sortOptions}
                />

                <CustomDropdown
                    label="Category"
                    value={localCategory}
                    onChange={setLocalCategory}
                    options={[
                        { label: "All Departments", value: "all" },
                        ...categories.map(c => ({ label: c, value: c }))
                    ]}
                />

                <MultiSelectDropdown
                    label="Brand"
                    value={localBrand}
                    onChange={setLocalBrand}
                    options={brands.map(b => ({ label: b, value: b }))}
                />

                <MultiSelectDropdown
                    label="Color"
                    value={localColor}
                    onChange={setLocalColor}
                    options={colorOptions.filter(opt => opt.value !== "all")}
                />

                <div>
                    <label className="text-[10px] font-black text-[#4A4A4A]/50 mb-3 block uppercase tracking-widest">
                        Price Range: ${localPriceRange[0]} - ${localPriceRange[1]}
                    </label>
                    <div className="flex gap-2">
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6F20] font-bold text-xs">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={localPriceRange[0] || ""}
                                onChange={(e) => setLocalPriceRange([Number(e.target.value) || 0, localPriceRange[1]])}
                                className="w-full pl-6 pr-2 py-3 text-xs bg-[#FFF3E0]/10 border-2 border-[#FF6F20]/20 rounded-xl text-[#4A4A4A] outline-none font-bold transition-all focus:border-[#FF6F20]"
                            />
                        </div>
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6F20] font-bold text-xs">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={localPriceRange[1] === 5000 ? "" : localPriceRange[1]}
                                onChange={(e) => setLocalPriceRange([localPriceRange[0], Number(e.target.value) || 5000])}
                                className="w-full pl-6 pr-2 py-3 text-xs bg-[#FFF3E0]/10 border-2 border-[#FF6F20]/20 rounded-xl text-[#4A4A4A] outline-none font-bold transition-all focus:border-[#FF6F20]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <motion.button
                onClick={handleApplyFilters}
                className="w-full bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white py-4 rounded-xl font-black shadow-lg shadow-[#FF6F20]/20 hover:shadow-[#FF6F20]/40 transition-all flex items-center justify-center gap-2 mt-4 uppercase tracking-[0.1em] text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <Search size={18} />
                Find Products
            </motion.button>
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 text-white">
                    <div className="flex-1 min-w-0">
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-2xl font-black tracking-tight truncate"
                        >
                            Explore Gear
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-80"
                        >
                            {products.length} Items Found
                        </motion.p>
                    </div>

                    <motion.button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden group bg-white text-[#FF6F20] px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showFilters ? <X size={18} /> : <Filter size={18} />}
                        <span className="text-xs">Filters</span>
                    </motion.button>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto p-4 sm:p-6">
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
                                {filterContentUI}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex gap-8 relative">
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="bg-white rounded-3xl border-2 border-[#FF6F20]/5 p-6 sticky top-28 shadow-xl shadow-[#FF6F20]/5">
                            {filterContentUI}
                        </div>
                    </aside>

                    <div className="flex-1">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={!loading && products.length === 0 ? "flex flex-col items-center justify-center py-20 w-full col-span-full" : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"}
                        >
                            {loading
                                ? Array.from({ length: PER_PAGE }).map((_, i) => <Skeleton key={i} />)
                                : products.length === 0
                                    ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center space-y-4"
                                        >
                                            <div className="w-24 h-24 bg-[#FFF3E0] rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl shadow-[#FF6F20]/5">
                                                <Search size={40} className="text-[#FF6F20] opacity-40" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-[#4A4A4A]">No products found</h3>
                                                <p className="text-[#4A4A4A]/60 font-bold max-w-xs mx-auto text-sm">
                                                    No products match your selected filters. Please try adjusting them or clearing all filters.
                                                </p>
                                            </div>
                                            <motion.button
                                                onClick={resetFilters}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-2.5 bg-white border-2 border-[#FF6F20] text-[#FF6F20] rounded-xl font-black text-xs hover:bg-[#FFF3E0] transition-all"
                                            >
                                                Reset All Filters
                                            </motion.button>
                                        </motion.div>
                                    )
                                    : products.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            variants={itemVariants}
                                            className="group bg-white rounded-3xl border-2 border-[#FF6F20]/5 overflow-hidden hover:border-[#FF6F20] transition-all duration-500 shadow-xl shadow-[#FF6F20]/5 hover:shadow-[#FF6F20]/20"
                                            whileHover={{ y: -8 }}
                                        >
                                            <Link to={`/products/${product.id}`}>
                                                <div className="relative h-56 sm:h-64 bg-[#FFF3E0]/30 p-6 overflow-hidden">
                                                    <motion.button
                                                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                                        className="absolute top-4 right-4 z-10 bg-white border-2 border-[#FF6F20] rounded-2xl p-2.5 text-[#FF6F20] shadow-lg transition-all"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Heart
                                                            size={18}
                                                            className={isInWishlist(product.id) ? 'fill-[#FF6F20]' : 'text-[#FF6F20]'}
                                                        />
                                                    </motion.button>

                                                    <motion.img
                                                        src={product.images?.[0] || "/placeholder.jpg"}
                                                        alt={product.title}
                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>

                                                <div className="p-6 space-y-3">
                                                    <span className="inline-block px-3 py-1 bg-[#FFF3E0] border border-[#FF6F20]/20 text-[#FF6F20] rounded-full text-[9px] font-black uppercase tracking-wider">
                                                        {product.category}
                                                    </span>

                                                    <h2 className="font-black text-base text-[#4A4A4A] line-clamp-2 group-hover:text-[#FF6F20] transition-colors leading-tight min-h-[3rem]">
                                                        {product.title}
                                                    </h2>

                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-0.5 text-[#FFB300]">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[#4A4A4A] font-black text-[10px]">
                                                            {product.rating}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-end gap-1 pt-2">
                                                        <span className="text-2xl font-black text-[#FF6F20]">
                                                            ${product.price ? Math.floor(product.price) : 0}
                                                            <span className="text-xs">.{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <motion.button
                                                onClick={(e) => handleAddToCart(product, e)}
                                                className={`w-full py-4 font-black flex items-center justify-center gap-2 transition-all relative overflow-hidden ${isInCart(product.id)
                                                    ? "bg-gray-100 text-[#4A4A4A]/40"
                                                    : "bg-gradient-to-r from-[#FF6F20] to-[#FFB300] text-white hover:hue-rotate-15"
                                                    }`}
                                                whileTap={{ scale: 0.95 }}
                                                disabled={isInCart(product.id)}
                                            >
                                                <ShoppingCart size={18} className="relative z-10" />
                                                <AnimatePresence mode="wait">
                                                    {isInCart(product.id) ? (
                                                        <motion.span
                                                            key="incart"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="relative z-10 text-xs sm:text-sm"
                                                        >
                                                            IN CART
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span
                                                            key="add"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="relative z-10 text-xs sm:text-sm"
                                                        >
                                                            {addedProducts.has(product.id) ? "ADDED!" : "ADD TO CART"}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </motion.button>
                                        </motion.div>
                                    ))}
                        </motion.div>

                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-16 px-2 sm:px-4">
                                <motion.button
                                    onClick={() => page > 1 && setPage(page - 1)}
                                    disabled={page === 1}
                                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all ${page === 1
                                        ? 'bg-gray-100/50 text-gray-300 border-gray-100'
                                        : 'bg-white text-[#FF6F20] border-[#FF6F20] hover:bg-[#FFF3E0] shadow-lg shadow-[#FF6F20]/5'
                                        }`}
                                    whileHover={page > 1 ? { scale: 1.1 } : {}}
                                >
                                    <ChevronLeft size={16} className="sm:hidden" />
                                    <ChevronLeft size={18} className="hidden sm:block" />
                                </motion.button>

                                <div className="flex gap-1 sm:gap-2">
                                    {[...Array(totalPages)].map((_, idx) => {
                                        const pageNum = idx + 1;
                                        const isActive = pageNum === page;

                                        // Logic to determine if this button is a "neighbor" that should be hidden on mobile
                                        // We keep First(1), Last(totalPages), and Current(page) always visible
                                        // We hide page-1 and page+1 on mobile
                                        const isMobileHidden = (pageNum === page - 1 || pageNum === page + 1) &&
                                            pageNum !== 1 &&
                                            pageNum !== totalPages;

                                        if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                                            return (
                                                <motion.button
                                                    key={pageNum}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 font-black text-[10px] sm:text-xs transition-all ${isMobileHidden ? 'hidden sm:block' : 'block'
                                                        } ${isActive
                                                            ? 'bg-[#FF6F20] text-white border-transparent shadow-xl shadow-[#FF6F20]/20'
                                                            : 'bg-white text-[#4A4A4A] border-[#FF6F20]/10 hover:border-[#FF6F20]'
                                                        }`}
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {pageNum}
                                                </motion.button>
                                            );
                                        }
                                        if (pageNum === page - 2 || pageNum === page + 2) return <span key={pageNum} className="px-0.5 sm:px-1 text-[#FF6F20] self-center tracking-tighter text-xs">...</span>;
                                        return null;
                                    })}
                                </div>

                                <motion.button
                                    onClick={() => page < totalPages && setPage(page + 1)}
                                    disabled={page === totalPages}
                                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all ${page === totalPages
                                        ? 'bg-gray-100/50 text-gray-300 border-gray-100'
                                        : 'bg-white text-[#FF6F20] border-[#FF6F20] hover:bg-[#FFF3E0] shadow-lg shadow-[#FF6F20]/5'
                                        }`}
                                    whileHover={page < totalPages ? { scale: 1.1 } : {}}
                                >
                                    <ChevronRight size={16} className="sm:hidden" />
                                    <ChevronRight size={18} className="hidden sm:block" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF6F20/40; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF6F20; }
            `}</style>
        </div>
    );
};

export default Product;
