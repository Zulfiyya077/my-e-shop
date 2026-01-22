import axios from "axios";

const BASE_URL = "https://electronic-products-api-1.onrender.com/api";
const api = axios.create({
    baseURL: BASE_URL,
});
export const getProducts = async (params = {}) => {
    try {
        
        const response = await api.get("/products", {
            params
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const productId = typeof id === 'object' ? id.id || id.productId : id;
        const numericId = parseInt(productId);

        if (isNaN(numericId)) {
            throw new Error('Invalid product ID');
        }

        const response = await api.get(`/products/${numericId}`);

        if (response.data && response.data.success && response.data.data) {
            return response.data.data;
        } else {
            throw new Error('Product not found or invalid response format');
        }
    } catch (error) {
        console.error("Error fetching product:", error);

        if (error.response && error.response.status === 404) {
            throw new Error('Product not found');
        }
        if (error.message) {
            throw error;
        }

        throw new Error('Failed to fetch product');
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await api.get("/products/search", {
            params: {
                q: query
            }
        });
  
        return response.data; 
    } catch (error) {
        console.error("Error searching products:", error);
        throw error;
    }
};

export const getBrands = async () => {
    try {
        const response = await api.get("/brands");
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching brands:", error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getProductImages = async (id) => {
    try {
        const response = await api.get(`/products/${id}/images`);
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching product images:", error);
        throw error;
    }
};