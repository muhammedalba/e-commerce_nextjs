import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Interceptor لإضافة Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const language = Cookies.get("NEXT_LOCALE") || "ar";
    config.headers["Accept-Language"] = language;
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
