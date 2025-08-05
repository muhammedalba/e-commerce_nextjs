import axiosInstance from "@/lib/API/axios";

export const getAllUsers = async (
  page: number,
  limit: number,
  keywords: string
) =>
  await axiosInstance.get(
    `/users?keywords=${keywords}&page=${page}&limit=${limit}`
  );

export const getUserById = async (id: string) =>
  await axiosInstance.get(`/users/${id}`);

export const createUser = async (data: FormData) =>
  await axiosInstance.post(`/users`, data);

export const updateUser = async (id: string, data: FormData) =>
  await axiosInstance.patch(`/users/${id}`, data);

export const deleteUser = async (id: string) =>
  await axiosInstance.delete(`/users/${id}`);
