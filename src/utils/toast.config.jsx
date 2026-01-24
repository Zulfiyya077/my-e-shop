import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  style: {
    background: "white",
    border: "2px solid #FF6F20",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(255, 111, 32, 0.3)",
  },
  progressStyle: {
    background: "linear-gradient(90deg, #FF6F20 0%, #FFB300 50%, #FF7043 100%)",
  },
  className: "custom-toast",
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      icon: "✅",
      style: {
        ...toastConfig.style,
        border: "2px solid #FFB300",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #FFB300 0%, #FF7043 100%)",
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      icon: "❌",
      style: {
        ...toastConfig.style,
        border: "2px solid #ef4444",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
      },
    });
  },
  
  warning: (message) => {
    toast.warning(message, {
      ...toastConfig,
      icon: "⚠️",
      style: {
        ...toastConfig.style,
        border: "2px solid #f59e0b",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
      },
    });
  },
  
  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      icon: "ℹ️",
      style: {
        ...toastConfig.style,
        border: "2px solid #FF6F20",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #FF6F20 0%, #FFB300 100%)",
      },
    });
  },

  addToCart: (productName) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-lg flex items-center justify-center">
          <span className="text-xl">🛒</span>
        </div>
        <div>
          <p className="font-black text-[#FF6F20]">Added to Cart!</p>
          <p className="text-sm text-gray-600">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },

  removeFromCart: (productName) => {
    toast.info(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#FFB300] to-[#FF7043] rounded-lg flex items-center justify-center">
          <span className="text-xl">🗑️</span>
        </div>
        <div>
          <p className="font-black text-[#FF6F20]">Removed from Cart</p>
          <p className="text-sm text-gray-600">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },

  addToWishlist: (productName) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#FF6F20] to-[#FFB300] rounded-lg flex items-center justify-center">
          <span className="text-xl">❤️</span>
        </div>
        <div>
          <p className="font-black text-[#FF6F20]">Added to Wishlist!</p>
          <p className="text-sm text-gray-600">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },

  removeFromWishlist: (productName) => {
    toast.info(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#FFB300] to-[#FF7043] rounded-lg flex items-center justify-center">
          <span className="text-xl">💔</span>
        </div>
        <div>
          <p className="font-black text-[#FF6F20]">Removed from Wishlist</p>
          <p className="text-sm text-gray-600">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },
};