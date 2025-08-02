import { Pagination } from "./sharedTypes";

export type SupCategoryType = {
  _id: string;
  name: string;
  category: {
    id: string;
    image: string;
    name: string;
  };
  slug: string;
};

export type SupCategoriesResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: SupCategoryType[];
  hasMore: boolean;
};
export type SupCategoryResponse = {
  status: "success" | "error";
  results: number;
  pagination: Pagination;
  data: {
    _id: string;
    name: { ar: string; en: string };
    category: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    id: string;
  };
  hasMore: boolean;
};
