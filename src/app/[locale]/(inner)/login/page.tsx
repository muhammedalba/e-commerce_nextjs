"use client";

import { useTranslations } from "next-intl";
import { useLogin } from "@/hooks/useLogin";
import Cookies from "js-cookie";
import * as Yup from "yup";
import HeaderOne from "@/components/header/HeaderOne";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import { useFormik } from "formik";

export default function Home() {
  const { mutate: login, isPending, error } = useLogin();

  const t = useTranslations("Auth");
  const Breadcrumbs = [
    { label: t("login"), href: "/login", active: true },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidEmail")).required(t("requiredEmail")),
      password: Yup.string()
        .min(6, t("shortPassword"))
        .max(32, t("longPassword"))
        .required(t("requiredPassword")),
    }),
    onSubmit: (values) => {
      login(values, {
        onSuccess(data) {
          Cookies.set("accessToken", "your_token", { expires: 7 }); 
          console.log("تم تسجيل الدخول بنجاح", data);
        },
        onError(err) {
          console.error("خطأ في تسجيل الدخول", err.message);
        },
      });
    },
  });

  return (
    <div className="demo-one">
      <HeaderOne />
      <NavigationArea breadcrumbs={Breadcrumbs} />

      <div className="bg_light-1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="registration-wrapper-1">
                <div className="logo-area mb--0 text-center">
                  <img
                    className="mb--10"
                    src="/assets/images/logo/fav.png"
                    alt="logo"
                  />
                </div>
                <h3 className="title text-center">{t("title")}</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="registration-form"
                >
                  <div className="input-wrapper">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-light fa-envelope" />
                      <label className="" htmlFor="email">
                        {t("email")}*
                      </label>
                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("email")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-light fa-lock" />
                      <label htmlFor="password">{t("password")}*</label>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t("password")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <button
                    className="rts-btn btn-primary"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? t("loadingLogin") : t("login")}
                  </button>

                  <div className="another-way-to-registration">
                    <div className="registradion-top-text">
                      <span>{t("orRegisterWith")}</span>
                    </div>
                    <div className="login-with-brand">
                      <a href="#" className="single">
                        <img src="/assets/images/form/google.svg" alt="login" />
                      </a>
                      <a href="#" className="single">
                        <img
                          src="/assets/images/form/facebook.svg"
                          alt="login"
                        />
                      </a>
                    </div>
                    <div className="d-flex flex-column">
                      <p className="pb-2 mb-1">
                        {t("dontHaveAccount")}{" "}
                        <a href="/register">{t("goRegister")}</a>
                      </p>
                      <p className="mt-0">
                        {t("forgotPassword")}{" "}
                        <a href="/register">{t("forgotPassword")}</a>
                      </p>
                    </div>
                  </div>

                  {error && (
                    <p className="login-error-message text-danger w-100 ">
                      {error.message || t("errorLogin")}
                    </p>
                  )}
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
