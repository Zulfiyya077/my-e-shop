import { createContext, useContext, useEffect, useState } from "react";
import { getProductById } from "../services/api";
import { showToast } from "../utils/toast.config";

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      return [];
    }
  });

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlistIds]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistIds.length === 0) {
        setWishlistProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const products = await Promise.all(
          wishlistIds.map((id) => getProductById(id))
        );
        setWishlistProducts(products.filter(Boolean));
      } catch (error) {
        console.error("Wishlist products fetch error:", error);
        setWishlistProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlistIds]);

  const toggleWishlist = (productOrId) => {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const productName = typeof productOrId === 'object' 
      ? (productOrId.name || productOrId.title) 
      : 'Product';
    
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        // Wishlist-dən sil
        showToast.removeFromWishlist(productName);
        return prev.filter((i) => i !== id);
      } else {
        // Wishlist-ə əlavə et
        showToast.addToWishlist(productName);
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (productOrId) => {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    return wishlistIds.includes(id);
  };

  const clearWishlist = () => {
    if (wishlistIds.length > 0) {
      setWishlistIds([]);
      setWishlistProducts([]);
      showToast.warning('Wishlist cleared!');
      try {
        localStorage.removeItem("wishlist");
      } catch (error) {
        console.error("Error clearing wishlist:", error);
      }
    }
  };

  const removeFromWishlist = (productOrId) => {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const productName = typeof productOrId === 'object' 
      ? (productOrId.name || productOrId.title) 
      : 'Product';
    
    if (wishlistIds.includes(id)) {
      setWishlistIds((prev) => prev.filter((i) => i !== id));
      showToast.removeFromWishlist(productName);
    }
  };

  const addToWishlist = (productOrId) => {
    const id = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const productName = typeof productOrId === 'object' 
      ? (productOrId.name || productOrId.title) 
      : 'Product';
    
    if (!wishlistIds.includes(id)) {
      setWishlistIds((prev) => [...prev, id]);
      showToast.addToWishlist(productName);
    } else {
      showToast.info('Already in wishlist!');
    }
  };

  const getTotalItems = () => wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        isLoading,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        clearWishlist,
        removeFromWishlist,
        addToWishlist,
        getTotalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};