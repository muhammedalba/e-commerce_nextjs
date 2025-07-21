import axiosInstance from "@/lib/axios";

export const getAllCategories = async (
  page: number,
  limit: number,
  keywords: string
) =>
  await axiosInstance.get(
    `/categories?keywords=${keywords}&page=${page}&limit=${limit}`
  );

export const getCategoryById = async (slug: string) =>
  await axiosInstance.get(`/categories/${slug}`);

export const createCategory = async (data: FormData) =>
  await axiosInstance.post("/categories", data);

export const updateCategory = async (id: string, data: FormData) =>
  await axiosInstance.patch(`/categories/${id}`, data);

export const deleteCategory = async (id: string) =>
  await axiosInstance.delete(`/categories/${id}`);
