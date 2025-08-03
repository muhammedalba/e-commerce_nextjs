import axios from 'axios';
import Cookies from 'js-cookie';

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // مثال: https://api.example.com
  withCredentials: true, // لإرسال الكوكيز مع كل طلب
});

// ✅ Inject language header (e.g., for next-intl)
axiosInstance.interceptors.request.use(
  (config) => {
    const lang = Cookies.get('NEXT_LOCALE') || 'ar';
    config.headers['Accept-Language'] = lang;

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔄 Refresh token logic
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token?: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔐 Check if access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axiosInstance.get('/auth/refresh-token'); // الباك يعيد Set-Cookie فقط
        processQueue(null);
        return axiosInstance(originalRequest); // أعد إرسال الطلب الأصلي
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (typeof window !== 'undefined') {
          window.location.href = '/login'; // إعادة توجيه عند فشل التحديث
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 🧼 أي خطأ آخر
    const message =
      error.response?.data?.message ||
      error.response?.data?.messages ||
      error.message ||
      'حدث خطأ في الاتصال بالخادم';

    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
