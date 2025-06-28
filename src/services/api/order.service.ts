import api from "@/lib/axios";

export const getAllOrders = () => api.get("/orders");

export const getOrderById = (id: string) => api.get(`/orders/${id}`);

export const createOrder = (data: any) => api.post("/orders", data);

export const cancelOrder = (id: string) => api.patch(`/orders/${id}/cancel`);
