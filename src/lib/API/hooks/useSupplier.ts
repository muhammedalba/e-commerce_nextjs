import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplier, updateSupplier } from "../services/suppliers.service";
import { SupplierResponse, SuppliersResponse } from "@/types/supplier";

export function useGetAllSuppliers(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<SuppliersResponse, Error>({
    queryKey: ["supplier", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllSuppliers(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSupplier,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["supplier"] });

      const previousData = queryClient.getQueryData<SuppliersResponse>([
        "supplier",
      ]);

      queryClient.setQueryData<SuppliersResponse>(["supplier"], (old) => {
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
        queryClient.setQueryData(["supplier"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
}

export function useCreateSupplier() {
  return useMutation<SuppliersResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createSupplier(data);
      return response.data;
    },
  });
}

export const useUpdateSupplier = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateSupplier(id, formData);
      return response.data;
    },
  });
};

export const useGetSupplier = (slug: string) => {
  return useQuery<SupplierResponse, Error>({
    queryKey: ["supplier", slug],
    queryFn: async () => {
      const response = await getSupplier(slug);
      return response.data;
    },
    enabled: !!slug,
  });
};
