import React from "react";
import { motion } from "framer-motion";
import { SubmitButtonProps } from "@/types/ui/SubmitButton.types";


export default function SubmitButton({
  loading,
  label,
  loadingLabel,
  className = "rts-btn btn-primary w-100",
}: SubmitButtonProps) {
  return (
    <motion.div
      className="input-wrapper mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="submit"
        className={className}
        disabled={loading}
        aria-busy={loading}
        style={{
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? loadingLabel || "..." : label}
      </button>
    </motion.div>
  );
}
