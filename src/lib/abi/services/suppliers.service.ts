import axiosInstance from "../axios";

export const createSupplier = async (data: FormData) =>
  await axiosInstance.post("/supplier", data);


export const getAllSuppliers = (page: number, limit: number, keywords: string) =>
  axiosInstance.get(`/supplier?keywords=${keywords}&page=${page}&limit=${limit}`);


export const getSupplier = (id: string) => axiosInstance.get(`/supplier/${id}`);


export const updateSupplier = (id: string, data: FormData) =>
  axiosInstance.patch(`/supplier/${id}`, data);


export const deleteSupplier = (id: string) => axiosInstance.delete(`/supplier/${id}`);
