import { createContext, useContext, useEffect, useState } from "react";
import { getProductById } from "../services/api";

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  // 👉 yalnız ID-lər saxlanılır
  const [wishlistIds, setWishlistIds] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // 👉 API-dən gələn real məhsullar
  const [wishlistProducts, setWishlistProducts] = useState([]);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // ✅ ID-ləri localStorage-a yaz
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // ✅ ID dəyişəndə məhsulları API-dən çək
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const products = await Promise.all(
          wishlistIds.map((id) => getProductById(id))
        );
        setWishlistProducts(products);
      } catch (error) {
        console.error("Wishlist products error:", error);
      }
    };

    if (wishlistIds.length > 0) {
      fetchWishlistProducts();
    } else {
      setWishlistProducts([]);
    }
  }, [wishlistIds]);

  // ➕ / ➖ wishlist toggle
  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const isInWishlist = (id) => wishlistIds.includes(id);

  const clearWishlist = () => {
    setWishlistIds([]);
    setWishlistProducts([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts, // 🔥 artıq real product datadır
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        clearWishlist,
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
