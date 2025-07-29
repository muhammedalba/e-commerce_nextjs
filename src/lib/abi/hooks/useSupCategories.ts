import { SupCategoriesResponse, SupCategoryResponse } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSupCategories,
  getSupCategoryById,
  updateSupCategory,
  createSupCategory,
  deleteSupCategory,
} from "@/lib/abi/services/supCategory.service";
import { SupCategoryFormData } from "@/schemas/dashboard/supCategorySchema";
export function useGetAllSupCategories(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<SupCategoriesResponse, Error>({
    queryKey: ["supCategories", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllSupCategories(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteSupCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupCategory,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["supCategories"] });

      const previousData = queryClient.getQueryData<SupCategoryResponse>([
        "supCategories",
      ]);

      queryClient.setQueryData<SupCategoriesResponse>(
        ["supCategories"],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((brand) => brand._id !== id),
          };
        }
      );

      return { previousData };
    },

    // ✅ استرجاع الحالة القديمة إذا فشل الحذف
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["supCategories"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["supCategories"] });
    },
  });
}

export function useCreateSupCategory() {
  return useMutation<SupCategoriesResponse, Error, SupCategoryFormData>({
    mutationFn: async (data) => {
      const response = await createSupCategory(data);
      return response.data;
    },
  });
}

export const useUpdateSupCategory = () => {
  return useMutation({
    mutationFn: async ({
      id,
      Data,
    }: {
      id: string;
      Data: { name: { ar: string; en: string }; category: string };
    }) => {
      const response = await updateSupCategory(id, Data);
      return response.data;
    },
  });
};

export const useGetSupCategory = (slug: string) => {
  return useQuery<SupCategoryResponse, Error>({
    queryKey: ["supCategories", slug],
    queryFn: async () => {
      const response = await getSupCategoryById(slug);
      return response.data;
    },
    enabled: !!slug, // Only run the query if id is provided
  });
};
