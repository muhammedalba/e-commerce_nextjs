import axiosInstance from "../axios";

export const createSupplier = async (data: FormData) =>
  await axiosInstance.post("/supplier", data);

export const getAllSuppliers = async (
  page: number,
  limit: number,
  keywords: string
) =>
  await axiosInstance.get(
    `/supplier?keywords=${keywords}&page=${page}&limit=${limit}`
  );

export const getSupplier = async (id: string) =>
  await axiosInstance.get(`/supplier/${id}`);

export const updateSupplier = async (id: string, data: FormData) =>
  await axiosInstance.patch(`/supplier/${id}`, data);

export const deleteSupplier = async (id: string) =>
  await axiosInstance.delete(`/supplier/${id}`);
