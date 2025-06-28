import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// غيّر الرابط حسب بيئتك
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // لو كنت تستخدم الكوكيز (اختياري)
});

// ✅ Interceptor لإضافة Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // أو حسب التخزين المستخدم
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // يمكن تخصيص الرسائل أكثر هنا
    const message =
      error.response?.data?.message || "حدث خطأ في الاتصال بالخادم";
    console.error("Axios error:", error.response?.data || error);
    return Promise.reject(new Error(message));
  }
);

export default api;
