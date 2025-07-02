import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/services/api/auth.service";

interface LoginCredentials {
  email: string;
  password: string;
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
