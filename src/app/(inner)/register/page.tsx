"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import HeaderOne from "@/components/header/HeaderOne";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import axios from "@/lib/axios";

export default function Register() {
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
      name: Yup.string().required("الاسم مطلوب"),
      email: Yup.string().email("بريد غير صالح").required("البريد مطلوب"),
      password: Yup.string()
        .min(6, "كلمة المرور قصيرة")
        .required("كلمة المرور مطلوبة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
        .required("تأكيد كلمة المرور مطلوب"),
      avatar: Yup.mixed()
        .test("fileType", "الملف يجب أن يكون صورة", (value) =>
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
                <a href="/">الرئيسية</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="/register">
                  التسجيل
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
                      src={avatarPreview || "assets/images/logo/fav.png"}
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

                <h3 className="title">إنشاء حساب جديد</h3>

                <form onSubmit={formik.handleSubmit} className="registration-form mt-4 text-start">
                  <div className="input-wrapper mb-3">
                    <label htmlFor="name">الاسم الكامل*</label>
                    <input
                      id="name"
                      type="text"
                      {...formik.getFieldProps("name")}
                      className="form-control"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger mt-1">{formik.errors.name}</div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="email">البريد الإلكتروني*</label>
                    <input
                      id="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      className="form-control"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger mt-1">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="password">كلمة المرور*</label>
                    <input
                      id="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                      className="form-control"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger mt-1">{formik.errors.password}</div>
                    )}
                  </div>

                  <div className="input-wrapper mb-3">
                    <label htmlFor="confirmPassword">تأكيد كلمة المرور*</label>
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
                    className={' text-center mb-4 p-5   '}
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
                      document.querySelector<HTMLInputElement>("#avatar")?.click()
                    }
                  >
                    <p className=" m-0" style={{ color: "#555" }}>
                      اسحب الصورة هنا أو انقر لاختيار صورة من الجهاز
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      className="d-none"
                      title="اختر صورة للملف الشخصي"
                      placeholder="اختر صورة للملف الشخصي"
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
                    {isPending ? "جارٍ التسجيل..." : "تسجيل حساب"}
                  </button>

                  {isSuccess && (
                    <p className="text-success mt-3">تم التسجيل بنجاح!</p>
                  )}
                  {isError && (
                    <p className="text-danger mt-3">
                      {(error as any)?.response?.data?.message ||
                        "حدث خطأ أثناء التسجيل"}
                    </p>
                  )}

                  <div className="another-way-to-registration mt-4 text-center">
                    <div className="registradion-top-text">
                      <span>أو سجل عبر</span>
                    </div>
                    <div className="login-with-brand d-flex justify-content-center gap-3 mt-3">
                      <a href="#" className="single">
                        <img src="assets/images/form/google.svg" alt="Google" />
                      </a>
                      <a href="#" className="single">
                        <img src="assets/images/form/facebook.svg" alt="Facebook" />
                      </a>
                    </div>
                    <p className="mt-3">
                      لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
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
