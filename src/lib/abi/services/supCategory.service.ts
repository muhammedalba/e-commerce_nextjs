import axiosInstance from "@/lib/abi/axios";

export const getAllSupCategories = async (
  page: number,
  limit: number,
  keywords: string
) =>
  await axiosInstance.get(
    `/sup-category?keywords=${keywords}&page=${page}&limit=${limit}`
  );

export const getSupCategoryById = async (slug: string) =>
  await axiosInstance.get(`/sup-category/${slug}`);

export const createSupCategory = async (data: {
  name: { ar: string; en: string };
  category: string;
}) => await axiosInstance.post("/sup-category", data);

export const updateSupCategory = async (
  id: string,
  data: {
    name: { ar: string; en: string };
    category: string;
  }
) => await axiosInstance.patch(`/sup-category/${id}`, data);

export const deleteSupCategory = async (id: string) =>
  await axiosInstance.delete(`/sup-category/${id}`);
