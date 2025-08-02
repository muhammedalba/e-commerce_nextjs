import axiosInstance from "@/lib/API/axios";

export const getAllCarousels = (page: number, limit: number, keywords: string) =>
  axiosInstance.get(`/carousel?keywords=${keywords}&page=${page}&limit=${limit}`);

export const deleteCarousel = async (id: string) =>
  await axiosInstance.delete(`/carousel/${id}`);

export const createCarousel = async (data: FormData) =>
  await axiosInstance.post("/carousel", data);

export const updateCarousel = async (id: string, data: FormData) =>
  await axiosInstance.patch(`/carousel/${id}`, data);

export const getCarouselById = async (id: string) =>
  await axiosInstance.get(`/carousel/${id}`);
