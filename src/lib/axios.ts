import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,

  withCredentials: true,
});

// ✅ Interceptor لإضافة Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = Cookies.get("access_token");
    const language = Cookies.get("NEXT_LOCALE") || "ar";
    config.headers["Accept-Language"] = language;
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// refresh token logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

//  Interceptor request to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    // if unsuccessful response is 401 and the request has not been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // if another request is already refreshing the token, wait for it
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get("/auth/refresh-token"); // هذا يُعيد Set-Cookie فقط
        processQueue(null);
        return axiosInstance(originalRequest); // أعد إرسال الطلب
      } catch (err) {
        processQueue(err, null);
        // redirect to login page or handle the error
        // if (typeof window !== "undefined") {
        //   window.location.href = "/login";
        // }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // إذا لم يكن الخطأ 401
    const message =
      error.response?.data?.message ||
      error?.response?.data?.messages ||
      "حدث خطأ في الاتصال بالخادم";
    return Promise.reject(new Error(message));
  }
);
//  Interceptor to handle errors globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message ||
//       error?.response?.data.messages ||
//       "حدث خطأ في الاتصال بالخادم";
//     // console.error("Axios error:", error.response?.data || error);

//     return Promise.reject(new Error(message));
//   }
// );

export default axiosInstance;
