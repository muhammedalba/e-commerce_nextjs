import { Pagination } from "./sharedTypes";

export type Brand = {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  id: string;
};

export type BrandsResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: Brand[];
  hasMore: boolean;
};
export type BrandResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: {
    _id: string;
    name: {
      ar: string;
      en: string;
    };
    image: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    id: string;
  };
  hasMore: boolean;
};
