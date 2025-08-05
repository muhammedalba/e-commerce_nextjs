import { Pagination } from "./sharedTypes";

export type UserType = {
  _id: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  id: string;
  password: string;
  address: string;
  email: string;
  role: ["user", "admin", "manager"];
  provider?: string;
  passwordChangeAt?: Date;
  passwordResetCode?: string;
  lastEmailAttemptAt?: Date;
  passwordResetExpires?: number;
  verificationCode?: boolean;

  totalOrder: number;
  phone: string;
  status: "active" | "inactive";
};

export type UsersResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: UserType[];
  hasMore: boolean;
};
export type UserResponse = {
  status: "success" | "error";
  message: string;
  results: number;
  pagination: Pagination;
  data: UserType;
  hasMore: boolean;
};
