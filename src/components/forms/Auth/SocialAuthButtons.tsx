"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface SocialAuthButtonsProps {
  title?: string;
  haveAccountText?: string;
  goLoginText?: string;
  forgotPassword?: string;
  forgetText?: string;
  authLink?: string;
  forgetLink?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SocialAuthButtons({
  title = "Or register with",
  haveAccountText = "Have an account?",
  goLoginText = "Go to login",
  forgotPassword,
  forgetText,
  forgetLink,
  authLink,
}: SocialAuthButtonsProps) {
  return (
    <motion.div
      className="another-way-to-registration mt-4 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="registradion-top-text" variants={itemVariants}>
        <span>{title}</span>
      </motion.div>

      <motion.div
        className="login-with-brand d-flex gap-3 justify-content-center mb-3"
        variants={itemVariants}
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
          className="single"
          aria-label="Login with Google"
        >
          {" "}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img src="/assets/images/form/google.svg" alt="Google login" />{" "}
          </motion.div>
        </Link>

        {/**/}
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/facebook`}
          className="single"
          aria-label="Login with Facebook"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img src="/assets/images/form/facebook.svg" alt="Facebook login" />
          </motion.div>
        </Link>
        {/*  */}
      </motion.div>

      <motion.div
        className="d-flex flex-column align-items-center"
        variants={itemVariants}
      >
        <p className="mt-3">
          {haveAccountText}{" "}
          <Link href={`/${authLink ?? ""}`}>{goLoginText}</Link>
        </p>
        <p className="mt-3 p-0">
          {forgotPassword}{" "}
          <Link href={`/${forgetLink ?? ""}`}>{forgetText}</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
