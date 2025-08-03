import { Pagination } from "./sharedTypes";

export type CarouselType = {
  _id: string;
  isActive: boolean;
  description: string;
  carouselSm: string;
  carouselMd: string;
  carouselLg: string;
  createdAt: string;
  updatedAt: string;
  slug?: string;
};

export type CarouselsResponse = {
  status: "success" | "error";
  results: number;
  pagination: Pagination;
  data: CarouselType[];
};

export type CarouselResponse = {
  status: "success" | "error";
  message: string;
  pagination: Pagination;
  data: {
    _id: string;
    description: {
      ar: string;
      en: string;
    };
    carouselSm?: string;
    carouselMd?: string;
    carouselLg?: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    slug?: string;
  };
};
