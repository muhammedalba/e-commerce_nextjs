"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { motion } from "framer-motion";
import FormInput from "@/components/forms/FormInput";
import ImageDropzone from "@/lib/utils/ImageDropzone";
import SubmitButton from "@/components/forms/SubmitButton";
import InputError from "@/components/common/InputError";
import {
  SupplierFormData,
  supplierSchema,
} from "@/schemas/dashboard/supplierSchema";
import { useCreateSupplier } from "@/lib/abi/hooks/useSupplier";

export default function page() {
  const t = useTranslations("Supplier");
  const router = useRouter();
  const {
    mutate: createSupplier,
    isPending,
    error,
    isSuccess,
  } = useCreateSupplier();

  const schema = useMemo(() => supplierSchema(t), [t]);
  console.log(error);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      contactName: "",
      website: "",
      status: "active",
      phone: "",
      avatar: null,
    },
  });

  const onSubmit = useCallback(
    (values: SupplierFormData) => {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("email", values.email);
      formData.append("address", values.address);
      if (values.contactName)
        formData.append("contactName", values.contactName);
      formData.append("website", values.website);
      formData.append("status", values.status);
      formData.append("phone", values.phone);
      if (values.avatar) formData.append("avatar", values.avatar);

      createSupplier(formData, {
        onSuccess(data) {
          toast.success(data.message);
          router.replace("/dashboard/suppliers");
          console.log(data);
        },
        onError(err) {
          const message = err.message || t("error");
          const messages = message.split(",");
          messages.forEach((msg) => {
            if (msg.trim()) toast.error(msg.trim());
          });
        },
      });
    },
    [createSupplier, router, t]
  );

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (file) {
        setValue("avatar", file, { shouldValidate: true });
      } else {
        setValue("avatar", null, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  return (
    <div className="body-root-inner">
      <div className="transection">
        <div className="vendor-list-main-wrapper product-wrapper add-product-page">
          <div className="card-body table-product-select">
            <div className="header-two show right-collups-add-product">
              <div className="right-collups-area-top my-5">
                <h6 className="title fs-1" >
                  {t("addSupplier")}
                </h6>
                <p>{t("addSupplierSubtitle")}</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="registration-form mt-4"
              >
                <div className=" d-flex flex-wrap align-items-center gap-3 justify-content-between">
                  <div className="flex-grow-1">
                    <FormInput
                      id="name"
                      type="text"
                      label={`${t("name")}`}
                      iconClass="fa-regular fa-user"
                      register={register("name")}
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <FormInput
                      id="contactName"
                      type="text"
                      label={`${t("TableRowData.contactName")}`}
                      iconClass="fa-regular fa-user"
                      register={register("contactName")}
                      error={errors.contactName?.message}
                    />
                  </div>
                </div>

                <FormInput
                  id="email"
                  type="email"
                  label={`${t("TableRowData.email")}`}
                  iconClass="fa-regular fa-envelope"
                  register={register("email")}
                  error={errors.email?.message}
                />

                <FormInput
                  id="phone"
                  type="text"
                  label={`${t("TableRowData.phone")}`}
                  iconClass="fa-regular fa-phone"
                  register={register("phone")}
                  error={errors.phone?.message}
                />

                <FormInput
                  id="address"
                  type="text"
                  label={`${t("TableRowData.address")}`}
                  iconClass="fa-regular fa-location-dot"
                  register={register("address")}
                  error={errors.address?.message}
                />
                <FormInput
                  id="website"
                  type="url"
                  label={`${t("TableRowData.website")}`}
                  iconClass="fa-solid fa-globe"
                  register={register("website")}
                  error={errors.website?.message}
                />
                <div className="d-flex m-2">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="status-label"
                        label={t('status.label')}
                        {...field} 
                      >
                        <MenuItem value="active">{t("status.active")}</MenuItem>
                        <MenuItem value="inactive">
                          {t("status.inactive")}
                        </MenuItem>
                      </Select>
                    )}
                  />
                </div>

                <ImageDropzone
                  error={errors.avatar?.message as string}
                  preview={avatarPreview}
                  setPreview={setAvatarPreview}
                  onFileSelect={handleFileSelect}
                  label={t("uploadAvatar")}
                  removeLabel={t("removeAvatar")}
                />

                <SubmitButton
                  loading={isPending || isSuccess}
                  label={t("addSupplier")}
                  loadingLabel={t("loadingAddSupplier")}
                  className="rts-btn btn-primary my-3 w-100"
                />

                <InputError
                  id="form-error"
                  message={error ? error.message : undefined}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
