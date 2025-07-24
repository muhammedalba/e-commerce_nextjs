import { Pagination } from "./sharedTypes";

export type ProductType = {
  _id: string;
  title: string;
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
  imageCover: null;
  images: [];
  infoProductPdf: null;
};

export type ProductsResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: ProductType[];
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
    supCategories: {
      _id: string;
      name: string;
    }[];
    supplier: {
      _id: string;
      name: string;
    };
    colors?: string[];
    imageCover: null;
    images: [];
    infoProductPdf: null;
  };
};
