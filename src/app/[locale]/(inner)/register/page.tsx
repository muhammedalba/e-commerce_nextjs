"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import HeaderOne from "@/components/header/HeaderOne";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import axios from "@/lib/axios";

export default function Register() {
  const  t  = useTranslations("Register");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("requiredName")),
      email: Yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
      password: Yup.string()
        .min(6, t("shortPassword"))
        .required(t("requiredPassword")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("passwordMismatch"))
        .required(t("requiredConfirmPassword")),
      avatar: Yup.mixed()
        .test("fileType", t("invalidAvatarType"), (value) =>
          value instanceof File
            ? ["image/jpeg", "image/png", "image/webp"].includes(value.type)
            : true
        )
        .nullable(),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.avatar) formData.append("avatar", values.avatar);
      mutate(formData);
    },
  });

  const handleAvatarChange = (file: File) => {
    formik.setFieldValue("avatar", file);
    setAvatarLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setAvatarLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleAvatarChange(file);
    }
  };

  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">home</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="/register">
                  {t("title")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="registration-wrapper-1 text-center">
                <div className="mb-4">
                  {avatarLoading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <img
                      src={avatarPreview || "/assets/images/logo/fav.png"}
                      alt="avatar"
                      width={160}
                      height={160}
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #ccc",
                      }}
                    />
                  )}
                </div>

                <h3 className="title">{t("title")}</h3>

                <form
                  onSubmit={formik.handleSubmit}
                  className="registration-form mt-4 text-start"
                >
                  <div className="input-wrapper mb-3">
                    <label htmlFor="name">{t("name")}*</label>
                    <input
                      id="name"
                      type="text"
                      {...formik.getFieldProps("name")}
                      className="form-control"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger mt-1">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="email">{t("email")}*</label>
                    <input
                      id="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      className="form-control"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="password">{t("password")}*</label>
                    <input
                      id="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                      className="form-control"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger mt-1">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="confirmPassword">
                      {t("confirmPassword")}*
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...formik.getFieldProps("confirmPassword")}
                      className="form-control"
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-danger mt-1">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>

                  <div
                    className={" text-center mb-4 p-5"}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    style={{
                      border: "2px dashed #ccc",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document
                        .querySelector<HTMLInputElement>("#avatar")
                        ?.click()
                    }
                  >
                    <p className=" m-0" style={{ color: "#555" }}>
                      {t("avatarUpload")}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      className="d-none"
                      placeholder={t("avatarUpload")}
                      title={t("avatarUpload")}
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                          handleAvatarChange(file);
                        }
                      }}
                    />
                  </div>

                  <button
                    className="rts-btn btn-primary w-100"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? t("loadingRegister") : t("register")}
                  </button>

                  {isSuccess && (
                    <p className="text-success mt-3">{t("successRegister")}</p>
                  )}
                  {isError && (
                    <p className="text-danger mt-3">
                      {(error as any)?.response?.data?.message ||
                        t("errorRegister")}
                    </p>
                  )}

                  <div className="another-way-to-registration mt-4 text-center">
                    <div className="registradion-top-text">
                      <span>{t("orRegisterWith")}</span>
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
                      {t("haveAccount")} <a href="/login">{t("goLogin")}</a>
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
