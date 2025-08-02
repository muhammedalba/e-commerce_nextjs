"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import ImageDropzone from "@/lib/utils/ImageDropzone";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";
import Link from "next/link";
import { motion } from "framer-motion";
import InputError from "@/components/common/InputError";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import {
  CarouselFormData,
  carouselSchema,
} from "@/schemas/dashboard/carouselSchema";
import { CarouselResponse } from "@/types/carousel";
import { InputLabel, MenuItem } from "@mui/material";

interface CarouselFormProps {
  initialData?: CarouselResponse;
  formType: "create" | "update";
  onCreate: (
    formData: FormData,
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    }
  ) => void;
  onUpdate: (
    args: { id: string; formData: FormData },
    options?: {
      onSuccess?: (data: any) => void;
      onError?: (error: any) => void;
    }
  ) => void;
  isPending: boolean;
  isLoading: boolean;
  t: any;
}

const CarouselForm: React.FC<CarouselFormProps> = ({
  initialData,
  onUpdate,
  onCreate,
  isPending,
  isLoading,
  t,
  formType,
}) => {
  const router = useRouter();
  const isEdit = formType === "update";
  const schema = useMemo(() => carouselSchema(t, isEdit), [t]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: {
        ar: initialData?.data?.description.ar || "",
        en: initialData?.data?.description.en || "",
      },
      isActive: initialData?.data?.isActive || false,
      carouselSm: null,
      carouselMd: null,
      carouselLg: null,
    },
  });

  const handleFormSubmit = useCallback(
    (values: CarouselFormData) => {
      const formData = new FormData();
      formData.append("description[ar]", values.description.ar || "");
      formData.append("description[en]", values.description.en || "");
      formData.append("isActive", values.isActive.toString() || "false");

      if (values.carouselSm) formData.append("carouselSm", values.carouselSm);
      if (values.carouselMd) formData.append("carouselMd", values.carouselMd);
      if (values.carouselLg) formData.append("carouselLg", values.carouselLg);

      const commonOptions = {
        onSuccess(data: any) {
          toast.success(data?.message || t("success"));
          router.push("/dashboard/carousel");
        },
        onError(err: any) {
          const message = err.message || t("error");
          message.split(",").forEach((msg: string) => toast.error(msg.trim()));
        },
      };

      if (formType === "update" && initialData?.data._id) {
        onUpdate({ id: initialData.data._id, formData }, commonOptions);
      } else {
        onCreate(formData, commonOptions);
      }
    },
    [onUpdate, onCreate, formType, initialData, router, t]
  );

  const handleFileSelect = useCallback(
    (file: File | null, name: "carouselSm" | "carouselMd" | "carouselLg") => {
      setValue(name, file ?? null, { shouldValidate: true });
    },
    [setValue]
  );

  const [previewSm, setPreviewSm] = useState<string | null>(
    initialData?.data?.carouselSm || null
  );
  const [previewMd, setPreviewMd] = useState<string | null>(
    initialData?.data?.carouselMd || null
  );
  const [previewLg, setPreviewLg] = useState<string | null>(
    initialData?.data?.carouselLg || null
  );

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
                  {formType === "create"
                    ? t("addCarousel")
                    : t("updateCarousel")}
                </motion.h6>
                <motion.p variants={itemVariants}>
                  {formType === "create"
                    ? t("addCarouselSubtitle")
                    : t("updateCarouselSubtitle")}
                </motion.p>
              </div>

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="input-main-wrapper"
              >
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    isLoading={isLoading}
                    id="description.ar"
                    label={t("descriptionAr")}
                    iconClass="fa-solid fa-pencil"
                    register={register("description.ar")}
                    error={errors.description?.ar?.message}
                  />
                </motion.div>
                <motion.div className="single-input" variants={itemVariants}>
                  <FormInput
                    isLoading={isLoading}
                    id="description.en"
                    label={t("descriptionEn")}
                    iconClass="fa-solid fa-pencil"
                    register={register("description.en")}
                    error={errors.description?.en?.message}
                  />
                </motion.div>
                <motion.div className="single-input" variants={itemVariants}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("activeLabel")}
                    </InputLabel>

                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId="status-label"
                          label={t("activeLabel")}
                          value={(field.value ?? false).toString()}
                          onChange={(e) =>
                            field.onChange(e.target.value === "true")
                          }
                        >
                          <MenuItem value={"true"}>{t("active")}</MenuItem>
                          <MenuItem value={"false"}>{t("inactive")}</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </motion.div>
                <motion.div className="single-input" variants={imageVariants}>
                  <ImageDropzone
                    error={errors.carouselSm?.message as string}
                    preview={previewSm}
                    setPreview={setPreviewSm}
                    onFileSelect={(file) =>
                      handleFileSelect(file, "carouselSm")
                    }
                    label={t("uploadImageSm")}
                    removeLabel={t("removeImage")}
                  />
                </motion.div>

                <motion.div className="single-input" variants={imageVariants}>
                  <ImageDropzone
                    error={errors.carouselMd?.message as string}
                    preview={previewMd}
                    setPreview={setPreviewMd}
                    onFileSelect={(file) =>
                      handleFileSelect(file, "carouselMd")
                    }
                    label={t("uploadImageMd")}
                    removeLabel={t("removeImage")}
                  />
                </motion.div>

                <motion.div className="single-input" variants={imageVariants}>
                  <ImageDropzone
                    error={errors.carouselLg?.message as string}
                    preview={previewLg}
                    setPreview={setPreviewLg}
                    onFileSelect={(file) =>
                      handleFileSelect(file, "carouselLg")
                    }
                    label={t("uploadImageLg")}
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
                      loading={isPending}
                      label={
                        formType === "create"
                          ? t("addCarousel")
                          : t("updateCarousel")
                      }
                      loadingLabel={
                        formType === "create"
                          ? t("loadingAddCarousel")
                          : t("loadingUpdateCarousel")
                      }
                      className="rts-btn btn-primary mb-0"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/dashboard/carousel"
                      className="rts-btn btn-danger rounded rounded-5 mb-0"
                    >
                      {t("cancel")}
                    </Link>
                  </motion.div>
                </motion.div>
                <InputError
                  id="form-error"
                  className="text-center fs-3 "
                  message={errors.root?.message ?? undefined}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselForm;
