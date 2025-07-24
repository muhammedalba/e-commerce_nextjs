import { z } from "zod";

export const productSchema = (t: any) =>
  z.object({
    title: z.object({
      ar: z
        .string({ message: t("Validation.requiredName") })
        .min(1, { message: t("Validation.requiredName") })
        .min(3, { message: t("Validation.shortName") })
        .max(70, { message: t("Validation.longName") }),

      en: z
        .string({ message: t("Validation.requiredName") })
        .min(1, { message: t("Validation.requiredName") })
        .min(3, { message: t("Validation.shortName") })
        .max(70, { message: t("Validation.longName") }),
    }),


    isUnlimitedStock: z.boolean().default(true),

    disabled: z.boolean().default(false),

    description: z
      .string({ message: t("Validation.requiredDescription") })
      .min(15, { message: t("Validation.shortDescription") }),

    quantity: z
      .number({ message: t("Validation.requiredQuantity") })
      .nonnegative({ message: t("Validation.invalidQuantity") }),

    sold: z.number().default(0),

    price: z
      .number({ message: t("Validation.requiredPrice") })
      .max(20000, { message: t("Validation.maxPrice") }),

    priceAfterDiscount: z.number().optional(),

    colors: z.array(z.string()).default([]),

    imageCover: z
      .any()
      .optional()
      .refine(
        (file) =>
          file === null ||
          file === undefined ||
          (file instanceof File &&
            ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
        {
          message: t("Validation.invalidImageType"),
        }
      )
      .nullable()
      .default(null),

    images: z
      .array(
        z
          .any()
          .refine(
            (file) =>
              file === null ||
              file === undefined ||
              (file instanceof File &&
                ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
            {
              message: t("Validation.invalidImageType"),
            }
          )
          .nullable()
      )
      .optional(),

    category: z.string().optional(),

    supCategories: z
      .array(z.string({ message: t("Validation.requiredSupCategory") }))
      .min(1, { message: t("Validation.requiredSupCategory") }),

    brand: z.string().optional(),

    supplier: z.string().optional(),

    rating: z.number().min(1).max(5).optional().default(1),

    ratingsQuantity: z.number().default(0).optional(),

    ratingsAverage: z.number().min(0).max(5).default(0),

    infoProductPdf: z
      .any()
      .optional()
      .refine(
        (file) =>
          file === null ||
          file === undefined ||
          (file instanceof File && file.type === "application/pdf"),
        {
          message: t("Validation.invalidPdf"),
        }
      )
      .nullable()
      .default(null),
  });

export type ProductFormData = z.infer<ReturnType<typeof productSchema>>;
