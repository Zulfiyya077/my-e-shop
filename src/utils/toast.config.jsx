import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom toast styles
export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  style: {
    background: "linear-gradient(135deg, #314B6E 0%, #0E141C 100%)",
    border: "1px solid #607EA2",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(49, 75, 110, 0.4)",
  },
  progressStyle: {
    background: "linear-gradient(90deg, #607EA2 0%, #8197AC 50%, #DDE3A3 100%)",
  },
  className: "custom-toast",
};

// Custom toast functions
export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      icon: "✅",
      style: {
        ...toastConfig.style,
        border: "1px solid #8197AC",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #8197AC 0%, #DDE3A3 100%)",
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      icon: "❌",
      style: {
        ...toastConfig.style,
        border: "1px solid #ef4444",
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
        border: "1px solid #f59e0b",
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
        border: "1px solid #607EA2",
      },
      progressStyle: {
        background: "linear-gradient(90deg, #607EA2 0%, #8197AC 100%)",
      },
    });
  },

  // Cart specific toasts
  addToCart: (productName) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-lg flex items-center justify-center">
          <span className="text-xl">🛒</span>
        </div>
        <div>
          <p className="font-black text-[#DDE3A3]">Added to Cart!</p>
          <p className="text-sm text-[#8197AC]">{productName}</p>
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
        <div className="w-10 h-10 bg-gradient-to-r from-[#314B6E] to-[#607EA2] rounded-lg flex items-center justify-center">
          <span className="text-xl">🗑️</span>
        </div>
        <div>
          <p className="font-black text-[#DDE3A3]">Removed from Cart</p>
          <p className="text-sm text-[#8197AC]">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },

  // Wishlist specific toasts
  addToWishlist: (productName) => {
    toast.success(
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-[#607EA2] to-[#8197AC] rounded-lg flex items-center justify-center">
          <span className="text-xl">❤️</span>
        </div>
        <div>
          <p className="font-black text-[#DDE3A3]">Added to Wishlist!</p>
          <p className="text-sm text-[#8197AC]">{productName}</p>
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
        <div className="w-10 h-10 bg-gradient-to-r from-[#314B6E] to-[#607EA2] rounded-lg flex items-center justify-center">
          <span className="text-xl">💔</span>
        </div>
        <div>
          <p className="font-black text-[#DDE3A3]">Removed from Wishlist</p>
          <p className="text-sm text-[#8197AC]">{productName}</p>
        </div>
      </div>,
      {
        ...toastConfig,
        icon: false,
      }
    );
  },
};