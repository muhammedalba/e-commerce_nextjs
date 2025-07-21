import { Pagination } from "./sharedTypes";

export type SupCategory = {
  _id: string;
  name: string;
  category: string;
  slug: string;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  supCategories: SupCategory[];
  id: string;
};

export type CategoriesResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: Category[];
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
    supCategories: SupCategory[];
    id: string;
  };
  hasMore: boolean;
};
