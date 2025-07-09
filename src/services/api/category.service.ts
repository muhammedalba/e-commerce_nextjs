import api from "@/lib/axios";

export const getAllCategories = (page: number, limit: number) => api.get(`/categories?page=${page}&limit=${limit}`);

export const getCategoryById = (id: string) => api.get(`/categories/${id}`);

export const createCategory = (data: any) => api.post("/categories", data);

export const updateCategory = (id: string, data: any) =>
  api.patch(`/categories/${id}`, data);

export const deleteCategory = (id: string) => api.delete(`/categories/${id}`);
