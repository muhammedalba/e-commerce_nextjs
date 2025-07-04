"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema } from "@/schemas/forgetPassSchema";
import { StepCodeProps, VerifyCodeForm } from "@/types/auth";

import FormInput from "../../FormInput";
import InputError from "@/components/common/InputError";
import SubmitButton from "../../SubmitButton";

export default function StepCode({
  onSubmit,
  loading,
  label,
  loadingLabel,
  error,
  codeLabel,
  t,
}: StepCodeProps) {
  const form = useForm<VerifyCodeForm>({
    resolver: zodResolver(verifyCodeSchema(t)),
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="registration-form mt-5"
    >
      <FormInput
        id="code"
        type="text"
        label={codeLabel}
        iconClass="fa-light fa-key"
        register={form.register("resetCode")}
        error={form.formState.errors.resetCode?.message}
      />
      <InputError id="code-error" message={error} />
      <SubmitButton
        loading={loading}
        label={label}
        loadingLabel={loadingLabel}
        className="rts-btn btn-primary my-3 w-100"
      />
    </form>
  );
}
