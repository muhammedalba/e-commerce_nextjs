// 📁 services/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;


// ✅ Auth
export const login = (data: { email: string; password: string }) =>
  axiosInstance.post("/auth/login", data);

export const register = (data: any) =>
  axiosInstance.post("/auth/register", data);

export const logout = () => axiosInstance.post("/auth/logout");

export const getCurrentUser = () => axiosInstance.get("/auth/profile");

// ✅ Products
export const getAllProducts = () => axiosInstance.get("/products");

export const getProductById = (id: string) =>
  axiosInstance.get(`/products/${id}`);

export const createProduct = (data: any) =>
  axiosInstance.post("/products", data);

export const updateProduct = (id: string, data: any) =>
  axiosInstance.patch(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
  axiosInstance.delete(`/products/${id}`);

// ✅ Categories
export const getAllCategories = () => axiosInstance.get("/categories");

// ✅ Cart
export const getCart = () => axiosInstance.get("/cart");

export const addToCart = (data: { productId: string; quantity: number }) =>
  axiosInstance.post("/cart", data);

export const updateCartItem = (itemId: string, quantity: number) =>
  axiosInstance.patch(`/cart/${itemId}`, { quantity });

export const removeCartItem = (itemId: string) =>
  axiosInstance.delete(`/cart/${itemId}`);

// ✅ Orders
export const getOrders = () => axiosInstance.get("/orders");

export const getOrderById = (id: string) => axiosInstance.get(`/orders/${id}`);

export const createOrder = (data: any) => axiosInstance.post("/orders", data);

// ✅ Coupons
export const applyCoupon = (code: string) =>
  axiosInstance.post("/coupons/apply", { code });

// ✅ Settings / Others
export const getSiteSettings = () => axiosInstance.get("/settings");
