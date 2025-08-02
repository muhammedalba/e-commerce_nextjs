import { z } from "zod";

export const carouselSchema = (t: any, isEdit: boolean = false) =>
  z.object({
    description: z.object({
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
    isActive: z.boolean().default(false),

    carouselSm: isEdit
      ? z
          .any()
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
          .default(null)
      : z
          .instanceof(File, { message: t("Validation.requiredImage") })
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            {
              message: t("Validation.invalidImageType"),
            }
          ),

    carouselMd: isEdit
      ? z
          .any()
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
          .default(null)
      : z
          .instanceof(File, { message: t("Validation.requiredImage") })
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            {
              message: t("Validation.invalidImageType"),
            }
          ),

    carouselLg: isEdit
      ? z
          .any()
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
          .default(null)
      : z
          .instanceof(File, { message: t("Validation.requiredImage") })
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            {
              message: t("Validation.invalidImageType"),
            }
          ),
  });

export type CarouselFormData = z.infer<ReturnType<typeof carouselSchema>>;
