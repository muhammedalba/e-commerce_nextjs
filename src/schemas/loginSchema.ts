import { z } from "zod";

export const loginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, t("Validation.requiredEmail"))
      .email(t("Validation.invalidEmail")),
    password: z
      .string()
      .min(6, t("Validation.shortPassword"))
      .max(32, t("Validation.longPassword")),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;
