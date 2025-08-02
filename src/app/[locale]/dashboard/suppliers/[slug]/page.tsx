"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormInput from "@/components/forms/FormInput";
import ImageDropzone from "@/lib/utils/ImageDropzone";
import SubmitButton from "@/components/forms/SubmitButton";
import InputError from "@/components/common/InputError";
import {
  SupplierFormData,
  supplierSchema,
} from "@/schemas/dashboard/supplierSchema";
import { useGetSupplier, useUpdateSupplier } from "@/lib/API/hooks/useSupplier";

export default function page() {
  const t = useTranslations("Supplier");
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const {
    data: SupplierData,
    isLoading,
    error: errorSupplier,
  } = useGetSupplier(slug);

  const {
    mutate: updateSupplier,
    isPending,
    error,
    isSuccess,
  } = useUpdateSupplier();

  const schema = useMemo(() => supplierSchema(t), [t]);

  const {
    register,
    reset,
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
  useEffect(() => {
    if (SupplierData) {
      reset({
        name: SupplierData.data?.name,
        avatar: null,
        email: SupplierData.data?.email,
        address: SupplierData.data?.address,
        contactName: SupplierData.data?.contactName,
        website: SupplierData.data?.website,
        status: SupplierData.data?.status === "active" ? "active" : "inactive",
        phone: SupplierData.data?.phone,
      });
      setAvatarPreview(SupplierData.data?.avatar || null);
    }
    if (errorSupplier) {
      toast.error(errorSupplier.message);
    }
  }, [SupplierData, reset]);

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
      if (SupplierData?.data?._id) {
        updateSupplier(
          { id: SupplierData?.data?._id, formData },
          {
            onSuccess(data) {
              toast.success(data.message);
              router.replace("/dashboard/suppliers");
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
      }
    },
    [updateSupplier, router, t, SupplierData]
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
                <h6 className="title fs-1">
                  {t("editTitle")}
                  {SupplierData?.data?.name || ""}
                </h6>
                <p>{t("editSupplierSubtitle")}</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="registration-form mt-4"
              >
                <div className=" d-flex flex-wrap align-items-center gap-3 justify-content-between">
                  <div className="flex-grow-1">
                    <FormInput
                      isLoading={isLoading}
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
                      isLoading={isLoading}
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
                  isLoading={isLoading}
                  id="email"
                  type="email"
                  label={`${t("TableRowData.email")}`}
                  iconClass="fa-regular fa-envelope"
                  register={register("email")}
                  error={errors.email?.message}
                />

                <FormInput
                  isLoading={isLoading}
                  id="phone"
                  type="text"
                  label={`${t("TableRowData.phone")}`}
                  iconClass="fa-regular fa-phone"
                  register={register("phone")}
                  error={errors.phone?.message}
                />

                <FormInput
                  isLoading={isLoading}
                  id="address"
                  type="text"
                  label={`${t("TableRowData.address")}`}
                  iconClass="fa-regular fa-location-dot"
                  register={register("address")}
                  error={errors.address?.message}
                />
                <FormInput
                  isLoading={isLoading}
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
                        label={t("status.label")}
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
                  loading={isPending || isSuccess || isLoading}
                  label={t("editSupplier")}
                  loadingLabel={t("loadingUpdate")}
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
