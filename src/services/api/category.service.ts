import axiosInstance from "@/lib/axios";

export const getAllCategories = (page: number, limit: number) => axiosInstance.get(`/categories?page=${page}&limit=${limit}`);

export const getCategoryById = (id: string) => axiosInstance.get(`/categories/${id}`);

export const createCategory = (data: any) => axiosInstance.post("/categories", data);

export const updateCategory = (id: string, data: any) =>
  axiosInstance.patch(`/categories/${id}`, data);

export const deleteCategory = (id: string) => axiosInstance.delete(`/categories/${id}`);
