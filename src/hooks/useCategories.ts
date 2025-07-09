import { getAllCategories } from "@/services/api/category.service";
import { CategoryResponse } from "@/types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
/**
 * Custom hook to fetch all categories with pagination.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of categories per page (default is 10).
 * @returns {object} - The query object containing data, loading state, and error information.
 */



export function useGetAllCategories(page: number = 1, limit: number = 10) {
  return useQuery<CategoryResponse, Error>({
    queryKey: ["categories?lang=en", page],
    queryFn: async () => {
      const response = await getAllCategories(page, limit);
      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}
