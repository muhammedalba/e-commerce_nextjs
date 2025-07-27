import { z } from "zod";

export const registerSchema = (t: any) =>
  z
    .object({
      name: z
        .string({ message: t("Validation.requiredName") })
        .min(1, t("Validation.requiredName"))
        .min(6, t("Validation.shortName"))
        .max(32, t("Validation.longName")),
      email: z
        .string({ message: t("Validation.requiredEmail") })
        .min(1, t("Validation.requiredEmail"))
        .email({ message: t("Validation.invalidEmail") }),
      password: z
        .string({ message: t("Validation.requiredPassword") })
        .min(1, t("Validation.requiredPassword"))
        .min(6, t("Validation.shortPassword"))
        .max(32, t("Validation.longPassword")),
      confirmPassword: z
        .string({ message: t("Validation.requiredConfirmPassword") })
        .min(1, t("Validation.requiredConfirmPassword")),
      avatar: z
        .any()
        .optional()
        .refine(
          (file) =>
            file === null ||
            (file instanceof File &&
              ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
          {
            message: t("Validation.invalidAvatarType"),
          }
        )
        .nullable()
        .default(null),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("Validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;
