import { z } from "zod";
const statusEnum = z.enum(["inactive", "active"]);
export const supplierSchema = (t: any) =>
  z.object({
    name: z.object({
      ar: z
        .string()
        .min(1, { message: t("Validation.requiredName") })
        .min(3, { message: t("Validation.shortName") })
        .max(32, { message: t("Validation.longName") }),
      en: z
        .string()
        .min(1, { message: t("Validation.requiredName") })
        .min(3, { message: t("Validation.shortName") })
        .max(32, { message: t("Validation.longName") }),
    }),
    address: z
      .string()
      .min(1, { message: t("Validation.requiredName") })
      .min(20, { message: t("Validation.shortName") })
      .max(500, { message: t("Validation.longName") }),
    contactName: z
      .string()
      .min(20, { message: t("Validation.shortName") })
      .max(500, { message: t("Validation.longName") })
      .optional(),

    email: z
      .string()
      .min(1, { message: t("Validation.requiredEmail") })
      .email({ message: t("Validation.invalidEmail") }),
    phone: z
      .string()
      .min(1, { message: t("Validation.shortName") })
      .max(12, { message: t("Validation.longName") }),
    website: z
      .url()
      .min(1, { message: t("Validation.shortName") })
      .max(50, { message: t("Validation.longName") }),
    status: statusEnum,

    avatar: z
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

export type SupplierFormData = z.infer<ReturnType<typeof supplierSchema>>;
