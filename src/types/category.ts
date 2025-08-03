import { Pagination } from "./sharedTypes";
import { SupCategoryType } from "./supCategory";


export type CategoryType = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  supCategories: SupCategoryType[];
  id: string;
};

export type CategoriesResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: CategoryType[];
  hasMore: boolean;
};
export type CategoryResponse = {
  status: "success" | "error";
  results: number;
  pagination: Pagination;
  data: {
    _id: string;
    name: { ar: string; en: string };
    image: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    supCategories: SupCategoryType[];
    id: string;
  };
  hasMore: boolean;
};
