import { z } from "zod";

export const forgetPassSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, t("Validation.requiredEmail"))
      .email(t("Validation.invalidEmail")),
  });
  export const verifyCodeSchema = (t: any) => z.object({
  resetCode: z.string().min(4, t("forgotPassword.codeRequired")),
});

export const resetPasswordSchema = (t: any) => z.object({
  
  password: z.string().min(6, t("Validation.requiredPassword")),
  confirmPassword: z.string().min(6, t("Validation.requiredConfirmPassword")),
}).refine((data) => data.password === data.confirmPassword, {
  message: t("Validation.passwordMismatch"),
  path: ["confirmPassword"],
});


export type LoginFormData = z.infer<ReturnType<typeof forgetPassSchema>>;
