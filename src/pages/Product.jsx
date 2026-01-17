// src/pages/Product.jsx
import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Filter, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(true);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");

  // URL parametrləri
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

  // ✅ Debounce hook for search
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // ✅ Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      updateParam("search", value);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Fetch products
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

  // Fetch brands & categories
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
    { name: "black", bg: "bg-black", ring: "ring-black" },
    { name: "white", bg: "bg-white border border-gray-300", ring: "ring-gray-400" },
    { name: "red", bg: "bg-red-500", ring: "ring-red-500" },
    { name: "gray", bg: "bg-gray-500", ring: "ring-gray-500" },
    { name: "blue", bg: "bg-blue-500", ring: "ring-blue-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/30">
      {/* ✨ Colorful Header */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="text-white">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black"
            >
              Discover Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm opacity-90"
            >
              {products.length} amazing items found
            </motion.p>
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
            <span className="hidden sm:inline">{showFilters ? "Hide" : "Show"} Filters</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="flex gap-6 max-w-7xl mx-auto p-4">
        {/* ✨ Colorful Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-64 bg-white rounded-2xl shadow-2xl p-6 space-y-6 sticky top-28 h-fit border-2 border-purple-100"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Filters
                </h2>
                <motion.button
                  onClick={() => setParams({ page: 1 })}
                  className="text-xs text-red-500 font-bold hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset All
                </motion.button>
              </div>

              {/* Search with Debounce */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-3 py-3 text-sm border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                  />
                </div>
                {searchTerm && (
                  <p className="text-xs text-gray-500 mt-1">Searching for "{searchTerm}"...</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => updateParam("category", e.target.value)}
                  className="w-full p-3 text-sm border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 cursor-pointer font-semibold bg-gradient-to-r from-blue-50 to-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => updateParam("brand", e.target.value)}
                  className="w-full p-3 text-sm border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 cursor-pointer font-semibold bg-gradient-to-r from-purple-50 to-white"
                >
                  <option value="all">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Colors */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-3 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((c) => (
                    <motion.button
                      key={c.name}
                      onClick={() => updateParam("color", c.name)}
                      className={`w-10 h-10 rounded-xl ${c.bg} ${
                        color === c.name ? `ring-4 ${c.ring}` : "ring-2 ring-gray-200"
                      } transition-all shadow-lg hover:shadow-xl`}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={min || ""}
                    onChange={(e) => updateParam("min", e.target.value)}
                    className="w-1/2 p-3 text-sm border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none font-semibold"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={max === 9999 ? "" : max}
                    onChange={(e) => updateParam("max", e.target.value)}
                    className="w-1/2 p-3 text-sm border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none font-semibold"
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ✨ Products Grid */}
        <div className="flex-1">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading
              ? Array.from({ length: PER_PAGE }).map((_, i) => <Skeleton key={i} />)
              : products.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-200"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Link to={`/products/${product.id}`}>
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                        <motion.button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                          className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            size={18} 
                            className={`transition-all ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                          />
                        </motion.button>

                        <motion.img 
                          src={product.images?.[0] || "/placeholder.jpg"} 
                          alt={product.title} 
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold shadow-md">
                          {product.category}
                        </span>

                        <h2 className="font-black text-lg text-gray-900 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                          {product.title}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                          <span className="text-gray-700 font-bold text-sm ml-1">{product.rating}</span>
                        </div>

                        <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${product.price}
                        </div>
                      </div>
                    </Link>

                    {/* Add to Cart Button */}
                    <motion.button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 flex items-center justify-center gap-2 font-bold text-base relative overflow-hidden group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      
                      <ShoppingCart size={18} className="relative z-10" />
                      <AnimatePresence mode="wait">
                        {addedProducts.has(product.id) ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="relative z-10"
                          >
                            ✓ Added to Cart!
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
                  </motion.div>
                ))}
          </motion.div>

          {/* ✨ Colorful Pagination */}
          {!loading && totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mt-12"
            >
              <motion.button
                onClick={() => page > 1 && updateParam("page", page - 1)}
                disabled={page === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${
                  page === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                }`}
                whileHover={page > 1 ? { scale: 1.05 } : {}}
                whileTap={page > 1 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={18} />
                Previous
              </motion.button>

              <div className="flex gap-2">
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
                        className={`w-12 h-12 rounded-xl font-black text-base ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl scale-110'
                            : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 shadow-md border-2 border-gray-200'
                        }`}
                        whileHover={{ scale: isActive ? 1.1 : 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="flex items-center text-gray-400 font-bold">...</span>;
                  }
                  return null;
                })}
              </div>

              <motion.button
                onClick={() => page < totalPages && updateParam("page", page + 1)}
                disabled={page === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold ${
                  page === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                }`}
                whileHover={page < totalPages ? { scale: 1.05 } : {}}
                whileTap={page < totalPages ? { scale: 0.95 } : {}}
              >
                Next
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;