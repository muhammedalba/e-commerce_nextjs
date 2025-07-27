"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import FormInput from "@/components/forms/FormInput";
import ImageDropzone from "@/lib/utils/ImageDropzone";
import SubmitButton from "@/components/forms/SubmitButton";
import { motion } from "framer-motion";
import InputError from "@/components/common/InputError";
// import FileDropzone from "@/components/forms/FileDropzone"; // مفترض Dropzone لملفات متعددة
import {
  productSchema,
  ProductFormData,
} from "@/schemas/dashboard/productSchema";
import { useGetProduct, useUpdateProduct } from "@/lib/abi/hooks/useProducts";
import MultipleImageDropzone from "@/lib/utils/FileDropzone";
import BdfUploader from "@/lib/utils/BdfUploader";

const page = () => {
  const t = useTranslations("Products");
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const schema = useMemo(() => productSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: { ar: "", en: "" },
      isUnlimitedStock: true,
      disabled: false,
      description: "",
      quantity: 0,
      sold: 0,
      price: 0,
      priceAfterDiscount: undefined,
      colors: [],
      imageCover: null,
      images: [],
      category: undefined,
      supCategories: [],
      brand: undefined,
      supplier: undefined,
      rating: undefined,
      ratingsQuantity: undefined,
      ratingsAverage: 0,
      infoProductPdf: null,
    },
  });

  const { data: productData, isLoading } = useGetProduct(slug);
  const { mutate: updateProduct, isPending, error } = useUpdateProduct();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  // ترسل الملفات المحددة إلى المكون
  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  console.log("productData", productData);

  useEffect(() => {
    if (productData) {
      reset({
        title: {
          ar: productData.data?.title.ar,
          en: productData.data?.title.en,
        },
        isUnlimitedStock: productData.data?.isUnlimitedStock ?? true,
        disabled: productData.data?.disabled ?? false,
        description: productData.data?.description || "",
        quantity: productData.data?.quantity || 0,
        sold: productData.data?.sold || 0,
        price: productData.data?.price || 0,
        priceAfterDiscount: productData.data?.priceAfterDiscount,
        colors: productData.data?.colors || [],
        imageCover: null,
        images: [],
        category: productData.data?.category?.name || undefined,
        // supCategories: productData.data?.supCategories || [],
        brand: productData.data?.brand?.name || undefined,
        supplier: productData.data?.supplier?.name || undefined,
        rating: productData.data?.rating,
        ratingsQuantity: productData.data?.ratingsQuantity,
        ratingsAverage: productData.data?.ratingsAverage || 0,
        infoProductPdf: null,
      });

      setImagesPreview(productData.data?.images || []);
      setAvatarPreview(productData.data?.imageCover || null);
      setPdfPreview(productData.data?.infoProductPdf || null);
    }
  }, [productData, reset]);

  const onSubmit = useCallback(
    (values: ProductFormData) => {
      const formData = new FormData();
      formData.append("title[ar]", values.title.ar);
      formData.append("title[en]", values.title.en);
      formData.append(
        "isUnlimitedStock",
        values.isUnlimitedStock ? "true" : "false"
      );
      formData.append("disabled", values.disabled ? "true" : "false");
      formData.append("description", values.description);
      formData.append("quantity", String(values.quantity));
      formData.append("sold", String(values.sold));
      formData.append("price", String(values.price));
      if (values.priceAfterDiscount !== undefined)
        formData.append(
          "priceAfterDiscount",
          String(values.priceAfterDiscount)
        );
      values.colors.forEach((color, idx) =>
        formData.append(`colors[${idx}]`, color)
      );
      if (values.imageCover) formData.append("imageCover", values.imageCover);
      if (values.images && values.images.length > 0) {
        values.images.forEach((file, idx) => {
          formData.append("images", file);
        });
      }
      if (values.category) formData.append("category", values.category);
      values.supCategories.forEach((id, idx) =>
        formData.append(`supCategories[${idx}]`, id)
      );
      if (values.brand) formData.append("brand", values.brand);
      if (values.supplier) formData.append("supplier", values.supplier);
      if (values.infoProductPdf)
        formData.append("infoProductPdf", values.infoProductPdf);

      if (productData?.data._id) {
        updateProduct(
          { id: productData?.data._id, formData },
          {
            onSuccess(data) {
              toast.success(data.message || t("updateSuccess"));
              router.push("/dashboard/products");
            },
            onError(err) {
              const message = err.message || t("error");
              const messages = message.split(",");
              messages.forEach((msg) => {
                if (msg.trim()) toast.error(msg.trim());
              });
            },
          }
        );
      } else {
        toast.error(t("productNotFound"));
      }
    },
    [updateProduct, productData, router, t]
  );

  // handlers for file inputs
  const handleFileSelect = useCallback(
    (file: File | null) => {
      setValue("imageCover", file, { shouldValidate: true });
    },
    [setValue]
  );

  const handleImagesSelect = useCallback(
    (files: File[]) => {
      setValue("images", files, { shouldValidate: true });
    },
    [setValue]
  );

  const handlePdfSelect = useCallback(
    (file: File | null) => {
      setValue("infoProductPdf", file, { shouldValidate: true });
    },
    [setValue]
  );

  const handleCancel = () => {
    router.back();
  };

  const handleBdfSelect = (file: File | null) => {
    if (file) {
      console.log("تم اختيار الملف:", file.name);
    } else {
      console.log("تمت إزالة الملف");
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <motion.div
      className="body-root-inner"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="transection">
        <div className="vendor-list-main-wrapper product-wrapper add-product-page">
          <div className="card-body table-product-select">
            <div className="header-two show right-collups-add-product">
              <div className="right-collups-area-top">
                <motion.h6
                  className="title"
                  style={{ fontSize: "32px" }}
                  variants={itemVariants}
                >
                  {t("editProductTitle")}
                </motion.h6>
                <motion.p variants={itemVariants}>
                  {t("editProductDescription")}
                </motion.p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="input-main-wrapper"
              >
                {/* Title Arabic */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="title.ar"
                    label={t("titleAr")}
                    type="text"
                    error={errors.title?.ar?.message}
                    register={register("title.ar")}
                  />
                </motion.div>

                {/* Title English */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="title.en"
                    label={t("titleEn")}
                    register={register("title.en")}
                    error={errors.title?.en?.message}
                  />
                </motion.div>

                {/* Description */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="description">{t("descriptionAr")}</label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    rows={4}
                    placeholder={t("descriptionPlaceholder")}
                  />
                  {/* <InputError error={errors?.description?.message} /> */}
                </motion.div>

                {/* isUnlimitedStock */}
                <motion.div
                  className="single-input checkbox-input"
                  variants={itemVariants}
                >
                  <input
                    type="checkbox"
                    id="isUnlimitedStock"
                    {...register("isUnlimitedStock")}
                  />
                  <label htmlFor="isUnlimitedStock">
                    {t("isUnlimitedStock")}
                  </label>
                </motion.div>

                {/* Disabled */}
                <motion.div
                  className="single-input checkbox-input"
                  variants={itemVariants}
                >
                  <input
                    type="checkbox"
                    id="disabled"
                    {...register("disabled")}
                  />
                  <label htmlFor="disabled">{t("disabled")}</label>
                </motion.div>

                {/* Quantity */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="quantity"
                    label={t("TableRowData.quantity")}
                    type="number"
                    register={register("quantity", { valueAsNumber: true })}
                    error={errors.quantity?.message}
                  />
                </motion.div>

                {/* Sold - عرض فقط */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="sold-o">{t("TableRowData.sold")}</label>
                  <input
                    id="sold-o"
                    type="number"
                    value={watch("sold")}
                    readOnly
                    className="form-control"
                  />
                </motion.div>

                {/* Price */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="price"
                    label={t("price")}
                    type="number"
                    register={register("price", { valueAsNumber: true })}
                    error={errors.price?.message}
                  />
                </motion.div>

                {/* Price After Discount */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="priceAfterDiscount"
                    label={t("TableRowData.priceAfterDiscount")}
                    type="number"
                    register={register("priceAfterDiscount", {
                      valueAsNumber: true,
                    })}
                    error={errors.priceAfterDiscount?.message}
                  />
                </motion.div>

                {/* Colors */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="colors">{t("colors")}</label>
                  <input
                    id="colors"
                    type="text"
                    placeholder={"colorsPlaceholder"}
                    {...register("colors", {
                      setValueAs: (v) =>
                        typeof v === "string"
                          ? v
                              .split(",")
                              .map((c) => c.trim())
                              .filter(Boolean)
                          : [],
                    })}
                    className={`form-control ${
                      errors.colors ? "is-invalid" : ""
                    }`}
                  />
                  {/* <InputError error={errors.colors?.message} /> */}
                  <small>{"colorsHelper"}</small>
                </motion.div>

                {/* Image Cover */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label>{t("imageCover")}</label>
                  <ImageDropzone
                    error={errors.imageCover?.message as string}
                    preview={avatarPreview}
                    setPreview={setAvatarPreview}
                    onFileSelect={handleFileSelect}
                    label={t("uploadImage")}
                    removeLabel={t("removeImage")}
                  />
                  {/* <InputError error={errors.imageCover?.message} /> */}
                </motion.div>

                {/* Images Multiple */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label>{t("images")}</label>
                  <MultipleImageDropzone
                    initialPreviews={imagesPreview}
                    label="اسحب وارفع صور هنا أو اضغط للاختيار"
                    removeLabel="حذف الصورة"
                    error={uploadError}
                    onFilesSelect={handleFilesSelect}
                  />
                  {/* <InputError error={errors.images?.message} /> */}
                </motion.div>

                {/* Category */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="category"
                    label={t("TableRowData.category")}
                    register={register("category")}
                    error={errors.category?.message}
                  />
                </motion.div>

                {/* SupCategories */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="supCategories">{t("supCategories")}</label>
                  <input
                    id="supCategories"
                    type="text"
                    placeholder={t("supCategoriesPlaceholder")}
                    {...register("supCategories", {
                      setValueAs: (v) =>
                        typeof v === "string"
                          ? v
                              .split(",")
                              .map((c) => c.trim())
                              .filter(Boolean)
                          : [],
                    })}
                    className={`form-control ${
                      errors.supCategories ? "is-invalid" : ""
                    }`}
                  />
                  {/* <InputError error={errors.supCategories?.message} /> */}
                  <small>{t("supCategoriesHelper")}</small>
                </motion.div>

                {/* Brand */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="brand"
                    label={t("TableRowData.brand")}
                    register={register("brand")}
                    error={errors.brand?.message}
                  />
                </motion.div>

                {/* Supplier */}
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    iconClass="fa-solid fa-pencil"
                    id="supplier"
                    label={t("supplier")}
                    register={register("supplier")}
                    error={errors.supplier?.message}
                  />
                </motion.div>

                {/* Ratings (read-only) */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="rating">{t("rating")}</label>
                  <input
                    id="rating"
                    type="number"
                    value={watch("rating") ?? ""}
                    readOnly
                    className="form-control"
                  />
                </motion.div>
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="ratingsQuantity">
                    {t("ratingsQuantity")}
                  </label>
                  <input
                    id="ratingsQuantity"
                    type="number"
                    value={watch("ratingsQuantity") ?? ""}
                    readOnly
                    className="form-control"
                  />
                </motion.div>
                <motion.div className="single-input" variants={itemVariants}>
                  <label htmlFor="ratingsAverage">{t("ratingsAverage")}</label>
                  <input
                    id="ratingsAverage"
                    type="number"
                    value={watch("ratingsAverage") ?? ""}
                    readOnly
                    className="form-control"
                  />
                </motion.div>

                {/* PDF Info Product */}
                <motion.div className="single-input" variants={itemVariants}>
                  <label>{t("infoProductPdf")}</label>
                  <BdfUploader onFileSelect={handleBdfSelect} />

                  {/* <InputError error={errors.infoProductPdf?.message} /> */}
                </motion.div>

                <motion.div
                  className="button-row"
                  variants={itemVariants}
                  style={{ display: "flex", gap: "10px" }}
                >
                  <SubmitButton
                    loading={isPending || isLoading}
                    label={t("save")}
                    loadingLabel={t("loadingUpdate")}
                    className="rts-btn btn-primary"
                  />
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    {t("cancel")}
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default page;
