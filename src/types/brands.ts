import { Pagination } from "./sharedTypes";



export type Brands = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  id: string;
};

export type BrandResponse = {
  status: "success" | "error";
  results: number;
  pagination: Pagination;
  data: Brands[];
  hasMore: boolean;
};
