"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import FormInput from "@/components/forms/FormInput";
import SubmitButton from "@/components/forms/SubmitButton";
import Link from "next/link";
import { motion } from "framer-motion";
import InputLabel from "@mui/material/InputLabel";
import InputError from "@/components/common/InputError";
import { useCreateSupCategory } from "@/lib/API/hooks/useSupCategories";
import { useGetAllCategories } from "@/lib/API/hooks/useCategories";
import {
  SupCategoryFormData,
  supCategorySchema,
} from "@/schemas/dashboard/supCategorySchema";

const AddSupCategoryPage = () => {
  const t = useTranslations("SupCategories");
  const router = useRouter();
  const schema = useMemo(() => supCategorySchema(t), [t]);
  const {
    data,
    isError,
    error: errorCate,
    isLoading,
  } = useGetAllCategories(1, 1000);

  const {
    mutate: CreateSupCategory,
    isPending,
    isSuccess,
    error,
  } = useCreateSupCategory();
  console.log(error, "error");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: {
        ar: "",
        en: "",
      },
      category: "",
    },
  });

  const onSubmit = useCallback(
    (values: SupCategoryFormData) => {
      console.log(values, "val");
      CreateSupCategory(values, {
        onSuccess(data) {
          toast.success(data?.message || t("success"));
          router.push("/dashboard/supCategories");
        },
        onError(err) {
          const message = err.message || t("error");
          message.split(",").forEach((msg) => toast.error(msg.trim()));
        },
      });
    },
    [CreateSupCategory, router, t]
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

  const MenuItems = data?.data.map((item) => {
    return (
      <MenuItem key={item.id} value={item.id}>
        {item.name}
      </MenuItem>
    );
  });

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
                <motion.h6 className="title fs-1" variants={itemVariants}>
                  {t("addSupCategory")}
                </motion.h6>
                <motion.p variants={itemVariants}>
                  {t("addSupCategorySubtitle")}
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
                <motion.div className="single-input" variants={itemVariants}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("TableRowData.categoryName")}
                    </InputLabel>

                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId="status-label"
                          label={t("TableRowData.categoryName")}
                          {...field}
                        >
                          {MenuItems}
                        </Select>
                      )}
                    />
                  </FormControl>
                </motion.div>
                <motion.div
                  className="button-area-botton-wrapper-p-list justify-content-between mt-5"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SubmitButton
                      loading={isPending || isSuccess}
                      label={t("addSupCategory")}
                      loadingLabel={t("loadingAddSupCategory")}
                      className="rts-btn btn-primary mb-0"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/dashboard/supCategories"
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

export default AddSupCategoryPage;
