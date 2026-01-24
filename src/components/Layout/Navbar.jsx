import { useState, useEffect, useRef } from "react";
import { Menu, ShoppingCart, Search, X, Heart, Zap } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getProducts } from "../../services/api";
import { useDebounce } from "../../hooks/useDebounce";

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const { getTotalItems, setIsCartOpen } = useCart();
    const { wishlistIds, setIsWishlistOpen } = useWishlist();

    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (!debouncedSearchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await getProducts({ search: debouncedSearchQuery, limit: 10 });
                setSearchResults(response.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedSearchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        }
    };

    return (
        <nav className="bg-white border-b-2 border-[#FF6F20] sticky top-0 z-50 shadow-lg h-16 sm:h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full gap-4">
                    {/* Left: Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <AnimatePresence>
                            {(!searchOpen || (searchOpen && window.innerWidth >= 640)) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-2 sm:gap-4"
                                >
                                    <motion.button
                                        onClick={toggleSidebar}
                                        className="lg:hidden p-2 rounded-xl hover:bg-[#FFF3E0] text-[#FF6F20] transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.button>

                                    <Link to="/" className="flex items-center gap-1 sm:gap-2 group">
                                        <motion.div
                                            className="bg-gradient-to-br from-[#FF6F20] to-[#FFB300] p-1.5 sm:p-2 rounded-xl"
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                        >
                                            <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                                        </motion.div>
                                        <span className="text-lg sm:text-2xl font-black text-[#FF6F20] group-hover:text-[#FFB300] transition-colors tracking-tight">
                                            ZIpTech
                                        </span>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Center: Desktop Navigation (Flexible Width) */}
                    <div className="hidden lg:flex flex-1 justify-center items-center overflow-hidden">
                        <ul className="flex items-center gap-1 xl:gap-2 transition-all duration-300">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `relative px-3 xl:px-5 py-2 font-black transition-all duration-300 group text-sm xl:text-base ${isActive
                                                ? "text-[#FF6F20]"
                                                : "text-[#4A4A4A] hover:text-[#FF6F20]"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {link.name}
                                                <motion.div
                                                    className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FF6F20] rounded-full"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: isActive ? 1 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Search & Actions */}
                    <div className={`flex items-center justify-end gap-1 sm:gap-3 transition-all duration-300 ${searchOpen ? 'flex-1 sm:flex-initial' : 'shrink-0'}`}>
                        <AnimatePresence>
                            {searchOpen ? (
                                <motion.div
                                    key="search-container"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className={`${window.innerWidth < 640 ? 'absolute inset-0 z-50 bg-white flex items-center px-4' : 'relative w-full min-w-[300px] max-w-md ml-auto'}`}
                                >
                                    <form onSubmit={handleSearchSubmit} className="w-full">
                                        <div
                                            ref={searchRef}
                                            className="flex items-center bg-[#FFF3E0] border-2 border-[#FF6F20] rounded-xl px-4 py-2 sm:py-2.5 focus-within:border-[#FFB300] focus-within:ring-2 focus-within:ring-[#FFB300]/20 transition-all shadow-sm"
                                        >
                                            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6F20] shrink-0" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search products..."
                                                className="outline-none bg-transparent text-[#4A4A4A] px-3 font-bold text-sm sm:text-base w-full placeholder-[#494949]/40"
                                                autoFocus
                                            />
                                            <motion.button
                                                type="button"
                                                onClick={() => {
                                                    setSearchOpen(false);
                                                    setSearchQuery("");
                                                    setSearchResults([]);
                                                }}
                                                className="p-1 hover:bg-white/50 rounded-lg transition-colors shrink-0"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X className="w-5 h-5 text-[#4A4A4A]" />
                                            </motion.button>
                                        </div>

                                        {/* Dropdown Results */}
                                        {searchResults.length > 0 && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#FF6F20]/20 rounded-2xl shadow-2xl z-[60] overflow-hidden max-h-[70vh] overflow-y-auto"
                                            >
                                                {searchResults.map((product) => (
                                                    <li key={product.id}>
                                                        <Link
                                                            to={`/products/${product.id}`}
                                                            onClick={() => {
                                                                setSearchOpen(false);
                                                                setSearchQuery("");
                                                                setSearchResults([]);
                                                            }}
                                                            className="flex items-center gap-4 p-4 hover:bg-[#FFF3E0] transition-colors border-b last:border-0"
                                                        >
                                                            <div className="w-12 h-12 bg-[#FFF3E0] rounded-lg p-1 shrink-0">
                                                                <img
                                                                    src={product.thumbnail || product.images?.[0]}
                                                                    alt=""
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-bold text-[#4A4A4A] text-sm truncate">{product.title}</h4>
                                                                <p className="text-[#FF6F20] font-black text-sm">${product.price}</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="search-trigger"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setSearchOpen(true)}
                                    className="p-2 sm:p-2.5 hover:bg-[#FF6F20]/10 rounded-xl transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Search className="w-6 h-6 text-[#4A4A4A]" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Actions (Wishlist & Cart) */}
                        <AnimatePresence>
                            {(!searchOpen || (searchOpen && window.innerWidth >= 640)) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-1 sm:gap-2 shrink-0"
                                >
                                    <motion.button
                                        onClick={() => setIsWishlistOpen(true)}
                                        className="relative p-2 sm:p-2.5 hover:bg-[#FF6F20]/10 rounded-xl group transition-all"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Heart className="w-6 h-6 text-[#4A4A4A] group-hover:text-[#FF7043] transition-colors" />
                                        {wishlistIds.length > 0 && (
                                            <span className="absolute top-1 right-1 bg-[#FF7043] text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black border-2 border-white shadow-sm">
                                                {wishlistIds.length}
                                            </span>
                                        )}
                                    </motion.button>

                                    <motion.button
                                        onClick={() => setIsCartOpen(true)}
                                        className="relative p-2 sm:p-2.5 bg-[#FF6F20] hover:bg-[#FF7043] rounded-xl group transition-all shadow-md hover:shadow-lg"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        {getTotalItems() > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-[#FFB300] text-[#4A4A4A] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white shadow-sm">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;