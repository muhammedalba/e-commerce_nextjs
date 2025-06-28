import api from "@/lib/axios";

export const getAllCategories = () => api.get("/categories");

export const getCategoryById = (id: string) => api.get(`/categories/${id}`);

export const createCategory = (data: any) => api.post("/categories", data);

export const updateCategory = (id: string, data: any) =>
  api.patch(`/categories/${id}`, data);

export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);
