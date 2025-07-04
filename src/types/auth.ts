// types/auth.ts
import { z } from "zod";
import {
  forgetPassSchema,
  verifyCodeSchema,
  resetPasswordSchema,
} from "@/schemas/forgetPassSchema";
import { loginSchema } from "@/schemas/loginSchema";

// ------------------------------
// أنواع البيانات القادمة من النماذج (Forms)
// ------------------------------
export type ForgetPasswordForm = z.infer<ReturnType<typeof forgetPassSchema>>;
export type VerifyCodeForm = z.infer<ReturnType<typeof verifyCodeSchema>>;
export type ResetPasswordForm = z.infer<ReturnType<typeof resetPasswordSchema>>;
export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

// إضافة أنواع بيانات الإدخال الخاصة بالـ hooks (ممكن تستخدم نفس أسماء الأنواع مع اختلاف في التسمية لو تحب)
export type LoginCredentials = LoginFormData;
export type ForgotCredentials = ForgetPasswordForm;
export type VerifyCodeCredentials = VerifyCodeForm;
export type ResetPasswordCredentials = LoginFormData;

// ------------------------------
// Props مشتركة بين المكونات
// ------------------------------
export type CommonStepProps = {
  loading: boolean;
  label: string;
  loadingLabel: string;
  error: string;
  t: (key: string) => string;
};

// ------------------------------
// StepEmail Props
// ------------------------------
export type StepEmailProps = {
  onSubmit: (data: ForgetPasswordForm) => void;
  emailLabel: string;
} & CommonStepProps;

// ------------------------------
// StepCode Props
// ------------------------------
export type StepCodeProps = {
  onSubmit: (data: VerifyCodeForm) => void;
  codeLabel: string;
} & CommonStepProps;

// ------------------------------
// StepResetPassword Props
// ------------------------------
export type StepResetPasswordProps = {
  onSubmit: (data: ResetPasswordForm) => void;
  email: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  emailLabel: string;
} & CommonStepProps;

export interface AuthResponse {
  message: string;
  data: {
    avatar: string;
    name: string;
    role: string;
  };
}
