import api from "@/lib/axios";

export const getAllCoupons = () => api.get("/coupons");

export const applyCoupon = (code: string) => api.post("/coupons/apply", { code });

export const createCoupon = (data: any) => api.post("/coupons", data);

export const deleteCoupon = (id: string) => api.delete(`/coupons/${id}`);
