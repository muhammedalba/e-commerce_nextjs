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
import {
  SupCategoryFormData,
  supCategorySchema,
} from "@/schemas/dashboard/supCategorySchema";
import {
  useGetSupCategory,
  useUpdateSupCategory,
} from "@/lib/abi/hooks/useSupCategories";

const page = () => {
  const t = useTranslations("SupCategories");
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const schema = useMemo(() => supCategorySchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: { ar: "", en: "" },
      image: null,
    },
  });

  const { data: supCategoryData, isLoading } = useGetSupCategory(slug);
  const { mutate: updateSupCategory, isPending, error } = useUpdateSupCategory();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (supCategoryData) {
      reset({
        name: {
          ar: supCategoryData.data?.name.ar,
          en: supCategoryData.data?.name.en,
        },
        image: null,
      });
      setAvatarPreview(supCategoryData.data?.image || null);
    }
  }, [supCategoryData, reset]);

  const onSubmit = useCallback(
    (values: SupCategoryFormData) => {
      const formData = new FormData();
      formData.append("name[ar]", values.name.ar);
      formData.append("name[en]", values.name.en);
      if (values.image) formData.append("image", values.image);
      if (supCategoryData?.data._id) {
        updateSupCategory(
          { id: supCategoryData?.data._id, formData },
          {
            onSuccess(data) {
              toast.success(data.message || t("updateSuccess"));
              router.push("/dashboard/supCategories");
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
        toast.error(t("SupCategoryNotFound"));
        return;
      }
    },
    [updateSupCategory, supCategoryData, router, t]
  );

  const handleFileSelect = useCallback(
    (file: File | null) => {
      setValue("image", file, { shouldValidate: true });
    },
    [setValue]
  );

  const handleCancel = () => {
    router.back();
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
                  {t("editSupCategoryTitle")}
                </motion.h6>
                <motion.p variants={itemVariants}>
                  {t("editSupCategoryDescription")}
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
                      loading={isPending || isLoading}
                      label={t("save")}
                      loadingLabel={t("loadingUpdate")}
                      className="rts-btn btn-primary"
                    />
                  </motion.div>

                  <motion.button
                    type="button"
                    className="rts-btn btn-primary bg-transparent"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("cancel")}
                  </motion.button>
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

export default page;
