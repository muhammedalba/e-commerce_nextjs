import axiosInstance from "@/lib/axios";

export const getAllBrands = (page: number, limit: number, keywords: string) =>
  axiosInstance.get(`/brands?${keywords}?page=${page}&limit=${limit}`);


