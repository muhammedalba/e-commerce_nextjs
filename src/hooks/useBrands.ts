import { getAllBrands } from "@/services/api/brand.service";
import { BrandResponse } from "@/types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
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
  return useQuery<BrandResponse, Error>({
    queryKey: ["brands", page, limit, keywords],
    queryFn: async () => {
      const response = await getAllBrands(page, limit, keywords);
      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}
