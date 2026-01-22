import { useState, useEffect, useRef } from "react";
import { Menu, ShoppingCart, Search, X, Heart, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { getProducts } from "../../services/api"; // API çağırışı

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

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const handler = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await getProducts({ search: searchQuery, limit: 5 });
                setSearchResults(response.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500); 

        return () => clearTimeout(handler);
    }, [searchQuery]);

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
        <nav className="bg-gradient-to-r from-[#0E141C] via-[#1a2332] to-[#0E141C] border-b border-[#314B6E] sticky top-0 z-50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 rounded-lg hover:bg-[#314B6E]/80 text-[#DDE3A3] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.button>

                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <Zap className="w-8 h-8 text-[#DDE3A3]" />
                            </motion.div>
                            <span className="text-xl font-black text-[#DDE3A3] group-hover:text-[#8197AC] transition-colors">
                               ZIpTech
                            </span>
                        </Link>
                    </div>

                    <ul className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="relative px-4 py-2 font-bold text-[#8197AC] hover:text-[#DDE3A3] transition-colors group"
                                >
                                    {link.name}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-[#DDE3A3]"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2 relative">
                        {/* Search */}
                        <AnimatePresence mode="wait">
                            {searchOpen ? (
                                <motion.form
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSearchSubmit}
                                    className="flex flex-col items-start lg:items-center"
                                >
                                    <div
                                        ref={searchRef}
                                        className="flex items-center bg-[#0E141C] border border-[#314B6E] rounded-lg px-3 py-2 focus-within:border-[#607EA2] transition-colors shadow-lg"
                                    >
                                        <Search className="w-4 h-4 text-[#607EA2] mr-2" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products..."
                                            className="outline-none bg-transparent text-[#DDE3A3] placeholder-[#607EA2] w-48 text-sm font-medium"
                                            autoFocus
                                        />
                                        <motion.button
                                            type="button"
                                            onClick={() => {
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                                setSearchResults([]);
                                            }}
                                            className="ml-2 p-1 hover:bg-[#314B6E]/80 rounded transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <X className="w-4 h-4 text-[#607EA2] hover:text-[#DDE3A3]" />
                                        </motion.button>
                                    </div>

                                    {/* Dropdown list */}
                                    {searchResults.length > 0 && (
                                        <motion.ul
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute left-0 right-0 w-auto max-w-[90vw] mx-auto mt-1 max-h-64 overflow-y-auto bg-[#0E141C] border border-[#314B6E] rounded-lg shadow-lg z-50"
                                        >
                                            {searchResults.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="px-4 py-2 hover:bg-[#314B6E]/50 transition-colors w-full"
                                                >
                                                    <Link
                                                        to={`/products/${product.id}`}
                                                        className="flex items-center gap-2"
                                                        onClick={() => {
                                                            setSearchOpen(false);
                                                            setSearchQuery("");
                                                            setSearchResults([]);
                                                        }}
                                                    >
                                                        <img
                                                            src={product.thumbnail || product.images?.[0]}
                                                            alt={product.title}
                                                            className="w-10 h-10 object-cover rounded"
                                                        />
                                                        <span className="text-[#DDE3A3] text-sm line-clamp-1">
                                                            {product.title}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}

                                </motion.form>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setSearchOpen(true)}
                                    className="p-2 hover:bg-[#314B6E]/80 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Search className="w-6 h-6 text-[#8197AC] hover:text-[#DDE3A3] transition-colors" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Wishlist */}
                        <motion.button
                            onClick={() => setIsWishlistOpen(true)}
                            className="relative p-2 hover:bg-[#314B6E]/80 rounded-lg group transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className="w-6 h-6 text-[#8197AC] group-hover:text-[#DDE3A3] transition-colors" />
                            {wishlistIds.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] text-xs w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg"
                                >
                                    {wishlistIds.length}
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Cart */}
                        <motion.button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-[#314B6E]/50 rounded-lg group transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ShoppingCart className="w-6 h-6 text-[#8197AC] group-hover:text-[#DDE3A3] transition-colors" />
                            {getTotalItems() > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-gradient-to-r from-[#607EA2] to-[#8197AC] text-[#0E141C] text-xs w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg"
                                >
                                    {getTotalItems()}
                                </motion.span>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
