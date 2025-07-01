"use client";

import { useTranslations } from "next-intl";
import { useLogin } from "@/hooks/useLogin";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import InputError from "../common/InputError";
import { loginSchema } from "@/schemas/loginSchema";
import Link from "next/link";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const { mutate: login, isPending, error, isSuccess } = useLogin();
  const router = useRouter();

  const schema = loginSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormData) => {
    login(values, {
      onSuccess(data) {
        toast.success(data.message);
        router.replace("/");
      },
      onError(err) {
        const message = err.message || t("login.errorLogin");
        toast.error(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      {/* 📨 حقل البريد */}
      <div className="input-wrapper">
        <div className="d-flex gap-2 align-items-center mb-4">
          <i className="fa-light fa-envelope" />
          <label htmlFor="email">{t("email")}*</label>
        </div>
        <input
          id="email"
          type="email"
          placeholder={t("email")}
          autoComplete="email"
          {...register("email")}
          autoFocus
        />
        <InputError message={errors.email?.message} />
      </div>

      {/* 🔒 حقل كلمة المرور */}
      <div className="input-wrapper">
        <div className="d-flex gap-2 align-items-center mb-4">
          <i className="fa-light fa-lock" />
          <label htmlFor="password">{t("password")}*</label>
        </div>
        <input
          id="password"
          type="password"
          placeholder={t("password")}
          autoComplete="current-password"
          {...register("password")}
        />
        <InputError message={errors.password?.message} />
      </div>

      {/* زر الدخول */}
      <button
        className="rts-btn btn-primary"
        type="submit"
        disabled={isPending || isSuccess}
      >
        {isPending ? (
          <>
            {t("login.loadingLogin")}
            <span className="spinner-border spinner-border-sm mx-4" />
          </>
        ) : (
          t("login.title")
        )}
      </button>

      {/* رسالة خطأ عامة */}
      {error && (
        <p className="login-error-message text-danger w-100 mt-4">
          {error.message || t("login.errorLogin")}
        </p>
      )}

      {/* تسجيل بطرق أخرى */}
      <div className="another-way-to-registration mt-4">
        <div className="registradion-top-text mb-2">
          <span>{t("login.orLoginWith")}</span>
        </div>
        <div className="login-with-brand d-flex gap-3 justify-content-center mb-3">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
            className="single"
            aria-label="Login with Google"
          >
            <img src="/assets/images/form/google.svg" alt="Google login" />
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/facebook`}
            className="single"
            aria-label="Login with Facebook"
          >
            <img src="/assets/images/form/facebook.svg" alt="Facebook login" />
          </Link>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className="mb-1">
            {t("login.dontHaveAccount")}{" "}
            <Link href="/register">{t("login.goRegister")}</Link>
          </p>
          <p>
            {t("login.forgotPassword")}{" "}
            <Link href="/forgot-password">{t("login.resetLink")}</Link>
          </p>
        </div>
      </div>
    </form>
  );
}
