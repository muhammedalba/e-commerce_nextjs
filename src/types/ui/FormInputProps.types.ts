import { UseFormRegisterReturn } from "react-hook-form";
export interface FormInputProps {
  id: string;
  label: string;
  iconClass: string;
  type?: string;
  error?: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
}
