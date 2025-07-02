import { z } from "zod";

export const registerSchema = (t: any) =>
  z
    .object({
      name:
       z
        .string({
          required_error: t("Validation.requiredName"),
          invalid_type_error: t("Validation.requiredName"),
        })
      //   .min(6, t("Validation.shortName"))
      //   .max(32, t("Validation.longName"))
     , email: z
        .string({
          required_error: t("Validation.requiredEmail"),
          invalid_type_error: t("Validation.invalidEmail"),
        })
        .email(t("Validation.invalidEmail")),
      password: z
        .string({
          required_error: t("Validation.requiredPassword"),
          invalid_type_error: t("Validation.requiredPassword"),
        })
        .min(6, t("Validation.shortPassword"))
        .max(32, t("Validation.longPassword")),
      confirmPassword: z.string({
        required_error: t("Validation.requiredConfirmPassword"),
      }),
      avatar: z
        .any()
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

export type LoginFormData = z.infer<ReturnType<typeof registerSchema>>;
