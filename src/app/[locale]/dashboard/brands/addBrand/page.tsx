"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCreateBrand } from "@/lib/abi/hooks/useBrands";
import { BrandFormData, brandSchema } from "@/schemas/dashboard/brandSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ImageDropzone from "@/lib/utils/ImageDropzone";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";
import Link from "next/link";
import { motion } from "framer-motion";
import InputError from "@/components/common/InputError";

const AddProductPage = () => {
  const t = useTranslations("Brands");
  const router = useRouter();
  const { mutate: CreateBrand, isPending, isSuccess, error } = useCreateBrand();

  const schema = useMemo(() => brandSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: {
        ar: "",
        en: "",
      },
      image: null,
    },
  });

  const onSubmit = useCallback(
    (values: BrandFormData) => {
      const formData = new FormData();
      formData.append("name[ar]", values.name.ar);
      formData.append("name[en]", values.name.en);
      if (values.image) formData.append("image", values.image);

      CreateBrand(formData, {
        onSuccess(data) {
          toast.success(data?.message || t("success"));
          router.push("/dashboard/brands");
        },
        onError(err) {
          const message = err.message || t("error");
          message.split(",").forEach((msg) => toast.error(msg.trim()));
        },
      });
    },
    [CreateBrand, router, t]
  );

  const handleFileSelect = useCallback(
    (file: File | null) => {
      setValue("image", file ?? null, { shouldValidate: true });
    },
    [setValue]
  );

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
                  {t("addBrand")}
                </motion.h6>
                <motion.p variants={itemVariants}>
                  {t("addBrandSubtitle")}
                </motion.p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="input-main-wrapper"
              >
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    id="name.ar"
                    label={t("nameAr")}
                    iconClass="fa-solid fa-pencil"
                    register={register("name.ar")}
                    error={errors.name?.ar?.message}
                  />
                </motion.div>
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    id="name.en"
                    label={t("nameEn")}
                    iconClass="fa-solid fa-pencil"
                    register={register("name.en")}
                    error={errors.name?.en?.message}
                  />
                </motion.div>

                <motion.div className="single-input" variants={imageVariants}>
                  <ImageDropzone
                    error={errors.image?.message as string}
                    preview={avatarPreview}
                    setPreview={setAvatarPreview}
                    onFileSelect={handleFileSelect}
                    label={t("uploadImage")}
                    removeLabel={t("removeImage")}
                  />
                </motion.div>

                <motion.div
                  className="button-area-botton-wrapper-p-list justify-content-between"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SubmitButton
                      loading={isPending || isSuccess}
                      label={t("addBrand")}
                      loadingLabel={t("loadingAddBrand")}
                      className="rts-btn btn-primary mb-0"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/dashboard/brands"
                      className="rts-btn btn-danger rounded rounded-5 mb-0"
                    >
                      {t("cancel")}
                    </Link>
                  </motion.div>
                </motion.div>
                <InputError
                  id="form-error"
                  className="text-center fs-3 "
                  message={error?.message ?? undefined}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProductPage;
