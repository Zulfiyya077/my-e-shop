import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Products from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import { WishlistProvider } from "./context/WishlistContext";
import WishlistModal from "./components/WishlistModal/WishlistModal";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FilterProvider>
          <WishlistProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={NotFound} />
            </Routes>
          </Layout>
          <WishlistModal />
          </WishlistProvider>
        </FilterProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

