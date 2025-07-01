"use client";

import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import InputError from "../common/InputError";

import Link from "next/link";
import { registerSchema } from "@/schemas/registerSchema";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "@/lib/axios";

export default function RegisterForm() {
  const t = useTranslations("Auth");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const router = useRouter();

  const schema = registerSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
      console.log(res.data);

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
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="registration-form mt-4 "
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
        <InputError message={errors.name?.message} />
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
        <InputError message={errors.email?.message} />
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
        <InputError message={errors.password?.message} />
      </div>

      <div className="input-wrapper mb-3">
        <div className="d-flex gap-2 align-items-center mb-4">
          <i className="fa-solid fa-lock-keyhole" />
          <label htmlFor="confirmPassword">{t("confirmPassword")}*</label>
        </div>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="form-control"
        />
        <InputError message={errors.confirmPassword?.message} />
      </div>

      {/* ✅ Dropzone for Avatar */}
      <div
        {...getRootProps()}
        className=" mb-4 p-4"
        style={{
          border: "2px dashed #ccc",
          borderRadius: "12px",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#f5f5f5" : "transparent",
        }}
      >
        <input {...getInputProps()} />
        {avatarLoading ? (
          <div className="spinner-border text-primary" role="status">
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
        <InputError
          message={
            typeof errors?.avatar === "object" && errors?.avatar !== null
              ? (errors.avatar as { message?: string }).message
              : undefined
          }
        />
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
          {t("register.removeAvatar")}
        </button>
      )}
      <button
        className="rts-btn btn-primary w-100"
        type="submit"
        disabled={isPending}
      >
        {isPending ? t("register.loadingRegister") : t("register.title")}
      </button>

      {isSuccess && (
        <p className="text-success mt-3">{t("register.successRegister")}</p>
      )}
      <InputError
        message={(error as any)?.data?.message}
      />

      <div className="another-way-to-registration mt-4 text-center">
        <div className="registradion-top-text">
          <span>{t("register.orRegisterWith")}</span>
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
        <p className="mt-3">
          {t("register.haveAccount")}{" "}
          <a href="/login">{t("register.goLogin")}</a>
        </p>
      </div>
    </form>
  );
}
