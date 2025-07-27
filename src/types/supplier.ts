import { Pagination } from "./sharedTypes";

export type SupplierType = {
  _id: string;
  name: string;
  contactName: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  id: string;
  website: string;
  address: string;
  email: string;
  phone: string;
  status: string;
  
};

export type SuppliersResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: SupplierType[];
  hasMore: boolean;
};
export type SupplierResponse = {
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
    avatar: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    id: string;
    website: string;
    address: string;
    email: string;
    phone: string;
    status: string;
  };
  hasMore: boolean;
};
