import { useEffect, useState } from "react";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistModal = () => {
  const {
    wishlistProducts,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isWishlistOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isWishlistOpen]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toggleWishlist(product.id);
  };

  if (!isWishlistOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-pink-50">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
              <div>
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <p className="text-sm text-gray-500">
                  {wishlistProducts.length} item
                </p>
              </div>
            </div>

            <button onClick={() => setIsWishlistOpen(false)}>
              <X />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {loading ? (
              <p>Loading...</p>
            ) : wishlistProducts.length === 0 ? (
              <p className="text-center text-gray-500">
                Wishlist boşdur
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {wishlistProducts.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-xl p-4 flex gap-4"
                  >
                    <div className="relative">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="absolute -top-2 -right-2 bg-pink-500 p-1 rounded-full text-white"
                      >
                        <Heart size={14} fill="currentColor" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-pink-600">
                        ${item.price}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add
                        </button>

                        <button
                          onClick={() => toggleWishlist(item.id)}
                          className="bg-red-100 text-red-500 p-2 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t flex gap-3">
              <button
                onClick={() => {
                  wishlistProducts.forEach(addToCart);
                  clearWishlist();
                  setIsWishlistOpen(false);
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
              >
                Add All to Cart
              </button>

              <button
                onClick={clearWishlist}
                className="bg-gray-200 px-6 rounded-lg"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistModal;
