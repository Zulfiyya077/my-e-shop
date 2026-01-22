import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { showToast } from "../utils/toast.config";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Məhsul artıq səbətdə var, miqdarı artırılır
        showToast.success(`Quantity updated for ${product.name || product.title}!`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Yeni məhsul əlavə olunur
      showToast.addToCart(product.name || product.title);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    if (product) {
      showToast.removeFromCart(product.name || product.title);
    }
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQty = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    if (product) {
      showToast.info(`Increased quantity: ${product.name || product.title}`);
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    
    setCartItems((prev) => {
      const updatedItems = prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      // Əgər məhsul tamamilə silindisə
      const isRemoved = !updatedItems.find((item) => item.id === productId);
      if (isRemoved && product) {
        showToast.removeFromCart(product.name || product.title);
      } else if (product) {
        showToast.info(`Decreased quantity: ${product.name || product.title}`);
      }
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      showToast.warning('Cart cleared!');
      setCartItems([]);
    }
  };

  const getTotalItems = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.price || 0;
      const discount = item.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getTotalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};