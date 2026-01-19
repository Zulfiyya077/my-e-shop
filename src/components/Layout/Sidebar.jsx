import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-br from-[#314B6E] to-[#0E141C] shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col p-4 gap-4">
        <Link to="/" onClick={toggleSidebar}>Home</Link>
        <Link to="/products" onClick={toggleSidebar}>Products</Link>
        <Link to="/about" onClick={toggleSidebar}>About</Link>
        <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
