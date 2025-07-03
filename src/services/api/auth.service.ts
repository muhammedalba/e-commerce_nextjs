import axiosInstance from "@/lib/axios";

export const login = async (data: { email: string; password: string }) =>
  await axiosInstance.post("/auth/login", data);

export const register = (data: FormData) =>
  axiosInstance.post("/auth/register", data);

export const logout = () => axiosInstance.post("/auth/logout");

export const forgotPassword = async (data: { email: string }) =>
  await axiosInstance.post("/auth/forgot-password", data);

export const getProfile = () => axiosInstance.get("/auth/profile");

export const verifyCode = async (data: { resetCode: string }) =>
  await axiosInstance.post("/auth/verify-Pass-Reset-Code", data);

export const resetPassword = async (data: {
  email: string;
  password: string;
}) => await axiosInstance.patch("/auth/reset-password", data);
