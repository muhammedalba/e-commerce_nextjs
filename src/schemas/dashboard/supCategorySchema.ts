import { z } from "zod";

export const supCategorySchema = (t: any) =>
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
    category: z
      .string({ message: t("Validation.requiredName") })
      .min(1, t("Validation.requiredName"))
      .min(3, t("Validation.shortName"))
      .max(32, t("Validation.longName")),
  });

export type SupCategoryFormData = z.infer<ReturnType<typeof supCategorySchema>>;
