import { UseFormRegisterReturn } from "react-hook-form";
export interface FormInputProps {
  id: string;
  label: string;
  isLoading?: boolean;
  iconClass: string;
  type?: string;
  error?: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
}
