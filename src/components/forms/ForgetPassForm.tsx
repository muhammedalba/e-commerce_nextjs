"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";

import InputError from "../common/InputError";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import MyStepper from "../common/MyStepper";

import {
  forgetPassSchema,
  verifyCodeSchema,
  resetPasswordSchema,
} from "@/schemas/forgetPassSchema";
import {
  useForgotPassword,
  useVerifyCode,
  useResetPassword,
} from "@/hooks/useAuth";

export default function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");

  const { mutate: forgotPassword, isPending: isSendingCode } =
    useForgotPassword();
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyCode();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const emailForm = useForm<z.infer<ReturnType<typeof forgetPassSchema>>>({
    resolver: zodResolver(forgetPassSchema(t)),
  });

  const codeForm = useForm<z.infer<ReturnType<typeof verifyCodeSchema>>>({
    resolver: zodResolver(verifyCodeSchema(t)),
  });

  const passwordForm = useForm<z.infer<ReturnType<typeof resetPasswordSchema>>>(
    {
      resolver: zodResolver(resetPasswordSchema(t)),
    }
  );

  const steps = [
    {
      form: emailForm,
      onSubmit: (values: any) =>
        forgotPassword(values, {
          onSuccess(data) {
            setEmail(values.email);
            toast.success(data.message);
            setActiveStep(1);
          },
          onError(err) {
            toast.error(err.message || t("login.errorLogin"));
          },
        }),
      fields: [
        {
          id: "email",
          name: "email",
          type: "email",
          label: `${t("email")}*`,
          iconClass: "fa-light fa-envelope",
        },
      ],
      button: {
        loading: isSendingCode,
        label: t("forgotPassword.sendCode"),
        loadingLabel: t("forgotPassword.codeSending"),
      },
    },
    {
      form: codeForm,
      onSubmit: (values: any) =>
        verifyCode(
          { resetCode: values.resetCode },
          {
            onSuccess(data) {
              toast.success(data.message);
              setActiveStep(2);
            },
            onError(err) {
              toast.error(err.message || t("login.errorLogin"));
            },
          }
        ),
      fields: [
        {
          id: "code",
          name: "resetCode",
          type: "text",
          label: t("forgotPassword.resetCode"),
          iconClass: "fa-light fa-key",
        },
      ],
      button: {
        loading: isVerifying,
        label: t("forgotPassword.verifyCode"),
        loadingLabel: t("forgotPassword.verifying"),
      },
    },
    {
      form: passwordForm,
      onSubmit: (values: any) =>
        resetPassword(
          { email, password: values.password },
          {
            onSuccess(data) {
              toast.success(data.message);
              router.replace("/login");
            },
            onError(err) {
              toast.error(err.message || t("login.errorLogin"));
            },
          }
        ),
      fields: [
        {
          id: "password",
          name: "password",
          type: "password",
          label: t("password"),
          iconClass: "fa-light fa-lock",
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          type: "password",
          label: t("confirmPassword"),
          iconClass: "fa-light fa-lock-check",
        },
      ],
      button: {
        loading: isResetting,
        label: t("forgotPassword.changePassword"),
        loadingLabel: t("forgotPassword.changingPassword"),
      },
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <>
      <MyStepper activeStep={activeStep} />
      <form
        onSubmit={currentStep.form.handleSubmit(currentStep.onSubmit)}
        className="registration-form mt-5"
      >
        {currentStep.fields.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            type={field.type}
            label={field.label}
            iconClass={field.iconClass}
            register={(currentStep.form.register as any)(field.name)}
            error={
              currentStep.form.formState.errors[
                field.name as keyof typeof currentStep.form.formState.errors
              ]?.message
            }
          />
        ))}

        <SubmitButton
          loading={currentStep.button.loading}
          label={currentStep.button.label}
          loadingLabel={currentStep.button.loadingLabel}
          className="rts-btn btn-primary my-3 w-100"
        />
      </form>
    </>
  );
}
