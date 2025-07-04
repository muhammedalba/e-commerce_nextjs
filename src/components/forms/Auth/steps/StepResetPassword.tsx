"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas/forgetPassSchema";
import { StepResetPasswordProps, ResetPasswordForm } from "@/types/auth";

import FormInput from "../../FormInput";
import InputError from "@/components/common/InputError";
import SubmitButton from "../../SubmitButton";

export default function StepResetPassword({
  onSubmit,
  email,
  loading,
  label,
  loadingLabel,
  error,
  passwordLabel,
  confirmPasswordLabel,
  emailLabel,
  t,
}: StepResetPasswordProps) {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      email,
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="registration-form mt-5"
    >
      <FormInput
        id="email"
        type="email"
        label={emailLabel}
        iconClass="fa-light fa-envelope"
        register={form.register("email")}
        error={form.formState.errors.email?.message}
        disabled={true}
      />
      <FormInput
        id="password"
        type="password"
        label={passwordLabel}
        iconClass="fa-light fa-lock"
        register={form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <FormInput
        id="confirmPassword"
        type="password"
        label={confirmPasswordLabel}
        iconClass="fa-light fa-lock-keyhole"
        register={form.register("confirmPassword")}
        error={form.formState.errors.confirmPassword?.message}
      />
      <InputError id="reset-error" message={error} />
      <SubmitButton
        loading={loading}
        label={label}
        loadingLabel={loadingLabel}
        className="rts-btn btn-primary my-3 w-100"
      />
    </form>
  );
}
