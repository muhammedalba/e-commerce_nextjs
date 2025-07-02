import React from "react";
import InputError from "../common/InputError";
import { UseFormRegisterReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface FormInputProps {
  id: string;
  label: string;
  iconClass: string;
  type?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export default function FormInput({
  id,
  label,
  iconClass,
  type = "text",
  error,
  register,
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
      />
      <InputError id={`${id}-error`} message={error} />
    </motion.div>
  );
}
