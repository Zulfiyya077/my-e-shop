import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Filter, Search, ChevronLeft, ChevronRight, X, Zap, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProducts, getBrands, getCategories } from "../services/api";
import Skeleton from "../components/Skeleton";

const PER_PAGE = 6;

const Product = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [params, setParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");

  const category = params.get("category") || "all";
  const brand = params.get("brand") || "all";
  const color = params.get("color") || "";
  const min = Number(params.get("min") || 0);
  const max = Number(params.get("max") || 9999);
  const search = params.get("search") || "";
  const page = Number(params.get("page") || 1);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(params);
    if (!value || value === "all") newParams.delete(key);
    else newParams.set(key, value);
    if (key !== "page") newParams.set("page", 1);
    setParams(newParams);
  };

  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((value) => {
      updateParam("search", value);
    }, 500),
    [debounce]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts({
          category: category !== "all" ? category : undefined,
          brand: brand !== "all" ? brand : undefined,
          color: color || undefined,
          minPrice: min,
          maxPrice: max,
          search: search || undefined,
          page,
          limit: PER_PAGE,
        });
        
        let allProducts = [];
        if (response.data && Array.isArray(response.data)) {
          allProducts = response.data;
        } else if (Array.isArray(response)) {
          allProducts = response;
        }
        
        const displayProducts = allProducts.slice(0, PER_PAGE);
        setProducts(displayProducts);
        
        const totalCount = response.total || allProducts.length;
        setTotalPages(Math.ceil(totalCount / PER_PAGE));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, brand, color, min, max, search, page]);

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

  const colorOptions = [
    { name: "black", bg: "bg-zinc-900", ring: "ring-zinc-600" },
    { name: "white", bg: "bg-zinc-100 border border-zinc-700", ring: "ring-zinc-400" },
    { name: "red", bg: "bg-red-600", ring: "ring-red-500" },
    { name: "gray", bg: "bg-zinc-600", ring: "ring-zinc-500" },
    { name: "blue", bg: "bg-blue-600", ring: "ring-blue-500" },
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#DDE3A3] flex items-center gap-2">
          <Filter size={20} className="text-[#607EA2]" />
          Filters
        </h2>
        <motion.button
          onClick={() => {
            setParams({ page: 1 });
            setShowFilters(false);
          }}
          className="text-xs text-[#8197AC] font-bold hover:text-[#DDE3A3] px-3 py-1.5 rounded-lg hover:bg-[#314B6E]/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>

      <div>
        <label className="text-xs font-bold text-[#8197AC] mb-2 block uppercase tracking-wider">
          Search
        </label>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#607EA2] group-focus-within:text-[#8197AC] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Find products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] placeholder-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none transition-all"
          />
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div className="w-2 h-2 bg-[#607EA2] rounded-full animate-pulse" />
            </motion.div>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-[#8197AC] mb-2 block uppercase tracking-wider">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full p-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] cursor-pointer font-semibold hover:border-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none transition-all"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-[#8197AC] mb-2 block uppercase tracking-wider">
          Brand
        </label>
        <select
          value={brand}
          onChange={(e) => updateParam("brand", e.target.value)}
          className="w-full p-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] cursor-pointer font-semibold hover:border-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none transition-all"
        >
          <option value="all">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-[#8197AC] mb-2 block uppercase tracking-wider">
          Color
        </label>
        <select
          value={color}
          onChange={(e) => updateParam("color", e.target.value)}
          className="w-full p-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] cursor-pointer font-semibold hover:border-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none transition-all capitalize"
        >
          <option value="">All Colors</option>
          {colorOptions.map((c) => (
            <option key={c.name} value={c.name} className="capitalize">
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold text-[#8197AC] mb-2 block uppercase tracking-wider">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={min || ""}
            onChange={(e) => updateParam("min", e.target.value)}
            className="w-1/2 p-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] placeholder-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none font-semibold transition-all"
          />
          <input
            type="number"
            placeholder="Max"
            value={max === 9999 ? "" : max}
            onChange={(e) => updateParam("max", e.target.value)}
            className="w-1/2 p-3 text-sm bg-[#0E141C] border border-[#314B6E]/50 rounded-xl text-[#DDE3A3] placeholder-[#607EA2] focus:border-[#607EA2] focus:shadow-lg focus:shadow-[#314B6E]/30 outline-none font-semibold transition-all"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0E141C]">
      {/* Header */}
      <motion.div 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#314B6E]/30 via-[#607EA2]/20 to-[#314B6E]/30 border-b border-[#314B6E]/50 sticky top-0 z-40 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-4xl font-black tracking-tight text-[#DDE3A3]"
            >
              Products
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mt-1"
            >
              <Zap size={14} className="text-[#607EA2] sm:w-4 sm:h-4" />
              <p className="text-xs sm:text-sm text-[#607EA2] font-medium">
                {products.length} premium products
              </p>
            </motion.div>
          </div>
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-[#314B6E]/40 border border-[#314B6E] rounded-xl font-bold text-[#DDE3A3] overflow-hidden backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div 
              className="absolute inset-0 bg-[#607EA2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative flex items-center gap-2">
              {showFilters ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
              <span className="hidden sm:inline text-sm sm:text-base">{showFilters ? "Hide" : "Show"} Filters</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Mobile/Tablet Filter Modal */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              
              {/* Filter Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#314B6E]/95 to-[#0E141C]/95 backdrop-blur-xl border-r border-[#314B6E]/50 p-6 overflow-y-auto z-50 lg:hidden shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-[#DDE3A3]">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-lg hover:bg-[#314B6E]/50 transition-colors"
                  >
                    <X size={24} className="text-[#DDE3A3]" />
                  </button>
                </div>
                <FilterContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl border border-[#314B6E]/50 p-6 sticky top-32 h-fit shadow-2xl backdrop-blur-sm">
            <FilterContent />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
            >
              {loading
                ? Array.from({ length: PER_PAGE }).map((_, i) => <Skeleton key={i} />)
                : products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      className="group bg-gradient-to-b from-[#314B6E]/20 to-[#0E141C] rounded-2xl border border-[#314B6E]/50 overflow-hidden hover:border-[#607EA2] transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ y: -8 }}
                      style={{
                        boxShadow: "0 4px 20px rgba(49, 75, 110, 0.3)"
                      }}
                    >
                      <Link to={`/products/${product.id}`}>
                        <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-[#0E141C] via-[#314B6E]/10 to-[#0E141C]">
                          <motion.button
                            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-[#314B6E]/60 backdrop-blur-sm border border-[#607EA2]/50 rounded-xl p-2 sm:p-2.5 hover:border-red-400 transition-all"
                            whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart 
                              size={16} 
                              className={`sm:w-[18px] sm:h-[18px] transition-all ${isInWishlist(product.id) ? 'fill-red-400 text-red-400' : 'text-[#8197AC]'}`} 
                            />
                          </motion.button>

                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "radial-gradient(circle at center, rgba(96, 126, 162, 0.15), transparent 70%)"
                            }}
                          />

                          <motion.img 
                            src={product.images?.[0] || "/placeholder.jpg"} 
                            alt={product.title} 
                            className="w-full h-full object-contain p-4 sm:p-8"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        </div>

                        <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                          <motion.span 
                            className="inline-block px-2.5 sm:px-3 py-1 bg-[#607EA2]/30 text-[#DDE3A3] rounded-lg text-xs font-black uppercase tracking-wider border border-[#607EA2]/50"
                            whileHover={{ scale: 1.05 }}
                          >
                            {product.category}
                          </motion.span>

                          <h2 className="font-black text-base sm:text-lg text-[#DDE3A3] line-clamp-1 group-hover:text-[#8197AC] transition-colors">
                            {product.title}
                          </h2>

                          <p className="text-[#607EA2] text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={`sm:w-[14px] sm:h-[14px] ${i < Math.floor(product.rating) ? "fill-[#8197AC] text-[#8197AC]" : "text-[#314B6E]"}`} 
                              />
                            ))}
                            <span className="text-[#8197AC] font-bold text-xs sm:text-sm ml-2">{product.rating}</span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-[#DDE3A3]">
                              ${product.price}
                            </span>
                            <Zap size={14} className="text-[#607EA2] sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </Link>
                      <motion.button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="relative w-full bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] py-3 sm:py-4 flex items-center justify-center gap-2 font-black text-sm sm:text-base overflow-hidden group/btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                          <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px] relative z-10" />
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
                              ADD TO CART
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  ))}
            </motion.div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 sm:gap-3 mt-12 sm:mt-16 flex-wrap"
              >
                <motion.button
                  onClick={() => page > 1 && updateParam("page", page - 1)}
                  disabled={page === 1}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold border transition-all text-sm sm:text-base ${
                    page === 1 
                      ? 'bg-[#314B6E]/20 text-[#607EA2]/50 border-[#314B6E]/30 cursor-not-allowed' 
                      : 'bg-[#314B6E]/30 text-[#DDE3A3] border-[#314B6E] hover:border-[#607EA2] hover:bg-[#314B6E]/50 backdrop-blur-sm'
                  }`}
                  whileHover={page > 1 ? { scale: 1.05, x: -3 } : {}}
                  whileTap={page > 1 ? { scale: 0.95 } : {}}
                >
                  <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">Previous</span>
                </motion.button>

                <div className="flex gap-1.5 sm:gap-2">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === page;
                    
                    if (
                      pageNum === 1 || 
                      pageNum === totalPages || 
                      (pageNum >= page - 1 && pageNum <= page + 1)
                    ) {
                      return (
                        <motion.button
                          key={pageNum}
                          onClick={() => updateParam("page", pageNum)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-black text-sm sm:text-base border transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] border-transparent shadow-lg shadow-[#607EA2]/30'
                              : 'bg-[#314B6E]/30 text-[#8197AC] border-[#314B6E] hover:border-[#607EA2] hover:text-[#DDE3A3] backdrop-blur-sm'
                          }`}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return <span key={pageNum} className="flex items-center text-[#607EA2] font-bold text-sm sm:text-base">...</span>;
                    }
                    return null;
                  })}
                </div>

                <motion.button
                  onClick={() => page < totalPages && updateParam("page", page + 1)}
                  disabled={page === totalPages}
                  className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold border transition-all text-sm sm:text-base ${
                    page === totalPages 
                      ? 'bg-[#314B6E]/20 text-[#607EA2]/50 border-[#314B6E]/30 cursor-not-allowed' 
                      : 'bg-[#314B6E]/30 text-[#DDE3A3] border-[#314B6E] hover:border-[#607EA2] hover:bg-[#314B6E]/50 backdrop-blur-sm'
                  }`}
                  whileHover={page < totalPages ? { scale: 1.05, x: 3 } : {}}
                  whileTap={page < totalPages ? { scale: 0.95 } : {}}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;