"use client";

import { AnimatePresence, motion } from "framer-motion";

interface InputErrorProps {
  message?: string;
  className?: string;
  id?: string; // For aria-describedby
}

export default function InputError({ message, className, id }: InputErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          className={`text-danger mt-1 small ${className || ""}`}
          role="alert"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}