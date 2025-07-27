import axiosInstance from "@/lib/abi/axios";

export const getAllBrands = (page: number, limit: number, keywords: string) =>
  axiosInstance.get(`/brands?keywords=${keywords}&page=${page}&limit=${limit}`);

export const deleteBrand = async (id: string) =>
  await axiosInstance.delete(`/brands/${id}`);

export const createBrand = async (data: FormData) =>
  await axiosInstance.post("/brands", data);

export const updateBrand = async (id: string, data: FormData) =>
  await axiosInstance.patch(`/brands/${id}`, data);

export const getBrandById = async (slug: string) =>
  await axiosInstance.get(`/brands/${slug}`);
