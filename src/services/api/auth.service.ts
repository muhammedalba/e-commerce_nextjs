import api from "@/lib/axios";

export const login = async (credentials: { email: string; password: string }) =>
  await api.post("/auth/login", credentials);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);

export const logout = () => api.post("/auth/logout");

export const getProfile = () => api.get("/auth/profile");
