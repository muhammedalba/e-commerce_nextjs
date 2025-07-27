import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "@/lib/abi/services/brand.service";
import { BrandResponse, BrandsResponse } from "@/types";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
/**
 * Custom hook to fetch all brands with pagination.
 * @param {string} keywords - Search keywords for filtering brands.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of brands per page (default is 10).
 * @returns {object} - The query object containing data, loading state, and error information.
 */

export function useGetAllBrands(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<BrandsResponse, Error>({
    queryKey: ["brands", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllBrands(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["brands"] });

      const previousData = queryClient.getQueryData<BrandsResponse>(["brands"]);

      queryClient.setQueryData<BrandsResponse>(["brands"], (old) => {
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
        queryClient.setQueryData(["brands"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
}

export function useCreateBrand() {
  return useMutation<BrandsResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createBrand(data);
      return response.data;
    },
  });
}

export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateBrand(id, formData);
      return response.data;
    },
  });
};

export const useGetBrand = (slug: string) => {
  return useQuery<BrandResponse, Error>({
    queryKey: ["brand", slug],
    queryFn: async () => {
      const response = await getBrandById(slug);
      return response.data;
    },
    enabled: !!slug, // Only run the query if id is provided
  });
};
