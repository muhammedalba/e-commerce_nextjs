import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/api/auth.service";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await login(credentials);
      return response.data as LoginResponse;
    }
  });
}