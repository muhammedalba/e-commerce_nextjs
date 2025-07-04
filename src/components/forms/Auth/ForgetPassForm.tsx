"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useForgotPassword,
  useVerifyCode,
  useResetPassword,
} from "@/hooks/useAuth";
import StepEmail from "./steps/StepEmail";
import StepCode from "./steps/StepCode";
import StepResetPassword from "./steps/StepResetPassword";
import MyStepper from "@/components/common/MyStepper";

export default function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate: forgotPassword, isPending: isSendingCode } = useForgotPassword();
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyCode();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const handleEmailSubmit = useCallback((data: { email: string }) => {
    forgotPassword(data, {
      onSuccess(data, variables) {
        setEmail(variables.email);
        toast.success(data.message);
        setStep(1);
        setError("");
      },
      onError(err) {
        setError(err.message || t("login.errorLogin"));
        toast.error(err.message || t("login.errorLogin"));
      },
    });
  }, [forgotPassword, t]);

  const handleCodeSubmit = useCallback((data: { resetCode: string }) => {
    verifyCode(
      { resetCode: data.resetCode },
      {
        onSuccess(data) {
          toast.success(data.message);
          setStep(2);
          setError("");
        },
        onError(err) {
          setError(err.message || t("login.errorLogin"));
          toast.error(err.message || t("login.errorLogin"));
        },
      }
    );
  }, [verifyCode, t]);

  const handleResetPassword = useCallback((data: { email: string; password: string }) => {
    resetPassword(
      { email: data.email, password: data.password },
      {
        onSuccess(data) {
          toast.success(data.message);
          router.replace("/login");
        },
        onError(err) {
          setError(err.message || t("login.errorLogin"));
          toast.error(err.message || t("login.errorLogin"));
        },
      }
    );
  }, [resetPassword, router, t]);

  const stepProps = useMemo(() => {
    return {
      0: {
        onSubmit: handleEmailSubmit,
        loading: isSendingCode,
        label: t("forgotPassword.sendCode"),
        loadingLabel: t("forgotPassword.codeSending"),
        error,
        emailLabel: `${t("email")}*`,
        t,
      },
      1: {
        onSubmit: handleCodeSubmit,
        loading: isVerifying,
        label: t("forgotPassword.verifyCode"),
        loadingLabel: t("forgotPassword.verifying"),
        error,
        codeLabel: t("forgotPassword.resetCode"),
        t,
      },
      2: {
        email,
        onSubmit: handleResetPassword,
        loading: isResetting,
        label: t("forgotPassword.changePassword"),
        loadingLabel: t("forgotPassword.changingPassword"),
        error,
        passwordLabel: t("password"),
        emailLabel: `${t("email")}*`,
        confirmPasswordLabel: t("confirmPassword"),
        t,
      },
    };
  }, [handleEmailSubmit, handleCodeSubmit, handleResetPassword, email, error, isSendingCode, isVerifying, isResetting, t]);

  return (
    <>
      <MyStepper activeStep={step} />

      {step === 0 && <StepEmail {...stepProps[0]} />}
      {step === 1 && <StepCode {...stepProps[1]} />}
      {step === 2 && <StepResetPassword {...stepProps[2]} />}
    </>
  );
}
