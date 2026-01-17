// src/pages/Product.jsx
import { useEffect, useState } from "react";
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
        
        console.log("API Response:", response);
        
        // ✅ API strukturunu yoxlayırıq
        let allProducts = [];
        if (response.data && Array.isArray(response.data)) {
          allProducts = response.data;
        } else if (Array.isArray(response)) {
          allProducts = response;
        }
        
        console.log("Total products from API:", allProducts.length);
        
        // ✅ MÜTLƏQ 6 məhsul göstər - API limit işləməsə belə
        const displayProducts = allProducts.slice(0, PER_PAGE);
        
        console.log("Displaying products:", displayProducts.length);
        
        setProducts(displayProducts);
        
        // ✅ Total pages hesablama
        const totalCount = response.total || allProducts.length;
        setTotalPages(Math.ceil(totalCount / PER_PAGE));
        
        console.log("Total pages:", Math.ceil(totalCount / PER_PAGE));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* ✨ Compact Header */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent"
            >
              Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-500"
            >
              {products.length} items
            </motion.p>
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFilters ? <X size={18} /> : <Filter size={18} />}
            <span className="hidden sm:inline">{showFilters ? "Hide" : "Filters"}</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="flex gap-6 max-w-7xl mx-auto p-4">
        {/* ✨ Compact Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="w-64 bg-white rounded-2xl shadow-xl p-5 space-y-5 sticky top-24 h-fit"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <motion.button
                  onClick={() => setParams({ page: 1 })}
                  className="text-xs text-red-500 font-semibold hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                >
                  Reset
                </motion.button>
              </div>

              {/* Search */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => updateParam("search", e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => updateParam("category", e.target.value)}
                  className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer font-medium"
                >
                  <option value="all">All</option>
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
                  className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer font-medium"
                >
                  <option value="all">All</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Colors */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((c) => (
                    <motion.button
                      key={c.name}
                      onClick={() => updateParam("color", c.name)}
                      className={`w-8 h-8 rounded-lg ${c.bg} ${
                        color === c.name ? `ring-3 ${c.ring}` : ""
                      } transition-all shadow-md`}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block">Price</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={min || ""}
                    onChange={(e) => updateParam("min", e.target.value)}
                    className="w-1/2 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={max === 9999 ? "" : max}
                    onChange={(e) => updateParam("max", e.target.value)}
                    className="w-1/2 p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ✨ Compact Products Grid */}
        <div className="flex-1">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {loading
              ? Array.from({ length: PER_PAGE }).map((_, i) => <Skeleton key={i} />)
              : products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <Link to={`/products/${product.id}`}>
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <motion.button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart 
                            size={16} 
                            className={`transition-all ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                          />
                        </motion.button>

                        <motion.img 
                          src={product.images?.[0] || "/placeholder.jpg"} 
                          
                          alt={product.title} 
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                        console.log(product.images);    
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-bold">
                          {product.category}
                        </span>

                        <h2 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h2>

                        <p className="text-gray-500 text-xs line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                          <span className="text-gray-600 font-semibold text-xs ml-1">{product.rating}</span>
                        </div>

                        <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${product.price}
                        </div>
                      </div>
                    </Link>

                    {/* Add to Cart */}
                    <motion.button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 flex items-center justify-center gap-2 font-bold text-sm relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      
                      <ShoppingCart size={16} />
                      <AnimatePresence mode="wait">
                        {addedProducts.has(product.id) ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            ✓ Added!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            Add to Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                ))}
          </motion.div>

          {/* ✨ Compact Pagination */}
          {!loading && totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              <motion.button
                onClick={() => page > 1 && updateParam("page", page - 1)}
                disabled={page === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-sm ${
                  page === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                }`}
                whileHover={page > 1 ? { scale: 1.05 } : {}}
                whileTap={page > 1 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={16} />
                Prev
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
                        className={`w-9 h-9 rounded-lg font-bold text-sm ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="flex items-center text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <motion.button
                onClick={() => page < totalPages && updateParam("page", page + 1)}
                disabled={page === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-sm ${
                  page === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                }`}
                whileHover={page < totalPages ? { scale: 1.05 } : {}}
                whileTap={page < totalPages ? { scale: 0.95 } : {}}
              >
                Next
                <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;