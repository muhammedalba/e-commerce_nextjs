import {
  createCarousel,
  deleteCarousel,
  getAllCarousels,
  getCarouselById,
  updateCarousel,
} from "@/lib/API/services/carousel.service";
import { CarouselResponse, CarouselsResponse } from "@/types/carousel";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";



export function useGetAllCarousels(
  page: number = 1,
  limit: number = 10,
  keywords: string = ""
) {
  return useQuery<CarouselsResponse, Error>({
    queryKey: ["carousels", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllCarousels(page, limit, keywords);
      return response.data;
    },
  });
}

export function useDeleteCarousel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCarousel,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["carousels"] });

      const previousData = queryClient.getQueryData<CarouselsResponse>(["carousels"]);

      queryClient.setQueryData<CarouselsResponse>(["carousels"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((carousel) => carousel._id !== id),
        };
      });

      return { previousData };
    },

    // ✅ استرجاع الحالة القديمة إذا فشل الحذف
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["carousels"], context.previousData);
      }
    },

    // ✅ إعادة جلب البيانات للتأكيد
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carousels"] });
    },
  });
}

export function useCreateCarousel() {
  return useMutation<CarouselsResponse, Error, FormData>({
    mutationFn: async (data) => {
      const response = await createCarousel(data);
      return response.data;
    },
  });
}
type props={
  id: string;
  formData: FormData;
}
export const useUpdateCarousel = () => {
  return useMutation<CarouselResponse, Error, props>({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      const response = await updateCarousel(id, formData);
      return response.data;
    },
  });
};

export const useGetCarousel = (slug: string) => {
  return useQuery<CarouselResponse, Error>({
    queryKey: ["carousel", slug],
    queryFn: async () => {
      const response = await getCarouselById(slug);
      return response.data;
    },
    enabled: !!slug, // Only run the query if id is provided
  });
};

