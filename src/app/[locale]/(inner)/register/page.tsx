"use client";
import { useTranslations } from "next-intl";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

import HeaderOne from "@/components/header/HeaderOne";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export default function Register() {
  const t = useTranslations("Auth");
  const Breadcrumbs = [
    { label: t("register.title"), href: "/register", active: true },
  ];
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required(t("Validation.requiredName")) // مثلاً: "الاسم مطلوب"
      .min(6, t("Validation.shortName")) // بدل "short" غير واضح، تصبح: "الاسم قصير جدًا"
      .max(32, t("Validation.longName")), // بدل "long": "الاسم طويل جدًا"
    email: Yup.string()
      .email(t("Validation.invalidEmail")) // "البريد الإلكتروني غير صالح"
      .required(t("Validation.requiredEmail")), // "البريد الإلكتروني مطلوب"
    password: Yup.string()
      .min(6, t("Validation.shortPassword")) // "كلمة المرور قصيرة جدًا"
      .max(32, t("Validation.longPassword")) // "كلمة المرور طويلة جدًا"
      .required(t("Validation.requiredPassword")), // "كلمة المرور مطلوبة"
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("Validation.passwordMismatch")) // "تأكيد كلمة المرور لا يطابق"
      .required(t("Validation.requiredConfirmPassword")), // "تأكيد كلمة المرور مطلوب"
    avatar: Yup.mixed<File>()
      .test("fileType", t("Validation.invalidAvatarType"), (value) =>
        value instanceof File
          ? ["image/jpeg", "image/png", "image/webp"].includes(value.type)
          : value === null
      )
      .nullable()
      .default(null),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      if (data.avatar) formData.append("avatar", data.avatar);
      const res = await axios.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });

  const handleAvatarChange = (file: File) => {
    setValue("avatar", file, { shouldValidate: true });
    setAvatarLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setAvatarLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      handleAvatarChange(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  return (
    <div className="demo-one">
      <HeaderOne />
      <NavigationArea breadcrumbs={Breadcrumbs} />

      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="registration-wrapper-1 text-center">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={"/assets/images/logo/fav.png"}
                    alt="avatar"
                    width={160}
                    height={160}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                    }}
                  />
                  <h3 className="title mb-4">{t("register.title")}</h3>
                </div>

                <form
                  onSubmit={handleSubmit((data) => mutate(data))}
                  className="registration-form mt-4 text-start"
                >
                  <div className="input-wrapper mb-3">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-regular fa-user" />
                      <label htmlFor="name">{t("name")}*</label>
                    </div>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="form-control"
                    />
                    {errors.name && (
                      <div className="text-danger mt-1">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-regular fa-envelope" />
                      <label htmlFor="email">{t("email")}*</label>
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="form-control"
                    />
                    {errors.email && (
                      <div className="text-danger mt-1">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-solid fa-lock" />
                      <label htmlFor="password">{t("password")}*</label>
                    </div>
                    <input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="form-control"
                    />
                    {errors.password && (
                      <div className="text-danger mt-1">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-solid fa-lock-keyhole" />
                      <label htmlFor="confirmPassword">
                        {t("confirmPassword")}*
                      </label>
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className="form-control"
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger mt-1">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>

                  {/* ✅ Dropzone for Avatar */}
                  <div
                    {...getRootProps()}
                    className="text-center mb-4 p-4"
                    style={{
                      border: "2px dashed #ccc",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
                    }}
                  >
                    <input {...getInputProps()} />
                    {avatarLoading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : avatarPreview ? (
                      <>
                        <img
                          src={avatarPreview}
                          alt="avatar preview"
                          width={300}
                          height={160}
                        />
                      </>
                    ) : (
                      <p className="m-0" style={{ color: "#555" }}>
                        {t("register.uploadAvatar")}
                      </p>
                    )}

                    {errors.avatar && (
                      <div className="text-danger mt-2">
                        {errors?.avatar?.message}
                      </div>
                    )}
                  </div>
                  {avatarPreview && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger d-block mx-auto my-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarPreview(null);
                        setValue("avatar", null, { shouldValidate: true });
                      }}
                    >
                      <i className="fa-regular fa-xmark" />
                      {t("register.removeAvatar") }
                    </button>
                  )}
                  <button
                    className="rts-btn btn-primary w-100"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending
                      ? t("register.loadingRegister")
                      : t("register.title")}
                  </button>

                  {isSuccess && (
                    <p className="text-success mt-3">
                      {t("register.successRegister")}
                    </p>
                  )}
                  {isError && (
                    <p className="text-danger mt-3">
                      {(error as any)?.response?.data?.message ||
                        t("register.errorRegister")}
                    </p>
                  )}

                  <div className="another-way-to-registration mt-4 text-center">
                    <div className="registradion-top-text">
                      <span>{t("register.orRegisterWith")}</span>
                    </div>
                    <div className="login-with-brand d-flex justify-content-center gap-3 mt-3">
                      <a href="#" className="single">
                        <img
                          src="/assets/images/form/google.svg"
                          alt="Google"
                        />
                      </a>
                      <a href="#" className="single">
                        <img
                          src="/assets/images/form/facebook.svg"
                          alt="Facebook"
                        />
                      </a>
                    </div>
                    <p className="mt-3">
                      {t("register.haveAccount")}{" "}
                      <a href="/login">{t("register.goLogin")}</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShortService />
      <FooterOne />
    </div>
  );
}
