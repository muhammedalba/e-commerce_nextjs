"use client";

import { useTranslations } from "next-intl";
import { useLogin } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import InputError from "../common/InputError";
import { loginSchema } from "@/schemas/loginSchema";
import Link from "next/link";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import SocialAuthButtons from "./SocialAuthButtons";

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
      <FormInput
        id="email"
        type="email"
        label={`${t("email")}*`}
        iconClass="fa-light fa-envelope"
        register={register("email")}
        error={errors.email?.message}
      />
      <FormInput
        id="password"
        type="password"
        label={`${t("password")}*`}
        iconClass="fa-light fa-lock"
        register={register("password")}
        error={errors.password?.message}
      />

      <SubmitButton
        loading={isPending || isSuccess}
        label={t("login.title")}
        loadingLabel={t("login.loadingLogin")}
        className="rts-btn btn-primary my-3 w-100"
      />
      <InputError id="form-error" message={error ? error.message : undefined} />

      {/* تسجيل بطرق أخرى */}
      <motion.div
        className="input-wrapper mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
      >
        <SocialAuthButtons
          title={t("login.orLoginWith")}
          haveAccountText={t("login.dontHaveAccount")}
          goLoginText={t("login.goRegister")}
          forgotPassword={t("login.forgotPassword")}
          forgetText={t("login.resetLink")}
          forgetLink='forgotPassword'
          authLink="register"
        />
      </motion.div>
    </form>
  );
}
