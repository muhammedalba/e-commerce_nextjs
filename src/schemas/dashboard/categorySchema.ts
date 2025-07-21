import { z } from "zod";

export const categorySchema = (t: any) =>
  z.object({
    name: z.object({
      ar: z
        .string({ message: t("Validation.requiredName") })
        .min(1, t("Validation.requiredName"))
        .min(3, t("Validation.shortName"))
        .max(32, t("Validation.longName")),
      en: z
        .string({ message: t("Validation.requiredName") })
        .min(1, t("Validation.requiredName"))
        .min(3, t("Validation.shortName"))
        .max(32, t("Validation.longName")),
    }),
    image: z
      .any()
      .optional()
      .refine(
        (file) =>
          file === null ||
          (file instanceof File &&
            ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
        {
          message: t("Validation.invalidImageType"),
        }
      )
      .nullable()
      .default(null),
  });

export type CategoryFormData = z.infer<ReturnType<typeof categorySchema>>;
