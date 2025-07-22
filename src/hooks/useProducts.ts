
import { deleteProduct, getProducts } from "@/services/api/product.service";
import {  ProductsResponse } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


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

      const previousData = queryClient.getQueryData<ProductsResponse>(["products"]);

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

// export function useCreateBrand() {
//   return useMutation<ProductsResponse, Error, FormData>({
//     mutationFn: async (data) => {
//       const response = await createBrand(data);
//       return response.data;
//     },
//   });
// }

// export const useUpdateBrand = () => {
//   return useMutation({
//     mutationFn: async ({
//       id,
//       formData,
//     }: {
//       id: string;
//       formData: FormData;
//     }) => {
//       const response = await updateBrand(id, formData);
//       return response.data;
//     },
//   });
// };

// export const useGetBrand = (slug: string) => {
//   return useQuery<BrandResponse, Error>({
//     queryKey: ["brand", slug],
//     queryFn: async () => {
//       const response = await getBrandById(slug);
//       return response.data;
//     },
//     enabled: !!slug, // Only run the query if id is provided
//   });
// };
