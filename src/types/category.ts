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
export type Pagination = {
  currentPage: number;
  limit: number;
  numberOfPages: number;
};
export type CategoryResponse = {
  status: "success" | "error";
  results: number;
  pagination: Pagination;
  data: Category[];
  hasMore: boolean;
};
