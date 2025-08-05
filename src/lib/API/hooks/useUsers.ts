import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";

import { UserResponse, UsersResponse } from "@/types/users";

export function useGetAllUsers(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<UsersResponse, Error>({
    queryKey: ["user", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllUsers(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousData = queryClient.getQueryData<UsersResponse>([
        "users",
      ]);

      queryClient.setQueryData<UsersResponse>(["users"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((Supplier) => Supplier._id !== id),
        };
      });

      return { previousData };
    },

    // ✅ استرجاع الحالة القديمة إذا فشل الحذف
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["users"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useCreateUser() {
  return useMutation<UserResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createUser(data);
      return response.data;
    },
  });
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateUser(id, formData);
      return response.data;
    },
  });
};

export const useGetUser = (slug: string) => {
  return useQuery<UserResponse, Error>({
    queryKey: ["users", slug],
    queryFn: async () => {
      const response = await getUserById(slug);
      return response.data;
    },
    enabled: !!slug,
  });
};
