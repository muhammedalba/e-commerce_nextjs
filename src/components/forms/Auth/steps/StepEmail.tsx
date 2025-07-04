"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPassSchema } from "@/schemas/forgetPassSchema";
import { StepEmailProps, ForgetPasswordForm } from "@/types/auth";

import FormInput from "../../FormInput";
import InputError from "@/components/common/InputError";
import SubmitButton from "../../SubmitButton";

export default function StepEmail({
  onSubmit,
  loading,
  label,
  loadingLabel,
  error,
  emailLabel,
  t,
}: StepEmailProps) {
  const form = useForm<ForgetPasswordForm>({
    resolver: zodResolver(forgetPassSchema(t)),
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
      />
      <InputError id="email-error" message={error} />
      <SubmitButton
        loading={loading}
        label={label}
        loadingLabel={loadingLabel}
        className="rts-btn btn-primary my-3 w-100"
      />
    </form>
  );
}
