"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  RegisterFormData,
  registerSchema,
} from "@/schemas/Auth/registerSchema";
import { useRegister } from "@/lib/API/hooks/useAuth";
import FormInput from "../FormInput";
import SubmitButton from "../SubmitButton";
import ImageDropzone from "../../../lib/utils/ImageDropzone";
import InputError from "../../common/InputError";
import { motion } from "framer-motion";
import SocialAuthButtons from "./SocialAuthButtons";

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { mutate: Register, isPending, error, isSuccess } = useRegister();

  const schema = useMemo(() => registerSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
  });

  const onSubmit = useCallback(
    (values: RegisterFormData) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      if (values.avatar) formData.append("avatar", values.avatar);

      Register(formData, {
        onSuccess(data) {
          toast.success(data.message);
          localStorage.setItem("name", data.data.name);
          localStorage.setItem("avatar", data.data.avatar);
          router.replace("/");
        },
        onError(err) {
          const message = err.message || t("register.error");
          const messages = message.split(",");
          messages.forEach((msg) => {
            if (msg.trim()) toast.error(msg.trim());
          });
        },
      });
    },
    [Register, router, t]
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
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form mt-4">
      <FormInput
        id="name"
        type="text"
        label={`${t("name")}*`}
        iconClass="fa-regular fa-user"
        register={register("name")}
        error={errors.name?.message}
      />

      <FormInput
        id="email"
        type="email"
        label={`${t("email")}*`}
        iconClass="fa-regular fa-envelope"
        register={register("email")}
        error={errors.email?.message}
      />

      <FormInput
        id="password"
        type="password"
        label={`${t("password")}*`}
        iconClass="fa-solid fa-lock"
        register={register("password")}
        error={errors.password?.message}
      />

      <FormInput
        id="confirmPassword"
        type="password"
        label={`${t("confirmPassword")}*`}
        iconClass="fa-solid fa-lock-keyhole"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <ImageDropzone
        error={errors.avatar?.message as string}
        preview={avatarPreview}
        setPreview={setAvatarPreview}
        onFileSelect={handleFileSelect}
        label={t("register.uploadAvatar")}
        removeLabel={t("register.removeAvatar")}
      />

      <SubmitButton
        loading={isPending || isSuccess}
        label={t("register.title")}
        loadingLabel={t("register.loadingRegister")}
        className="rts-btn btn-primary my-3 w-100"
      />

      <InputError id="form-error" message={error ? error.message : undefined} />

      <motion.div
        className="input-wrapper mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
      >
        <SocialAuthButtons
          title={t("register.orRegisterWith")}
          haveAccountText={t("register.haveAccount")}
          goLoginText={t("register.goLogin")}
          authLink="login"
        />
      </motion.div>
    </form>
  );
}
