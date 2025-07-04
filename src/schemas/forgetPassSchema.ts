import { z } from "zod";

export const forgetPassSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, t("Validation.requiredEmail"))
      .email(t("Validation.invalidEmail")),
  });
export const verifyCodeSchema = (t: any) =>
  z.object({
    resetCode: z.string().min(4, t("forgotPassword.codeRequired")),
  });

export const resetPasswordSchema = (t: any) =>
  z
    .object({
      email: z
        .string()
        .min(1, t("Validation.requiredEmail"))
        .email(t("Validation.invalidEmail")),
      password: z
        .string()
        .min(6, t("Validation.shortPassword"))
        .max(32, t("Validation.longPassword")),
      confirmPassword: z
        .string()
        .max(32, t("Validation.longPassword"))
        .min(6, t("Validation.requiredConfirmPassword")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type LoginFormData = z.infer<ReturnType<typeof forgetPassSchema>>;
