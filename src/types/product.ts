import { Pagination } from "./sharedTypes";

export type Product = {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  id: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
    };
  brand: {
    _id: string;
    name: string;
  };
  disabled: boolean;
  isUnlimitedStock: boolean;
  priceAfterDiscount: number;
  quantity: number;
  ratingsAverage: number;
  rating: number;
  discount: number;
  ratingsQuantity: number;
  sold: number;
  supCategories: string[];
  supplier: string;
  colors?: string[];
  sizes?: string[];
  imageCover: string;
  images: string[];

};

export type ProductsResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: Product[];
};
export type ProductResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: {
    _id: string;
    title: {
      ar: string;
      en: string;
    };
    image: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    id: string;
  };
};
