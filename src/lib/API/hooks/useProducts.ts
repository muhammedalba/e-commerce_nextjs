import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/lib/API/services/product.service";
import { ProductResponse, ProductsResponse } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetAllProducts(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, limit, keywords],
    queryFn: async () => {
      const response = await getProducts(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousData = queryClient.getQueryData<ProductsResponse>([
        "products",
      ]);

      queryClient.setQueryData<ProductsResponse>(["products"], (old) => {
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
        queryClient.setQueryData(["products"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateProduct() {
  return useMutation<ProductResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createProduct(data);
      return response.data;
    },
  });
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateProduct(id, formData);
      return response.data;
    },
  });
};

export const useGetProduct = (slug: string) => {
  return useQuery<ProductResponse, Error>({
    queryKey: ["products", slug],
    queryFn: async () => {
      const response = await getProductById(slug);
      return response;
    },
    enabled: !!slug, // Only run the query if id is provided
  });
};
