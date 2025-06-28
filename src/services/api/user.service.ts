import api from "@/lib/axios";

export const getAllUsers = () => api.get("/users");

export const getUserById = (id: string) => api.get(`/users/${id}`);

export const updateUser = (id: string, data: any) =>
  api.patch(`/users/${id}`, data);

export const deleteUser = (id: string) => api.delete(`/users/${id}`);
