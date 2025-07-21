import axiosInstance from "@/lib/axios";

export const getProducts = (page: number, limit: number, keywords: string) =>
  axiosInstance.get(`/products?keywords=${keywords}&page=${page}&limit=${limit}`);

export const getProductById = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await axiosInstance.post("/products", product);
  return data;
};

export const updateProduct = async (id: string, product: any) => {
  const { data } = await axiosInstance.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
