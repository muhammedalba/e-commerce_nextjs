import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// ✅ Interceptor لإضافة Authorization header
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error?.response?.data.messages ||
      "حدث خطأ في الاتصال بالخادم";
    // console.error("Axios error:", error.response?.data || error);
    console.log("message",message);
    
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
