import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CartSideBar from "../cart/CartSideBar";

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <CartSideBar />


            {isSidebarOpen && (
                <div
                    className="fixed inset-0  bg-opacity-60 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                />
            )}


            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
