import React from "react";
import InputError from "../common/InputError";

import { motion } from "framer-motion";
import { FormInputProps } from "@/types/ui/FormInputProps.types";

export default function FormInput({
  id,
  label,
  iconClass,
  type = "text",
  error,
  register,
  disabled = false,
}: FormInputProps) {
  return (
    <motion.div
      className="input-wrapper mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex gap-2 align-items-center mb-4">
        <i className={iconClass} />
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        id={id}
        type={type}
        {...register}
        className={`form-control ${error ? "is-invalid" : ""}`}
        aria-describedby={`${id}-error`}
        disabled={disabled}
      />
      <InputError id={`${id}-error`} message={error} />
    </motion.div>
  );
}
