import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  register,
  verifyCode,
  resetPassword,
} from "@/services/api/auth.service";

import type {
  LoginCredentials,
  ForgotCredentials,
  VerifyCodeCredentials,
  ResetPasswordCredentials,
  AuthResponse,
} from "@/types/auth";

export function useLogin() {
  return useMutation<AuthResponse, Error, LoginCredentials>({
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
  return useMutation<AuthResponse, Error, ForgotCredentials>({
    mutationFn: async (data) => {
      const response = await forgotPassword(data);
      return response.data;
    },
  });
}

export function useVerifyCode() {
  return useMutation<AuthResponse, Error, VerifyCodeCredentials>({
    mutationFn: async (data) => {
      const response = await verifyCode(data);
      return response.data;
    },
  });
}

export function useResetPassword() {
  return useMutation<AuthResponse, Error, ResetPasswordCredentials>({
    mutationFn: async (data) => {
      const response = await resetPassword(data);
      return response.data;
    },
  });
}
