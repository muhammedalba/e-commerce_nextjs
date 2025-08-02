import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  register,
  verifyCode,
  resetPassword,
  logout,
} from "@/lib/API/services/auth.service";

import type { AuthResponse } from "@/types/auth";

import { LoginFormData } from "@/schemas/Auth/loginSchema";
import {
  ForgetPasswordForm,
  VerifyCodeForm,
} from "@/schemas/Auth/forgetPassSchema";

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: async (data) => {
      const response = await login(data);
      return response.data;
    },
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await register(data);
      return response.data;
    },
  });
}

export function useForgotPassword() {
  return useMutation<AuthResponse, Error, ForgetPasswordForm>({
    mutationFn: async (data) => {
      const response = await forgotPassword(data);
      return response.data;
    },
  });
}

export function useVerifyCode() {
  return useMutation<AuthResponse, Error, VerifyCodeForm>({
    mutationFn: async (data) => {
      const response = await verifyCode(data);
      return response.data;
    },
  });
}

export function useResetPassword() {
  return useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: async (data) => {
      const response = await resetPassword(data);
      return response.data;
    },
  });
}
export function useLogout() {
  return useMutation<AuthResponse, Error>({
    mutationFn: async () => {
      const response = await logout();
      return response.data;
    },
  });
}
