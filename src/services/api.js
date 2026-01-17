// src/services/api.js
import axios from "axios";

const BASE_URL = "https://electronic-products-api-1.onrender.com/api";
const api = axios.create({
  baseURL: BASE_URL,
});

// 1. Bütün məhsulları gətirmək (filter, search, pagination ilə)
export const getProducts = async (params = {}) => {
  try {
    // params: { category, brand, color, minPrice, maxPrice, search, page, limit }
    const response = await api.get("/products", { params });
    // API response: { success: true, count: 50, data: [...] }
    return response.data; // { success: true, count: 50, data: [...] }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// 2. ID ilə məhsul
export const getProductById = async (id) => {
  try {
    // ID-nin string və ya number olduğundan əmin ol
    const productId = typeof id === 'object' ? id.id || id.productId : id;
    const numericId = parseInt(productId);
    
    if (isNaN(numericId)) {
      throw new Error('Invalid product ID');
    }
    
    const response = await api.get(`/products/${numericId}`);
    // API response: { success: true, data: {id, title, description, price, images: [...]} }
    
    // Response formatını yoxla
    if (response.data && response.data.success && response.data.data) {
      return response.data.data; // {id, title, description, price, images: [...]}
    } else {
      throw new Error('Product not found or invalid response format');
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    
    // 404 error üçün xüsusi mesaj
    if (error.response && error.response.status === 404) {
      throw new Error('Product not found');
    }
    
    // Network error və ya başqa problemlər
    if (error.message) {
      throw error;
    }
    
    throw new Error('Failed to fetch product');
  }
};

// 3. Search funksiyası (query ilə)
export const searchProducts = async (query) => {
  try {
    const response = await api.get("/products/search", { params: { q: query } });
    // API response: { success: true, count: 5, data: [...] }
    return response.data; // { success: true, count: 5, data: [...] }
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// 4. Bütün brendlər
export const getBrands = async () => {
  try {
    const response = await api.get("/brands");
    // API response: { success: true, data: ["Apple", "Samsung", "JBL", ...] }
    return response.data.data; // ["Apple", "Samsung", "JBL", ...]
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

// 5. Bütün kateqoriyalar
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    // API response: { success: true, data: ["Phones", "Laptops", "Accessories", ...] }
    return response.data.data; // ["Phones", "Laptops", "Accessories", ...]
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 6. Məhsul şəkilləri (ID ilə)
export const getProductImages = async (id) => {
  try {
    const response = await api.get(`/products/${id}/images`);
    // API response: { success: true, data: ["url1.jpg", "url2.jpg", "url3.jpg"] }
    return response.data.data; // ["url1.jpg", "url2.jpg", "url3.jpg"]
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
};
