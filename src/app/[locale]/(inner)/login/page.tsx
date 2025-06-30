"use client";

import { useTranslations } from "next-intl";
import { useLogin } from "@/hooks/useLogin";
import Cookies from "js-cookie";
import HeaderOne from "@/components/header/HeaderOne";
import NavigationArea from "@/components/NavigationBreadcrumb/NavigationBreadcrumb";
import FooterOne from "@/components/footer/FooterOne";
import ShortService from "@/components/service/ShortService";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Home() {
  const t = useTranslations("Auth");
  const { mutate: login, isPending, error } = useLogin();

  const Breadcrumbs = [
    { label: t("login.title"), href: "/login", active: true },
  ];

  // ✅ Schema التحقق
  const schema = Yup.object({
    email: Yup.string()
        .email(t("Validation.invalidEmail")) // "البريد الإلكتروني غير صالح"
        .required(t("Validation.requiredEmail")), // "البريد الإلكتروني مطلوب"
      password: Yup.string()
        .min(6, t("Validation.shortPassword")) // "كلمة المرور قصيرة جدًا"
        .max(32, t("Validation.longPassword")) // "كلمة المرور طويلة جدًا"
        .required(t("Validation.requiredPassword")),
  });

  // ✅ استخدام useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    login(values, {
      onSuccess(data) {
        Cookies.set("accessToken", "your_token", { expires: 7 });
        console.log("تم تسجيل الدخول بنجاح", data);
      },
      onError(err) {
        console.error("خطأ في تسجيل الدخول", err.message);
      },
    });
  };

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
                <h3 className="title text-center">{t("login.title")}</h3>

                {/* ✅ استخدام handleSubmit من RHF */}
                <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
                  
                  <div className="input-wrapper">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-light fa-envelope" />
                      <label htmlFor="email">{t("email")}*</label>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder={t("email")}
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email.message}</div>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <div className="d-flex gap-2 align-items-center mb-4">
                      <i className="fa-light fa-lock" />
                      <label htmlFor="password">{t("password")}*</label>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder={t("password")}
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password.message}</div>
                    )}
                  </div>

                  <button
                    className="rts-btn btn-primary"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? t("login.loadingLogin") : t("login.title")}
                  </button>

                  <div className="another-way-to-registration">
                    <div className="registradion-top-text">
                      <span>{t("login.orLoginWith")}</span>
                    </div>
                    <div className="login-with-brand">
                      <a href="#" className="single">
                        <img src="/assets/images/form/google.svg" alt="login" />
                      </a>
                      <a href="#" className="single">
                        <img src="/assets/images/form/facebook.svg" alt="login" />
                      </a>
                    </div>
                    <div className="d-flex flex-column">
                      <p className="pb-2 mb-1">
                        {t("login.dontHaveAccount")}{" "}
                        <a href="/register">{t("login.goRegister")}</a>
                      </p>
                      <p className="mt-0">
                        {t("login.forgotPassword")}{" "}
                        <a href="/register">{t("login.forgotPassword")}</a>
                      </p>
                    </div>
                  </div>

                  {error && (
                    <p className="login-error-message text-danger w-100">
                      {error.message || t("login.errorLogin")}
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
