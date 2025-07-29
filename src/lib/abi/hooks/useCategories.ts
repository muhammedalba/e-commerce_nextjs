import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "@/lib/abi/services/category.service";
import { CategoriesResponse, CategoryResponse } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
/**
 * Custom hook to fetch all categories with pagination.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of categories per page (default is 10).
 * @returns {object} - The query object containing data, loading state, and error information.
 */

export function useGetAllCategories(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<CategoriesResponse, Error>({
    queryKey: ["categories", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllCategories(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousData = queryClient.getQueryData<CategoriesResponse>([
        "categories",
      ]);

      queryClient.setQueryData<CategoriesResponse>(["categories"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((brand) => brand._id !== id),
        };
      });

      return { previousData };
    },

    // ✅ استرجاع الحالة القديمة إذا فشل الحذف
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["categories"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCreateCategory() {
  return useMutation<CategoriesResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createCategory(data);
      return response.data;
    },
  });
}

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateCategory(id, formData);
      return response.data;
    },
  });
};

export const useGetCategory = (slug: string) => {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["categories", slug],
    queryFn: async () => {
      const response = await getCategoryById(slug);
      return response.data;
    },
    enabled: !!slug, // Only run the query if id is provided
  });
};
