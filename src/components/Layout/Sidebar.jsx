import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-64 h-full bg-white border-r-4 border-[#FF6F20] shadow-2xl z-50"
      >
        <div className="flex justify-between items-center p-6 border-b-2 border-[#FF6F20] bg-gradient-to-r from-[#FFF3E0] to-white">
          <h2 className="text-xl font-black text-[#FF6F20]">Menu</h2>
          <motion.button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#FFF3E0] rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-[#FF6F20]" />
          </motion.button>
        </div>

        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                onClick={toggleSidebar}
                className="block px-4 py-3 text-[#FF6F20] hover:bg-[#FFF3E0] rounded-lg font-bold transition-all relative group"
              >
                {link.name}
                <motion.div
                  className="absolute bottom-0 left-4 h-0.5 bg-[#FF6F20]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "calc(100% - 2rem)" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;