import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  register,
  verifyCode,
  resetPassword,
} from "@/services/api/auth.service";

interface LoginCredentials {
  email: string;
  password: string;
}
interface forgotCredentials {
  email: string;
}
interface verifyCodeCredentials {
  resetCode: string;
}
interface LoginResponse {
  message: string;
  data: {
    avatar: string;
    name: string;
    role: string;
  };
}

interface RegisterResponse {
  message: string;
  data: {
    avatar: string;
    name: string;
    role: string;
  };
}
export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (data: LoginCredentials) => {
      const response = await login(data);
      return response.data as LoginResponse;
    },
  });
}
// Register
export function useRegister() {
  return useMutation<RegisterResponse, Error, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await register(data);
      return response.data as RegisterResponse;
    },
  });
}
//
export function useForgotPassword() {
  return useMutation<RegisterResponse, Error, forgotCredentials>({
    mutationFn: async (data: forgotCredentials) => {
      const response = await forgotPassword(data);
      return response.data as RegisterResponse;
    },
  });
}
//   useVerifyCode,

export function useVerifyCode() {
  return useMutation<RegisterResponse, Error, verifyCodeCredentials>({
    mutationFn: async (data: verifyCodeCredentials) => {
      const response = await verifyCode(data);
      return response.data as RegisterResponse;
    },
  });
}
// useResetPassword,
export function useResetPassword() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (data: LoginCredentials) => {
      const response = await resetPassword(data);
      return response.data as LoginResponse;
    },
  });
}
