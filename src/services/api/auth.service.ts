import axiosInstance from "@/lib/axios";

export const login = async (data: { email: string; password: string }) =>
  await axiosInstance.post("/auth/login", data);

export const register = (data: FormData) =>
  axiosInstance.post("/auth/register", data);

export const logout = () => axiosInstance.post("/auth/logout");

export const getProfile = () => axiosInstance.get("/auth/profile");
